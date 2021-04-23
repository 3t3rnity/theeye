import { useEffect, useState } from "react";
import { createApi } from "unsplash-js";
import "./app.css";

const api = createApi({
  accessKey: "ubNwOBauDEtmSzEJmgk5JcOnnOTs07vTVSovtj4Z--Y",
});

const Header = (props) => (
  <div className="header">
    <h4>THE_EYE :/</h4>
    <button onClick={() => props.fetchData()}>Загрузить еще чего нибудь</button>
  </div>
);

const PhotoItem = (props) => (
  <div className="photo_item">
    <div className="photo_img">
      <img src={props.url} alt="photo_item" />
    </div>
    <div className="photo_link">
      <a href={props.link}>:/{props.description}</a>
    </div>
  </div>
);

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrent] = useState(1);

  useEffect(() => {
    api.search
      .getPhotos({
        query: "aesthetic",
        orientation: "landscape",
        perPage: 9,
        page: currentPage,
      })
      .then((result) => {
        setData(result.response.results);
      })
      .catch(() => {
        console.log("something went wrong!");
      });
  }, [currentPage]);

  const fetchData = () => {
    setCurrent(currentPage + 1);
    console.log(currentPage);
  };

  return (
    <div className="app">
      <Header fetchData={fetchData} />
      <div className="data_wrapper">
        {data.length !== 0 &&
          data.map((el, id) => (
            <PhotoItem
              key={id}
              url={el.urls.full}
              description={el.alt_description}
              link={el.links.html}
            />
          ))}
      </div>
    </div>
  );
};

export default App;
