import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const productsAdapter = createEntityAdapter({})

const initialState = productsAdapter.getInitialState()

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getProducts: builder.query({
            query: () => '/products',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedProducts = responseData.map(product => {
                    product.id = product._id
                    return product
                });
                return productsAdapter.setAll(initialState, loadedProducts)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Product', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Product', id }))
                    ]
                } else return [{ type: 'Product', id: 'LIST' }]
            }
        }),
        getCategoryProducts: builder.query({
            query: category => `/products?category=${category}`,
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            transformResponse: responseData => {
                const loadedProducts = responseData.map((product) => {
                    product.id = product._id
                    return product
                });
                return productsAdapter.setAll(initialState, loadedProducts)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Product', id: "LIST" },
                        ...result.ids.map((id) => ({ type: 'Product', id }))
                    ]
                } else return [{ type: 'Product', id: 'LIST' }]
            }
        }),
        getProductByUserId: builder.query({
            query: id => `/product/${id}`,
            transformResponse: responseData => {
                const loadedPosts = responseData.map((product) => {
                    product.id = product._id
                    return product
                });
                return productsAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Product', id: "LIST" },
                        ...result.ids.map(id => ({ type: 'Product', id }))
                    ]
                } else return [{ type: 'Product', id: 'LIST' }]
            }
        }),
        addNewProduct: builder.mutation({
            query: initialProduct => ({
                url: '/products/new',
                method: 'POST',
                body: {
                    ...initialProduct,
                }
            }),
            invalidatesTags: [
                { type: 'Product', id: "LIST" }
            ]
        }),
        updateProduct: builder.mutation({
            query: initialProduct => ({
                url: `/products/${initialProduct.id}`,
                method: 'PATCH',
                body: {
                    ...initialProduct,
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: arg.id }
            ]
        }),
        deleteProduct: builder.mutation({
            query: ({ id }) => ({
                url: `/products/${id}`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Product', id: arg.id }
            ]
        }),
    }),
})

export const {
    useGetProductsQuery,
    useGetCategoryProductsQuery,
    useGetProductByUserIdQuery,
    useAddNewProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productsApiSlice

// returns the query result object
export const selectProductsResult = productsApiSlice.endpoints.getProducts.select()

// creates memoized selector
const selectProductsData = createSelector(
    selectProductsResult,
    productsResult => productsResult.data // normalized state object with ids & entities
)

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllProducts,
    selectById: selectProductById,
    selectIds: selectProductIds
    // Pass in a selector that returns the products slice of state
} = productsAdapter.getSelectors(state => selectProductsData(state) ?? initialState)