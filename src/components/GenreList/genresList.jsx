import { useEffect, useState,useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./genreList.scss";

const token = process.env.REACT_APP_TMDB_TOKEN;
export default function GenresList() {
  const [state, setState] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await fetch(
          "https://api.themoviedb.org/3/genre/movie/list?language=en",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await responce.json();
        setState(data.genres);
      } catch (error) {
        console.log("error while fetching lol", error);
      }
    };
    fetchData();
  }, []);
  
  return <>{state.length > 0 && <RenderGenres data={state} />}</>;
 
}
function RenderGenres({ data }) {
  const buttonRef=useRef(null)
  const [size,setSize]=useState(0)
  const [initialState, newState] = useState(0);
  const navigate = useNavigate();
  useEffect(()=>{
    if(buttonRef.current){
      const {width}=buttonRef.current.getBoundingClientRect()
      setSize(width)
    }
  },[])
  function slideRight() {
    newState((prev) => {
      const next = prev + 1;
      if (next * 1236 > 2500) {
        return prev;
      }
      return next;
    });
  }
  function slideLeft() {
    newState((prev) => prev - 1);
  }
  return (
    <div className="genreList_outer" >
      <div className='genreList_inner'>
        <div className="genreList"
          ref={buttonRef}
          style={{
            transform: `translateX(-${initialState * (size+20)}px)`,
          }}
        >
          {data.map((genre) => {
            return (
              <button
                className="genreListBtn"
                key={genre.id}
                onClick={() => navigate(`/genre/${genre.id}`)}
              >
                {genre.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="genreSlideButtons">
        <i
          className="bxCarousel bx bx-chevron-left"
          onClick={slideLeft}
          style={{
            opacity: initialState >= 1 ? "1" : "0",  
          }}
        ></i>
        <i
          className="bxCarousel bx bx-chevron-right"
          onClick={slideRight}
        ></i>
      </div>
    </div>
  );
}
