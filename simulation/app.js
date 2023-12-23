let irradiationValues = [];

window.onload = async function() {
  irradiationValues = await loadIrradiation();
};

document
  .getElementById("csvFileInput")
  .addEventListener("change", function (event) {
    updateProgressBar(0);
    showProgressBar();
    const reader = new FileReader();
    reader.onload = async function (event) {
      const text = event.target.result;
      const timeSeriesData = await parseCSV(text, irradiationValues);
      // console.log(timeSeriesData);
      const monthlyData = await groupByMonth(timeSeriesData);
      // console.log(monthlyData);
      const chartData = await getChartData(monthlyData);
      // console.log(chartData);
      const chart = drawChart(chartData);
      hideProgressBar();
    };
    reader.readAsText(event.target.files[0]);
  });