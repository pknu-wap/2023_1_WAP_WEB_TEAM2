import React, { useState } from "react";
import "./work.css";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

function SearchResult({
  musicId,
  musicAlbum,
  musicInput,
  searchResult,
  bookmark,
  index,
}) {
  const [onBookmark, setOnBookmark] = useState(bookmark);

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const navigate = useNavigate();

  const handleBookmarkClick = () => {
    // 북마크 상태를 토글
    const newBookmark = !onBookmark;
    setOnBookmark(newBookmark);
    console.log("then 이전");
    console.log(newBookmark);
    console.log(musicId);

    const formData = new FormData();
    formData.append("albumImageUrl", musicAlbum);
    formData.append("artistName", searchResult);
    formData.append("trackTitle", musicInput);
    // 북마크 업데이트 API 호출
    axios({
      method: "post",
      url: `http://localhost:3000/api/v1/music/${musicId}/bookmarks`,
      data: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        console.log("then 이후");
        console.log(musicId);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("error");
        console.error(error);
      });
  };

  function addMusicClick() {
    // const trackIndex = 6;
    // const update = {
    //   trackTitle: "Sorry",
    //   artistName: "Justin Bieber",
    //   albumImageUrl:
    //     "https://images.genius.com/ff429a6c7bf8e73717ad263f800f1cf7.300x300x1.jpg",
    //   lyrics:
    //     "[Written by Julia Michaels, Justin Tranter, and Justin Bieber]\n\n[Verse 1]...",
    // };

    // axios
    //   .patch(
    //     `http://localhost:3000/api/v1/users/me/tracks/${trackIndex}/update`,
    //     update,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     }
    //   )
    //   .then((response) => {
    //     // 성공적인 응답 처리
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     // 에러 처리
    //     console.error(error);
    //   });
    const trackIndex = index;
    axios
      .get(`http://localhost:3000/api/v1/music/${musicId}`)
      .then((response) => {
        console.log("add 이전");
        const update = response.data.data;
        const { musicId, ...updateWithoutId } = update;

        console.log(response.data.data);

        console.log("here");

        console.log("update는", update);
        console.log("updateWithoutId는 ", updateWithoutId);
        console.log(trackIndex);
        axios
          .patch(
            `http://localhost:3000/api/v1/users/me/tracks/${trackIndex}/update`,

            { update: updateWithoutId },

            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log("add 이후");
            console.log(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
    // navigate("/edit");
  }

  return (
    <div className="search_result">
      <img alt="" src={musicAlbum} className="music_album"></img>
      <div className="music_info">
        <div className="music_title">| {musicInput} |</div>
        <div className="music_artist">{searchResult}</div>
      </div>
      <button
        className={`music_bookmark ${onBookmark ? "on_bookmark" : ""}`}
        onClick={handleBookmarkClick}
      ></button>
      <button className="plus_music" onClick={addMusicClick}>
        +
      </button>
    </div>
  );
}

export default SearchResult;
