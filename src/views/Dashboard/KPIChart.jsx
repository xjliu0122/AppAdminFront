import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';
const brandPrimary = '#20a8d8';
const brandSuccess = '#4dbd74';
const brandInfo = '#63c2de';
const brandDanger = '#f86c6b';
function convertHex(hex, opacity) {
  hex = hex.replace('#', '');
  var r = parseInt(hex.substring(0, 2), 16);
  var g = parseInt(hex.substring(2, 4), 16);
  var b = parseInt(hex.substring(4, 6), 16);
 
  var result = 'rgba(' + r + ',' + g + ',' + b + ',' + opacity / 100 + ')';
  return result;
}

//Random Numbers
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

var elements = 27;
var data1 = [];
var data2 = [];
var data3 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(random(50, 200));
  data2.push(random(80, 100));
  data3.push(65);
}
const mainChart = {
  labels: [
    'M',
    'T',
    'W',
    'T',
    'F',
    'S',
    'S',
    'M',
    'T',
    'W',
    'T',
    'F',
    'S',
    'S',
    'M',
    'T',
    'W',
    'T',
    'F',
    'S',
    'S',
    'M',
    'T',
    'W',
    'T',
    'F',
    'S',
    'S'
  ],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: convertHex(brandInfo, 10),
      borderColor: brandInfo,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data1
    }, {
      label: 'My Second dataset',
      backgroundColor: 'transparent',
      borderColor: brandSuccess,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 2,
      data: data2
    }, {
      label: 'My Third dataset',
      backgroundColor: 'transparent',
      borderColor: brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [
        8, 5
      ],
      data: data3
    }
  ]
}

const mainChartOpts = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },
  scales: {
    xAxes: [
      {
        gridLines: {
          drawOnChartArea: false
        }
      }
    ],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(250 / 5),
          max: 250
        }
      }
    ]
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3
    }
  }
}
class KPIChart extends Component {
  constructor(props) {
    super(props)
    this.props = props

  }
  render() {
    return (

      <div className="card">
        <div className="card-block ">
          <div className="row">
            <div className="col-sm-3">
              <h4 className="card-title mb-0">KPI {this.props.global.loading}</h4>
            </div>
            <div className="col-sm-9">
              <button type="button" className="btn btn-primary float-right">
                <i className="icon-refresh"></i>
              </button>
              <div
                className="btn-toolbar float-right"
                role="toolbar"
                aria-label="Toolbar with button groups">
                <div className="btn-group mr-1" data-toggle="buttons" aria-label="First group">
                  <label className="btn btn-outline-secondary active">
                    <input type="radio" name="options" id="dayKPI"/>
                    Day
                  </label>
                  <label className="btn btn-outline-secondary ">
                    <input type="radio" name="options" id="monthKPI"/>
                    Month
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className="chart-wrapper col-11"
              style={{
              height: 300 + 'px',
              marginTop: 40 + 'px',
              marginBottom: 40 + 'px',
              marginRight: 'auto',
              marginLeft: 'auto',
              width: '98%'
            }}>
              <Line data={mainChart} options={mainChartOpts} height={300}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default KPIChart;