import { GET_ANIME } from "../graphql/queries";
import { useQuery } from "@apollo/client";

export const fetchAnimeList = (page: number = 1) => {
  const { data, loading, error } = useQuery(GET_ANIME, {
    variables: { page },
  });

  return { data, loading, error };
};
