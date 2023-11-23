function updateProgressBar(percentage) {
    document.getElementById('progressBar').style.width = percentage + '%';
}

document.getElementById('csvFileInput').addEventListener('change', function(event) {
    updateProgressBar(0); // Reset progress bar
    const reader = new FileReader();
    reader.onload = async function(event) {
        const text = event.target.result;
        const chartData = await parseCSV(text);
        drawChart(chartData);
        updateProgressBar(100); // Parsing completed
    };
    reader.readAsText(event.target.files[0]);
});

function parseCSV(text) {
    return new Promise((resolve) => {
        const lines = text.split('\n');
        const monthlyData = {}; // Object to store data by month

        for (let index = 2; index < lines.length; index++) {
            const line = lines[index];
            setTimeout(() => {
                const row = line.split(';');
                if (row.length >= 3) {
                    const dateString = row[0]; // Format 'dd-MM-yyyy'
                    const value = parseFloat(row[2]);
                    const dateParts = dateString.split('-');
                    if (dateParts.length === 3 && !isNaN(value)) {
                        const monthYear = `${dateParts[2]}-${dateParts[1]}`; // Convert to 'yyyy-MM'

                        if (!monthlyData[monthYear]) {
                            monthlyData[monthYear] = { sum: 0, count: 0 };
                        }
                        monthlyData[monthYear].sum += value;
                        monthlyData[monthYear].count++;
                    }
                }

                updateProgressBar(Math.floor((index + 1) / lines.length * 100));
                if (index === lines.length - 1) {
                    const chartData = Object.keys(monthlyData).map(monthYear => {
                        const { sum, count } = monthlyData[monthYear];
                        return {
                            x: monthYear,
                            y: sum / count // Calculate the average
                        };
                    });
                    resolve(chartData);
                }
            }, 0);
        };
    });
}




function drawChart(chartData) {
    const ctx = document.getElementById('myChart').getContext('2d');

    // Check if a chart instance already exists
    if (window.myChartInstance) {
        window.myChartInstance.destroy(); // Destroy existing chart instance if present
    }

    // Create a new bar chart instance
    window.myChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'ta grosse conso chakal',
                data: chartData,
                backgroundColor: 'rgba(0, 123, 255, 0.5)',
                borderColor: 'rgba(0, 123, 255, 1)',
                borderWidth: 1,
            }]
        },
        options: {
            scales: {
                x: {
                    type: 'time',
                    time: {
                        parser: 'yyyy-MM', // Changed to month-year format
                        unit: 'month',
                        displayFormats: {
                            month: 'MMM yyyy'
                        }
                    }
                },
                y: {
                    beginAtZero: true
                }
            },
            responsive: true,
            maintainAspectRatio: true
        }
    });
}


