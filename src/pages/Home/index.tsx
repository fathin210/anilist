import { useState } from "react";
import { Button, Card, Grid, Pagination } from "../../components";
import { fetchAnimeList } from "../../services/anime";

const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = fetchAnimeList(page);

  const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  const handlePrevPage = () => setPage((prevPage) => prevPage - 1);

  if (loading) {
    return <div>Loading....</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div>
      <Grid>
        {data?.Page?.media?.map((item: any) => {
          return <Card key={item?.id} {...item} />;
        })}
      </Grid>
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
