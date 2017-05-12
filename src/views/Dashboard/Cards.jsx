import React, {Component} from 'react';


class Cards extends Component {

  render() {
    return (

      <div className="row">
        <div className="col-sm-6 col-lg-3">
          <div className="card card-inverse card-danger">
            <div className="card-block pb-0">
              <h4 className="mb-0">15</h4>
              <p>Pending</p>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="card card-inverse card-primary">
            <div className="card-block pb-0">
              <h4 className="mb-0">23</h4>
              <p>Today</p>
            </div>
            {/*<div className="chart-wrapper px-1">
                <Line data={cardChartData1} options={cardChartOpts1} height={70}/>
              </div>*/}
          </div>
        </div>

        <div className="col-sm-6 col-lg-3">
          <div className="card card-inverse card-info">
            <div className="card-block pb-0">
              <h4 className="mb-0">2301</h4>
              <p>This Month</p>
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3">
          <div className="card card-inverse card-warning">
            <div className="card-block pb-0">
              <h4 className="mb-0">213</h4>
              <p>Total Clients</p>
            </div>

          </div>
        </div>
      </div>

    )
  }
}

export default Cards;