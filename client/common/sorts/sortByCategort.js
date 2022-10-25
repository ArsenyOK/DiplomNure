import React from 'react';

import { NavLink } from 'react-router-dom';

export const sortByCategory = (r, strCategory, onChangeRecipe) => {
    if (r.category === strCategory) {
        return <div >
            <div><img src={r.urlPhoto} alt="photoRecipe" /></div>
            <h3>{r.title}</h3>
            <div>
                <p><NavLink onClick={(e) => { onChangeRecipe(r.id) }} to={`/recipe/${r.id}`}>{r.description.substring(0, 20) + " . . ."}</NavLink></p>
            </div>
        </div>
    }
}
