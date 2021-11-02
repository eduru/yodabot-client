/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import axios from "axios";
import * as GQLData from "../GraphQLdata";

const useSwapi = () => {
  const [characters, setCharacters] = useState([]);
  const [films, setFilms] = useState([]);

  const fetchCharacters = async () => {
    const res = await axios.post(GQLData.GRAPHQL_API, {
      query: GQLData.GET_PEOPLE_QUERY,
    });
    const people = res.data.data.allPeople.people;
    for (let person of people) {
      setCharacters((list) => [...list, person.name]);
    }
  };
  const fetchFilms = async () => {
    const res = await axios.post(GQLData.GRAPHQL_API, {
      query: GQLData.GET_FILMS_QUERY,
    });
    const movies = res.data.data.allFilms.films;
    for (let movie of movies) {
      setFilms((list) => [...list, movie.title]);
    }
  };

  // useEffect(() => {
  //   fetchCharacters();
  //   fetchFilms();
  // }, []);
  return { fetchCharacters, fetchFilms, characters, films };
};

export default useSwapi;
