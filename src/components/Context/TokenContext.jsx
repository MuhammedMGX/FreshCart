import { createContext, useState , useEffect } from "react";

export let TokenContext = createContext()

export default function TokenContextProider(props) {

    const [Token, setToken] = useState(null)
    console.log(Token);
    
    useEffect(() => {
      if(localStorage.getItem('userToken') ){
        setToken(localStorage.getItem('userToken'))
        
        }
    
     
    }, [])
    

    return (
        <TokenContext.Provider value={{Token , setToken }}>
            {props.children}
        </TokenContext.Provider>
    )
    
    
} 