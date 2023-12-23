function groupByMonth(timeSeriesData) {
    const PAS = 5; // in minutes
    const monthlyData = {};

    for (const [date, conso, prod] of timeSeriesData) {
        const monthYear = date.slice(0, 7); // 'yyyy-MM'
        if (!monthlyData[monthYear]) { // new month
            monthlyData[monthYear] = { sumConso: 0, sumProd: 0, surplus: 0, consoSolaire: 0, consoReseau: 0, count: 0 };
        }
        monthlyData[monthYear].sumConso += conso;
        monthlyData[monthYear].sumProd  += prod;
        monthlyData[monthYear].surplus      += conso < prod ? (prod - conso) : 0;
        monthlyData[monthYear].consoSolaire += conso < prod ? conso : prod;
        monthlyData[monthYear].consoReseau  += conso < prod ? 0 : (conso - prod);
        monthlyData[monthYear].count++;
    }

    Object.keys(monthlyData).forEach(monthYear => {
        monthlyData[monthYear].sumConso     /= monthlyData[monthYear].count * 60 / PAS;
        monthlyData[monthYear].sumProd      /= monthlyData[monthYear].count * 60 / PAS;
        monthlyData[monthYear].surplus      /= monthlyData[monthYear].count * 60 / PAS;
        monthlyData[monthYear].consoSolaire /= monthlyData[monthYear].count * 60 / PAS;
        monthlyData[monthYear].consoReseau  /= monthlyData[monthYear].count * 60 / PAS;
    });

    return monthlyData;
}