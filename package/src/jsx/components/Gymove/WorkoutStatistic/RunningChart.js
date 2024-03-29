import React from "react";
import ReactApexChart from "react-apexcharts";

class RunningChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{ name: "Running", data: [20, 40, 20, 80, 40, 40] }],
      options: {
        chart: {
          height: 400,
          type: "area",
          group: "social",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {          
          width: [4],
          colors: ["#A02CFA"],
          curve: "smooth",
        },
        legend: {
          show: false,
          tooltipHoverFormatter: function (val, opts) {
            return (
              val +
              " - " +
              opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
              ""
            );
          },
          markers: {
            fillColors: ["#A02CFA"],
            width: 19,
            height: 19,
            strokeWidth: 0,
            radius: 19,
          },
        },
        markers: {
          strokeWidth: [4],
          strokeColors: ["#A02CFA"],
          border: 0,
          colors: ["#fff"],
          hover: {
            size: 6,
          },
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          labels: {
            style: {
              colors: "#787878",
              fontSize: "14px",
              fontFamily: "Poppins",
              fontWeight: 100,
            },
          },
        },
        yaxis: {
          labels: {
            offsetX: -16,
            style: {
              colors: "#787878",
              fontSize: "14px",
              fontFamily: "Poppins",
              fontWeight: 100,
            },
          },
        },
        fill: {
          colors: ["#A02CFA"],
          type: "solid",
          opacity: 0.7,
        },
        colors: ["#A02CFA"],
        grid: {
          borderColor: "#f1f1f1",
          xaxis: {
            lines: {
              show: true,
            },
          },
        },
        responsive: [
          {
            breakpoint: 575,
            options: {
              chart: {
                height: 250,
              },
            },
          },
        ],
      },
    };
  }
  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="area"
          height={400}
        />
      </div>
    );
  }
}

export default RunningChart;
