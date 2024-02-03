import React,{useState,useEffect} from "react";

const Authcontext=React.createContext({
    isLoggedIn:false,
    onLogout:()=>{},
    onLogin:(email,password)=>{}
});

export const AuthcontextProvider=(props)=>{
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(()=>{
        const storedUserLoggedInInformation=localStorage.getItem('isLoggedIn');
        if(storedUserLoggedInInformation==='1'){
          setIsLoggedIn(true);
        }
    
      },[]);
    
    const loginHandler = (email, password) => {
        localStorage.setItem('isLoggedIn','1');
        setIsLoggedIn(true);
      };
    
      const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        setIsLoggedIn(false);
      };

    return <Authcontext.Provider
        value={{
            isLoggedIn:isLoggedIn,
            onLogout:logoutHandler,
            onLogin:loginHandler
        }}
    >
        {props.children}
        </Authcontext.Provider>

}
export default Authcontext;