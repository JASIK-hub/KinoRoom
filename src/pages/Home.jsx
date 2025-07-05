import Header from "../components/Header/Header";
import Carousel from "../components/Carousel/carousel";
import GenresList from "../components/GenreList/genresList";
import GenreMovie from "../components/GenreMovie/genreMovie";
import TopMovies from "../components/topOfWeek/topOfTheWeek";
import GetVideo from "../components/Video/getVideo";
import Footer from "../components/Footer/footer";
import BottomNav from "../smallElems/bottomNav/bottomNav";

import glassBg from "../images/abstract-liquid-glass-transparent-ribbon.png";
import vecteezy from "../images/vecteezy_3d-vibrant-abstract-fluid-element-with-transparent-background_52782790.png";
import love from "../images/vecteezy_fly-out-love-shape-from-gift-box-3d-item_47311473.png";
import wave from "../images/vecteezy_abstract-moving-line-wave-element_44761665.png";

const genreArray = [
  { id: 18, text: "Dramas" },
  { id: 35, text: "Comedy Films that you will like" },
  { id: 10751, text: "Films to watch with Family" },
  { id: 36, text: "Epic History Series" },
  { id: 27, text: "Scary Night Picks" },
  { id: 53, text: "Exciting Movies" },
  { id: 10402, text: "Musical" },
  { id: 99, text: "Documentary" },
  { id: 10770, text: "TV Movies" },
];
const imageArray=[
  { src: vecteezy, style: { position:'absolute', width:'700px', top:'1000px', zIndex:'-1', left:'-300px', transform:'rotate(90deg)', opacity:'0.5' }},
  { src: glassBg, style: { position:'absolute', width:'700px', top:'600px', zIndex:'-1', right:'-250px' }},
  { src: wave, style: { position:'absolute', width:'1700px', top:'3000px', zIndex:'-1', left:'0px', opacity:'0.4', transform:'rotate(40deg)' }},
  { src: love, style: { position:'absolute', width:'700px', top:'1600px', zIndex:'-1', right:'0px', opacity:'0.4', transform:'rotate(40deg)' }},
];
export default function Home() {
  return (
    <>
      <Header />
       <Carousel /> 
       <GenresList />
      <div className="genreContainer">
        {/* {imageArray.map((image,i)=>(
          <img key={i} src={image.src} style={image.style} alt={`${image.src}-image`} />
        ))} */}

         {genreArray.slice(0, 3).map((genre) => (
          <GenreMovie key={genre.id} genreId={genre.id} genreText={genre.text} />
        ))}

         <GetVideo /> 

        {genreArray.slice(3, 7).map((genre) => (
          <GenreMovie key={genre.id} genreId={genre.id} genreText={genre.text} />
        ))}

        <TopMovies />
        
        {genreArray.slice(7, 10).map((genre) => (
          <GenreMovie key={genre.id} genreId={genre.id} genreText={genre.text} />
        ))}
        <span className='space'></span>
        <Footer /> 
        <BottomNav className='bottomNavigation'/>
      </div>
    </>
  );
}


