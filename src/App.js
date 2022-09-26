import logo from "./logo.svg";
import "./App.css";
import TextField from "@mui/material/TextField";

function App() {
  return (
    <div>
      <div className="lightPink">
        <div className="coupleNamesContainer">
          <div className="coupleNames">
            Jie Yang
            <br></br> and
            <br></br> Jan-Michael Perez
          </div>
        </div>

        <div className="smallInfoBox">
          <div className="infoText">Saturday 1 October 2022 | Luminare</div>
        </div>

        <div className="nameAndTable">
          <TextField id="outlined-search" label="Search field" type="search" />
        </div>
      </div>
    </div>
  );
}

export default App;
