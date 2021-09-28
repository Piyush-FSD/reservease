import React from 'react';
import SupremeTacoMenu from './SupremeTaco.menu';

export const SupremeTaco = () => {



    return (
        <div>
            {SupremeTacoMenu.map(({ name, description, price }) => {
                return (
                    <div>
                        <h3>{name}</h3>
                        <h4>{description}</h4>
                        <h4>{price}</h4>
                    </div>)
            })}
        </div>
    )
};