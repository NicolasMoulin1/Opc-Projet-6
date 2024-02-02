//**** Variables ****//
const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.querySelector("form");
const errorText = document.querySelector(".errorText");

form.addEventListener("submit", (e) => {
  //**** Empêcher le comportement par défaut du formulaire ****//
  e.preventDefault();
  //**** Récupération des valeurs de l'email et du mot de passe ****//
  const userEmail = email.value;
  const userPassword = password.value;

  //**** Création d'un objet contenant les données du formulaire ****//
  const data = {
    email: userEmail,
    password: userPassword,
  };
  //**** Envoi d'une requête POST au serveur local ****//
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      // Vérification de la réussite de la réponse HTTP
      if (!response.ok) {

        //**** En cas d'échec, mise en évidence des champs et affichage d'un message d'erreur ****//
        const errorLogin = document.querySelector("p");
        ("Le mot de passe ou l'identifiant que vous avez fourni est incorrect.");
        password.style.border = "solid 1px red";
        email.style.border = "1px solid red";
        errorText.style.color = "red";
        errorText.style.display = "block";
        throw new Error(
          "Le mot de passe ou l'identifiant que vous avez fourni est incorrect."
        );
      }
      //**** Si la requête est réussie, renvoi des données au format JSON ****//
      return response.json();
    })

    .then((data) => {
      //**** Récupération de l'ID utilisateur et du token depuis les données JSON ****//
      const userId = data.userId;
      const userToken = data.token;

      //**** Stockage du token et de l'ID utilisateur dans la session sessionStorage ****//
      window.sessionStorage.setItem("token", userToken);
      window.sessionStorage.setItem("userId", userId);

      //**** Redirection vers la page "index.html" ****//
      window.location.href = "index.html";
    })
    .catch((error) => {
      //**** Gestion des erreurs et affichage dans la console ****//
      console.error("Une erreur est surveue : ", error);
    });
});
