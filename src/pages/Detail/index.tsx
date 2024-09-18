import { useNavigate, useParams } from "react-router-dom"
import { fetchAnimeById } from "../../services/anime"
import { Button, Dashed, Loader, Modal, MultiAutocomplete } from "../../components"
import styled from "@emotion/styled"
import useModal from "../../customHooks/useModal"
import { useContext, useEffect, useState } from 'react';
import { CollectionContext } from '../../provider/context';
import { CollectionContextType, ICollection } from "../../provider/type"

const DetailWrapper = styled.div`
    display: flex;
    width: 100%;
    max-width: 1024px;
    flex-direction: column;
    margin: auto;
`

const AnimeDetailWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    margin: auto;
    @media (min-width: 769px) {
        flex-direction: row;
        justify-content: space-between;
    }
`

const CoverImage = styled.img`
    min-width: 160px;
    min-height: 230px;
    max-width: 200px;
    border-radius: 10px;
`;

const Title = styled.h1`
  font-size: 16px;
  margin-bottom: 20px;
  text-align: center;
  @media (min-width: 576px) {
    font-size: 24px;
  }
`;

const Subtitle = styled.h1`
  font-size: 14px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 500;
  @media (min-width: 576px) {
    font-size: 20px;
  }
`;

const GenresWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`


const GenresChip = styled.span`
  padding: 8px;
  font-size: 10px;
  font-weight: bold;
  background: ${(props) => props.theme.colors.accent};
  border-radius: 10px;
  @media (min-width: 768px) {
    font-size: 12px;
  }
`

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 50%
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const Label = styled.span`
  font-weight: bold;
  margin-right: 8px;
  font-size: 13px;
  flex: 1;
  border-right: 1px solid ${(props) => props.theme.colors.white};
`;

const Value = styled.span`
  font-size: 13px;
  flex: 1;
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 250px;
`

const ModalLabel = styled.span`
    font-weight: bold;
    margin-right: 8px;
    font-size: 13px;
    flex: 1;
`;

const ErrorMessage = styled.span`
  font-size: 12px;
  color: red;
`

const CollectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const Center = styled.div`
  margin: auto;
`

