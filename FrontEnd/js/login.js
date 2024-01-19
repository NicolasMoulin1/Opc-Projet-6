
//**** Variables ****//
const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.querySelector("form");
const errorText = document.querySelector(".errorText");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const userEmail = email.value;
  const userPassword = password.value;
  console.log(userEmail, userPassword);

  const url = "http://localhost:5678/api/users/login";
  const data = {
    email: userEmail,
    password: userPassword,
  };
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      // Vérification de la réussite de la réponse HTTP
      if (!response.ok) {

        
        const errorLogin = document.querySelector("p")
        //errorLogin.textContent =
          "Le mot de passe ou l'identifiant que vous avez fourni est incorrect.";
        // Si la réponse n'est pas "ok" , lancez une erreur
        password.style.border = "solid 1px red"
        email.style.border = "1px solid red"
        errorText.style.color = "red"
        errorText.style.display = "block"
        
        throw new Error(
            
          "Le mot de passe ou l'identifiant que vous avez fourni est incorrect."
        );
      }
      // Si la réponse est "ok", parsez la réponse JSON
      return response.json();
    })

    .then((data) => {
        console.log(data);
      const userId = data.userId;
      const userToken = data.token;
      window.sessionStorage.setItem("token", userToken);
      window.sessionStorage.setItem("userId", userId);
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Une erreur est surveue : ", error);
    });
});
