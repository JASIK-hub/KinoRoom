import { useParams } from 'react-router-dom';
import { useEffect, useReducer, useCallback } from 'react';

import Header from '../components/Header/Header';
import StarRating from '../smallElems/rating';
import RecommendMovie from '../components/recommendMovie';
import ActorsCrew from '../components/actors';
import Reviews from '../smallElems/reviews';
import Footer from '../components/Footer/footer';
import '../styles/filmPage.scss';

const initialState = {
  details: null,
  video: [],
  cast: [],
  images: [],
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_DETAILS':
      return { ...state, details: action.payload };
    case 'SET_VIDEO':
      return { ...state, video: action.payload };
    case 'SET_CAST':
      return { ...state, cast: action.payload };
    case 'SET_IMAGES':
      return { ...state, images: action.payload };
    default:
      return state;
  }
}

function FilmPage() {
  const { id } = useParams();
  const token = process.env.REACT_APP_TMDB_TOKEN;
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchAllData = useCallback(async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const [detailsRes, videoRes, creditsRes, imagesRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options),
        fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options),
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options),
        fetch(`https://api.themoviedb.org/3/movie/${id}/images`, options),
      ]);

      const detailsData = await detailsRes.json();
      const videoData = await videoRes.json();
      const peopleData = await creditsRes.json();
      const imagesData = await imagesRes.json();

      dispatch({ type: 'SET_DETAILS', payload: detailsData });
      dispatch({ type: 'SET_VIDEO', payload: videoData.results });
      dispatch({ type: 'SET_CAST', payload: peopleData.cast });
      dispatch({ type: 'SET_IMAGES', payload: imagesData.backdrops });
    } catch (error) {
      console.log(error);
    }
  }, [id, token]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const { details, video, cast, images } = state;

  return (
    <>
      {details && video.length > 0 && cast.length > 0 && (
        <RenderPage
          filmDetails={details}
          filmVideo={video[0]}
          cast={cast}
          images={images}
        />
      )}
    </>
  );
}

function RenderPage({ filmDetails, filmVideo, cast, images }) {
  const getRatingStyle = () => {
    const rating = filmDetails.vote_average;
    if (rating >= 7) return { backgroundColor: 'green' };
    if (rating >= 5) return { backgroundColor: 'orange' };
    return { backgroundColor: 'red' };
  };

  const topActors = cast.filter(actor => actor.order < 3);
  const recentImages = images.slice(-4);

  return (
    <>
      <Header />
      <div style={{ width: '1216px', position: 'relative', margin: '30px auto', display: 'flex', alignItems: 'center' }}>
        <div className='filmDetails'>
          <div className='upperSideDescription'>
            <h1>{filmDetails.title}</h1>
            <div className='shortInfo'>
              <p className='IMDB' style={getRatingStyle()}>{filmDetails.vote_average.toFixed(1)}</p>
              <p className='releaseDate'>{filmDetails.release_date.slice(0, 4)}</p>
              <p className='Genre'>{filmDetails.genres[0]?.name}</p>
              <p className='runTime'>{`${Math.floor(filmDetails.runtime / 60)}h ${filmDetails.runtime % 60}min`}</p>
              <p className='ageRating'>{filmDetails.adult === 'true' ? '18+' : '16+'}</p>
            </div>
          </div>
          <div className='lowerSideDescription'>
            <h4 className='shortDescription'>{filmDetails.overview.length > 300 ? `${filmDetails.overview.slice(0, 300)}...` : filmDetails.overview}</h4>
            <div className='Actors'>
              <p style={{ color: 'gray' }}>Actors:</p>
              {topActors.map(actor => (
                <p key={actor.id}>{actor.name}</p>
              ))}
            </div>
            <div className='imagesContainer'>
              {recentImages.map(image => (
                <img key={image.file_path} src={`https://image.tmdb.org/t/p/original/${image.file_path}`} alt='' />
              ))}
            </div>
          </div>
        </div>
        <div className='filmDisplay'>
          <iframe
            width='1216'
            height='684'
            src={`https://www.youtube.com/embed/${filmVideo.key}?autoplay=1&controls=0&modestbranding=1&rel=0&showinfo=0&mute=1&loop=1&playlist=${filmVideo.key}&cc_load_policy=0`}
            title='Video player'
            frameBorder='0'
            allow='autoplay; encrypted-media'
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className='film_container_main'>
        <h3 className='Description_title_text'>About</h3>
        <hr />
        <div className='film_container_inner'>
          <div className='film_container_main_left'>
            <p className='Description_body_text'>{filmDetails.overview}</p>
          </div>
          <div className='film_container_main_right'>
            <StarRating />
          </div>
        </div>
      </div>
      <div className='film_container_recomendation' style={{ width: '1216px', margin: '0 auto' }}>
        <RecommendMovie genreId={filmDetails.id} />
        <ActorsCrew filmId={filmDetails.id} />
        <Reviews id={filmDetails.id} />
      </div>
      <Footer />
    </>
  );
}

export default FilmPage;
