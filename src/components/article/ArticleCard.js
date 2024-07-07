import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia';
import { Typography } from "@mui/material";
import Button from "@mui/material";
import Box from '@mui/material/Box';
import { useRouter } from "next/navigation"
import palette from '@/shared/style/theme';
import CardActionArea from '@mui/material/CardActionArea';
import { useState } from 'react';

const ArticleCard = (props) => {
  const {article } = props
  const router  = useRouter() ; 
    const handleCardChange = () => {
      router.push("article/"+article.articleId)
      }
      const palette  = ["#0077b6", "#00b4d8", "#ffbe0b", "#333333", "#777777"];   
      const getColorByArticleId = (articleId) => {
        return palette[articleId % palette.length];
      };
    return (
        <Card 
        sx={{ height: 135, display: 'flex', flexDirection: 'column', backgroundColor: getColorByArticleId(article.articleId), justifyContent: "flex-end" }}
      > 
        <Box 
        sx={
          {
            //backgroundImage: `url(${CoverImage.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "100%",
            justifyContent:"center",
            width:"100%",height:"60%",
            paddingBottom:7
          }
        }></Box>
        
        <CardActionArea onClick={() => handleCardChange()}>

          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2" style={{ color: "#fff6f6 ", fontWeight: "bold" }} align="center">
              {article.title}
            </Typography>
            <Typography style={{ color: "white" }}>
              {article.content ? article.content.substring(0, 150) + "..." : " No content"}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

    );
}

export default ArticleCard ;