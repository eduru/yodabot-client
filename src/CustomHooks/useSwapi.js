import React, { useState } from "react";
import axios from "axios";
import * as GraphqlData from "../GraphQLdata";

const useSwapi = () => {
  const [characters, setCharacters] = useState();
  const [films, setFilms] = useState();
  const fetchCharacters = async () => {
      const res = axios.post({
          GraphqlData.GRAPHQL_API,{
              query:GraphqlData.GET_FILMS_QUERY
          }
      })
  }

};

export default useSwapi;
