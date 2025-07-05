import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./topOfWeek.scss";
import girland from "../../images/christmas-string-lights-isolated-glowing-realistic-garlands-dark-background-holiday-shimmering.png";
function TopMovies() {
  const token = process.env.REACT_APP_TMDB_TOKEN;
  const [state, setState] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await fetch(
          "https://api.themoviedb.org/3/trending/movie/week?language=en-US",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await responce.json();
        setState(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData()
  }, []);
  return <>{state.length > 0 && <RenderMovies data={state} />}</>;
}
function RenderMovies({ data }) {
  const navigate = useNavigate();
  return (
    <div className="top_movies_container">
      <h2 style={{ color: "white" }}>
        <span className="top10">Top 10</span> of the Week
      </h2>
      <img className="girland" src={girland} alt="" />
      <div className="top_movies">
        {data.slice(0, 10).map((movie, i) => (
          <div className="top_movie_card" key={movie.id}>
            <span>{i + 1}</span>
            <img
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
              onClick={() => navigate(`/film/${movie.id}`)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
export default TopMovies;
