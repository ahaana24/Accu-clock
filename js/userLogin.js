let estado = {};

document.addEventListener("DOMContentLoaded", function () {
  initializeEstado();
  addEventListeners();

  async function handleLogin(event) {
    event.preventDefault();

    const registerData = {
      dni: estado.dniInput.value,
      password: estado.passwordInput.value,
    };

    try {
      const response = await fetch(
        "https://java-app-latest-9axd.onrender.com/employee/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registerData),
        }
      );

      if (response.ok) {
        const result = await response.text();
        console.log("Login successful:", result);
        window.localStorage.setItem("dni", registerData.dni);
        window.location.href = "dashboard.html";
      } else {
        const errorText = await response.text();
        console.error("Login failed:", errorText);
        alert("Login failed. Please check your details and try again.");
      }
    } catch (error) {
      console.log("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  }

  function initializeEstado() {
    estado.form = document.getElementById("loginForm");
    estado.registerButton = document.getElementById("registerButton");
    estado.dniInput = document.getElementById("dni");
    estado.passwordInput = document.getElementById("password");
  }

  function addEventListeners() {
    if (estado.form) {
      estado.form.addEventListener("submit", handleLogin);
    } else {
      console.error("Login form not found.");
    }

    if (estado.registerButton) {
      estado.registerButton.addEventListener("click", () => {
        window.location.href = "register.html";
      });
    } else {
      console.error("Register button not found.");
    }
  }
});
