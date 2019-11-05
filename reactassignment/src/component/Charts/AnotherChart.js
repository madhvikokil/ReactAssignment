import React, { PureComponent } from 'react';
import {PieChart,Pie,Cell} from 'recharts'
import Axios from '../../axios-orders';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
const RADIAN = Math.PI / 180;

export default class AnotherChart extends PureComponent {

	state={
		allUser:[],
		allPost:[],
		data:[]
	}



  chartForAuthor = async () => {
		let users=[];
		let posts=[];
		let newData=[];
		try {
         
            users = await Axios.get('/userData.json')
            posts = await Axios.get('/newPosts.json')
            .then(res=>{
                console.log(res);
                for ( let key in res.data ) {
                    // console.log("user",users.data);
                    // console.log("Posts:",posts);
                    posts.push({
                        ...res.data[key],
                        id: key
                    } );
                    console.log("id:",key);
                }
                 console.log("users:",users);
                // console.log("posts:",posts);
				Object.keys(users.data).forEach(key => {
                    console.log(users.data);
					const array = posts.filter(post => post.userId == key);
					if (array.length) {
					newData.push({name: users.data[key].name, value: array.length });
					}
				  })

                  this.setState({data:newData});
                  console.log("data",this.state.data);
				
			}
	)
	

		} catch (error) {
			console.log(error);
		}


	}
	
	componentDidMount(){

		this.chartForAuthor();
	
    }
    
    renderCustomizedLabel = ({
		cx, cy, midAngle, innerRadius, outerRadius, percent, index,
	}) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);
	
		return (
			<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
				{`${(percent * 100).toFixed(0)}%`}
			</text>
		);
	};
	
	render() {
 
		return (
			<PieChart width={400} height={400}>
				<Pie
					data={this.state.data}
					cx={300}
					cy={200}
					labelLine={false}
					label={this.renderCustomizedLabel}
					outerRadius={80}
					fill="#8884d8"
					dataKey="value"
				>
					{
						this.state.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
					}
				</Pie>
			</PieChart>
		);
	}
}
