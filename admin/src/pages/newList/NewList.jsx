import React, { useContext, useEffect, useState } from 'react'
import './newList.scss'
import NetflixBaseURL from '../../apis/NetflixBaseURL';
import { createMovie, getMovies } from '../../context/movieContext/apiCalls';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { ListContext } from '../../context/listContext/ListContext';
import { createList } from '../../context/listContext/apiCalls';
import { useNavigate } from 'react-router-dom';

const NewList = () => {
  const [list,setList] = useState(null);
  const navigate = useNavigate();

  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

  useEffect(() => {
    getMovies(dispatchMovie)
  },[dispatchMovie])

  const formData = new FormData();
  formData.append("isseries", false);


  const handleChange = (e) => {
    const value = e.target.value;
    setList({...list, [e.target.name]: value}) ;   
  }
  const handleSelect = (e) => {
    //e.target.selectedOptions gives us a million little html elements
    //so we handpick the important one we want, which is value (the movies id)
    let value = Array.from(e.target.selectedOptions, (option)=>option.value);
    setList({...list,[e.target.name]: value})
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    createList(list, dispatch);
    navigate(`/lists`);
  }

  return (
    <div className='newProduct'>
            <div className="newProduct">
      <h1 className="addProductTitle">New List</h1>
      <form className="addProductForm">
        <div className="formLeft">
          <div className="addProductItem">
            <label>Title</label>
            <input type="text" placeholder="Popular Movies" name="title" onChange={handleChange} />
          </div>
          <div className="addProductItem">
            <label>Genre</label>
            <input type="text" placeholder="Action" name="genre" onChange={handleChange} />
          </div>
          <div className="addProductItem">
            <label>Type</label>
            <select name="type" onChange={handleChange}>
            <option>Type</option>
              <option value="movie">Movie</option>
              <option value="series">Series</option>
            </select>
          </div>
        </div>
        <div className="formRight">
          <div className="addProductItem">
            <label>Content</label>
            <select multiple name="content" onChange={handleSelect} style={{height: "280px"}}>
              {movies.map(movie=>(
                <option key={movie.id} value={movie.id}>{movie.title}</option>
              ))}
            </select>
          </div>
        </div>
        <button className="addProductButton" onClick={handleUpload}>Create</button>
      </form>
    </div>
    </div>
  )
}

export default NewList