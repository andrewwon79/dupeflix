import NetflixBaseURL from "../../apis/NetflixBaseURL"
import { createMovieFailure, createMovieStart, createMovieSuccess, deleteMovieFailure, deleteMovieStart, deleteMovieSuccess, getMoviesFailure, getMoviesStart, getMoviesSuccess, updateMovieFailure, updateMovieStart, updateMovieSuccess } from "./MovieActions"

export const getMovies = async (dispatch) => {
    dispatch(getMoviesStart())
    try{
        const res = await NetflixBaseURL.get("/movies",{headers: {
            token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
        }
        
    });
    console.log(res.data);
    dispatch(getMoviesSuccess(res.data));
    }catch(err){
        dispatch(getMoviesFailure())
    }
}

//create
export const createMovie = async (formData,dispatch) => {
    dispatch(createMovieStart())
    try{
        const res = await NetflixBaseURL.post("/movies",formData,{headers: {
            token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
            'Content-Type': 'multipart/form-data'
          }
        });
        /* const res = await NetflixBaseURL.post("/movies/", movie, {headers: {
            token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
        },
    }); */
    dispatch(createMovieSuccess(res.data));
    }catch(err){
        dispatch(createMovieFailure())
    }
}

//update
export const updateMovie = async (formData,dispatch) => {
    dispatch(updateMovieStart())
    try{
        const res = await NetflixBaseURL.put("/movies/"+formData.get("id"),formData,{headers: {
            token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
            'Content-Type': 'multipart/form-data'
          }
        });
    dispatch(updateMovieSuccess());
    }catch(err){
        dispatch(updateMovieFailure())
    }
}

export const deleteMovie = async (id,dispatch) => {
    dispatch(deleteMovieStart())
    try{
        await NetflixBaseURL.delete("/movies/"+id,{headers: {
            token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
        },
    });
    dispatch(deleteMovieSuccess(id));
    }catch(err){
        dispatch(deleteMovieFailure())
    }
}