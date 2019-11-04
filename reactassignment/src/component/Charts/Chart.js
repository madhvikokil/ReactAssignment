import React, { PureComponent } from 'react';
import Axios from '../../axios-orders';
import {
  PieChart, Pie, Sector, Cell,
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


Axios.get('/userData.json')
  .then(res => {
 
    console.log("res.data",res.data);
    console.log("res :",res);
    
    Axios.get('/newPosts.json')
    .then(response => {
      console.log("nepost ka response: ",response);
    })
    const fetchedData = [];
    for (let key in response.data) {
        fetchedData.push({
            ...response.data[key],
            id: key
})

}
console.log("-----------------------");
console.log("fetched data :",fetchedData);

    console.log(Object.keys(res.data));
    // Axios.get('/newPosts.json')
    // .then(reponse => {
    //   console.log(response)
    //     })



console.log("fetchedData:",fetchedData);

  })
//   Axios.get('/newPosts.json')
//   .then(response2 => {
//     console.log("new response");
//     console.log(response2);
//     console.log(response2.data.title);
//   })
  
  }
render() {
     const data = [
      { name: 'Published', value: this.state.published },
      { name: 'UnPublished', value:this.state.UnPublished  }
     
    ];

    const data2 = [
      {user:this.state.user,value:this.state.lists}
    ]
    console.log(data);
    return (<>
     
      <PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          payload="name"
          cx={350}
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
        <p> PUBLISHED VS UNPUBLISHED </p>
        <Pie
          data={data2}
          cx={800}
          cy={200}
          startAngle={180}
          endAngle={0}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {
            data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
          }
        </Pie>
      </PieChart>
      </>
    );
  }
}
