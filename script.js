document.getElementById("userForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
  
    const userData = {
      username,
      email,
    };
  
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      const data = await response.json();
      document.getElementById("response").innerHTML = `User created: ${data.username}`;
    } catch (error) {
      document.getElementById("response").innerHTML = `Error: ${error.message}`;
    }
  });
  