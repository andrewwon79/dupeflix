//initial state when we first login i think
//this gets updated, if we press login button fetching will be true

/* initialstate = {
    user:null,
    isFetching:false,
    error: false,
} */

import AuthReducer from "./AuthReducer";
import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    //This use effect will store the user login informationo in the localstorage of the browser
    //This way if they refresh the page they don't have to login again and again
    //in our initial state we can see that we're grabbing "user" from our local storage
    //if first time, it'll be blank which will default it to null, once they login, our useEffect gets triggered and we update initial state
    //in initialstate .getItem("user"), user is in quotes because we converted it to string with stringify
    //We convert it back to json
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
      }, [state.user]);
    //This authcontext.provider is from context.provider
    //Whenever a any of these values change, user, is fetching, error, then it will re-render any children or consumers of this
    return (
      <AuthContext.Provider
        value={{
          user: state.user,
          isFetching: state.isFetching,
          error: state.error,
          dispatch,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };
