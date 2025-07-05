import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Logo from '../logo'
import "./search.scss";

function SearchFilm({ change }) {
  const token = process.env.REACT_APP_TMDB_TOKEN;
  const [searchfilm, setFilm] = useState([] );
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${change}&include_adult=false&language=en-US&page=1`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                `Bearer ${token}`,
            },
          }
        );
        const data = await responce.json();
        setFilm(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData()
  }, [change]);
  
  const filterFilms=
    searchfilm.filter((film) => film.popularity > 1)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 10)
  
  return (
    <>
      <div style={{ overflow: "hidden" }}>
        {searchfilm.length > 0 && (
          <div className="searchedFilms_container">
            {filterFilms.map((film) => (
                <div
                  className="searched_film_container"
                  key={film.id}
                  onClick={() => navigate(`film/${film.id}`)}
                >
                   {film.poster_path && 
                   <img
                    src={`https://image.tmdb.org/t/p/original/${film.poster_path}`}
                    style={{ width: "100px", height: "150px" }}
                    alt=""
                  />}
                  
                  <div className="searchedfilm_info">
                    <p className="searched_film_title">{film.title}</p>
                    <p style={{ color: "white" }}>
                      {film.release_date.slice(0, 4)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </>
  );
}
export default function RenderSearch() {
  const [value, setValue] = useState("");
  const [change, onChange] = useState("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, 500);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="search">
      <div className="search__header">
        <Logo/>
        <div
          style={{ display: "flex", gap: "10px", alignItems: "center" }}
        >
          <SearchIcon sx={{ color: "white" }} />
          <input
            type="text"
            className="film_title_input"
            placeholder="Search Film,Tv-Series"
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
      {change.length > 0 && <SearchFilm change={change} />}
    </div>
  );
}

