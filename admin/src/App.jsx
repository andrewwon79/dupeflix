import React, { useContext } from 'react'
import Header from './components/header/Header'
import Sidebar from './components/sidebar/Sidebar'
import './app.scss'
import Home from './pages/home/Home'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import UserList from './pages/userList/UserList'
import User from './pages/user/User'
import NewUser from './pages/newUser/NewUser'
import ProductList from './pages/productList/ProductList'
import Product from './pages/product/Product'
import NewProduct from './pages/newProduct/NewProduct'
import Login from './pages/login/Login'
import ListList from './pages/listList/ListList'
import { AuthContext } from './context/authContext/AuthContext'
import List from './pages/list/List'
import NewList from './pages/newList/NewList'
import { useEffect } from 'react'
import NetflixBaseURL from './apis/NetflixBaseURL'

const App = () => {
  const {user} = useContext(AuthContext);
  console.log(user);

  //If we're logged on for like a whole day and don't log out, our token will expire, it produces a bug where page loads but no content and cannot go back
  //So in here we check if its valid, if not then we'll redirect to home page
  //So we are at a crossroads, our verify function which we created to already verify if token is valid takes incorrect values for our admin app
  //It is expecting an api call, but here we just want to get true or false basically, we're not calling some api
  //we can redefine the verifyToken file to export 2 things, but it'll be like helper.verify and helper.verifyWebApp
  //every place that has verify needs to be helper.verify :/
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

  return (
    //NO SWITCH IN THIS VERSION, at 2:53:25 he does some funky stuff with it, maybe it'll get fixed later with this login
    <Router>
      {/* <Routes>
        <Route path='/login' element={user ?  <Navigate replace to = "/"/> : <Login/> }/>
        <Route path='/' element={user ?  " " : <Navigate replace to = "/login"/> }/>
      </Routes> */}
      
      {user ? 
      <>
        <Header/>
        <div className="container">
          <Sidebar/>
          
            <Routes>
              <Route path='/login' element={user ?  <Navigate replace to = "/"/> : <Login/> }/>
              <Route exact path='/' element={<Home/>}/>          
              <Route path='/users' element={<UserList/>}/>
              <Route path='/users/:useId' element={<User/>}/>
              <Route path='/newUser' element={<NewUser/>}/>
              <Route path='/movies' element={<ProductList/>}/>
              <Route path='/product/:productsId' element={<Product/>}/>
              <Route path='/newproduct' element={<NewProduct/>}/>
              <Route path='/lists' element={<ListList/>}/>
              <Route path='/list/:listId' element={<List/>}/>
              <Route path='/newlist' element={<NewList/>}/>
            </Routes> 
        </div></>
      : 
      <>
      <Routes>
        <Route path='/login' element={user ?  <Navigate replace to = "/"/> : <Login/> }/>
        <Route path='/*' element={user ?  " " : <Navigate replace to = "/login"/> }/>
      </Routes>
        
      </>
    }
    </Router>
  )
}

export default App