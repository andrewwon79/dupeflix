//initial state when we first login i think
//this gets updated, if we press login button fetching will be true

/* initialstate = {
    user:null,
    isFetching:false,
    error: false,
} */

import ListReducer from "./ListReducer";
import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
    lists:[],
  isFetching: false,
  error: false,
};

export const ListContext = createContext(INITIAL_STATE);

export const ListContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(ListReducer, INITIAL_STATE);

    //This authcontext.provider is from context.provider
    //Whenever a any of these values change, user, is fetching, error, then it will re-render any children or consumers of this
    return (
      <ListContext.Provider
        value={{
          lists: state.lists,
          isFetching: state.isFetching,
          error: state.error,
          dispatch,
        }}
      >
        {children}
      </ListContext.Provider>
    );
  };
