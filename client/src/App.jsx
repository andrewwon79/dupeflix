import React, { useContext, useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import  './App.css';
import Watch from './pages/watch/Watch';
import { Home } from './pages/home/Home';
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import { AuthContext } from './authContext/AuthContext';
import NetflixBaseURL from './apis/NetflixBaseURL';

const App = () => {


  useEffect(()=> {
    //console.log(localStorage.getItem("user").username);
    const verifyToken = async () => {
      try{
        await NetflixBaseURL.get("/user/verify/"+JSON.parse(localStorage.getItem("user")).id, {
          headers: {
            token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
          }
        })
      }catch(err)
      {
        if(user)
        {
          localStorage.clear();
          window.location.reload();
        }
        console.log(err);
      }
    };
    verifyToken();
  },[]);
  //even though we had this below code, a user could still be logged in for like 1 week and still be logged in, but their token could expire
  //this could lead to issues where they see some part of the page, but other parts do not load
  //the code above should fix that, it'll remove local storage of user which will make user variable false, which sends us back to login

  //If this is true, means we are logged in, if false then we not not logged in and all links go to register page
  //const user = true;
  const {user} = useContext(AuthContext);
  return (
          <div className='container-fluid p-0'>
              <Router>
                  <Routes>
                      <Route exact path="/" element={user ? <Home/> : <Navigate to ='/register'/>}/>
                      <Route exact path="/register" element={!user ? <Register/> : <Navigate to ='/'/>}/>
                      <Route exact path="/login" element={!user ? <Login/> : <Navigate to ='/'/>}/>
                       {user ? (
                          //We need these little react fragments because react will complain and throw an error, the <></>
                          <>
                            <Route exact path="/movies" element={<Home type='movie'/>}/>
                            <Route exact path="/series" element={<Home type='series'/>}/>
                            <Route exact path="/watch" element={<Watch/>}/>
                          </>
                        ) : (<Route path='*' element={<Navigate to='/register'/>} />)
                      }
                      
                  </Routes>
              </Router>
          </div>
  );
};

export default App;