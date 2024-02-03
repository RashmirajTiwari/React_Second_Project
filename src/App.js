import React, { useState,useEffect } from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import Authcontext from './store/auth-context';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    const storedUserLoggedInInformation=localStorage.getItem('isLoggedIn');
    if(storedUserLoggedInInformation==='1'){
      setIsLoggedIn(true);
    }

  },[]);

  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn','1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <Authcontext.Provider value={{
      isLoggedIn:isLoggedIn,
      onLogout:logoutHandler
      }}>
      <MainHeader/>
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
      </Authcontext.Provider>
    );
}

export default App;
