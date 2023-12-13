import { createSlice } from '@reduxjs/toolkit'
import { sortData } from '../../helper/sortDatas';

const initialState = {
    productItems: [],
    filteredProducts: [],
    categoryItems: [],
    filteredCategories: [],
    sortedType: "",
    keywordSearch: "",
    wishlist: [],
}

export const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        storeProducts: (state, action) => {
            const products = action.payload;
            state.productItems = products;
            state.filteredProducts = products;

            const categories = [...new Set(products.map(item => item.category))];
            state.categoryItems = categories;
        },
        filterByCategories: (state, action) => {
            const newItem = action.payload;
            const indexCategory = state.filteredCategories.findIndex(category => category === newItem)

            if (indexCategory !== -1) {
                const updatedCategory = state.filteredCategories.filter((category) => category !== newItem);
                state.filteredCategories = updatedCategory;
            } else {
                state.filteredCategories.push(newItem)
            }

            let tempDatas = [];
            if (state.filteredCategories.length === 0) {
                tempDatas = state.productItems;
            } else {
                tempDatas = state.productItems.filter(item => state.filteredCategories.includes(item.category));
            }

            if (state.keywordSearch !== "") {
                tempDatas = tempDatas.filter(item => item.title.toLowerCase().includes(state.keywordSearch.toLowerCase()));
            }

            state.filteredProducts = sortData(tempDatas, state.sortedType)
        },
        sortingProducts: (state, action) => {
            state.filteredProducts = sortData(state.filteredProducts, action.payload)
            state.sortedType = action.payload;
        },
        searchProduct: (state, action) => {
            if (action.payload !== "") {
                state.filteredProducts = state.filteredProducts.filter(item => item.title.toLowerCase().includes(action.payload.toLowerCase()));
            } else {
                let tempDatas = [];
                if (state.filteredCategories.length === 0) {
                    tempDatas = state.productItems;
                } else {
                    tempDatas = state.productItems.filter(item => state.filteredCategories.includes(item.category));
                }
                state.filteredProducts = sortData(tempDatas, state.sortedType)
            }
            state.keywordSearch = action.payload;
        },
        addWishlist: (state, action) => {
            const newItem = action.payload;
            const indexProduct = state.wishlist.findIndex(product => product.id === newItem.id)

            if (indexProduct !== -1) {
                const updatedWishlist = state.wishlist.filter((product) => product.id !== newItem.id);
                state.wishlist = updatedWishlist;
            } else {
                state.wishlist.push(newItem)
            }
        },
    },
})

export const { storeProducts, filterByCategories, sortingProducts, searchProduct, addWishlist } = productSlice.actions;
export default productSlice.reducer;

// selector
export const selectProducts = state => state.product.filteredProducts
export const selectCategories = state => state.product.categoryItems
export const selectFilteredCategories = state => state.product.filteredCategories
export const selectSortType = state => state.product.sortedType
export const selectKeywordSearch = state => state.product.keywordSearch
export const selectWishlist = state => state.product.wishlist
