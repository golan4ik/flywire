import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%",
    backgroundSize: "cover",
  },
}));

const MediaLayout = (props) => {
  const [loading, setLoading] = useState(false);
  const [link, setLink] = useState(null);
  const [meta, setMeta] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    setLoading(true);
    Promise.all([getMediaLinks(), getItemMeta()]).then(([links, meta]) => {
      setLink(links[0].replace('http://', 'https://'));
      setMeta(meta);
      setLoading(false);
    });
  }, []);

  const isImage = () => link?.split(".").pop() === "jpg";
  const isVideo = () => link?.split(".").pop() === "mp4";

  const getItemMeta = () => {
    return fetch(
      `https://images-assets.nasa.gov/image/${props.id}/metadata.json`
    )
      .then((res) => res.json())
      .catch(() =>
        fetch(
          `https://images-assets.nasa.gov/video/${props.id}/metadata.json`
        ).then((res) => res.json())
      );
  };

  const getMediaLinks = () => {
    return fetch(
      `https://images-assets.nasa.gov/image/${props.id}/collection.json`
    )
      .then((res) => res.json())
      .catch(() =>
        fetch(
          `https://images-assets.nasa.gov/video/${props.id}/collection.json`
        ).then((res) => res.json())
      );
  };

  //meta && console.log(meta["AVAIL:Title"], meta["AVAIL:Description"], link);

  return (
    <Grid container item alignItems="center" justify="center" xs={12}>
      {loading ? <Typography variant="h1">Loading</Typography> : null}
      {link && meta && (
        <Card>
          <CardHeader
            title={meta["AVAIL:Title"]}
            subheader={meta["AVAIL:Description"]}
          ></CardHeader>
          {isImage() && <CardMedia image={link} className={classes.media} />}
          {isVideo() && (
            <CardContent>
              <iframe
                title="asset_video"
                src={link.replace('http', 'https')}
                width="640"
                height="370"
                scrolling="no"
                frameBorder="0"
              ></iframe>
            </CardContent>
          )}
        </Card>
      )}
    </Grid>
  );
};

export default withRouter(MediaLayout);
