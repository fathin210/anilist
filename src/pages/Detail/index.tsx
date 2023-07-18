import { useParams } from "react-router-dom"
import { fetchAnimeById } from "../../services/anime"
import { Button, Loader, Modal, MultiAutocomplete } from "../../components"
import styled from "@emotion/styled"
import useModal from "../../customHooks/useModal"
import { useContext, useState } from 'react';
import { CollectionContext } from '../../provider/context';
import { CollectionContextType } from "../../provider/type"

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    justify-content: space-between;
`

const CoverImage = styled.img`
    min-width: 168px;
    min-height: 238px;
`;

const Title = styled.h1`
  font-size: 16px;
  margin-bottom: 20px;
  text-align: center;
  @media (min-width: 576px) {
    font-size: 24px;
  }
`;

const GenresWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`


const GenresChip = styled.span`
  padding: 5px;
  font-size: 8px;
  background: ${(props) => props.theme.colors.accent};
  border-radius: 10px;
`

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
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

const Detail: React.FC = () => {
    const { detailId } = useParams()
    const { data, loading, error } = fetchAnimeById(detailId)
    const { isOpen, closeModal, openModal } = useModal()
    const [form, setForm] = useState({
        collection_name: ""
    })

    const { collection, saveCollection } = useContext(CollectionContext) as CollectionContextType
    console.log("🚀 ~ file: index.tsx:81 ~ collection:", collection)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        saveCollection({
            id: Date.now(),
            collection_name: form.collection_name,
            anime_list: [data?.Media]
        })
    }


    if (loading) {
        return <Loader size="large" />
    }

    if (error) {
        return <div>Error</div>;
    }

    return (
        <>
            <Wrapper>
                <CoverImage src={data?.Media?.coverImage?.large} />
                <DetailContainer>
                    <Title>{data?.Media?.title?.userPreferred}</Title>
                    <GenresWrapper>
                        {data?.Media?.genres?.map((item) => <GenresChip children={item} />)}
                    </GenresWrapper>
                    <Row>
                        <Label>Japanese</Label>
                        <Value>{data?.Media?.title?.native}</Value>
                    </Row>
                    <Row>
                        <Label>Episodes</Label>
                        <Value>{data?.Media?.episodes}</Value>
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
            </Wrapper>
            <Modal isOpen={isOpen} onClose={closeModal}>
                <form onSubmit={handleSubmit}>
                    <ModalWrapper>
                        <ModalLabel>You can add a new collection name</ModalLabel>
                        <input type="text" name="collection_name" onChange={(e) => setForm({
                            ...form,
                            collection_name: e.target.value
                        })} />
                        <ModalLabel>Or select from existing collection</ModalLabel>
                        <MultiAutocomplete/>
                        <button disabled={!form.collection_name}>simpan</button>
                    </ModalWrapper>
                </form>
            </Modal>
        </>
    )
}

export default Detail