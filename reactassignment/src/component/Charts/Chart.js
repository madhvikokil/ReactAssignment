import React, { PureComponent } from 'react';
import Axios from '../../axios-orders';
import {
  PieChart, Pie, Cell,
} from 'recharts';



const COLORS = ['#7131C4', '#11010F'];


export default class Example extends PureComponent {


  state={
    published:'',
    UnPublished:'',
    lists:'',
    user:''
  }
  componentDidMount = async() => {

    // Published and unpublished
    let response = await Axios.get('/newPosts.json')
 
        const fetchedData = [];
            for (let key in response.data) {
                fetchedData.push({
                    ...response.data[key],
                    id: key
    })
}
      console.log("fetchedOrders :",fetchedData)
      let showArray = [];
      showArray= fetchedData.filter(post => post.type =='published');

      console.log("showArray length : ",showArray.length);
      let lengthInpublish = showArray.length;
      console.log("publish ke length ...",lengthInpublish);

      let showDraft =[];
      showDraft= fetchedData.filter(post => post.type =='draft');

      console.log("showDraft length : ",showDraft.length);
      let lengthIndraft = showDraft.length;
      console.log("draft ke length ...",lengthIndraft);

      this.setState({published:lengthInpublish});
      this.setState({UnPublished:lengthIndraft})

  }
render() {
     const data = [
      { name: 'Published', value: this.state.published },
      { name: 'UnPublished', value:this.state.UnPublished  }
     
    ];

    console.log(data);
    return (<>
     
      <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          payload="name"
          cx={300}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          nameKey="name"
          label
          
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}></Cell> )
          }
          
        </Pie>
      </PieChart>
      </>
    );
  }
}




  
