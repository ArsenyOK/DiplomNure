import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './Components/Navbar/Navbar';
import ListShop from './Components/List/ListContainer';
import Home from './Components/Home/Home';
import { Provider } from 'react-redux';
import store from './store/store';
import { Container } from 'reactstrap';
import { loadUser } from './store/actions/authActions';
import { Route } from 'react-router-dom';
import AddRecipeContainer from './Components/AddRecipe/AddRecipeContainer';
import RecipeContainer from './Components/Recipe/RecipeContainer';
import Footer from './Components/Footer/Footer';
import ScrollTop from "react-scrolltop-button";
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import UserContainer from './Components/UserPage/UserContainer';
import UpdateRecipeContainer from './Components/UpdateRecipe/UpdateRecipeContainer';
import CategoryContainer from './Components/Category/CategoryContainer';

class App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header>
            <NavBar />
          </header>
          <main>
            <Container>
              <Route exact path="/" render={() => <Home />} />
              <Route path="/recipes" render={() => {
                return <div>
                  <ListShop />
                </div>
              }} />
              <Route path="/category/:catg" render={() => {
                return <CategoryContainer />
              }} />
              <Route path="/addrecipe" render={() => {
                return <AddRecipeContainer />
              }} />
              <Route exact path="/recipe/:id" render={() => {
                return <RecipeContainer />
              }} />
              <Route path="/user" render={() => {
                return <UserContainer />
              }} />
              <Route path="/updaterecipe/:id" render={() => {
                return <UpdateRecipeContainer />
              }} />
            </Container>
            <ScrollTop
              text={<ArrowUpwardIcon />}
              distance={200}
              speed={400}
              icon={<ArrowUpwardIcon />}
              id={"spinner"}
            />
          </main>
          <footer>
            <Footer />
          </footer>
        </div>
      </Provider>
    );
  }
}



export default App;

