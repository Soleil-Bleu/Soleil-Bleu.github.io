function parseCSV(text) {
    return new Promise((resolve) => {
        const YEAR = 2022
        const lines = text.split("\n");
        const monthlyData = {}; // Object to store data by month

        for (let index = 2; index < lines.length; index++) {
            const line = lines[index];
            setTimeout(() => {
                const row = line.split(";");
                if (row.length >= 3) {
                const dateString = row[0]; // Format 'dd-MM-yyyy'
                const value = parseFloat(row[2]);
                const dateParts = dateString.split("-");
                if (dateParts.length === 3 && !isNaN(value)) {
                    const yearFromData = parseInt(dateParts[2], 10);
                    if (yearFromData === YEAR) {
                        const monthYear = `${dateParts[2]}-${dateParts[1]}`; // Convert to 'yyyy-MM'

                        if (!monthlyData[monthYear]) { // new month
                            monthlyData[monthYear] = { sum: 0, count: 0 };
                        }
                        monthlyData[monthYear].sum += value;
                        monthlyData[monthYear].count++;
                    }
                }
                }

                updateProgressBar(Math.floor(((index + 1) / lines.length) * 100));
                if (index === lines.length - 1) {
                resolve(monthlyData);
                }
            }, 0);
        }
    });
}
