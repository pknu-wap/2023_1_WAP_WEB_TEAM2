import { React, useState, useEffect, useRef } from "react";
import "./likeList.css";
import Sidebar from "../sidebar/newSidebar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "../gallery/topNaviBar.js";
import axios from "../api/axios";

//상단네비게이션바

/*
function NavBar() {
  const [workOpen, setWork] = useState(false);
  const [likeOpen, setLike] = useState(false);
  const workToggle = () => {
    setWork((workOpen) => !workOpen);
  };
  const likeToggle = () => {
    setLike((likeOpen) => !likeOpen);
  };

  return (
    <nav>
      <div className="navbar">
        <Sidebar>
          <div className="userInfo">
            <div className="userImg"></div>
            <div className="userName">User Name</div>
          </div>
          <div className="sideContent">
            <div className="itemContainer">CHANGE INFO</div>
            <div className="itemContainer" onClick={() => workToggle()}>
              WORK MANAGER
              {workOpen ? (
                <ul className="item">
                  <li href="#">Add Work</li>
                  <li href="#">Edit Gallery</li>
                </ul>
              ) : (
                <span></span>
              )}
            </div>
            <div className="itemContainer" onClick={() => likeToggle()}>
              LIKE
              {likeOpen ? (
                <ul className="item">
                  <li>For me</li>
                  <li>For others</li>
                </ul>
              ) : (
                <span></span>
              )}
            </div>
            <button className="itemContainer">BOOK MARK</button>
            <button className="itemContainer">RANKING</button>
          </div>
        </Sidebar>
        <div className="logo">
          <sapn className="logo_f">S</sapn>OUND{" "}
          <span className="logo_f">S</span>PACE
        </div>
        <a className="navitem" href="#">
          SEARCH
        </a>
        <a className="navitem" href="#">
          RANKING
        </a>
      </div>
    </nav>
  );
}
*/

function Likeme() {
  const [username, setUsername] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken"); // 실제 액세스 토큰으로 대체해야 함

        const response = await axios.get(
          "http://localhost:3000/api/v1/users/me/likes-received",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          console.log(response.data.message);
          console.log(response.data.data);

          if (Array.isArray(response.data.data)) {
            setUsername(response.data.data);
          } else {
            // 처리할 오류에 대한 코드
          }
        } else {
          // 처리할 오류에 대한 코드
        }
      } catch (error) {
        // 오류 처리
      }
    };

    fetchData();
  }, []);

  return (
    <div className="rankingBackground">
      <div className="likeforme">
        <span className="likeforme-title">Like for me</span>
        <span className="favorite material-icons" id="like-icon-title">
          favorite
        </span>
        <span className="favorite material-icons" id="like-icon-title1">
          favorite
        </span>
        <span className="favorite material-icons" id="like-icon-title2">
          favorite
        </span>
      </div>
      <div className="rankingFrame">
        <div className="rankingGrid">
          <div className="rankContainer_head">
            <div className="rankingItem_head">Profile</div>
            <div className="rankingItem_head">User Name</div>
            <div className="rankingItem_head">Like</div>
          </div>
          {username.map((user) => (
            <div key={user.id}>
              <hr className="like-hr" />
              <div className="rankContainer">
                <link
                  href="https://fonts.googleapis.com/icon?family=Material+Icons"
                  rel="stylesheet"
                />
                <div className="rankingItem" id="profile-like"></div>
                <span className="rankingItem">{user.username}</span>
                <span className="rankingItem">
                  <span className="favorite material-icons" id="like-icon">
                    favorite
                  </span>
                  1004
                </span>
              </div>
            </div>
          ))}
          위의 코드에서 response.data.data.map 함수를 사용하여 받은 데이터
          배열을 순회하며 각 사용자의 이름을 rankingItem 요소에 출력합니다.
          user.username은 서버에서 받은 사용자 이름을 나타냅니다. 이렇게
          수정하면 서버에서 받은 데이터의 개수에 따라 사용자 이름이 표시됩니다.
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <div className="gallery">
      <NavBar></NavBar>
      <Likeme></Likeme>
    </div>
  );
}

//https://discourse.threejs.org/t/i-use-canvas-size-as-my-renderer-size-but-got-low-resolution-when-width-not-euqalss-height-size/39655
