import { Media } from "../interfaces";

export interface ICollection {
    id: number;
    collection_name: string;
    anime_list?: Media[]
}

export type CollectionContextType = {
    collection: ICollection[],
    saveCollection: (collection: ICollection) => void,
    saveToExistingCollection: (addedCollection: ICollection[], media: Media) => void,
    deleteAnimeFromExistingCollection: (collectionName: string, animeId: number) => void,
    editCollectionName: (collectionName: string, collectionId: number) => void,
    deleteCollection: (collectionId: number) => void,
    forceUpdateCollection: () => void
}