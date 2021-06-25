import Axios from "axios";
import { useState } from "react";
import "./App.css";
import RecipeTile from "./components/recipe-tile/index";

function App() {
  const [query, setquery] = useState("");
  const [recipes, setrecipes] = useState([]);

  const app_id='42ca74f3'
   const app_key='4c83d98accec5ed4ee7682726d4da968'

  const url = `https://api.edamam.com/search?q=${query}&app_id=${app_id}&app_key=${app_key}`;

  const getRecipeInfo = async () => {
    var result = await Axios.get(url);
    setrecipes(result.data.hits);
    console.log(result.data.hits);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    getRecipeInfo();
  };

  return (
    <div className="app">
      <h1 onClick={getRecipeInfo}>Food Recipe Plaza 🍔</h1>
      <form className="app__searchForm" onSubmit={onSubmit}>
        <input
          className="app__input"
          type="text"
          placeholder="enter ingridient"
          autoComplete="Off"
          value={query}
          onChange={(e) => setquery(e.target.value)}
        />
        <input className="app__submit" type="submit" value="Search" />
      </form>

      <div className="app__recipes">
        {recipes !== [] &&
          recipes.map((recipe) => {
            return <RecipeTile recipe={recipe} />;
          })}
      </div>
    </div>
  );
}

export default App;