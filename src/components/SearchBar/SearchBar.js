import {
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import React from "react";

const SearchBar = (props) => {
  const {
    disabled,
    searchTerm,
    onTermUpdate,
    onSearchClick,
    imagesActive,
    videosActive,
    toggleImagesActive,
    toggleVideosActive,
  } = props;
  return (
    <Grid
      container
      item
      xs={12}
      justify="center"
      alignItems="center"
      direction="column"
    >
      <Typography variant="h5" component="b">
        NASA Search
      </Typography>
      <Grid item xs={12}>
        <TextField
          disabled={disabled}
          value={searchTerm}
          onKeyUp={(e) => e.code === "Enter" && onSearchClick()}
          onChange={(e) => onTermUpdate(e.target.value)}
          variant="outlined"
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton onClick={onSearchClick}>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid>
        <FormControlLabel
          control={
            <Checkbox
              disabled={disabled}
              checked={videosActive}
              onChange={toggleVideosActive}
              name="video"
              color="primary"
            />
          }
          label="Video"
        />
        <FormControlLabel
          control={
            <Checkbox
              disabled={disabled}
              checked={imagesActive}
              onChange={toggleImagesActive}
              name="image"
              color="primary"
            />
          }
          label="Image"
        />
      </Grid>
    </Grid>
  );
};

export default SearchBar;
