import { useContext,createContext,useState } from "react";

const SearchContext=createContext()
export function SearchProvider({ children }){
    const [toggle,setToggled]=useState(false)
    return(
        <SearchContext.Provider value={{toggle,setToggled}}>
            {children} 
        </SearchContext.Provider>
    )
}
export function useSearch() {
  return useContext(SearchContext);
}