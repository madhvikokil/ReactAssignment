import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const ingredients=[];
    console.log('proops.ingredients')
    console.log(props.ingredients);
    for(let ingredientName in props.ingredients){
        console.log('ingredientName');
        console.log(ingredientName);
        console.log('props.ingredients');
        console.log(ingredients);



        ingredients.push(
            {amount :props.ingredients[ingredientName],
                 name:ingredientName})
                 console.log("ingredient ka naame");
                 console.log(props.ingredients[ingredientName]);
    }

    const ingredientOutput= ingredients.map(ig => {
        return<span 
        style={{textTransform:'capitalize',
            display:'inline-block',
            margin:'8px',
            border:'1px solid #ccc'
            }}
        key={ig.name} >{ig.name} {ig.amount} </span>
    })
    return(
        <div className={classes.Order}>
        <p>Ingredients : Salad {ingredientOutput} </p>
        <p>Price : {Number.parseFloat(props.price).toFixed(2)} Rs</p>
    </div>
    )
};


export default order;