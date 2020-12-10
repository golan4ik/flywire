import { createContext, useState } from "react";

export const ResultsContext = createContext();

const ResultsContextProvider = (props) => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [imagesActive, setImagesActive] = useState(false);
  const [videosActive, setVideosActive] = useState(false);

  return (
    <ResultsContext.Provider
      value={{
        results,
        setResults,
        searchTerm,
        setSearchTerm,
        imagesActive,
        setImagesActive,
        videosActive,
        setVideosActive,
      }}
    >
      {props.children}
    </ResultsContext.Provider>
  );
};

export default ResultsContextProvider;
