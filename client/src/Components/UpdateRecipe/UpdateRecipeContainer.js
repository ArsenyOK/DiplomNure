import React from 'react';
import UpdateRecipe from './UpdateRecipe';
import { connect } from 'react-redux';
import { updateRecipe } from './../../store/actions/itemAction';
import { Redirect } from 'react-router-dom';
import { load } from './../../store/reducers/loadReducer';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { reset } from 'redux-form';

class UpdateRecipeContainer extends React.Component {
    componentDidMount() {
        window.scrollTo(0, 0);
    }

    render() {
        if (!this.props.currentRecipe) {
            return <Redirect to="/user" />
        }

        let idRecipe = this.props.match.params.id;
        return (
            <UpdateRecipe idRecipe={idRecipe} load={this.props.load} reset={this.props.reset} updateRecipe={this.props.updateRecipe} currentRecipe={this.props.currentRecipe} />
        );
    }
}

let mapStateToProps = (state) => ({
    currentRecipe: state.recipes.currentRecipe,
    initialValues: state.load.data
})

export default compose(
    connect(mapStateToProps, { updateRecipe, load, reset }),
    withRouter
)(UpdateRecipeContainer);