import * as React from "react";
import { CollectionContextType, ICollection } from "./type";

export const CollectionContext = React.createContext<CollectionContextType | null>(null);

const COLLECTION_STORAGE_KEY = 'collectionData';

const CollectionProvider : React.FC<{children : React.ReactNode}> = ({children}) => {
    const [collection, setCollection] = React.useState<ICollection[]>([])

    React.useEffect(() => {
        const storedCollectionData = localStorage.getItem(COLLECTION_STORAGE_KEY)
        if(storedCollectionData) {
            setCollection(JSON.parse(storedCollectionData))
        }
    }, [])

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
    }

    return <CollectionContext.Provider value={{collection, saveCollection}} >{children}</CollectionContext.Provider>
}

export default CollectionProvider