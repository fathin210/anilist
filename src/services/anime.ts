import { GET_ANIME_BY_ID, GET_ANIME_LIST } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { DetailAnimeData, ListAnimeData } from '../interfaces';

export const fetchAnimeList = (page: number = 1) => {
  const { data, loading, error } = useQuery(GET_ANIME_LIST, {
    variables: { page },
  });

  return { data : data as ListAnimeData, loading, error };
};

export const fetchAnimeById = (id: string | undefined) => {
  const { data, loading, error } = useQuery(GET_ANIME_BY_ID, {
    variables: { id },
  });

  return { data: data as DetailAnimeData, loading, error };
}
