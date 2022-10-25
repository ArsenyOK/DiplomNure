import React from 'react';
import { connect } from 'react-redux';
import { getItems, addItem, deleteItem, getCurrentRecipe, getItemsAC, setItemsLoading, setCurrentPageAC, getItemsByPages, } from './../../store/actions/itemAction';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import Category from './Category';

class CategoryContainer extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.getItems();
    }


    onChangeRecipe = (recipeId) => {
        this.props.getCurrentRecipe(recipeId);
    }

    render() {
        let catString = this.props.match.params.catg;
        return(
            <div>
                <Category onChangeRecipe={this.onChangeRecipe} catString={catString} recipes={this.props.recipes} />
            </div>
        )
    }
}


let mapStateToProps = (state) => {
    return {
        recipes: state.recipes.recipes,
        isAuthenticated: state.auth.isAuthenticated,
        loading: state.recipes.loading
    }
}


export default compose(
    connect(mapStateToProps, {
        getItems,
        addItem,
        deleteItem,
        getCurrentRecipe,
        getItemsAC,
        setItemsLoading,
        setCurrentPageAC,
        getItemsByPages
    }),
    withRouter
)(CategoryContainer);