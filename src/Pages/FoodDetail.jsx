import React, { useEffect, useContext, useState } from 'react';
import { useHistory } from 'react-router';
import copy from 'clipboard-copy';
import { fetchFoodById } from '../services';
import IngredientsList from '../components/IngredientsList';
import '../css/detail.css';
import Context from '../Context/Context';
import HandleShare from '../components/HandleShareFood';
import HandleFavorite from '../components/HandleFavoriteFood';

function FoodDetail() {
  const {
    setCurrentPage,
    setShowProfile,
    setShowTitlePage,
    setSearchButton,
    setIdFoodDetails,
    drinksClone,
    setDrinksClone,
    foodDetails,
    setFoodDetails,
  } = useContext(Context);

  const [video, setVideo] = useState('');
  const [msgClipboard, setMsgClipboard] = useState(false);

  const history = useHistory();
  const id = history.location.pathname.split('/')[2];

  // useEffect para completar o state drinksClone para usar no foodDetails em recomendações
  useEffect(() => {
    async function foodById() {
      const getFoodById = await fetchFoodById(id);
      setFoodDetails(getFoodById);
      const magicNumber = 24;
      setVideo(getFoodById[0].strYoutube.substr(magicNumber));
    }
    foodById();
  }, [id, setFoodDetails]);

  useEffect(() => {
    async function fetchDrinks() {
      const { drinks } = await fetch(
        'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
      ).then((data) => data.json());
      const magicNumber = 6;
      const SplitArray = drinks.filter((item, idx) => idx < magicNumber);
      setDrinksClone(SplitArray);
    }
    fetchDrinks();
  }, [setDrinksClone]);

  useEffect(() => {
    setCurrentPage('Detalhes');
    setShowProfile(false);
    setShowTitlePage(false);
    setSearchButton(false);
  }, [id, setCurrentPage, setSearchButton, setShowProfile, setShowTitlePage]);

  const handleLink = ({ target: { value } }) => {
    setIdFoodDetails(value);
    if (
      localStorage.inProgressRecipes
      && !JSON.parse([localStorage.inProgressRecipes]).find(
        (recipe) => recipe === id,
      )
    ) {
      const getStarted = JSON.parse([localStorage.inProgressRecipes]);
      getStarted.push(id);
      localStorage.inProgressRecipes = JSON.stringify(getStarted);
    }
    if (!localStorage.inProgressRecipes) {
      localStorage.inProgressRecipes = JSON.stringify([id]);
    }
    history.push(`/foods/${value}/in-progress`);
  };

  const shareLink = () => {
    const timerMsg = 5000;
    setMsgClipboard(true);
    copy(`http://localhost:3000${history.location.pathname}`);
    setTimeout(() => setMsgClipboard(false), timerMsg);
  };

  const stateButtons = {
    msgClipboard,
    shareLink,
  };

  if (!foodDetails || !foodDetails.length) {
    return <i id="test" className="fas fa-spinner fa-pulse fa-10x" />;
  }

  return (
    <div className="detail">
      <img
        src={ foodDetails[0].strMealThumb }
        alt={ `${foodDetails[0].strMeal} recipe` }
        data-testid="recipe-photo"
        className="thumbnail"
      />
      <div className="header-detail">
        <h1 data-testid="recipe-title">{foodDetails[0].strMeal}</h1>
        <div className="buttons">
          <span data-testid="recipe-category" className="category">
            {foodDetails[0].strCategory}
          </span>
          <HandleShare value={ stateButtons } />
          <HandleFavorite foodDetails={ foodDetails } />
        </div>
      </div>

      <div className="ingredients">
        <h3>Ingredients</h3>
        <IngredientsList list={ foodDetails } />
        <h3>Instructions</h3>
        <p data-testid="instructions">{foodDetails[0].strInstructions}</p>
        <h3>Video</h3>
        <iframe
          src={ `https://www.youtube.com/embed/${video}` }
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture"
          allowFullScreen
          data-testid="video"
        />
      </div>
      <div className="recommended">
        <h3>Recommended</h3>
        <section className="recomended-section">
          {drinksClone.map((drink, idx) => (
            <div className="recomended-div" key={ drink.idDrink }>
              <img
                src={ drink.strDrinkThumb }
                alt={ `drink: ${drink.strDrink}` }
                data-testid={ `${idx}-recomendation-card` }
              />
              <h6 data-testid={ `${idx}-recomendation-title` }>
                {drink.strDrink}
              </h6>
              <p>{drink.strAlcoholic}</p>
            </div>
          ))}
        </section>
        {!localStorage.inProgressRecipes
        || !JSON.parse(localStorage.inProgressRecipes).find(
          (recipeId) => recipeId === id,
        )
          ? (
            <button
              button
              className="start-recipe-button"
              type="button"
              data-testid="start-recipe-btn"
              value={ foodDetails[0].idMeal }
              onClick={ handleLink }
            >
              Iniciar Receita
            </button>
          ) : (
            <button
              button
              className="start-recipe-button"
              type="button"
              data-testid="start-recipe-btn"
              value={ foodDetails[0].idMeal }
              onClick={ handleLink }
            >
              Continue Recipe
            </button>
          )}
      </div>
    </div>
  );
}

export default FoodDetail;
