import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header';
import "./Home.css";
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import NetflixBaseURL from '../../apis/NetflixBaseURL';


export const Home = ({type}) => {
  const [lists,setLists] = useState([]);
  const [genre,setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async() => {
      try{
        const res = await NetflixBaseURL.get(`/lists/random${type ? `?type=`+type : ""}${genre ? "&genre="+genre : ""}`,{
          headers:{
            token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
            //token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjkiLCJpc2FkbWluIjp0cnVlLCJpYXQiOjE2OTg0NjgyNDEsImV4cCI6MTY5ODkwMDI0MX0.CC4357UDrTqr34j-FIKPUrBlbyqSQKVrzdLxL8m79j8"
          }
        });
        setLists(res.data.data.List);
      }catch(err){
        console.log(err);
      }
    };
    getRandomLists();
  },[type,genre]);

  //The above means whenever we change the type or genre, we're going to call this useEffect for getrandomlists
  return (
    <div className='home overflow-hidden'>
        <Header/>
        <Featured type={type} setGenre={setGenre} listGenre={genre}/>
          {lists.map((list) => (
            <List list={list} key={list.id}/>
          ))}
        <div className="extra"></div>
    </div>
  )
}
