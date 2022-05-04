const URL_API = 'https://norma.nomoreparties.space/api/'
const INGREDIENT_API = URL_API + 'ingredients';
const ORDER_API = URL_API + 'orders'

export const getIngredients = () => {
    return fetch(INGREDIENT_API).then(resp => {
        if (resp.ok) {
            return resp.json();
        }
        return Promise.reject(resp.status);
    })
};

export const postOrder = (ingredients) => {
    return fetch(ORDER_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ ingredients: ingredients }),
    }).then(resp => {
        if (resp.ok) {
            return resp.json();
        }
        return Promise.reject(resp.status);
    })
}