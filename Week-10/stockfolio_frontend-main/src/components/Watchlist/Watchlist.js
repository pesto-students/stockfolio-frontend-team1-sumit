import React, { useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { store } from "../../App.js";
import ItBlock from "../Blocks/ItBlock";
import DividendBlock from "../Blocks/DividendBlock";
import ButtonAppBar from "../Navbar";
import Footer from "../Footer";
//import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../Services/BackendURL.js";

export default function Watchlist() {
  const content = useSelector((state) => state.WATCHLIST);
  const { token } = useContext(store);

  const dispatch = useDispatch();
  //const navigate = useNavigate();

  function getData() {
    return (dispatch) => {
      const payload = {
        method: "POST",
        body: JSON.stringify({ name: `${token.data.name}` }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      };
      fetch(`${BASE_URL}/getWatchlist`, payload)
        .then((res) => res.json())
        .then((json) => {
          let result = JSON.parse(JSON.stringify(json));
          dispatch({
            type: "WatchList_DATA",
            data: result,
          });
        });
    };
  }

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  let Block;
  if (content.data[0] === "ItBlock") {
    Block = ItBlock;
  }

  return (
    <div>
      <div className="Navbar">
        <ButtonAppBar />
      </div>
      <div className="WatchList">
        {content.data && <ul>{content.data.map((Item) => ({ Block }))}</ul>}
      </div>
      <div className="Footer">
        <Footer />
      </div>
    </div>
  );
}
