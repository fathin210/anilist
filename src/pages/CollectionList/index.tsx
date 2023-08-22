import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Grid, Modal } from "../../components"
import { CollectionContext } from "../../provider/context";
import { CollectionContextType, ICollection } from "../../provider/type";
import styled from "@emotion/styled";
import NoImage from "../../assets/no-image-icon.webp"
import { useNavigate } from "react-router-dom";
import useModal from "../../customHooks/useModal";
import { FaTrash, FaEdit } from 'react-icons/fa'


const CollectionListWrapper = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: auto;
`

const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
`

const Image = styled.img`
    height: 100%;
    width: 100%;
    border-radius: 10px;
    cursor: pointer;
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

const Subtitle = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
  text-align: center;
  font-weight: 500;
  @media (min-width: 576px) {
    font-size: 20px;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`

const ErrorMessage = styled.span`
  font-size: 12px;
  color: red;
`

const RelativeWrapper = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`

const ActionButtonWrapper = styled.div`
  position: absolute;
  z-index: 99;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 1rem;
`

const Title = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 14px;
  @media (min-width: 576px){
      font-size: 24px;
  }
`;

const CollectionList: React.FC = () => {
    const { collection, deleteCollection, editCollectionName, forceUpdateCollection, saveCollection } = useContext(CollectionContext) as CollectionContextType
    const navigate = useNavigate()
    const { isOpen, closeModal, openModal } = useModal()
    const [isCreate, setIsCreate] = useState<boolean>(false)
    const [isEdit, setIsEdit] = useState<boolean>(false)
    const [editForm, setEditForm] = useState<string>("")
    const [editModalData, setEditModalData] = useState<ICollection>()
    const [deleteModalData, setDeleteModalData] = useState<ICollection>()
    const [tempCollection, setTempCollection] = useState<ICollection[]>([])
    const [isError, setIsError] = useState<boolean>(false)

    useEffect(() => {
        forceUpdateCollection()
    }, [])

    useEffect(() => {
        setTempCollection(collection)
    }, [collection])

    const handleNavigate = (collectionId: number) => {
        navigate(`/collection/${collectionId}`)
    }

    const handleDeleteCollection = (collectionId: number) => {
        deleteCollection(collectionId)
        setTempCollection(tempCollection.filter((item) => item.id !== collectionId))
        handleCloseModal()
    }

    const handleDeleteModal = (selectedCollection: ICollection) => {
        setDeleteModalData(selectedCollection)
        openModal()
    }

    const handleOpenCreateCollectionModal = () => {
        setIsCreate(true)
        openModal()
    }

    const handleSubmitCreate = (event: React.FormEvent) => {
        event.preventDefault()
        if (tempCollection.some((_) => _.collection_name === editForm)) {
            setIsError(true)
        } else {
            const newObject: ICollection = {
                id: Date.now(),
                collection_name: editForm,
                anime_list: []
            }
            setTempCollection([...tempCollection, newObject])
            saveCollection(newObject)
            handleCloseModal()
        }
    }

    const handleOpenEditModal = (editCollection: ICollection) => {
        setIsEdit(true)
        setEditForm(editCollection.collection_name)
        setEditModalData(editCollection)
        openModal()
    }

    const handleCloseModal = () => {
        setIsEdit(false)
        setIsCreate(false)
        setEditForm("")
        closeModal()
    }

    const handleChangeEdit = (event: React.FormEvent<HTMLInputElement>) => {
        setEditForm(event.currentTarget.value)
        setIsError(false)
    }

    const handleSubmitEdit = (event: React.FormEvent) => {
        event.preventDefault()
        if (tempCollection.some((_) => _.collection_name === editForm)) {
            setIsError(true)
        } else {
            setTempCollection(tempCollection.map((item) => {
                if (item.id === editModalData?.id) {
                    return {
                        ...item!,
                        collection_name: editForm
                    }
                }
                return item;
            }))
            editCollectionName(editForm, editModalData?.id!)
            handleCloseModal()
        }
    }

    return (
        <CollectionListWrapper>
            <FlexWrapper>
                <Title>Here's your collection</Title>
                <FlexWrapper>
                    <Button color="secondary" variant="text" onClick={handleOpenCreateCollectionModal}>Add new collection</Button>
                </FlexWrapper>
            </FlexWrapper>
            <Grid
                layout
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ ease: "easeOut", duration: 1 }}>
                {tempCollection.map((item: ICollection) => {
                    return <CardWrapper key={item.id}>
                        {item.collection_name}
                        {item.anime_list?.length! > 0 ? (
                            <Card key={item.id} animateHover={false} deleteAction editAction handleDelete={() => handleDeleteModal(item)} handleEdit={() => handleOpenEditModal(item)} handleClick={() => handleNavigate(item.id)} {...item.anime_list?.[0]} />
                        ) : (
                            <RelativeWrapper>
                                <ActionButtonWrapper>
                                    <Button color="danger" onClick={() => handleDeleteModal(item)}><FaTrash /></Button>
                                    <Button color="primary" onClick={() => handleOpenEditModal(item)}><FaEdit /></Button>
                                </ActionButtonWrapper>
                                <Image src={NoImage} onClick={() => handleNavigate(item.id)} />
                            </RelativeWrapper>)}
                    </CardWrapper>;
                })}
            </Grid>
            {isOpen ? (
                <Modal isOpen={isOpen} onClose={handleCloseModal}>
                    {isEdit ? (
                        <form onSubmit={handleSubmitEdit}>
                            <ModalWrapper>
                                <Subtitle>Edit Collection Name</Subtitle>
                                <InputPage value={editForm} placeholder="Collection Name" pattern="[A-Za-z\s]+" onChange={handleChangeEdit} />
                                {isError && <ErrorMessage>Please enter a unique collection name.</ErrorMessage>}
                                <Button disabled={!editForm || isError} color="primary">Save</Button>
                            </ModalWrapper>
                        </form>
                    ) : isCreate ? (
                        <form onSubmit={handleSubmitCreate}>
                            <ModalWrapper>
                                <Subtitle>Add New Collection</Subtitle>
                                <InputPage value={editForm} placeholder="Collection Name" pattern="[A-Za-z\s]+" onChange={handleChangeEdit} />
                                {isError && <ErrorMessage>Please enter a unique collection name.</ErrorMessage>}
                                <Button disabled={!editForm || isError} color="primary">Save</Button>
                            </ModalWrapper>
                        </form>
                    ) : (
                        <ModalWrapper>
                            <Subtitle>Delete {deleteModalData?.collection_name} ?</Subtitle>
                            <FlexWrapper>
                                <Button onClick={handleCloseModal} color="black">Cancel</Button>
                                <Button color="danger" onClick={() => handleDeleteCollection(deleteModalData?.id!)}>Delete</Button>
                            </FlexWrapper>
                        </ModalWrapper>
                    )}
                </Modal>
            ) : null}
        </CollectionListWrapper>
    )
}

export default CollectionList