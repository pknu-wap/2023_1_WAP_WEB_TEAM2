import { React, useState, useEffect, useRef } from "react";
import "./bookmark.css";
import Sidebar from "../sidebar/newSidebar";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import NavBar from "../gallery/topNaviBar.js";
import axios from "../api/axios";

function Bookmarking() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying((prevState) => !prevState);
  };
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken"); // 실제 액세스 토큰으로 대체해야 함

        const response = await axios.get(
          "http://test-env.eba-gatb5mmj.ap-northeast-2.elasticbeanstalk.com/api/v1/users/me/bookmarks",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {
          console.log(response.data.message);
          console.log(response.data.data);

          setBookmarks(response.data.data);
        } else {
          // 처리할 오류에 대한 코드
        }
      } catch (error) {
        //CORS 오류로 여기로 넘어감 ..
        if (error.response.status === 403) {
          // 서버로부터의 응답을 받은 경우
          console.log("sfesl");
          const formData = new FormData();
          formData.append("accessToken", localStorage.getItem("accessToken"));
          formData.append("refreshToken", localStorage.getItem("refreshToken"));
          try {
            const response = await axios.post(
              "http://test-env.eba-gatb5mmj.ap-northeast-2.elasticbeanstalk.com/api/v1/users/reissue",
              formData
            );
            console.log("Token reissued.");
            localStorage.setItem("accessToken", response.data.data.accessToken);

            // 토큰을 재발급 받은 후에 다시 fetchData를 호출하여 API를 실행
            await fetchData();
          } catch (error) {
            if (error.response.status === 403) {
              console.log("Token reissue failed.");
            }
          }
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="rankingBackground">
      <div className="bookmark-title">
        <div className="favorite material-icons" id="bookmark-icon">
          {bookmarks.length > 0 ? "bookmark_border" : ""}
        </div>
        <div className="bookmark">BookMark</div>
        <div className="favorite material-icons" id="bookmark-icon1">
          {bookmarks.length > 0 ? "bookmark_border" : ""}
        </div>
      </div>
      <div className="rankingFrame">
        <div className="rankingGrid">
          <div className="rankContainer_head">
            <div className="rankingItem_head">Album Cover</div>
            <div className="rankingItem_head">Title</div>
            <div className="rankingItem_head">Artist</div>
          </div>
          {/* <div className="rankContainer">
            <link
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet"
            />
            <span className="music">
              <input
                id="play-icon-button"
                type="button"
                className="material-icons"
                value={isPlaying ? "pause" : "play_arrow"}
                onClick={togglePlay}
              />
              <span className="rankingItem">Attention</span>
            </span>
            <span className="rankingItem">Newjeans</span>
            <span className="rankingItem">PKNU</span>
          </div> */}
          {bookmarks.map((bookmark, index) => (
            <div className="rankContainer" key={index}>
              <link
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
                rel="stylesheet"
              />
              {/* <span className="music"> */}
              {/* <input
                  id="play-icon-button"
                  type="button"
                  className="material-icons"
                  value="play_arrow"
                /> */}
              <img
                alt=""
                src={bookmark.albumImageUrl}
                className="album_cover"
              />
              <span className="rankingItem">
                {bookmark.trackTitle.slice(0, 20)}
              </span>
              {/* </span> */}
              <span className="rankingItem">{bookmark.artistName}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <div className="gallery">
      <NavBar></NavBar>
      <Bookmarking></Bookmarking>
    </div>
  );
}

//https://discourse.threejs.org/t/i-use-canvas-size-as-my-renderer-size-but-got-low-resolution-when-width-not-euqalss-height-size/39655
