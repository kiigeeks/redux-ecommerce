import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './features/cart/cartSlice';
import productSlice from './features/productlist/productSlice';

export default configureStore({
    reducer: {
        cart: cartSlice,
        product: productSlice
    }
});