"use client";
import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useGetArticleById } from "../../../hooks/articles/useGetArticleById";
import { Typography } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import InputAdornment from "@mui/material/InputAdornment";
import Avatar from "@mui/material/Avatar";
import { useForm } from "react-hook-form";
import { useComment } from "../../../hooks/comment/useComment";
import { useGetUser } from "../../../hooks/authentification/useGetUser";
import pdpImage from "../../../res/defaultUserPdp.png";
import Navbar from "../../../components/Navbar";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {
  mixWithAnotherColor,
  decreaseBrightness,
  increaseBrightness,
  addTransparency,
} from "../../../shared/style/ColorDegreesGenerator";

export default function Article({ params }) {
  const { id } = params;
  
  return (
    <>
     <Navbar /> 
      <ArticlePageContent id={id} />
    </>
  );
}

function ArticlePageContent(props) {
  {
    const defaultTheme = createTheme();
    const { id } = props;

    const palette = ["#0077b6", "#00b4d8", "#ffbe0b", "#333333", "#777777"];

    const { register, handleSubmit, reset } = useForm();
    const { comment } = useComment();
    const { user } = useGetUser();

    const getColorByArticleId = (id) => {
      return palette[id % palette.length];
    };
    const { article, isError, isLoading } = useGetArticleById(id);

    const onSubmit = (data) => {
      let commentData = {};
      commentData.commentContent = data.commentContent;
      commentData.user = user;
      commentData.article = { articleId: id };
      comment(commentData);
      article.comments.push(commentData);
      reset();
    };
    const increaseBrightnessColor = increaseBrightness(getColorByArticleId(id));
    const decreaseBrightnessColor = decreaseBrightness(getColorByArticleId(id));
    const addTransparencyColor = addTransparency(getColorByArticleId(id));
    const mixWithAnotherColorColor = mixWithAnotherColor(
      getColorByArticleId(id)
    );

    if (isError) return <Typography>Cant get Article , Try Later </Typography>;
    if (isLoading) return <Typography>Loading ...</Typography>;
    if (article)
      return (
        <ThemeProvider theme={defaultTheme}>
          <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Navbar />
            <Container
              sx={{
                justifyContent: "center",
                marginTop: 12,
                borderRadius: "8px",
              }}
            >
              <Grid
                container
                direction="row"
                sx={{ minHeight: 600, borderRadius: 20 }}
              >
                <Grid
                  item
                  xs={8}
                  sx={{ backgroundColor: increaseBrightnessColor }}
                >
                  <Box sx={{ textAlign: "center", padding: 2 }}>
                    <Typography
                      variant="h4"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      {article.title}
                    </Typography>
                    <Typography sx={{ color: "white", marginTop: 2 }}>
                      {article.content}
                    </Typography>
                  </Box>
                </Grid>
                <Grid
                  container
                  direction="column"
                  item
                  xs={4}
                  sx={{ backgroundColor: addTransparencyColor }}
                >
                  <Grid
                    container
                    item
                    xs={11}
                    sx={{ backgroundColor: addTransparencyColor }}
                  >
                    <List
                      item
                      sx={{
                        marginTop: 0,
                        width: "100%",
                        backgroundColor: addTransparencyColor,
                        maxHeight: 550,
                        overflow: "auto",
                      }}
                    >
                      {article.comments.sort((a, b) => a.commentId - b.commentId).map((commentaire) => (
                        <>
                          <ListItem
                            alignItems="flex-start"
                            key={commentaire.commentId}
                          >
                            <ListItemAvatar>
                              <Avatar
                                alt={commentaire.user.firstName}
                                src={pdpImage.src}
                              />
                            </ListItemAvatar>
                            <ListItemText
                              primaryTypographyProps={{
                                sx: { color: "white" },
                              }}
                              secondaryTypographyProps={{
                                sx: { color: "white" },
                              }}
                              id={commentaire.commentId}
                              primary={
                                commentaire.user.firstName +
                                " " +
                                commentaire.user.lastName
                              }
                              secondary={
                                <React.Fragment>
                                  {commentaire.commentContent}
                                </React.Fragment>
                              }
                            />
                          </ListItem>
                          <Divider variant="inset" component="li" />
                        </>
                      ))}
                    </List>
                  </Grid>
                  <Grid
                    item
                    xs={1}
                    sx={{ backgroundColor: addTransparencyColor }}
                  >
                    <Box
                      onSubmit={handleSubmit(onSubmit)}
                      component="form"
                      style={{ justifyContent: "start", paddingLeft: 10 }}
                    >
                      <TextField
                        xs={8}
                        id="commentContent"
                        color="info"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              sx={{ color: "white" }}
                            >
                              <AccountCircle />
                            </InputAdornment>
                          ),
                          sx: {
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: "none",
                            },
                            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                              border: "none",
                            },
                            color: "white",
                          },
                        }}
                        sx={{
                          height: 5,
                          marginBottom: 2,
                          input: { color: "white" },
                        }}
                        {...register("commentContent")}
                      />

                      <Button
                        item
                        type="submit"
                        xs={2}
                        style={{
                          width: "17%",
                          height: "70%",
                          marginLeft: 7,
                          marginTop: 7,
                          backgroundColor: decreaseBrightnessColor,
                        }}
                        variant="contained"
                        endIcon={<SendIcon />}
                        size="large"
                      >
                        {" "}
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </Box>
        </ThemeProvider>
      );
  }
}
