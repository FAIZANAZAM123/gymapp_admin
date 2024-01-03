import React from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
class PlanList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        { name: "Distance", data: [] },
      ],
      options: {
        chart: {
          height: 200,
          type: "area",
          group: "social",
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
          dropShadow: {
            enabled: true,
            enabledOnSeries: undefined,
            top: 5,
            left: 0,
            blur: 3,
            color: '#000',
            opacity: 0.1
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [3],
          colors: ["#0B2A97"],
          curve: "smooth",
        },
        legend: {
          show: false,
          tooltipHoverFormatter: function(val, opts) {
            return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
          },
        },
        markers: {
          strokeWidth: [3],
          strokeColors: ["#0B2A97"],
          border: 0,
          colors: ["#fff"],
          hover: {
            size: 5,
          },
        },
        xaxis: {
          categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          labels: {
            style: {
              colors: "#818995",
              fontSize: "12px",
              fontFamily: "Poppins",
              fontWeight: 50,
            },
          },
        },
        yaxis: {
          labels: {
            offsetX: -16,
            style: {
              colors: '#818995',
              fontSize: "12px",
              fontFamily: "Poppins",
              fontWeight: 50,
            },
          },
        },
        fill: {
          colors: ["#0b2a97"],
          type: "solid",
          opacity: 0,
        },
        colors: ["#0B2A97"],
        grid: {
          borderColor: "transparent",
          xaxis: {
            lines: {
              show: true,
            },
          },
        },
        responsive: [
          {
            breakpoint: 1601,
            options: {
              chart: {
                height: 400,
              },
            },
          },
          {
            breakpoint: 768,
            options: {
              chart: {
                height: 250,
              },
              markers: {
                strokeWidth: [4],
                strokeColors: ["#0B2A97"],
                border: 0,
                colors: ["#fff"],
                hover: {
                  size: 6,
                },
              },
              stroke: {
                width: [6],
                colors: ["#0B2A97"],
                curve: "smooth",
              },
            },
          },
        ],
      },
    };
  }


  fetchMonthlyEarnings = async () => {
    try {
      // Fetch adminId from local storage
      const adminId = localStorage.getItem("id");

      // Check if adminId is present
      if (!adminId) {
        console.error("AdminId not found in local storage");
        return;
      }

      // Fetch monthly earnings for the specific admin
      const response = await axios.get(`http://localhost:5000/monthlyEarnings/${adminId}`);
      const monthlyEarnings = response.data.monthlyEarnings;

      // Dummy data for testing
      const dummyData = [
        { month: 'January', amount: 1200 },
        { month: 'February', amount: 1500 },
        { month: 'March', amount: 800 },
        // Add more dummy data as needed
      ];

      // Merge dummy data with fetched data
      const mergedData = [...monthlyEarnings, ...dummyData];

      // Update the state with the merged data
      this.setState({
        series: [{ name: "Earnings", data: mergedData.map(entry => entry.amount) }],
      });
    } catch (error) {
      console.error("Error fetching monthly earnings:", error);
    }
  };

  componentDidMount() {
    this.fetchMonthlyEarnings();
  }

  // fetchMonthlyEarnings = async () => {
  //   try {
      
  //     const response = await axios.get(`http://localhost:5000/monthlyEarnings`); // Adjust the URL if needed
  //     const monthlyEarnings = response.data.monthlyEarnings;

  //     const dummyData = [
  //       { month: 'January', amount: 1200 },
  //       { month: 'February', amount: 1500 },
  //       { month: 'March', amount: 800 },
  //       // Add more dummy data as needed
  //     ];

  //     const mergedData = [...monthlyEarnings, ...dummyData];


  //     // Update the state with the fetched data
  //     this.setState({
  //       // series: [{ name: "Earnings", data: monthlyEarnings.map(entry => entry.amount) }],


  //       series: [{ name: "Earnings", data: mergedData.map(entry => entry.amount) }],
  //     });
  //   } catch (error) {
  //     console.error("Error fetching monthly earnings:", error);
  //   }
  // };

  // componentDidMount() {
  //   this.fetchMonthlyEarnings();
  // }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="area"
          height={200}
        />
      </div>
    );
  }
}

export default PlanList;
