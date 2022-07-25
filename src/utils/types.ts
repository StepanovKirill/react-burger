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
  uid?: string | undefined;
  __v: number;
};

export type TUser = {
  email: string;
  name: string;
};

export type TOrder = {
  ingredients: Array<string>;
  _id: string;
  status: "done" | "created" | "pending";
  number: number;
  createdAt: string;
  updatedAt: string;
  name: string;
}

export type TOrders = {
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
}

export type TOrdersFeed = {
  success: boolean;
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
};