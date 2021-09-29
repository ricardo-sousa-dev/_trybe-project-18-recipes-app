import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';
import { fetchByCategoryFoods } from '../services';

function Foods() {
  const history = useHistory();

  const [foodsClone, setFoodsClone] = useState([]);
  const [actualCategory, setActualCategory] = useState('');
  const {
    setCurrentPage,
    categories,
    setCategories,
    setIdFoodDetails,
    foods,
    setFoods,
    searchRadio,
  } = useContext(Context);

  useEffect(() => {
    async function fetchFoods() {
      const { meals } = await fetch(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      ).then((data) => data.json());

      const magicNumber = 12;
      const SplitArray = meals.filter((item, idx) => idx < magicNumber);

      await setFoods(SplitArray);
      await setFoodsClone(SplitArray);
    }

    async function fetchIngFoods() {
      const response = await fetch(
        'https://www.themealdb.com/api/json/v1/1/search.php?s=',
      ).then((data) => data.json());

      const SplitArray = response.meals.filter(
        (i) => i.strIngredient1 === history.location.state[0],
      );

      if (SplitArray.length === 0) {
        setFoods([]);
        setFoodsClone([]);
      } else {
        setFoods(SplitArray);
        setFoodsClone(SplitArray);
      }
    }

    if (history.action === 'PUSH') {
      fetchIngFoods();
    } else {
      fetchFoods();
    }
    setCurrentPage('Comidas');
  }, [setCurrentPage, history, setFoods]);

  useEffect(() => {
    async function fetchCategories() {
      const { meals } = await fetch(
        'https://www.themealdb.com/api/json/v1/1/list.php?c=list',
      ).then((data) => data.json());

      const magicNumber = 5;
      const SplitArray = meals.filter((item, idx) => idx < magicNumber);

      setCategories(SplitArray);
    }
    fetchCategories();
  }, [setCategories]);

  const HandleClick = async ({ target: { name, value } }) => {
    if (actualCategory === value) {
      setFoods(foodsClone);
    } else {
      const arrayCategory = await fetchByCategoryFoods(name);
      setFoods(arrayCategory);
      setActualCategory(value);
    }
  };

  const handleLink = ({ target: { value } }) => {
    setIdFoodDetails(value);
    history.push(`/comidas/${value}`);
  };

  console.log(foods);
  // if (foods.length === 1) {
  //   const { idMeal } = foods[0];
  //   setIdFoodDetails(idMeal);
  //   history.push(`/comidas/${idMeal}`);
  // }

  const renderSearch = () => {
    if (foods.length === 0 && searchRadio === 'firstLetter') {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (foods.length === 1) {
      const { idMeal } = foods[0];
      setIdFoodDetails(idMeal);
      history.push(`/comidas/${idMeal}`);
    } else {
      return foods.map((food, idx) => (
        <li data-testid={ `${idx}-recipe-card` } key={ food.idMeal }>
          <img
            src={ food.strMealThumb }
            alt={ `Comida: ${food.strMeal}` }
            width="150px"
            data-testid={ `${idx}-card-img` }
          />
          <p data-testid={ `${idx}-card-name` }>{food.strMeal}</p>
          <button value={ food.idMeal } type="button" onClick={ handleLink }>
            detalhes
          </button>
        </li>
      ));
    }
    return <h1>Loading...</h1>;
  };

  return (
    <div className="foods">
      <Header />
      <ul>
        <button
          type="button"
          onClick={ () => setFoods(foodsClone) }
          data-testid="All-category-filter"
        >
          All
        </button>
        {categories.map((category) => (
          <button
            type="button"
            key={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            name={ category.strCategory }
            value={ category.strCategory }
            onClick={ (event) => HandleClick(event) }
          >
            {category.strCategory}
          </button>
        ))}
      </ul>
      <ul>
        {/* { foods.length === 0 ? (
          <li>Nenhum resultado encontrado!</li>
        ) : (
          foods.map((food, idx) => (
            <li data-testid={ `${idx}-recipe-card` } key={ food.idMeal }>
              <img
                src={ food.strMealThumb }
                alt={ `Comida: ${food.strMeal}` }
                width="150px"
                data-testid={ `${idx}-card-img` }
              />
              <p data-testid={ `${idx}-card-name` }>{ food.strMeal }</p>
              <button value={ food.idMeal } type="button" onClick={ handleLink }>
                detalhes
              </button>
            </li>
          )))} */}
        {renderSearch()}
      </ul>
      <Footer />
    </div>
  );
}

export default Foods;
