function renderChart(history) {
    const ctx = document.getElementById("bpChart").getContext("2d");
    const years = history.map(h => h.year);
    const systolic = history.map(h => h.blood_pressure.systolic.value);
    const diastolic = history.map(h => h.blood_pressure.diastolic.value);

    new Chart(ctx, {
        type: "line",
        data: {
            labels: years,
            datasets: [
                {
                    label: "Systolic",
                    data: systolic,
                    borderColor: "red",
                    fill: false
                },
                {
                    label: "Diastolic",
                    data: diastolic,
                    borderColor: "blue",
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
