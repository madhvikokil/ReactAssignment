import React from 'react';
import AnotherChart from './AnotherChart';
import Chart from './Chart';

class ChartsShown extends React.Component{
    render(){
        return(
            <>
            <Chart />
            <AnotherChart />
            </>
        )
    }
}

export default ChartsShown;