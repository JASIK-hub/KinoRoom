
import Logo from '../../smallElems/logo'
import { useState } from "react";
import RenderSearch from "../../smallElems/search";
import "./Header.scss";
import "boxicons/css/boxicons.min.css";

function Head({setSearch}){
  function enableSearch() {
    setSearch(true);
  }
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
        <button className="headerSearch" onClick={enableSearch}>
          <i className=" bx bx-search"></i>Search
        </button>
        <button className="LoginBtn">Log in</button>
      </div>
    </>
  )
}

export default function Header() {
  const [showSearch, setSearch] = useState(false);
  return (
    <div
      className={showSearch ? "blur_overlay" : ""}
      onClick={(e) => {
        if (e.target.classList.contains("blur_overlay")) {
          setSearch(false);
        }
      }}
    >
      <header className={showSearch ? "searching_header_toggled" : "simple_header"}>
        <span className="blur"></span>
        <div
          className={
            showSearch ? "header_upperLine_searching" : "header_upper_line"
          }
        >
          {!showSearch && <Head setSearch={setSearch}/>}
          {showSearch && <RenderSearch />}
        </div>
      </header>
    </div>
  );
}

