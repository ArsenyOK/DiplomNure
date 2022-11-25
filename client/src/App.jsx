import React, { useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./Components/Home/Home";
import { Provider } from "react-redux";
import store from "./store/store";
import { Container } from "reactstrap";
import { loadUser } from "./store/actions/authActions";
import { Route } from "react-router-dom";
import AddRecipeContainer from "./Components/AddRecipe/AddRecipeContainer";
import UpdateRecipeContainer from "./Components/UpdateRecipe/UpdateRecipeContainer";
import CategoryContainer from "./Components/Category/CategoryContainer";
import Header from "./componentsBox/Header/Header";
import { AppWrapper, Main } from "./componentsBox/styled-components";
import Footer from "./componentsBox/Footer/Footer";
import UserPage from "./componentsBox/UserTab/UserPage";
import RecipesList from "./componentsBox/RecipesPage/RecipesList/RecipesList";
import RecipePage from "./componentsBox/RecipesPage/RecipeInfoPage/RecipePage";

const App = () => {
    useEffect(() => {
        store.dispatch(loadUser());
    }, []);

    return (
        <Provider store={store}>
            <AppWrapper>
                <Header />
                <Main>
                    <Container>
                        <Route exact path="/" render={() => <Home />} />
                        <Route
                            path="/recipes"
                            render={() => {
                                return (
                                    <div>
                                        <RecipesList />
                                    </div>
                                );
                            }}
                        />
                        <Route
                            path="/category/:catg"
                            render={() => {
                                return (
                                    <div>
                                        <RecipesList />
                                    </div>
                                );
                            }}
                        />
                        <Route
                            path="/addrecipe"
                            render={() => {
                                return <AddRecipeContainer />;
                            }}
                        />
                        <Route
                            exact
                            path="/recipe/:id"
                            render={() => {
                                return <RecipePage />;
                            }}
                        />
                        <Route
                            path="/user"
                            render={() => {
                                return <UserPage />;
                            }}
                        />
                        <Route
                            path="/updaterecipe/:id"
                            render={() => {
                                return <UpdateRecipeContainer />;
                            }}
                        />
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
};

export default App;
