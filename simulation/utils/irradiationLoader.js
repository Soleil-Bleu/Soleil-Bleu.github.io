async function loadIrradiation() {
        const response = await fetch('./Irradiation.csv');
        const text = await response.text();
        return parseIrradiation(text);
}

function parseIrradiation(text) {
    const lines = text.split("\n");
    const irradiationValues = [];

    // Start from index 1 to skip the header
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const columns = line.split(",");
        const irradiation = parseFloat(columns[2]);
        irradiationValues.push(irradiation);
    }
    
    return irradiationValues;
}