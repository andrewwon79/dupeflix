//initial state when we first login i think
//this gets updated, if we press login button fetching will be true

/* initialstate = {
    user:null,
    isFetching:false,
    error: false,
} */

import MovieReducer from "./MovieReducer";
import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
    movies:[],
  isFetching: false,
  error: false,
};

export const MovieContext = createContext(INITIAL_STATE);

export const MovieContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(MovieReducer, INITIAL_STATE);

    //This authcontext.provider is from context.provider
    //Whenever a any of these values change, user, is fetching, error, then it will re-render any children or consumers of this
    return (
      <MovieContext.Provider
        value={{
          movies: state.movies,
          isFetching: state.isFetching,
          error: state.error,
          dispatch,
        }}
      >
        {children}
      </MovieContext.Provider>
    );
  };
