import { useEffect, useState } from "react";

function App() {
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const username = "coalition";
      const password = "skills-test";
      const token = btoa(`${username}:${password}`);

      try {
        const response = await fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
          method: "GET",
          headers: {
            "Authorization": `Basic ${token}`,
            "Content-Type": "application/json"
          }
        });

        const data = await response.json();
        const jessica = data.find(p => p.name === "Jessica Taylor");
        setPatient(jessica);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Patient Data</h1>
      {patient ? (
        <div>
          <h2>{patient.name}</h2>
          <p>Age: {patient.age}</p>
          <p>Gender: {patient.gender}</p>
          <p>DOB: {patient.date_of_birth}</p>
          <img src={patient.profile_picture} alt="profile" width="150" />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
