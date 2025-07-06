
import Logo from '../../smallElems/logo'
import { useSearch } from '../../Context';
import RenderSearch from "../../smallElems/search/search";
import "./Header.scss";
import "boxicons/css/boxicons.min.css";

function Head({setToggled}){
  
  return(
    <>
      <div className="headerNav">
        <Logo/>
        <div className="headerNavMenu">
          <ul className="headerNavMenu">
            <li className="header_Nav_Menu_Li">Films</li>
            <li className="header_Nav_Menu_Li">Series</li>
            <li className="header_Nav_Menu_Li">Cartoons</li>
            <li className="header_Nav_Menu_Li">TV-series</li>
          </ul>
        </div>
      </div>
      <div className="headerFilterSection">
        <button className="headerSearch" onClick={()=>setToggled(prev=>!prev)}>
          <i className=" bx bx-search"></i>Search
        </button>
        <button className="LoginBtn">Log in</button>
      </div>
    </>
  )
}

export default function Header() {
  const {toggle,setToggled}=useSearch()
  return (
    <div
      className={toggle ? "blur_overlay" : ""}
      onClick={(e) => {
        if (e.target.classList.contains("blur_overlay")) {
          setToggled(false);
        }
      }}
    >
      <header className={toggle ? "search" : "simple_header"}>
        <div
          className={
            toggle ? "search__header" : "header_upper_line"
          }
        >
          {!toggle && <Head setToggled={setToggled}/>}
          {toggle && <RenderSearch />}
        </div>
      </header>
    </div>
  );
}

