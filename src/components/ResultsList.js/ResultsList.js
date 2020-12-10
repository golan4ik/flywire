import { Grid } from "@material-ui/core";
import React from "react";
import ResultItem from "../ResultItem/ResultItem";

const ResultsList = (props) => {
  const { items, onResultClick } = props;
  return (
    <Grid container spacing={2}>
      {items.map((item, idx) => {
        return <ResultItem key={idx} item={item} onItemClick={onResultClick} />;
      })}
    </Grid>
  );
};

export default ResultsList;
