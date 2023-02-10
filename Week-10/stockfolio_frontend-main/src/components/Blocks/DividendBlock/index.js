import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import Paper from "@mui/material/Paper";
import "./index.css";
import { useNavigate } from "react-router-dom";
import divident_logo from "../../../Assets/divident_logo.png";
import { store } from "../../../App.js";
//const BASE_URL = process.env.REACT_APP_API_URL;
import { BASE_URL } from "../../../Services/BackendURL";

export function getData() {
  return (dispatch) => {
    const value = "dividentcatalogue";
    const payload = {
      method: "POST",
      body: JSON.stringify({ blockName: `${value}` }),
      headers: {
        "Content-type": "application/json",
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

const DividendBlock = () => {
  const { token } = useContext(store);
  const content = useSelector((state) => state.DIVIDENT);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const DividendDashboard = () => {
    if (token) {
      navigate("/dividenddashboard");
    } else {
      navigate("/Signin");
    }
  };

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  return (
    <>
      <Paper
        className="block1-it"
        variant="outlined"
        onClick={DividendDashboard}
      >
        <div className="block1-it-container">
          <p className="text-14 card-title">
            <span className="highlited-label">Popular</span> - Viewed over 25K
            times in the last month
          </p>
          <div className="card-details">
            <img className="card-img" src={divident_logo} alt="dividentimg" />

            <div
              style={{
                padding: "0 5px",
                margin: " 5px ",
                marginLeft: "0",
              }}
            >
              {/* <Button variant="contained">DIVIDENT</Button>*/}
              <p className="text-14 card-description">
                Create wealth with equities, stay protected with Gold. The sweet
                spot
              </p>
              {content.data && (
                <ul>
                  {content.data.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <p className="statbox__title">Price</p>
                        <p className="statbox__value">
                          ₹ {item.blockTotalPrice}
                        </p>
                      </div>

                      <div>
                        <p className="statbox__title">3Ycagr</p>
                        <p className="statbox__value">{item.cagr}%</p>
                      </div>

                      <div>
                        <p className="statbox__title">volatality</p>
                        <p className="statbox__value">{item.volatality}%</p>
                      </div>
                    </div>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </Paper>
    </>
  );
};

export default DividendBlock;
