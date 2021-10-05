import React, { useState, useReducer, createContext } from "react";

export const OrderContext = createContext(null);

const initalState = {
    adminId: '',
    orders: []
};

const reducer = (state, action) => {
    console.log(action, 'this is action')
    switch (action.type) {
        case 'menu-item-added': {
            //copy over exisiting orders
            const existingOrders = [...state.orders];
            const itemMatch = existingOrders.find((item) =>
                item._id === action.incomingOrder._id
            );

            if (itemMatch) {
                itemMatch.quantity = itemMatch.quantity + action.incomingOrder.quantity;

                const itemIndex = existingOrders.findIndex((item) =>
                    item._id === action.incomingOrder._id
                );
                existingOrders[itemIndex] = itemMatch;

            } else {
                // add incoming order to exisiting orders
                existingOrders.push(action.incomingOrder);
            }

            return {
                ...state,
                orders: existingOrders
            };
        }

        case 'menu-item-deleted': {
            const existingOrders = [...state.orders]
            const itemIndex = existingOrders.findIndex(item => item._id === action.itemIdToDeleteFromOrder)

            existingOrders.splice(itemIndex, 1)

            return {
                ...state,
                orders: existingOrders
            }
        }

        case 'order-submitted':
            return
        default: throw new Error(`Unrecognized action: ${action.type}`)
    }
}
export const OrderProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initalState);

    const addOrder = (itemToAddToOrder) => {
        dispatch({
            type: "menu-item-added",
            incomingOrder: {
                ...itemToAddToOrder,
            }

        });
    };

    const deleteOrder = (itemIdToDeleteFromOrder) => {
        dispatch({
            type: "menu-item-deleted",
            itemIdToDeleteFromOrder
        })
    }

    //change all to cart

    //action for updating just the admin id. 


    return (
        <>
            <OrderContext.Provider value={{
                state,
                actions: { addOrder, deleteOrder }
            }}>
                {children}
            </OrderContext.Provider>
        </>
    )
};