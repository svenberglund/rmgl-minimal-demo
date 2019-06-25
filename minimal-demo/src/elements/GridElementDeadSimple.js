import React from 'react';

export default class GridElementAwsome{
        static renderElement(i, sm) {

            // The only rule here is that you shall use the i parameter as key for the enclosing div.
            // with sm (the subscription data map) you do what ever you want

                let listItems =[...sm.keys()].map((key) =>
                        <li key={key}>{key} : {sm.get(key)}</li>
                );
                return <div key={i} style={{backgroundColor: 'Cornsilk' }}>
                    <p>This is a dead simple generic listening grid element.</p>
                    <ul>{listItems}</ul>
                </div>;
        };
}