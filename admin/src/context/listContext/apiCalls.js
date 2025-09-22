import NetflixBaseURL from "../../apis/NetflixBaseURL"
import { createListFailure, createListStart, createListSuccess, deleteListFailure, deleteListStart, deleteListSuccess, getListFailure, getListStart, getListSuccess } from "./ListActions";

export const getLists = async (dispatch) => {
    dispatch(getListStart())
    try{
        const res = await NetflixBaseURL.get("/lists",{headers: {
            token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
        }
    });
    dispatch(getListSuccess(res.data.data.List));
    }catch(err){
        dispatch(getListFailure())
    }
}

//create
export const createList = async (list,dispatch) => {
    dispatch(createListStart())
    //console.log(list);
    try{
        const res = await NetflixBaseURL.post("/lists",list,{headers: {
            token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
          }
        });
        console.log(res);
    dispatch(createListSuccess(res.data));
    }catch(err){
        dispatch(createListFailure())
    }
}

export const deleteList = async (id,dispatch) => {
    dispatch(deleteListStart())
    try{
        await NetflixBaseURL.delete("/lists/"+id,{headers: {
            token: "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken
        },
    });
    dispatch(deleteListSuccess(id));
    }catch(err){
        dispatch(deleteListFailure());
    }
}