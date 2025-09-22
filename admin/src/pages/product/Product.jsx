import React from 'react'
import './product.scss'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Publish } from '@mui/icons-material'
import { useContext } from 'react'
import { updateMovie } from '../../context/movieContext/apiCalls'
import { MovieContext } from '../../context/movieContext/MovieContext'
import NetflixBaseURL from '../../apis/NetflixBaseURL'

const Product = () => {
  const { dispatch } = useContext(MovieContext);
  const navigate = useNavigate();

  const location = useLocation();
  const movie = location.state;


  const formData = new FormData();
  formData.set("id",movie.id);

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
    console.log(e.target.name+": "+formData.get(e.target.name));
    for (const value of formData.values()) {
      console.log(value);
    }
  }

  const handleUpload = async (e) => {
    e.preventDefault();
    try{
      for (const key of formData.keys()) {
        console.log(`${key} ${formData.get(key)}`);
      }
      updateMovie(formData, dispatch);
      /* const res = await NetflixBaseURL.put("/movies/"+formData.get("id"),formData,{headers: {
        token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
        'Content-Type': 'multipart/form-data'
      }
    }); */
    navigate(`/movies`);
    }catch(err) {
      console.log(err);
    }   
  }

  
  return (
    <div className='product'>
        <div className="productTitleContainer">
            <h1 className="productTitle">Movie</h1>
            <Link to='/newproduct'>
                <button className="productAddButton">Create</button>
            </Link>
        </div>
        <div className="productTop">
          <div className="productTopRight">
            <div className="productInfoTop">
              <img src={movie.img} alt="" className="productInfoImg" />
              <span className="productName">{movie.title}</span>
            </div>
            <div className="productInfoBottom">
              <div className="productInfoItem">
                <span className="productInfoKey">id:</span>
                <span className="productInfoValue">{movie.id}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">genre:</span>
                <span className="productInfoValue">{movie.genre}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">year:</span>
                <span className="productInfoValue">{movie.year}</span>
              </div>
              <div className="productInfoItem">
                <span className="productInfoKey">limit:</span>
                <span className="productInfoValue">{movie.agelimit}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="productBottom">
          <form className="productForm">
            <div className="productFormLeft">
              <label>Movie Title</label>
              <input type="text" placeholder={movie.title} name="title" onChange={(e) => handleChange(e)}/>
              <label>Description</label>
              <textarea type="text" placeholder={movie.description} name="description" onChange={(e) => handleChange(e)}/>
              <label>Year</label>
              <input type="text" placeholder={movie.year} name="year" onChange={(e) => handleChange(e)}/>
              <label>Genre</label>
              <input type="text" placeholder={movie.genre} name="genre" onChange={(e) => handleChange(e)}/>
              <label>Limit</label>
              <input type="text" placeholder={movie.agelimit} name="agelimit" onChange={(e) => handleChange(e)}/>
              
            </div>
            <div className="productFormRight">
              <label>Image</label>
              <input type="file" placeholder={movie.img} name="img" onChange={(e) => handleChange(e)}/>
              <label>Thumbnail</label>
              <input type="file" placeholder={movie.imgsm} name="imgSm" onChange={(e) => handleChange(e)}/>
              <label>Title Card</label>
              <input type="file" placeholder={movie.imgtitle} name="imgTitle" onChange={(e) => handleChange(e)}/>
              <label>Trailer</label>
              <input type="file" placeholder={movie.trailer} name="trailer" onChange={(e) => handleChange(e)}/>
              <label>Video</label>
              <input type="file" placeholder={movie.video} name="video" onChange={(e) => handleChange(e)}/>
            </div>
            <div className="productFormRight">
              <div className="productUpload">
                <img src={movie.img} alt="" className="productUploadImg" />
                <label htmlFor="file">
                  <button><Publish/></button>
                  Only for practice, unused
                </label>
                <input type="file" id="file" style={{display:"none"}}/>
              </div>
              <button className="productButton" onClick={handleUpload}>Update</button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Product