import React from 'react';

export default class GridElementAwsome{
        static renderElement(i, sm) {

            // The only rule here is that you shall use the i parameter as key for the enclosing div.
            // with sm (the subscription data map) you do what ever you want, see below

                let listItems =[...sm.keys()].map((key) =>
                        <li key={key}>{key} : {sm.get(key)}</li>
                );
                return <div key={i}>
                    <p>This is a generic listening grid element - replace it with your iplementation.</p>
                    <ul>{listItems}</ul>
                </div>;
        };
}