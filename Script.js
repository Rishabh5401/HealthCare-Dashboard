const username = "coalition";
const password = "skills-test";
const token = btoa(`${username}:${password}`);

async function fetchPatientData() {
  try {
    const response = await fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
      method: "GET",
      headers: {
        "Authorization": `Basic ${token}`
      }
    });

    const data = await response.json();

    // Get Jessica only
    const jessica = data.find(p => p.name === "Jessica Taylor");
    if (jessica) {
      populateUI(jessica);
      renderChart(jessica);
    }

    return jessica;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function populateUI(patient) {
  // Profile Info
  document.getElementById("patient-photo").src = patient.profile_picture;
  document.getElementById("patient-name").textContent = patient.name;
  document.getElementById("patient-dob").textContent = patient.date_of_birth;
  document.getElementById("patient-gender").textContent = patient.gender;
  document.getElementById("patient-phone").textContent = patient.phone_number;
  document.getElementById("patient-emergency").textContent = patient.emergency_contact;
  document.getElementById("patient-insurance").textContent = patient.insurance_type;

  // Lab Reports
  const reportsList = document.getElementById("lab-reports-list");
  reportsList.innerHTML = ""; // clear
  patient.lab_results.forEach(report => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${report}
      <button><img src="assets/download_FILL0_wght300_GRAD0_opsz24 (1).svg" alt="download"></button>
    `;
    reportsList.appendChild(li);
  });
}

function renderChart(patient) {
  const ctx = document.getElementById("bpChart").getContext("2d");

  const labels = patient.diagnosis_history.map(d => d.month);
  const systolic = patient.diagnosis_history.map(d => d.blood_pressure.systolic.value);
  const diastolic = patient.diagnosis_history.map(d => d.blood_pressure.diastolic.value);

  new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Systolic",
          data: systolic,
          borderColor: "#FF6B6B",
          borderWidth: 2,
          fill: false,
          tension: 0.4
        },
        {
          label: "Diastolic",
          data: diastolic,
          borderColor: "#4D96FF",
          borderWidth: 2,
          fill: false,
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { position: "bottom" }
      },
      scales: {
        y: { beginAtZero: false }
      }
    }
  });
}

// Run on page load
window.onload = fetchPatientData;
