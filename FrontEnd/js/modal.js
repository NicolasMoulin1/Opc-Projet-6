//**** Variables Globales ****//
const modalContent = document.getElementById("modalContent");
//**** Variables pour l'affichage des modales ****//
const modifier = document.querySelector(".modifier");
const buttonAdd = document.querySelector(".buttonAdd");
const modalPortfolio = document.querySelector(".modalPortfolio");
const modalAddWorks = document.querySelector(".modalAddWorks");
//**** Variable pour fermée les modales ****//
const modalContentWork = document.querySelector(".modalContentWork");
const xmarkModal = document.querySelector(".modalPortfolio span .fa-xmark");
const xmarkModal2 = document.querySelector(".modalAddWorks .fa-xmark");
//**** Variable pour le Form ****//
const formAddWorks = document.getElementById("formAddWorks");
const inputFile = document.querySelector("#file");
const inputTitle = document.querySelector("#title")
const previewImage = document.getElementById("previewImage");

function mainModal() {
  if (token) {
    displayModal();
    displayWorksModal();
    closeModalGallery();
    displayModalAddWorks();
    returnToModalPortfolio();
    prevImage();
  }
}
mainModal();

//****On affiche la modale au clic sur modifier ****//
function displayModal() {
  modifier.addEventListener("click", () => {
    console.log("on affiche la modal");
    modalContent.style.display = "flex";
    modalPortfolio.style.display = "flex";
    modalAddWorks.style.display = "none";
  });
}
//**** On affiche la modal au clic sur ajout photo ****//
function displayModalAddWorks() {
  buttonAdd.addEventListener("click", () => {
    console.log("affiche la modal2");
    modalPortfolio.style.display = "none";
    modalAddWorks.style.display = "flex";
  });
}

//**** On retourne en arriere.****//
function returnToModalPortfolio() {
  const arrowLeftModalWorks = document.querySelector(
    ".modalAddWorks .fa-arrow-left"
  );
  arrowLeftModalWorks.addEventListener("click", () => {
    modalPortfolio.style.display = "flex";
    modalAddWorks.style.display = "none";
    previewImage.style.display = "none";
    inputTitle.value = null; // Réinitialise la valeur du champ du Titre
    inputFile.value = null; // Réinitialise la valeur du champ d'entrée de type fichier
    console.log("retour en arriere");
  });
}

function closeModalGallery() {
  //**** Fermeture de la modal de la croix 1 ****//

  xmarkModal.addEventListener("click", () => {
    console.log("On quitte la modal1");
    modalContent.style.display = "none";
  });
  //**** Fermeture de la modal de la croix 2 ****//

  xmarkModal2.addEventListener("click", () => {
    console.log("On quitte la modal2");
    modalContent.style.display = "none";
    inputTitle.value = null; // Réinitialise la valeur du champ du Titre
    inputFile.value = null; // Réinitialise la valeur du champ d'entrée de type fichier
  });
  //**** On ferme la modal au clic sur la partie grise ****//
  body.addEventListener("click", (e) => {
    if (e.target == modalContent) {
      modalContent.style.display = "none";
      modalAddWorks.style.display = "none";
      previewImage.style.display = "none";
      inputTitle.value = null; // Réinitialise la valeur du champ du Titre
      inputFile.value = null; // Réinitialise la valeur du champ d'entrée de type fichier
      console.log("on quiite la modalGris");
    }
  });
}

function prevImage(event) {
  inputFile.addEventListener("input", () => {
    const file = inputFile.files[0];
    console.log(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        previewImage.src = e.target.result;
        previewImage.style.display = "flex";
      };
      reader.readAsDataURL(file);
    } else {
      previewImage.style.display = "none";
      inputFile.value = null; // Réinitialise la valeur du champ d'entrée de type fichier
    }
  });
}

//**** Affichage de la gallery dans la modale ****//
async function displayWorksModal() {
  modalGallery.innerHTML = "";
  const gallery = await getWorks();
  gallery.forEach((work) => {
    const figure = document.createElement("figure");
    const imgModal = document.createElement("img");
    const span = document.createElement("span");
    const trash = document.createElement("i");
    trash.classList.add("fa-solid", "fa-trash-can");
    span.classList.add("icon-trash");
    trash.id = work.id;
    imgModal.src = work.imageUrl;
    span.appendChild(trash);
    figure.appendChild(span);
    figure.appendChild(imgModal);
    modalGallery.appendChild(figure);
  });
  deleteImg();
}

//**** Suppression d'une image dans la modal ****//
function deleteImg() {
  const trashAll = document.querySelectorAll(".fa-trash-can");
  trashAll.forEach((trash) => {
    trash.addEventListener("click", (e) => {
      const id = trash.id;
      const init = {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      fetch("http://localhost:5678/api/works/" + id, init)
        .then((response) => {
          if (!response.ok) {
            console.log("Le delete ne fonctionne pas !");
          }
        })
        .then((data) => {
          console.log("Le delete a fonctionner voici la data : ");
          displayWorks();
          displayWorksModal();
        });
    });
  });
}

//**** Code pour faire la methode Post ****//
/*
const buttonSubmit = document.querySelector(".button-add-work");
buttonSubmit.addEventListener("click", async (event) => {
  event.preventDefault();
  submitForm();
});
*/
function submitForm() {
  // Assurez-vous que la variable 'form' est définie avec le formulaire que vous souhaitez envoyer
  const formAddProjet = document.getElementById("formAddWorks");
  formAddProjet.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(formAddProjet);
    console.log(formData);
    // Ajoutez ici l'URL du serveur qui va recevoir les données
    const apiUrl = "http://localhost:5678/api/works";

    fetch(apiUrl, {
      method: "POST",
      body: formData,
      headers: {
        authorization: `Bearer ${token}`,
        // Ajoutez d'autres en-têtes si nécessaire
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Réponse du serveur :", data);
        modalAddWorks.style.display = "none";
        modalPortfolio.style.display = "flex";
        inputTitle.value = null; // Réinitialise la valeur du champ du Titre
        inputFile.value = null; // Réinitialise la valeur du champ d'entrée de type fichier
        previewImage.style.display = "none"
        displayWorksModal();
        displayWorks();

        // Ajoutez ici le code pour traiter la réponse du serveur si nécessaire
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi des données :", error);
        // Ajoutez ici le code pour gérer les erreurs si nécessaire
      });
  });
}
submitForm();
