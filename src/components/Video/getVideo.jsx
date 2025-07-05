import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './video.scss'

export default function GetVideo() {
  const [videoKey, setVideoKey] = useState(null);
  const token=process.env.REACT_APP_TMDB_TOKEN
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responce = await fetch(
          "https://api.themoviedb.org/3/movie/1443487/videos?language=en-US",
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                `Bearer ${token}`,
            },
          }
        );
        const data =await responce.json();
        setVideoKey(data.results[0].key);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData()
  }, []);

  return <>{videoKey && <Video videoKey={videoKey} />}</>;
}

function Video({ videoKey }) {
  const navigate = useNavigate();
  const handleMouseEnter = () => {
    const iframe = document.getElementById("yt-iframe");
    if (iframe) {
      iframe.contentWindow.postMessage(
        '{"event":"command","func":"playVideo","args":""}',
        "*"
      );
    }
  };

  const handleMouseLeave = () => {
    const iframe = document.getElementById("yt-iframe");
    if (iframe) {
      iframe.contentWindow.postMessage(
        '{"event":"command","func":"pauseVideo","args":""}',
        "*"
      );
    }
  };

  return (
    <>
      <div
        className="video"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => navigate(`/film/1443487`)}
        
      >
        <iframe
          id="yt-iframe"
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoKey}?enablejsapi=1&autoplay=1&controls=0&modestbranding=0&rel=0&mute=1`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title="YouTube video player"
        />
        <div
          className="layer"
          onClick={() => navigate(`/film/1443487`)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            cursor: "pointer",
            zIndex: 10,
          }}
        ></div>
      </div>
    </>
  );
}


