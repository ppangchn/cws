import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios'

class TotalProductSaleChart extends Component{
  constructor(){
    super();
    this.state = {
      chartData:[]
    }
  }

  static defaultProps = {
    displayTitle:true,
    location:'City'
  }
  async componentWillMount(){
    const res = await axios.get(`http://10.0.0.134:4000/getMemPurchase`)
    console.log(res)
    const  body = await res.data;
    console.log(body)
    let labels = [];
    let data = [];
    let backgroundColor = []; 
    const color = [  'rgba(255, 99, 132, 0.6)',
    'rgba(54, 162, 235, 0.6)',
    'rgba(255, 206, 86, 0.6)',
    'rgba(75, 192, 192, 0.6)',
    'rgba(153, 102, 255, 0.6)',
    'rgba(255, 159, 64, 0.6)',
    'rgba(255, 99, 132, 0.6)']
    for ( let i in body.rows){
      labels.push(body.rows[i].Firstname+" "+body.rows[i].LastName)
      data.push(body.rows[i]['sum(Total)'])
      let ran = Math.floor((Math.random() * 100) % 7)
      backgroundColor.push(color[ran])
    }
    this.setState({labels,data,backgroundColor});
    console.log(this.state)
    this.getChartData();
  }

  getChartData(){
    
    this.setState({
      chartData:{
        labels: this.state.labels,
        datasets:[
          {
            label:'ProductSale(Bath)',
            data:this.state.data,
            backgroundColor:this.state.backgroundColor
          }
        ]
      }
    });
    console.log(this.state.chartData);
  }
  render(){
      console.log('earth',this.state.chartData)
    return (
        <Bar
          data={this.state.chartData}
          options={{
            title:{
              display:this.props.displayTitle,
              text:'TotalProductSaleOfEachMember',
              fontSize:25
            },
            legend:{
              display: false,
            }
          }}
        />
    )
  }
}

export default TotalProductSaleChart;

