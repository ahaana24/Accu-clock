document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const loginButton = document.getElementById("loginButton");

  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const dni = document.getElementById("dni").value;
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const phone = document.getElementById("phone").value;
      const address = document.getElementById("address").value;
      const birthday = document.getElementById("birthday").value;
      const department = document.getElementById("department").value;
      const roleElement = document.getElementById("role");
      const role = roleElement ? roleElement.value : "";

      const registerData = {
        dni: dni,
        name: name,
        email: email,
        password: password,
        phone: phone,
        address: address,
        birthday: birthday,
        department: department,
        role: role,
      };

      try {
        const response = await fetch(
          "https://java-app-latest-9axd.onrender.com/employee/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(registerData),
          }
        );

        if (response.ok) {
          const result = await response.text();
          console.log("Registration successful:", result);

          window.location.href = "dashboard.html";
        } else {
          const errorText = await response.text();
          console.error("Registration failed:", errorText);
          alert(
            "Registration failed. Please check your details and try again."
          );
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred. Please try again.");
      }
    });

    if (loginButton) {
      loginButton.addEventListener("click", function () {
        window.location.href = "userLogin.html";
      });
    } else {
      console.error("Login button not found.");
    }
  } else {
    console.error("Form element not found.");
  }
});
