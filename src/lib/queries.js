import {  gql } from '@apollo/client';


export const GET_PRODUCTS = gql`
    query productsByCategory($category: String!) {
        products(category: $category){
            id,
            name,
            price,
            filter
        }
    }
`
