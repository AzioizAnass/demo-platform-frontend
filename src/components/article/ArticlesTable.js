import { useState,useEffect  } from "react";
import { useGetArticlesPage } from "../../hooks/articles/useGetArticlesPage";
import ArticleCard from "./ArticleCard";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { Box } from "@mui/material";
import debounce from 'lodash/debounce';
import TextField from '@mui/material/TextField';


const ArticlesTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [pageSize] = useState(9);

  const { articlePage, isError, isLoading } = useGetArticlesPage(
    pageSize,
    currentPage,
    debouncedSearchQuery
  );

  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(() => {
    const debounceSearch = debounce(setDebouncedSearchQuery, 300);
    debounceSearch(searchQuery);
    return () => {
      debounceSearch.cancel();
    };
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  if (isError) return <Typography>Cant Get Articles</Typography>;
  if (isLoading) return <Typography>Loading...</Typography>;
  if (articlePage)
    return (
      <Container sx={{ paddingTop: 1, paddingBottom: 5 }} maxWidth="md">
        <TextField
          sx={{ marginBottom: 3 }}
          fullWidth
          label="Search"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Grid container spacing={4}>
          {articlePage.content?.map((article, articleId) => (
            <Grid item key={articleId} xs={12} sm={6} md={4}>
              <ArticleCard article={article} />
            </Grid>
          ))}
        </Grid>
        <Pagination
          sx={{
            display: "flex",
            justifyContent: "center",
            padding: "16px",
            "& .MuiPaginationItem-root": {
              color: "#0078D7",
            },
            "& .Mui-selected": {
              backgroundColor: "#0078D7",
              color: "white !important",
            },
            "& .MuiPaginationItem-ellipsis": {
              color: "#0078D7",
            },
            "& .MuiPaginationItem-page:hover": {
              backgroundColor: "#0078D7",
              opacity: 0.8,
              color: "white",
            },
          }}
          count={articlePage.totalPages}
          page={articlePage.pageable.pageNumber + 1}
          onChange={handleChange}
          color="secondary"
        />
      </Container>
    );
};

export default ArticlesTable;
