import { useEffect, useState,useRef } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import './genreMovie.scss'
function GenreMovie({ genreId, genreText }) {
  const token = process.env.REACT_APP_TMDB_TOKEN;
  const [initalSt, newSt] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await fetch(
          `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${genreId}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data =await responce.json();
        newSt(data.results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData()
  }, []);
  return (
    <>
      {initalSt.length > 0 && (
        <DisplayGenre
          genreData={initalSt}
          genre={genreText}
          genreId={genreId}
        />
      )}
    </>
  );
}

 function GenreFilmRow({state,genreData,genreId,sizeRef,size}){
  const [likedFilms, setLikedFilms] = useState({});
  function toggleLike(id){
    setLikedFilms((prev)=>({
      ...prev,
      [id]:!prev[id]
    }))
  }
  const navigate = useNavigate();
  return(
      <div
          className="imagesGenreRow"
          style={{ transform: `translateX(-${state * size}px)` }}
        >
          {genreData.map(film => (
            film.poster_path && 
              <React.Fragment key={film.id}>
            <div className="poster" ref={sizeRef}>
              <div className="favourite-btn" onClick={()=>toggleLike(film.id)}>
                <i className="favourite-btn__mark bx bxs-bookmark"></i>
                <i className={`favourite-btn__heart bx ${likedFilms[film.id] ? "bxs-heart" : "bx-heart"}`}></i>
              </div>
              <img
                className="poster__image"
                id={film.id}
                src={`https://image.tmdb.org/t/p/original/${film.poster_path}`}
                alt={`film:${film.title}`}
                onClick={() => navigate(`/film/${film.id}`)}
              />
              <h4 className="poster__title">{film.title}</h4>
              <p className="poster__cost">Free</p>
            </div>
          </React.Fragment>
          ))}
          <div
            className="moreCard"
            onClick={() => navigate(`/genre/${genreId}`)}
          >
            <p>Show More</p>
          </div>
      </div>
  )
 }
function DisplayGenre({ genreData, genre, genreId }) {
  const [state, newState] = useState(0);
  const sizeRef=useRef(null)
  const containerRef=useRef(null)
  const [size,setSize]=useState(0)
  const [containerWidth,setContainerWidth]=useState(0)
  useEffect(()=>{
    if(sizeRef.current){
      let {width}=sizeRef.current.getBoundingClientRect()
      setSize(width)
      
    } if(containerRef.current){
      let {width}=containerRef.current.getBoundingClientRect()
      setContainerWidth(width)
    }
  },[])
  function NextPoster() {
    const visibleCards = Math.floor(containerWidth / size)
     newState(prev => { 
    const next = prev + visibleCards-1;
    if (next >  genreData.length+1) return prev; 
    return next;
    });
  }
  function previousPoster() {
    const visibleCards = Math.floor(containerWidth / size);

    newState((prev) => prev - (visibleCards-1 % genreData.length));
  }
  
  return (
    <div className="genre">
      <div className="genre__containerScroll">
        <div className="genre__title">
          <div className="genre__title-primary">
            <h4 className="genre__name">{genre} </h4>
            <i className="bx-title bx bx-chevron-right"></i>
          </div>
        </div>
        <div className="genreRow__wrapper" ref={containerRef}>
          <GenreFilmRow 
          genreId={genreId}
          genreData={genreData} 
          state={state} 
          sizeRef={sizeRef}
          size={size}/>
          <span
           style={{
            opacity: state >= 1 ? "1" : "0" ,
            transition: '0.5s ease',
            content: '',
            position: 'absolute',
            left:'0px',
            top:0,
            width:'15%',
            height:'100%',
            background: 'linear-gradient(to left,transparent,#121212)'
           }} 
            ></span>
        </div>
      </div>
      <div className="scroll__btns">
        <span>
        <i
          className="scroll__btns-left bx bx-chevron-left"
          style={{ opacity: state >= 1 ? "1" : "0" }}
          onClick={previousPoster}
        ></i>
      </span>
      <span>
        <i className="scroll__btns-right bx bx-chevron-right" onClick={NextPoster}></i>
      </span>
      </div>
      
    </div>
  );
}
export default GenreMovie;
