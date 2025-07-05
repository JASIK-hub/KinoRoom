import { useState, useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./carousel.scss";
import "boxicons/css/boxicons.min.css";

const token = process.env.REACT_APP_TMDB_TOKEN;

export default function Carousel() {
  const [state, setState] = useState({ results: [] });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&region=us",
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
        console.log("Error while fetching lol", error);
      }
    };
    fetchData();
  }, []);

  
  return (
    <div>
      {state.length > 0 && <AutoCarousel images={state} />}
    </div>
  );
}
//Card for one poster
function PosterCard({ movie, onClick }) {
  
  return (
    <div
      className="posterContainer"
      onClick={onClick}
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
      }}
    >
      <div className="posterInformation">
        <h2 className="posterTitle">{movie.original_title}</h2>
        <p className="posterDescription">{movie.overview}</p>
      </div>

      <div className="left_blur"></div>
    </div>
  );
}

///Dispalayin` Carousel
function AutoCarousel({ images}) {
  const posterRef=useRef(null)
  const [size,setSize]=useState(0)
  useEffect(()=>{
    if(posterRef.current){
      const {width}=posterRef.current.getBoundingClientRect()
      setSize(width)
    }
  },[])
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);
  
  const goNext = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const goPrev = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="carousel">
      <div
        className="carousel-track"
         style={{ transform: `translateX(-${index * (size+20)}px)` }}
      >
        {images.map((movie,i) => (
          <div 
          className="posterWrapper"
          key={movie.id}
          ref={i==0 ? posterRef : null}>
            <PosterCard
            movie={movie}
            onClick={() => navigate(`/film/${movie.id}`)}
          />
          </div>
          
        ))}
      </div>
        <div className="carouselButtons">
          <i className="bxCarousel bx bx-chevron-left" onClick={goPrev}></i>
          <i className="bxCarousel bx bx-chevron-right" onClick={goNext}></i>
        </div>
      
    </div>
  );
}
