import React from 'react';
import Recipe from './Recipe';
import { connect } from 'react-redux';
import { getCurrentRecipe } from './../../store/actions/itemAction';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class RecipeContainer extends React.Component {

    onChangeRecipe = (recipeId) => {
        this.props.getCurrentRecipe(recipeId);
    }

    refreshRecipe() {
        window.scrollTo(0, 0);
        let id = this.props.match.params.id;
        
        this.onChangeRecipe(id);
        this.props.getCurrentRecipe(this.props.match.params.id);
    }

    componentDidMount() {
        this.refreshRecipe();
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.match.params.id !== prevProps.match.params.id) {
            this.refreshRecipe();
        }
    }
    
    render() {

        return (
            <div>
                <Recipe {...this.props} idRecipe={!this.props.match.params.id} key={1} newContent={this.props.newContent} loading={this.props.loading} />
            </div>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        newContent: state.recipes.currentRecipe,
        loading: state.recipes.loading
    }
}

export default compose(
    connect(mapStateToProps, { getCurrentRecipe }),
    withRouter
)(RecipeContainer);
