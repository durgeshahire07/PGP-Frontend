import React, {useState,useContext,createContext} from "react";
const UserContext = createContext([{},()=>{}]);

const UserProvider = (props) => {
    const [state, setState] = useState({
        firstname:"",
        lastname: "",
        email:"",
        uid:"",
        token: "",
        isLoggedIn: false,
    });

    return <UserContext.Provider value={[state,setState]}>{props.children}</UserContext.Provider>
};

export {UserContext, UserProvider};