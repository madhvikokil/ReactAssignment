import React,{useEffect} from 'react';

let renderCount = 0;
 function Child() {
   
    useEffect(() => {
        renderCount ++;
    })
    return(<p>Render child : {renderCount}</p>)
}

export default Child;