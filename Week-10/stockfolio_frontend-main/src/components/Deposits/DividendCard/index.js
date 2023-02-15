import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import "./index.css";
import { store } from "../../../App.js";
import Alert from "@mui/material/Alert";
//const BASE_URL = process.env.REACT_APP_API_URL;
import { BASE_URL } from "../../../Services/BackendURL";

export default function DividendCard() {
  const content = useSelector((state) => state.DIVIDENT);
  const dispatch = useDispatch();
  const { token } = useContext(store);
  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState("");

  function getData() {
    return (dispatch) => {
      const payload = {
        method: "POST",
        body: JSON.stringify({ blockName: "dividentcatalogue" }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      fetch(`${BASE_URL}/blockEstimate`, payload)
        .then((res) => res.json())
        .then((json) => {
          let result = JSON.parse(JSON.stringify(json));
          dispatch({
            type: "DIVIDENTBLOCK_DATA",
            data: result,
          });
        });
    };
  }

  const handleWatchlistBtn = async () => {
    fetchWatchlist();
  };
  const fetchWatchlist = async () => {
    const res = await fetch("/addWatchlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: `${token.data.name}`,
        email_id: `${token.data.email_id}`,
        phone: `${token.data.phone_no}`,
        investment: `${"dividentcatalogue"}`,
      }),
    });
    try {
      if (res.ok) {
      }
    } catch (error) {
      console.log("There has been a problem with fetch operation: ");
    }
  };

  const handleInvestBtn = () => {
    fetchApi();
  };
  const fetchApi = async () => {
    const res = await fetch("/investNow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        name: `${token.data.name}`,
        email_id: `${token.data.email_id}`,
        phone: `${token.data.phone_no}`,
        investment: `${"dividentcatalogue"}`,
      }),
    });
    try {
      if (res.ok) {
        setAlertContent("Investmen success!");
        setAlert(true);
      }
      setAlert(false);
    } catch (error) {
      console.log("There has been a problem with fetch operation: ");
    }
  };

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <React.Fragment>
      {alert ? <Alert severity="error">{alertContent}</Alert> : <></>}
      {content.data.map((item, index) => (
        <>
          <p className="deposit-title">Minimum Investment Amount</p>
          <Typography component="p" variant="h6">
            ₹ {item.blockTotalPrice}{" "}
          </Typography>
        </>
      ))}
      <div style={{ paddingTop: "18%" }}>
        <Button
          className="investbutton"
          variant="contained"
          color="success"
          onClick={handleInvestBtn}
        >
          Invest Now
        </Button>
      </div>
      <br></br>
      <Button
        className="addbutton"
        variant="outlined"
        onClick={handleWatchlistBtn}
      >
        Add to Watchlist
      </Button>
    </React.Fragment>
  );
}
