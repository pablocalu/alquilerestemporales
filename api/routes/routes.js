
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Place = require('../models/Place');
const Booking = require('../models/Booking')
const multer = require('multer');
const upload = multer({ dest: 'uploads/'})
const cloudinary = require('cloudinary').v2
const bcrypt = require('bcryptjs');
const { getUserDataFromToken } = require('../controller/userFromToken')
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = 'thisisunsecreto';

const { Router } = require('express');
const router = Router();

app.post('/upload', upload.single('image'), (req, res) => {
  const path = req.file.path
  cloudinary.uploader.upload(path, (error, result) => {
    if(error){
      console.log(error)
      return res.status(500).json({ message: "Upload image failed"})
    }
    res.status(200).json({ url: result.secure_url})
  })
})


router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(user);
  } catch (error) {
    res.status(422).json(error);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    const passOk = bcrypt.compareSync(password, userDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: userDoc.email,
          id: userDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
        }
      );
    } else {
      res.status(422).json('pass not ok');
    }
  } else {
    res.json('not found');
  }
});

router.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(userData.id);
      res.json({ name, email, _id });
    });
  } else {
    res.json(null);
  }
});

router.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
});


router.post('/places', (req, res) => {
  const { token } = req.cookies;
  const {
    title,
    address,
    addedPhotos1,
    addedPhotos2,
    description,
    price,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      price,
      title,
      address,
      addedPhotos1,
      addedPhotos2,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    });
    res.json(placeDoc);
  });
});

router.get('/user-places', (req,res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData
    res.json(await Place.find({ owner:id }))
  })
})

router.get('/places/:id', async (req,res) => {
  const {id} = req.params;
  res.json(await Place.findById(id).populate('booking'));
});

router.put('/places', async (req, res) => {
  const { token } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos1,
    addedPhotos2,
    description,
    price,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
  } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id)
    if(userData.id === placeDoc.owner.toString()){
      placeDoc.set({
        price,
        title,
        address,
        addedPhotos1,
        addedPhotos2,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
      })
      placeDoc.save()
      res.json('ok')
    }
  })
})

router.get('/places', async (req, res) => {
  res.json( await Place.find())
})



router.post('/booking', async (req,res) => {
  const userData = await getUserDataFromToken(req)
  const { place, dates, numberOfGuests, name, phone, price } = req.body

  try {
    const booking = await Booking.create({
      place, dates, numberOfGuests, name, phone, price, user: userData.id
    })
    await Place.updateOne(
      { _id: place }, 
      { $push: { booking } }
  );

    res.json('ok')
  } catch (error) {
    throw error
  }
})

router.get('/bookings', async (req,res) => {
  const userData = await getUserDataFromToken(req)
  res.json(await Booking.find({user: userData.id}).populate('place'))
})

router.put('/cancel', async (req, res) => {
  const { id } = req.body

  try {
    await Booking.findByIdAndDelete({ _id : id})
    res.json('ok')
  } catch (error) {
    throw error
  }
})

router.get('/findplaces', async (req, res) => {
  const { name } = req.query
  if(name){
    const allPlaces = await Place.find()
    const foundPlace = allPlaces.filter( p => p.address.toLowerCase().includes(name.toLocaleLowerCase()))
    res.json(foundPlace)
  }
  else {
    res.json([])
  }
})

module.exports = router;