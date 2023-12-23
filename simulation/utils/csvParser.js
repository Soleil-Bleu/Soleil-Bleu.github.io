function parseCSV(text, irradiationValues) {
    return new Promise((resolve) => {
        const YEAR = 2022;
        const PUISSANCE = 150;
        const efficacite_intensite_lumineuse_basse = 0.005;
        const efficacite_intensite_lumineuse_haute = 0.21; // TODO à changer avec la loc
        const ratio_surface_puissance = 222;

        const lines = text.split("\n");
        const timeSeriesData = [];

        for (let index = 2; index < lines.length - 1; index++) { // last line empty
            const line = lines[index];
            setTimeout(() => {
                const row = line.split(";");
                const cons = parseFloat(row[2]) / 1000 // W --> kW

                // 'dd-MM-yyyy' and 'HH:mm' to 'yyyy-MM-ddTHH:mm'
                const isoDateTime = row[0].split('-').reverse().join('-') + 'T' + row[1]
                // const date = new Date(isoDateTime);

                if (parseInt(isoDateTime.slice(0, 4)) === YEAR) {
                    const irrad = irradiationValues[timeSeriesData.length]
                    const prod = (irrad < 5 ? efficacite_intensite_lumineuse_basse * irrad : efficacite_intensite_lumineuse_haute * irrad) / ratio_surface_puissance
                    timeSeriesData.push([ isoDateTime, cons, prod * PUISSANCE ]);
                }

                updateProgressBar(Math.floor(((index + 1) / lines.length) * 100));

                if (index === lines.length - 2) { // last line empty
                    resolve(timeSeriesData);
                }
            }, 0);
        }
    });
}
