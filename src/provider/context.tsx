import * as React from "react";
import { CollectionContextType, ICollection } from "./type";
import { Media } from "../interfaces";

export const CollectionContext = React.createContext<CollectionContextType | null>(null);

const COLLECTION_STORAGE_KEY = 'collectionData';

const CollectionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [collection, setCollection] = React.useState<ICollection[]>([])

    React.useEffect(() => {
        const storedCollectionData = localStorage.getItem(COLLECTION_STORAGE_KEY)
        if (storedCollectionData) {
            setCollection(JSON.parse(storedCollectionData))
        }
    }, [])

    const forceUpdateCollection = () => {
        const storedCollectionData = localStorage.getItem(COLLECTION_STORAGE_KEY)
        if (storedCollectionData) {
            setCollection(JSON.parse(storedCollectionData))
        }
    }

    const saveCollection = (collection: ICollection) => {
        setCollection((prev) => {
            const newCollection: ICollection = {
                id: collection.id,
                collection_name: collection.collection_name,
                anime_list: collection.anime_list,
            };
            const updatedCollection = [...prev, newCollection];
            localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(updatedCollection));
            return updatedCollection;
        });
        forceUpdateCollection()
    }

    const saveToExistingCollection = (addedCollection: ICollection[], media: Media) => {
        const updatedCollection = collection.map((item) => {
            if (addedCollection.some((addCollectionItem) => addCollectionItem.collection_name === item.collection_name)) {
                return {
                    ...item,
                    anime_list: [...item.anime_list!, media]
                }
            }
            return item;
        })
        localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(updatedCollection))
        forceUpdateCollection()
    }

    const deleteAnimeFromExistingCollection = (nameCollection: string, animeId: number) => {
        const updatedCollection = collection.map((item) => {
            if (nameCollection.includes(item.collection_name)) {
                return {
                    ...item,
                    anime_list: item.anime_list?.filter((item) => item.id !== animeId)
                }
            }
            return item;
        })
        localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(updatedCollection))
        forceUpdateCollection()
    }

    const editCollectionName = (collectionName: string, collectionId: number) => {
        const updatedCollection = collection.map((item) => {
            if (item.id === collectionId) {
                return {
                    ...item,
                    collection_name: collectionName
                }
            }
            return item;
        })
        localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(updatedCollection))
        forceUpdateCollection()
    }

    const deleteCollection = (collectionId: number) => {
        const updatedCollection = collection.filter((item) => item.id !== collectionId)
        localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(updatedCollection))
        forceUpdateCollection()
    }

    return <CollectionContext.Provider value={{ collection, saveCollection, saveToExistingCollection, deleteAnimeFromExistingCollection, editCollectionName, deleteCollection, forceUpdateCollection }} >{children}</CollectionContext.Provider>
}

export default CollectionProvider