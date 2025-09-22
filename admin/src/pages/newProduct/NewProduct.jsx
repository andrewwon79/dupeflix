import React, { useContext, useState } from 'react'
import './newProduct.scss'
import NetflixBaseURL from '../../apis/NetflixBaseURL';
import { createMovie } from '../../context/movieContext/apiCalls';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { useNavigate } from 'react-router-dom';

const NewProduct = () => {
  const { dispatch } = useContext(MovieContext);
  const navigate = useNavigate();

  const formData = new FormData();
  formData.append("isseries", false);


  const handleChange = (e) => {
    let value;
    console.log(e.target.type);
    if(e.target.type != 'file')
    {
      value = e.target.value;
      formData.set(e.target.name,value);
      //setMovie({...movie,[e.target.name]:value});
    }
    else
    {
      value = e.target.files[0];
      //console.log(e.target);
      //setMovie({...movie,[e.target.name]:value});
      formData.set(e.target.name,value);
    }
    
    /* console.log(formData.get(e.target.name));
    for (const value of formData.values()) {
      console.log(value);
    } */
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    try{
      for (const key of formData.keys()) {
        console.log(`${key} ${formData.get(key)}`);
      }
      createMovie(formData, dispatch);
      navigate(`/movies`);
        /* await NetflixBaseURL.post("/movies",formData,{headers: {
        token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
        'Content-Type': 'multipart/form-data'
      }
    }); */
    }catch(err) {
      console.log(err);
    }   
  }

  return (
    <div className='newProduct'>
            <div className="newProduct">
      <h1 className="addProductTitle">New Movie</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="img" name="img" onChange={(e) => handleChange(e)}/>
        </div>
        <div className="addProductItem">
          <label>Title image</label>
          <input type="file" id="imgTitle" name="imgTitle" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Thumbnail image</label>
          <input type="file" id="imgSm" name="imgSm" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="John Wick" name="title" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input type="text" placeholder="description" name="description" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Year</label>
          <input type="text" placeholder="Year" name="year" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Genre</label>
          <input type="text" placeholder="Genre" name="genre" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Duration</label>
          <input type="text" placeholder="Duration" name="movielength" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Limit</label>
          <input type="text" placeholder="Limit" name="agelimit" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Is Series?</label>
          <select name="isseries" id="isSeries" onChange={handleChange} >
            <option value="false">No</option>
            <option value="true">Yes</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>Trailer</label>
          <input type="file" name="trailer" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Video</label>
          <input type="file" name="video" onChange={handleChange}/>
        </div>
        <button className="addProductButton" onClick={handleUpload}>Create</button>
      </form>
    </div>
    </div>
  )
}

export default NewProduct