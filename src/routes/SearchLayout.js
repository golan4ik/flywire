import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import { useContext } from "react";
import { withRouter } from "react-router-dom";
import ResultsList from "../components/ResultsList.js/ResultsList";
import SearchBar from "../components/SearchBar/SearchBar";
import { ResultsContext } from "../Context";

const SearchLayout = (props) => {
  const {
    results,
    setResults,
    searchTerm,
    setSearchTerm,
    imagesActive,
    setImagesActive,
    videosActive,
    setVideosActive,
  } = useContext(ResultsContext);
  const [searching, setSearching] = useState(false);

  let url = `https://images-api.nasa.gov/search?q=${searchTerm}`;
  let media_type = "";

  if (imagesActive || videosActive) {
    if (imagesActive) {
      media_type = `image`;
    }
    if (videosActive) {
      media_type = `video`;
      if (imagesActive) {
        media_type += ",image";
      }
    }
  } else {
    media_type = "image,video";
  }

  url = media_type ? url + `&media_type=${media_type}` : url;

  const onSearchClick = () => {
    if (!searchTerm) return;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setResults(data.collection?.items || []));
  };

  const onTermUpdate = (term) => {
    setSearchTerm(term);
  };

  const onResultClick = (item) => {
    props.history.push(`asset/${item.data[0].nasa_id}`);
  };

  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      xs={12}
    >
      <SearchBar
        disabled={searching}
        imagesActive={imagesActive}
        videosActive={videosActive}
        toggleImagesActive={() => setImagesActive((value) => !value)}
        toggleVideosActive={() => setVideosActive((value) => !value)}
        searchTerm={searchTerm}
        onSearchClick={onSearchClick}
        onTermUpdate={onTermUpdate}
      />
      <ResultsList items={results} onResultClick={onResultClick} />
    </Grid>
  );
};

export default withRouter(SearchLayout);
