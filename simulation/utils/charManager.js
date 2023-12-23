function getChartData(monthlyData) {
  return new Promise((resolve) => {
      const chartDataConso = [];
      const chartDataProd = [];

      Object.keys(monthlyData).forEach((monthYear) => {
          const { sumConso, sumProd, count } = monthlyData[monthYear];

          chartDataConso.push({
              x: monthYear,
              y: sumConso / count
          });

          chartDataProd.push({
              x: monthYear,
              y: sumProd / count
          });
      });

      resolve({
          conso: chartDataConso,
          prod: chartDataProd
      });
  });
}



function drawChart(chartConso, chartProd) {
    const ctx = document.getElementById("myChart").getContext("2d");
  
    // Check if a chart instance already exists
    if (window.myChartInstance) {
      window.myChartInstance.destroy();
    }
  
    // Create a new bar chart instance
    window.myChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        datasets: [
          {
            label: "ta grosse conso chakal",
            data: chartConso,
            backgroundColor: "rgba(0, 123, 255, 0.5)",
            borderColor: "rgba(0, 123, 255, 1)",
            borderWidth: 1,
          },{
            label: "ton énorme production bg",
            data: chartProd,
            backgroundColor: "rgba(200, 123, 50, 0.5)",
            borderColor: "rgba(200, 123, 50, 1)",
            borderWidth: 1,
          }
        ],
      },
      options: {
        scales: {
          x: {
            type: "time",
            stacked: true,
            time: {
              parser: "yyyy-MM", // Changed to month-year format
              unit: "month",
              displayFormats: {
                month: "MMM",
              },
            },
          },
          y: {
            beginAtZero: true,
            stacked: true,
          },
        },
        responsive: true,
        maintainAspectRatio: true,
      },
    });
  }