import NetflixBaseURL from "../apis/NetflixBaseURL";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch)=> {
    dispatch(loginStart());
    try{
        const res = await NetflixBaseURL.post("auth/login",user);
        dispatch(loginSuccess(res.data))
    }catch(err){
        dispatch(loginFailure());
    }

}; 