const CollectionItem = styled.div`
  padding: 1rem;
  border: 1px solid white;
  border-radius: 10px;
  margin-bottom: 10px;
  cursor: pointer;
`

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
`

const CoverTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const initialState = {
    collection_name: ""
}

const Detail: React.FC = () => {
    const { detailId } = useParams()
    const { data, loading, error } = fetchAnimeById(detailId)
    const { isOpen, closeModal, openModal } = useModal()
    const [form, setForm] = useState(initialState)
    const [collectionsWithAnime, setCollectionsWithAnime] = useState<ICollection[]>([])

    const { collection, saveCollection, saveToExistingCollection, forceUpdateCollection } = useContext(CollectionContext) as CollectionContextType
    const [isError, setIsError] = useState<boolean>(false)
    const [existingCollection, setExistingCollection] = useState<ICollection[]>([])
    const navigation = useNavigate()

    useEffect(() => {
        forceUpdateCollection()
    }, [])

    useEffect(() => {
        setCollectionsWithAnime(collection.filter((collectionItem) => collectionItem.anime_list?.some((anime) => anime.id === data?.Media?.id)))
    }, [data, collection])

    useEffect(() => {
        if (!isOpen) {
            setForm(initialState)
            setIsError(false)
            setExistingCollection([])
        }
    }, [isOpen])

    const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
        const { value, name } = event.currentTarget
        setForm({
            ...form,
            [name]: value
        })
        setIsError(false)
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        if (collection.some((_) => _.collection_name === form.collection_name)) {
            setIsError(true)
        } else {
            if (form.collection_name) {
                saveCollection({
                    id: Date.now(),
                    collection_name: form.collection_name,
                    anime_list: [data?.Media]
                })
            }
            if (existingCollection.length > 0) {
                saveToExistingCollection(existingCollection, data?.Media);
                existingCollection.map((item) => {
                    setCollectionsWithAnime([...collectionsWithAnime, {
                        ...item,
                        anime_list: [...item.anime_list!, data?.Media]
                    }])
                })
            }
            closeModal()
        }
    }

    const handleAddToExisting = (event: React.FormEvent<HTMLSelectElement>) => {
        const findCollection = collection.find((item) => item.collection_name === event.currentTarget.value)
        setExistingCollection((prev) => [...prev, findCollection!])
    }

    const handleRemove = (data: string) => {
        setExistingCollection(existingCollection.filter((_) => _.collection_name !== data))
    }

    const handleNavigation = (collectionId: number) => {
        navigation(`/collection/${collectionId}`)
    }


    if (loading) {
        return <Loader size="large" />
    }

    if (error) {
        return <div>Error</div>;
    }

    return (
        <DetailWrapper>
            <AnimeDetailWrapper>
                <CoverTitleWrapper>
                    <CoverImage src={data?.Media?.coverImage?.large} />
                    <Title>{data?.Media?.title?.userPreferred}</Title>
                </CoverTitleWrapper>
                <DetailContainer>
                    <GenresWrapper>
                        {data?.Media?.genres?.map((item, index) => <GenresChip key={index} children={item} />)}
                    </GenresWrapper>
                    <Row>
                        <Label>Japanese</Label>
                        <Value>{data?.Media?.title?.native}</Value>
                    </Row>
                    <Row>
                        <Label>English</Label>
                        <Value>{data?.Media?.title?.english}</Value>
                    </Row>
                    <Row>
                        <Label>Total Episodes</Label>
                        <Value>{data?.Media?.episodes}</Value>
                    </Row>
                    <Row>
                        <Label>Type</Label>
                        <Value>{data?.Media?.type}</Value>
                    </Row>
                    <Row>
                        <Label>Source</Label>
                        <Value>{data?.Media?.source}</Value>
                    </Row>
                    <Row>
                        <Label>Season</Label>
                        <Value>{data?.Media?.season} {data?.Media?.seasonYear}</Value>
                    </Row>
                    <Row>
                        <Label>Status</Label>
                        <Value>{data?.Media?.status}</Value>
                    </Row>
                    <Button variant="contained" onClick={openModal}>Add To Collection</Button>
                </DetailContainer>
            </AnimeDetailWrapper>
            <CollectionWrapper>
                <Dashed />
                <Title>Collections where this anime already includes</Title>
                {collectionsWithAnime.length > 0 ? (
                    collectionsWithAnime.map((item) => <CollectionItem key={item.id} onClick={() => handleNavigation(item.id)}>{item.collection_name}</CollectionItem>)
                ) : (
                    <Center>
                        <Subtitle as="h2">
                            Not found
                        </Subtitle>
                    </Center>
                )}
            </CollectionWrapper>
            {isOpen ? (
                <Modal isOpen={isOpen} onClose={closeModal}>
                    <form onSubmit={handleSubmit}>
                        <ModalWrapper>
                            <ModalLabel>You can add a new collection name</ModalLabel>
                            <Input autoComplete="off" type="text" name="collection_name" pattern="[A-Za-z\s]+" onChange={handleChange} />
                            {isError && <ErrorMessage>Please enter a unique collection name.</ErrorMessage>}
                            <ModalLabel>Or select from existing collection</ModalLabel>
                            <MultiAutocomplete collectionsWithAnime={collectionsWithAnime} existingCollection={existingCollection} handleAddToExisting={handleAddToExisting} handleRemove={handleRemove} />
                            <Button disabled={(existingCollection.length === 0 && !form.collection_name) || isError}>simpan</Button>
                        </ModalWrapper>
                    </form>
                </Modal>
            ) : null}
        </DetailWrapper>
    )
}

export default Detail