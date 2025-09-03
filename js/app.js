async function fetchPatientData() {
    try {
        const res = await fetch("https://fedskillstest.coalitiontechnologies.workers.dev/");
        const data = await res.json();
        
        // Filter for Jessica Taylor
        const patient = data.find(p => p.name === "Jessica Taylor");
        if (patient) {
            populateUI(patient);
            renderChart(patient.diagnosis_history);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

function populateUI(patient) {
    document.getElementById("patient-name").textContent = patient.name;
    document.getElementById("dob").textContent = patient.date_of_birth;
    document.getElementById("gender").textContent = patient.gender;
    document.getElementById("phone").textContent = patient.phone_number;
    document.getElementById("insurance").textContent = patient.insurance_type;
}
