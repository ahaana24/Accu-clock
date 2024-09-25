let estado = {};

document.addEventListener("DOMContentLoaded", function () {
  estado.timer = null;
  estado.seconds = 0;
  estado.isCounting = false;
  estado.clockInTime = "";
  estado.clockOutTime = "";
  estado.attendanceId = "";

  estado.table = document.getElementById("table");
  estado.signInBtn = document.getElementById("signInBtn");
  estado.signOutBtn = document.getElementById("signOutBtn");

  estado.signInBtn.addEventListener("click", handleSignIn);
  estado.signOutBtn.addEventListener("click", handleSignOut);

  estado.dropdownItem = document.querySelector(".dropdown-item");
  estado.dropdownItem.addEventListener("click", () => {
    window.location.href = "userLogin.html";
  });

  updateTimer();

  function updateTimer() {
    const hours = String(Math.floor(estado.seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((estado.seconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const secs = String(estado.seconds % 60).padStart(2, "0");
    document.getElementById(
      "timerDisplay"
    ).textContent = `${hours}:${minutes}:${secs}`;
  }

  function addClockInToTable(date, time) {
    const newRow = document.createElement("tr");

    const dateCell = document.createElement("td");
    const clockInCell = document.createElement("td");
    const clockOutCell = document.createElement("td");
    const remarksCell = document.createElement("td");

    dateCell.textContent = date;
    clockInCell.textContent = time;
    clockOutCell.id = "clockOutCell";

    newRow.appendChild(dateCell);
    newRow.appendChild(clockInCell);
    newRow.appendChild(clockOutCell);
    newRow.appendChild(remarksCell);

    estado.table.appendChild(newRow);
  }

  function updateClockOutInTable(time) {
    const clockOutCell = document.getElementById("clockOutCell");
    if (clockOutCell) {
      clockOutCell.textContent = time;
    }
  }

  function handleSignIn() {
    if (!estado.isCounting) {
      estado.isCounting = true;

      const currentDate = new Date().toLocaleDateString();
      estado.clockInTime = new Date().toLocaleTimeString();

      addClockInToTable(currentDate, estado.clockInTime);

      const clockInData = {
        dni: window.localStorage.getItem("dni"),
      };
      saveClockIn(clockInData);

      estado.timer = setInterval(() => {
        estado.seconds++;
        updateTimer();
      }, 1000);

      estado.signInBtn.disabled = true;
      estado.signOutBtn.disabled = false;
    }
  }

  function handleSignOut() {
    if (estado.isCounting) {
      estado.isCounting = false;
      clearInterval(estado.timer);
      estado.clockOutTime = new Date().toLocaleTimeString();

      updateClockOutInTable(estado.clockOutTime);

      const clockOutData = {
        attendanceId: estado.attendanceId,
      };
      saveClockOut(clockOutData);

      estado.signInBtn.disabled = false;
      estado.signOutBtn.disabled = true;
    }
  }

  async function saveClockIn(clockInData) {
    try {
      const response = await fetch(
        "https://java-app-latest-9axd.onrender.com/attendance/clock_in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(clockInData),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to save clock-in time: ${response.status} ${response.statusText}`
        );
      }

      const responseData = await response.json();
      estado.attendanceId = responseData.id;
    } catch (error) {
      console.error("Error in fetch:", error);
      alert(
        "There was a problem saving your clock-in time. Please check the console for more details."
      );
    }
  }

  async function saveClockOut(clockOutData) {
    try {
      const response = await fetch(
        "https://java-app-latest-9axd.onrender.com/attendance/clock_out",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(clockOutData),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to save clock-out time: ${response.status} ${response.statusText}`
        );
      }
    } catch (error) {
      console.error("Error in fetch:", error);
      alert(
        "There was a problem saving your clock-out time. Please try again."
      );
    }
  }

  function getStorageData() {
    let clockInData = localStorage.getItem(dni);
  }
});
