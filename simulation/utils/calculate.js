function groupByMonth(timeSeriesData) {
    const PAS = 5; // in minutes
    const monthlyData = {};

    for (const [date, cons, prod] of timeSeriesData) {
        const monthYear = date.slice(0, 7); // 'yyyy-MM'
        if (!monthlyData[monthYear]) { // new month
            monthlyData[monthYear] = { sumConso: 0, sumProd: 0, count: 0 };
        }
        monthlyData[monthYear].sumConso += cons;
        monthlyData[monthYear].sumProd += prod;
        monthlyData[monthYear].sumProdConsommee += prod;
        monthlyData[monthYear].count++;
    }

    Object.keys(monthlyData).forEach(monthYear => {
        monthlyData[monthYear].sumConso /= 60 / PAS;
        monthlyData[monthYear].sumProd /= 60 / PAS;
    });

    return monthlyData;
}