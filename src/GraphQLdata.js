export const GRAPHQL_API =
  "https://inbenta-graphql-swapi-prod.herokuapp.com/api";

export const GET_FILMS_QUERY = `{
  allFilms(first: 6) {
    films {
      title
    }
  }
}`;

export const GET_PEOPLE_QUERY = `{
  allPeople(first: 7) {
    people {
      name
    }
  }
}
`;
