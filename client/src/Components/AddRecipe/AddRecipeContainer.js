import React from 'react';
import AddRecipe from './AddRecipe';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { addRecipeThunk, getItems } from './../../store/actions/itemAction';

class AddRecipeContainer extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
        this.props.getItems();
    }



    render() {
        if (!this.props.user.user) {
            return <Redirect to="/" />
        }

        return (
            <div>
                <AddRecipe
                    user={this.props.user}
                    getItems={this.props.getItems}
                    isAuthenticated={this.props.isAuthenticated}
                    recipesId={this.props.recipesId}
                    addRecipe={this.props.addRecipeThunk}
                />
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        recipesId: state.recipes.recipes,
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth
    }
}

export default connect(mapStateToProps, { addRecipeThunk, getItems })(AddRecipeContainer);