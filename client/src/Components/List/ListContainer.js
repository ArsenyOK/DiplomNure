import React from 'react';
import { connect } from 'react-redux';
import { getItems, addItem, deleteItem, getCurrentRecipe, getItemsAC, setItemsLoading, setCurrentPageAC, getItemsByPages, } from './../../store/actions/itemAction';
import PropTypes from 'prop-types';
import List from './List';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import * as axios from 'axios';

class ListContainer extends React.Component {
    static propTypes = {
        getItems: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.getItemsByPages(this.props.currentPage, this.props.pageSize);
    }
    
    onChangePageRecipes = (p) => {
        window.scrollTo(0, 0);
        this.props.setItemsLoading();
        this.props.setCurrentPageAC(p);
        axios.get(`/api/recipes?page=${p}&limit=${this.props.pageSize}`)
            .then(res => {
                this.props.getItemsAC(res.data.result, res.data.totalRecipeCount)
            })
    }


    onChangeRecipe = (recipeId) => {
        this.props.getCurrentRecipe(recipeId);
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }
    
    render() {

        return (
            <List
                recipeCount={this.props.recipeCount}
                pageSize={this.props.pageSize}
                recipes={this.props.recipes}
                onChangeRecipe={this.onChangeRecipe}
                onChangePageRecipes={this.onChangePageRecipes}
                loading={this.props.loading}
                isAuthenticated={this.props.isAuthenticated}
                setCurrentPageAC={this.props.setCurrentPageAC}
            />
        )
    }
}

let mapStateToProps = (state) => {
    return {
        recipes: state.recipes.recipes,
        isAuthenticated: state.auth.isAuthenticated,
        loading: state.recipes.loading,
        pageSize: state.recipes.pageSize,
        recipeCount: state.recipes.recipeCount,
        currentPage: state.recipes.currentPage
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
)(ListContainer);
