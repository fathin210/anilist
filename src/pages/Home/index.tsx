import { useState } from "react";
import { Button, Card, Dashed, Grid, Loader, Pagination } from "../../components";
import { fetchAnimeList } from "../../services/anime";

const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = fetchAnimeList(page);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setPage((prevPage) => prevPage - 1);

  if (loading) {
    return <Loader size="large" />
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <Grid
        layout
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ ease: "easeOut", duration: 2 }}>
        {data?.Page?.media?.map((item: any) => {
          return <Card key={item?.id} {...item} />;
        })}
      </Grid>
      <Dashed />
      <Pagination
        total={100}
        currentPage={1}
        hasNextPage={true}
        lastPage={10}
      />
      <div>
        <Button variant="">Test</Button>
        <button onClick={handlePrevPage}>Prev Page</button>
        <button onClick={handleNextPage}>Next Page</button>
      </div>
    </div>
  );
};

export default Home;
