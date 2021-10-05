import React, { useReducer } from 'react';
import produce from "immer"

import SupremeTacoMenu from './SupremeTaco.menu';

const initialState = [];

const reducer = (state, action) => {
    switch (action.type) {
        case 'menu-item-added':
            return produce(state, draft => {
                const item = draft.find((elem) => action.id === elem.id)

                if (item) {
                    item.count++
                } else {
                    draft.push({
                        id: action.id,
                        title: action.title,
                        count: 1
                    })
                }
            })

        case 'menu-item-removed':
            return produce(state, draft => {
                const item = draft.find((elem) => action.id === elem.id)

                if (item) {
                    item.count--
                }
            })

        case 'order-submitted':
            return []

        default:
            throw new Error("invalid action")
    }
}

export const SupremeTaco = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <div>
            {SupremeTacoMenu.map(({ id, title, description, price }) => {
                return (
                    <div>
                        <h3>{title}</h3>
                        <h4>{description}</h4>
                        <h4>{price}</h4>
                        <button onClick={() => dispatch({
                            type: "menu-item-added", id, title
                        })}>BUY</button>
                    </div>
                )
            })}
            <>
                <div>TEST AREA</div>
                <button onClick={() => dispatch({
                    type: "order-submitted", id: "9dgjvh98j39t8r4",
                    title: "Taco0000"
                })}>Test</button>
                {state.map(({ id, title, count }) => {
                    return (
                        <div>
                            <h3>{id}</h3>
                            <h4>{title}</h4>
                            <h4>{count}</h4>
                        </div>
                    )
                })}
            </>
        </div>
    )
};