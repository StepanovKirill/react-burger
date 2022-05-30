const URL_API = 'https://norma.nomoreparties.space/api/'
const INGREDIENT_API = URL_API + 'ingredients';
const ORDER_API = URL_API + 'orders'
const RESTORE_PASSWORD_API = URL_API + 'password-reset'

export const getIngredientsRequest = () => {
  return fetch(INGREDIENT_API).then(checkResponse)
};

export const postOrderRequest = (ingredients) => {
  return fetch(ORDER_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ ingredients: ingredients }),
  }).then(checkResponse)
}

export const restorePasswordRequest = email => {
  return fetch(RESTORE_PASSWORD_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email: email}),
  }).then(checkResponse)
}

const checkResponse = (response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response.status);
}
