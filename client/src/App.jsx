import React, { useEffect } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListShop from './Components/List/ListContainer';
import Home from './Components/Home/Home';
import { Provider } from 'react-redux';
import store from './store/store';
import { Container } from 'reactstrap';
import { loadUser } from './store/actions/authActions';
import { Route } from 'react-router-dom';
import AddRecipeContainer from './Components/AddRecipe/AddRecipeContainer';
import RecipeContainer from './Components/Recipe/RecipeContainer';
import ScrollTop from "react-scrolltop-button";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import UserContainer from './Components/UserPage/UserContainer';
import UpdateRecipeContainer from './Components/UpdateRecipe/UpdateRecipeContainer';
import CategoryContainer from './Components/Category/CategoryContainer';
import Header from './componentsBox/Header/Header';
import { AppWrapper, Main } from './componentsBox/styled-components';
import Footer from './componentsBox/Footer/Footer';
import Navbar from './Components/Navbar/Navbar';
import UserPage from './componentsBox/UserTab/UserPage';
import RecipesList from './componentsBox/RecipesPage/RecipesList/RecipesList';
import RecipePage from './componentsBox/RecipesPage/RecipeInfoPage/RecipePage';


const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <Provider store={store}>
      <AppWrapper>
        {/* <Navbar /> */}
        <Header />
        <Main>
          <Container>
            <Route exact path="/" render={() => <Home />} />
            <Route path="/recipes" render={() => {
              return <div>
                {/* <ListShop /> */}
                <RecipesList />
              </div>
            }} />
            <Route path="/category/:catg" render={() => {
              return <CategoryContainer />
            }} />
            <Route path="/addrecipe" render={() => {
              return <AddRecipeContainer />
            }} />
            <Route exact path="/recipe/:id" render={() => {
              // return <RecipeContainer />
              return <RecipePage />
            }} />
            <Route path="/user" render={() => {
              return <UserPage />
              // return <UserContainer />
            }} />
            <Route path="/updaterecipe/:id" render={() => {
              return <UpdateRecipeContainer />
            }} />
          </Container>
          {/* <ScrollTop
            text={<ArrowUpwardIcon />}
            distance={200}
            speed={400}
            icon={<ArrowUpwardIcon />}
            id={"spinner"}
          /> */}
        </Main>
        <Footer />
      </AppWrapper>
    </Provider>
  );
}

export default App;
