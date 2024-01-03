import React from "react";
import ReactApexChart from "react-apexcharts";

class PieChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [20, 35, 45],
      options: {
        chart: {
          type: "donut",
          height: 200,
        },
        legend: {
          show: false,
        },
        fill: {
          colors:['#FF9900','#0B2A97','#A02CFA'],
        },
        stroke: {
          width: 0,
        },
        colors:['#FF9900','#0B2A97','#A02CFA'],
        dataLabels: {
          enabled: false,
        },
      },
    };
  }
  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="donut"
          height={200}
        />
      </div>
    );
  }
}

export default PieChart;
