import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import { useStateWithCallback } from "./useStateWithCallback";
import { useEffect } from "react";
import data from "./data.json";

const useStyles = makeStyles((themes) => ({
  root: {
    "& .MuiFilledInput-root": {
      backgroundColor: "white",
    },
    "& .MuiFilledInput-root:hover": {
      backgroundColor: "white",
      // Reset on touch devices, it doesn't add specificity
      "@media (hover: none)": {
        backgroundColor: "white",
      },
    },
    "& .MuiFilledInput-root.Mui-focused": {
      backgroundColor: "white",
    },
  },
  cssLabel: {
    color: "#7d0000",
    "&.Mui-focused": {
      color: "#7d0000",
    },
  },
}));

function App() {
  const classes = useStyles();
  const [tableNumber, setTableNumber] = useStateWithCallback("0");
  const [wrongName, setWrongName] = useStateWithCallback(false);

  const [name, setName] = useStateWithCallback("");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(name.toLowerCase().replace(/\s/g, ""));
    if (name.length === 0) {
      setWrongName(true);
      return;
    }
    // You should see name in console.
    // ..code to submit form to backend here...
    setTableNumber("-1");
    setWrongName(false);

    data.forEach((singleHeroObject, index) => {
      Object.values(singleHeroObject).every((onlyValues, valIndex) => {
        if (
          onlyValues
            .toLowerCase()
            .replace(/\s/g, "")
            .replace("-", "")
            .includes(name.toLowerCase().replace(/\s/g, "").replace("-", "")) &&
          onlyValues.toLowerCase().replace(/\s/g, "").replace("-", "")
            .length ===
            name.toLowerCase().replace(/\s/g, "").replace("-", "").length
        ) {
          setTableNumber(singleHeroObject.tableNumber);
          return;
        }
      });
      return;
    });
  }

  useEffect(() => {
    if (tableNumber === "-1") {
      setWrongName(true);
    }
  });

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

        <Grid className="nameAndTable">
          <form className="nameInput" onSubmit={handleSubmit}>
            <TextField
              error={wrongName}
              variant="filled"
              className={classes.root}
              id="name"
              label={wrongName ? "Invalid Name" : "Input Full Name"}
              type="name"
              style={{ width: 250 }}
              value={name}
              onInput={(e) => setName(e.target.value)}
              InputLabelProps={{
                className: classes.cssLabel,
              }}
            />
            <Typography className={classes.divider} />
            <Grid item>
              <Box textAlign="center">
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 2, mb: 2 }}
                  style={{
                    backgroundColor: "rgb(144, 88, 104)",
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Grid>
          </form>
        </Grid>
        {!(tableNumber === "-1") && !(tableNumber === "0") ? (
          <div className="tableNumberContainer">
            <div className="tableNumberText">
              <div className="tableNumberHeader">Table Number</div>
              <div className="tableNumber">{tableNumber}</div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
