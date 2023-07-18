import { Media } from "../interfaces";

export interface ICollection {
    id: number;
    collection_name: string;
    anime_list: Media[]
}

export type CollectionContextType = {
    collection: ICollection[],
    saveCollection: (collection: ICollection) => void
}