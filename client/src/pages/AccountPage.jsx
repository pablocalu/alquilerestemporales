import axios from 'axios';
import React, { useContext, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import AccountNav from '../AccountNav';
import { UserContext } from '../UserContext';
import PlacesPage from './PlacesPage';

export default function AccountPage() {
  const { user, ready, setUser } = useContext(UserContext);
  const [toHomePage, setToHomePage] = useState(null);

  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = 'profile';
  }

  const logout = async () => {
    await axios.post('/logout');
    setToHomePage('/');
    setUser(null);
  };

  if (!ready) {
    return 'Loading..';
  }

  if (ready && !user && !toHomePage) {
    return <Navigate to={'/login'} />;
  }



  if (toHomePage) {
    return <Navigate to={toHomePage} />;
  }

  return (
    <div>
      <AccountNav/>
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} ({user.email})<br />
          <button className="primary max-w-sm mt-2" onClick={logout}>
            Logout
          </button>
        </div>
      )}
      {subpage === 'places' && (<PlacesPage />)}
    </div>
  );
}
