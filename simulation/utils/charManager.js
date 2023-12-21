function getChartData(monthlyData) {
    return new Promise((resolve) => {
        const chartData = Object.keys(monthlyData).map((monthYear) => {
            const { sum, count } = monthlyData[monthYear];
            return {
            x: monthYear,
            y: sum / count, // Calculate the average
            };
        });
        resolve(chartData);
    });
}



function drawChart(chartData) {
    const ctx = document.getElementById("myChart").getContext("2d");
  
    // Check if a chart instance already exists
    if (window.myChartInstance) {
      window.myChartInstance.destroy(); // Destroy existing chart instance if present
    }
  
    // Create a new bar chart instance
    window.myChartInstance = new Chart(ctx, {
      type: "bar",
      data: {
        datasets: [
          {
            label: "ta grosse conso chakal",
            data: chartData,
            backgroundColor: "rgba(0, 123, 255, 0.5)",
            borderColor: "rgba(0, 123, 255, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "time",
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
          },
        },
        responsive: true,
        maintainAspectRatio: true,
      },
    });
  }