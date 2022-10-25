import React from 'react';
import User from './User';
import { connect } from 'react-redux'
import { getItems, getCurrentRecipe, deleteItem } from './../../store/actions/itemAction';

class UserContainer extends React.Component {
    componentDidMount() {
        this.props.getItems();
    }

    onChangeRecipe = (recipeId) => {
        this.props.getCurrentRecipe(recipeId);
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }

    render() {
        return (
            <User
                onDeleteClick={this.onDeleteClick}
                onChangeRecipe={this.onChangeRecipe}
                user={this.props.user}
                ownRecipes={this.props.ownRecipes}
                data={this.props.data}
            />
        )
    }
}

let mapStateToProps = (state) => ({
    user: state.auth.user,
    ownRecipes: state.recipes.recipes,
    data: state.load.data
})

export default connect(mapStateToProps, { getItems, getCurrentRecipe, deleteItem })(UserContainer);