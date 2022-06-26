export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  proteins: number;
  calories: number;
  fat: number;
  carbohydrates: number;
  uid?: number
};