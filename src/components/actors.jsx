import { useEffect, useState } from "react";
import "../styles/App.scss";
function ActorsCrew({ filmId }) {
  const token = process.env.REACT_APP_TMDB_TOKEN;
  const [people, setPeople] = useState([]);
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    const fetchData = async () => {
      try {
        const responce = await fetch(
          `https://api.themoviedb.org/3/movie/${filmId}/credits?language=en-US`,
          options
        );
        const peopleData =await responce.json();
        setPeople(peopleData.cast);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData()
  }, [filmId]);
  return <>{people.length > 0 && <RenderActors crew={people} />}</>;
}

function RenderActors({ crew }) {
  return (
    <div
      className="crew_container"
      style={{ marginTop: "100px", position: "relative" }}
    >
      <h4 className="crew_title" style={{ color: "white", fontSize: "25px" }}>
        Actors
      </h4>
      <p
        className="showMore_actorsBtn"
        style={{ position: "absolute", top: 0, right: 0, color: "var(--gray)" }}
      >
        Show More
      </p>
      <div
        className="crew_container_actors"
        style={{ display: "flex", gap: "15px" }}
      >
        {crew.slice(0, 9).map((person) => (
          <div className="crew_actor_info" key={person.cast_id}>
            <img
              src={person.profile_path==null? 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png' : `https://image.tmdb.org/t/p/original/${person.profile_path}`}
              style={{
                borderRadius: "50%",
                width: "121px",
                height: "121px",
                objectFit: "cover",
              }}
            />
            <p className="person_Name" style={{ color: "white" }}>
              {person.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ActorsCrew;
