import { useState } from "react";
import { Card, Dashed, Grid, Loader, Pagination } from "../../components";
import { fetchAnimeList } from "../../services/anime";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const HomeWrapper = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: auto;
`

const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.p`
  margin: 0;
  font-weight: bold;
  font-size: 14px;
  @media (min-width: 576px){
      font-size: 24px;
  }
`;

const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = fetchAnimeList(page);

  const handleNextPage = () => {
    scrollTo(0, 0)
    setPage((prevPage) => prevPage + 1);
  }

  const handlePrevPage = () => {
    scrollTo(0, 0)
    setPage((prevPage) => prevPage - 1)
  };

  const handleSelectedPage = (selectedPage: number) => {
    scrollTo(0, 0)
    setPage(selectedPage)
  }

  const navigate = useNavigate()

  const handleNavigate = (id: string | number) => {
    navigate(`/detail/${id}`)
  }

  if (loading) {
    return <Loader size="large" />
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <HomeWrapper>
      <FlexWrapper>
        <Title>Here's are some anime list</Title>
      </FlexWrapper>
      <Grid
        layout
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ ease: "easeOut", duration: 2 }}>
        {data?.Page?.media?.map((item: any) => {
          return <Card key={item.id} handleClick={() => handleNavigate(item?.id)} {...item} />;
        })}
      </Grid>
      <Dashed />
      <Pagination
        total={100}
        currentPage={page}
        hasNextPage={true}
        lastPage={data?.Page?.pageInfo?.lastPage}
        handleNextPage={handleNextPage}
        handlePrevPage={handlePrevPage}
        handleSelectedPage={handleSelectedPage}
      />
    </HomeWrapper>
  );
};

export default Home;
