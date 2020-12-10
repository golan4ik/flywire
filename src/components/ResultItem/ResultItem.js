import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width: "56.25%",
    cursor: "pointer",
    position: "relative",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
    backgroundSize: "cover",
  },
  play: {
    backgroundImage: 'url("./images/play.png")',
    backgroundSize: "30%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
}));

const getThumbnail = (item) => {
  return item.links.find((link) => link.rel === "preview")?.href;
};

const isVideo = (item) => item.data[0].media_type === "video";

const ResultItem = (props) => {
  const classes = useStyles();
  const { item, onItemClick } = props;

  return (
    <Grid container item xs={12} sm={6} md={4} lg={2}>
      <Card className={classes.root} onClick={() => onItemClick(item)}>
        <CardMedia
          className={classes.media}
          image={getThumbnail(item)}
          title="ResultItem"
        />
        {isVideo(item) && <Grid className={classes.play}></Grid>}
      </Card>
    </Grid>
  );
};

export default ResultItem;
