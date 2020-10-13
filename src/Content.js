import React, { useState, useEffect } from "react";
import spinner from "./assets/spinner.gif";

const Content = () => {
  const [animeList, setAnimeList] = useState([]);
  const [query, setQuery] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const url = `https://api.jikan.moe/v3/search/anime?q=${searchItem}`;
  console.log("render");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setSearchItem(query);
      console.log("i was clicked");
    }
  };

  useEffect(() => {
    const getAnime = async () => {
      setIsLoading(true);
      const response = await fetch(url);
      const anime = await response.json();
      const { results } = anime;
      setAnimeList(anime.results);
      console.log(anime);
      console.log(animeList);
      setIsLoading(false);
    };

    getAnime();
  }, [searchItem]);

  return (
    <>
      <div>
        <h2 className="title">Anime List</h2>
        <div className="searchbox col-lg-4 col-lg-offset-4">
          <div className="input-group">
            <input
              type="search"
              className="form-control form-control-lg"
              placeholder="Search..."
              onChange={(e) => handleChange(e)}
              onKeyDown={(e) => handleEnter(e)}
            />

            {isLoading === true ? (
              <img
                className="spinner"
                src={spinner}
                width="50px"
                height="50px"
              />
            ) : (
              ""
            )}
          </div>
        </div>
        {searchItem !== "" && animeList.length ? (
          <div className="group">
            <div className="row justify-content-center">
              {animeList.map((anime) => {
                return (
                  <div
                    key={anime.mal_id}
                    className="anime-item rounded col-lg-3 col-sm-6 col-md-4"
                  >
                    <div className="elements">
                      <img
                        src={anime.image_url}
                        width="224"
                        height="324"
                        alt={anime.title}
                      ></img>
                      <h3>{anime.title}</h3>
                      <p className="sysnopsis">
                        {anime.synopsis}
                        <a href={anime.url}>Read more here</a>
                      </p>

                      <div className="details">
                        {anime.airing === true ? (
                          <p className="status">Ongoing</p>
                        ) : (
                          <div>
                            <span className="eps">
                              Episodes: {anime.episodes}
                            </span>
                            <p className="status">Completed</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          ""
        )}

        {/*end of group div */}
      </div>
    </>
  );
};

export default Content;
