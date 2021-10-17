import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import {
  Login,
  Foods,
  Drinks,
  Profile,
  Explorer,
  DrinkDetail,
  FoodDetail,
  FoodInProgress,
  DrinkInProgress,
  RecipesMade,
  FavoriteRecipes,
  ExplorerFoods,
  ExploreByAreaFood,
  ExploreByIngredientFood,
  ExploreByIngredientDrink,
  ExplorerDrinks,
  NotFound,
} from './Pages/Index';
import Provider from './Context/Provider';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/comidas" component={ Foods } />
        <Route exact path="/bebidas" component={ Drinks } />
        <Route exact path="/comidas/:id" component={ FoodDetail } />
        <Route exact path="/bebidas/:id" component={ DrinkDetail } />
        <Route exact path="/comidas/:id/in-progress" component={ FoodInProgress } />
        <Route exact path="/bebidas/:id/in-progress" component={ DrinkInProgress } />
        <Route exact path="/explorar" component={ Explorer } />
        <Route exact path="/explorar/comidas" component={ ExplorerFoods } />
        <Route exact path="/explorar/bebidas" component={ ExplorerDrinks } />
        <Route
          path="/explorar/comidas/ingredientes"
          component={ ExploreByIngredientFood }
        />
        <Route
          path="/explorar/bebidas/ingredientes"
          component={ ExploreByIngredientDrink }
        />
        <Route path="/explorar/comidas/area" component={ ExploreByAreaFood } />
        <Route exact path="/perfil" component={ Profile } />
        <Route path="/receitas-feitas" component={ RecipesMade } />
        <Route path="/receitas-favoritas" component={ FavoriteRecipes } />
        <Route component={ NotFound } />
      </Switch>
    </Provider>
  );
}

export default App;
