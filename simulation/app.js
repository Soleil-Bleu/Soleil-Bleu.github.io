document
  .getElementById("csvFileInput")
  .addEventListener("change", function (event) {
    updateProgressBar(0); // Reset progress bar
    const reader = new FileReader();
    reader.onload = async function (event) {
      const text = event.target.result;
      const monthlyData = await parseCSV(text);
      const chartData = await getChartData(monthlyData);
      drawChart(chartData);
      updateProgressBar(100); // Parsing completed
    };
    reader.readAsText(event.target.files[0]);
  });