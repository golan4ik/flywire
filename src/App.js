import "./App.css";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import SearchLayout from "./routes/SearchLayout";
import MediaLayout from "./routes/MediaLayout";
import ResultsContextProvider from "./Context";

function App() {
  return (
    <div className="App">
      <ResultsContextProvider>
        <Router>
          <Switch>
            <Route exact path="/search">
              {(props) => {
                return <SearchLayout />;
              }}
            </Route>
            <Route exact path="/asset/:id">
              {({ match: { params } }) => {
                return <MediaLayout id={params.id} />;
              }}
            </Route>
            <Route path="*">
              <Redirect to="/search" />
            </Route>
          </Switch>
        </Router>
      </ResultsContextProvider>
    </div>
  );
}

export default App;
