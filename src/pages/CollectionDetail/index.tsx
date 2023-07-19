import styled from "@emotion/styled";
import { Button, Card, Grid, Modal } from "../../components";
import { useContext, useEffect, useState } from "react";
import { CollectionContext } from "../../provider/context";
import { CollectionContextType, ICollection } from "../../provider/type";
import { useNavigate, useParams } from "react-router-dom";
import useModal from "../../customHooks/useModal";
import { Media } from "../../interfaces";

const CollectionDetailWrapper = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: auto;
`

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`

const Title = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 16px;
  @media (min-width: 576px){
      font-size: 24px;
  }
`;

const Subtitle = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
  font-weight: 500;
  @media (min-width: 576px) {
    font-size: 20px;
  }
`;

const Center = styled.div`
  margin: auto;
`

const InputPage = styled.input`
  padding: 10px;
  margin-bottom: 10px;
`

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const ErrorMessage = styled.span`
  font-size: 12px;
  color: red;
`

const CollectionDetail: React.FC = () => {
    const { collection, deleteAnimeFromExistingCollection, editCollectionName, forceUpdateCollection } = useContext(CollectionContext) as CollectionContextType
    const { collectionId } = useParams()
    const [detailCollection, setDetailCollection] = useState<ICollection>()
    const [animeDeleteData, setAnimeDeleteData] = useState<Media>()
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [editForm, setEditForm] = useState<string>("")
    const [isError, setIsError] = useState<boolean>(false)

    const navigate = useNavigate()
    const { isOpen, openModal, closeModal } = useModal()

    const handleNavigate = (id: string | number) => {
        navigate(`/detail/${id}`)
    }

    const handleDeleteAnime = (collectionName: string, animeId: number) => {
        deleteAnimeFromExistingCollection(collectionName, animeId)
        setDetailCollection({
            ...detailCollection!,
            anime_list: detailCollection?.anime_list?.filter((item) => item.id !== animeDeleteData?.id)
        })
        handleCloseModal()
    }

    const handleOpenDeleteModal = (dataAnime: Media) => {
        setAnimeDeleteData(dataAnime)
        setIsEdit(false)
        openModal()
    }

    const handleOpenEditModal = () => {
        setIsEdit(true)
        openModal()
    }

    const handleCloseModal = () => {
        setAnimeDeleteData(undefined)
        setIsEdit(false)
        setEditForm("")
        closeModal()
    }

    const handleChangeEdit = (event: React.FormEvent<HTMLInputElement>) => {
        setEditForm(event.currentTarget.value)
        setIsError(false)
    }

    const handleSubmitEdit = (event: React.FormEvent) => {
        event.preventDefault()
        if (collection.some((_) => _.collection_name === editForm)) {
            setIsError(true)
        } else {
            setDetailCollection({
                ...detailCollection!,
                collection_name: editForm
            })
            editCollectionName(editForm, detailCollection?.id!)
            handleCloseModal()
        }
    }

    useEffect(() => {
        forceUpdateCollection()
    }, [])

    useEffect(() => {
        const tempDetail = collection.find((item) => String(item.id) === collectionId)
        if (tempDetail) {
            setDetailCollection(tempDetail)
            setEditForm(tempDetail.collection_name)
        }
    }, [collection, collectionId])

    if (!detailCollection) {
        return <CollectionDetailWrapper>
            <Center><Title children="Id Collection Not Found" /></Center>
        </CollectionDetailWrapper>
    }

    return <CollectionDetailWrapper>
        <FlexWrapper>
            <Title>Collection Name : {detailCollection.collection_name}</Title>
            <FlexWrapper>
                <Button color="secondary" variant="text" onClick={handleOpenEditModal}>Edit Collection Name</Button>
            </FlexWrapper>
        </FlexWrapper>

        <Grid
            layout
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ ease: "easeOut", duration: 2 }}>
            {detailCollection.anime_list
                ?.map((item: any) => {
                    return <Card key={item.id} deleteAction handleDelete={() => handleOpenDeleteModal(item)} handleClick={() => handleNavigate(item?.id)} {...item} />;
                })}
        </Grid>
        {isOpen ? (
            <Modal isOpen={isOpen} onClose={closeModal}>
                {isEdit ? (
                    <form onSubmit={handleSubmitEdit}>
                        <ModalWrapper>
                            <Subtitle>Edit Collection Name</Subtitle>
                            <InputPage value={editForm} placeholder="Collection Name" pattern="[A-Za-z\s]+" onChange={handleChangeEdit} />
                            {isError && <ErrorMessage>Please enter a unique collection name.</ErrorMessage>}
                            <Button disabled={!editForm || isError} color="primary">Save</Button>
                        </ModalWrapper>
                    </form>
                ) : (
                    <ModalWrapper>
                        <Subtitle>Delete anime {animeDeleteData?.title.userPreferred} ?</Subtitle>
                        <FlexWrapper>
                            <Button onClick={handleCloseModal} color="black">Cancel</Button>
                            <Button color="danger" onClick={() => handleDeleteAnime(detailCollection.collection_name, animeDeleteData?.id!)}>Delete</Button>
                        </FlexWrapper>
                    </ModalWrapper>
                )}
            </Modal>
        ) : null}
    </CollectionDetailWrapper>
}

export default CollectionDetail