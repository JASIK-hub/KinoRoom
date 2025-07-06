import { useContext,createContext,useState } from 'react';

const searchContext=createContext()
function SearchProvider({children}){
    const [toggle,setToggled]=useState(false)
    return(
        <searchContext.Provider value={{toggle,setToggled}}>
            {children}
        </searchContext.Provider>
    )
}
const useSearch=()=>useContext(searchContext)

export {SearchProvider,useSearch}