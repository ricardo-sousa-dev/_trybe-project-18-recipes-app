import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Context from '../Context/Context';
import { fetchByCategoryFoods } from '../services';

function Foods() {
  const history = useHistory();

  const [actualCategory, setActualCategory] = useState('');
  const {
    setCurrentPage,
    categories,
    setCategories,
    setIdFoodDetails,
    foods,
    setFoods,
    foodsClone,
  } = useContext(Context);

  useEffect(() => {
    setCurrentPage('Comidas');
  }, [setCurrentPage]);

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
  if (foods.length === 1) {
    const { idMeal } = foods[0];
    setIdFoodDetails(idMeal);
    history.push(`/comidas/${idMeal}`);
  }

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
        { foods.length === 0 ? (
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
          )))}
      </ul>
      <Footer />
    </div>
  );
}

export default Foods;
