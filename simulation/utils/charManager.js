function getChartData(monthlyData) {
  return new Promise((resolve) => {
      const dataSurplus      = [];
      const dataConsoSolaire = [];
      const dataConsoReseau  = [];
      const dataConsoTotale  = [];

      Object.keys(monthlyData).forEach((monthYear) => {
          const { sumConso, sumProd, surplus, consoSolaire, consoReseau, count } = monthlyData[monthYear];

          dataSurplus.push({
              x: monthYear,
              y: surplus
          });

          dataConsoSolaire.push({
              x: monthYear,
              y: consoSolaire
          });

          dataConsoReseau.push({
            x: monthYear,
            y: consoReseau
        });

        dataConsoTotale.push({
          x: monthYear,
          y: sumConso
      });
      });

      resolve({
          surplus: dataSurplus,
          consoSolaire: dataConsoSolaire,
          consoReseau: dataConsoReseau,
          conso: dataConsoTotale,
      });
  });
}



function drawChart(chartData) {
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
            label: "ta conso totale",
            data: chartData.conso,
            backgroundColor: "rgba(50, 50, 0, 0.1)",
            borderColor:     "rgba(50, 50, 0, 1)",
            borderWidth: 1,
            xAxisID: "x2",
            order: 1,
          },{
            label: "ta conso réseau",
            data: chartData.consoReseau,
            backgroundColor: "rgba(100, 203, 50, 0.5)",
            borderColor:     "rgba(100, 203, 50, 1)",
            borderWidth: 1,
            stack: 'Stack 0',
            xAxisID: "x1",
            order:2,
          },{
            label: "ta conso solaire",
            data: chartData.consoSolaire,
            backgroundColor: "rgba(200, 123, 50, 0.5)",
            borderColor:     "rgba(200, 123, 50, 1)",
            borderWidth: 1,
            stack: 'Stack 0',
            xAxisID: "x1",
            order: 2,
          },{
            label: "ton surplus",
            data: chartData.surplus,
            backgroundColor: "rgba(0, 123, 255, 0.5)",
            borderColor:     "rgba(0, 123, 255, 1)",
            borderWidth: 1,
            stack: 'Stack 0',
            xAxisID: "x1",
            order: 2,
          }
        ],
      },
      options: {
        scales: {
          x1: {
            stacked: true,
            display: true, // Set this to true to display this axis
            type: 'time',
            time: {
              unit: 'month',
              displayFormats: {
                month: 'MMM'
              }
            },
            grid: {
              display: false
            },
            offset: true,
          },
          x2: {
            display: false,
            type: 'time',
            offset: true,
            ticks: {
              display: false,
            }
          },
          y: {
            stacked: true,
            ticks: {
              beginAtZero: true,
            }
          },
        },
        responsive: true,
        maintainAspectRatio: true,
      }
    });
  return window.myChartInstance;
  }

