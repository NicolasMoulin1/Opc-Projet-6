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
const inputTitle = document.querySelector("#title");
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
    modalContent.style.display = "flex";
    modalPortfolio.style.display = "flex";
    modalAddWorks.style.display = "none";
  });
}

//**** On affiche la modal au clic sur ajout photo ****//
function displayModalAddWorks() {
  buttonAdd.addEventListener("click", () => {
    modalPortfolio.style.display = "none";
    modalAddWorks.style.display = "flex";
  });
}

//**** On retourne en arriere. ****//
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
  });
}

//**** Fermeture de la modal de la croix 1 ****//
function closeModalGallery() {
  xmarkModal.addEventListener("click", () => {
    modalContent.style.display = "none";
  });

  //**** Fermeture de la modal de la croix 2 ****//
  xmarkModal2.addEventListener("click", () => {
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
    }
  });
}

//**** Fonction pour prévisualiser une image avant de l'ajouter ****//
function prevImage(event) {
  inputFile.addEventListener("input", () => {
    const file = inputFile.files[0];
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

//**** Fonction asynchrone pour afficher les travaux dans la modal ****//
async function displayWorksModal() {
  modalGallery.innerHTML = "";

  //**** Récupérer la liste des image de la API ****//
  const gallery = await getWorks();

  //**** Parcourir la liste et créer des éléments HTML ****//
  gallery.forEach((work) => {
    const figure = document.createElement("figure");
    const imgModal = document.createElement("img");
    const span = document.createElement("span");
    const trash = document.createElement("i");

    //**** Ajouter des classes et des attributs aux éléments créés ****//
    trash.classList.add("fa-solid", "fa-trash-can");
    span.classList.add("icon-trash");
    trash.id = work.id;
    imgModal.src = work.imageUrl;
    span.appendChild(trash);
    figure.appendChild(span);
    figure.appendChild(imgModal);
    modalGallery.appendChild(figure);
  });
  //**** Ajouter la fonctionnalité de suppression pour chaque image ****//
  deleteImg();
}

//**** Suppression d'une image dans la modal ****//
function deleteImg() {
  const trashAll = document.querySelectorAll(".fa-trash-can");
  trashAll.forEach((trash) => {
    trash.addEventListener("click", (e) => {
      const id = trash.id;
      //**** Configurer les options pour la requête de suppression ****//
      const init = {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };
      //**** Envoyer la requête à l'API ****//
      fetch("http://localhost:5678/api/works/" + id, init)
        //**** Le delete n'a pas fonctionner  ****//
        .then((response) => {
          if (!response.ok) {
          }
        })
        //*** Le delete a fonctionner  ****//
        //**** Mettre à jour l'affichage des image après la suppression ****//
        .then((data) => {
          displayWorks();
          displayWorksModal();
        });
    });
  });
}

//**** Fonction pour soumettre le formulaire d'ajout d'image ****//
function submitForm() {
  const formAddProjet = document.getElementById("formAddWorks");
  formAddProjet.addEventListener("submit", (e) => {
    e.preventDefault();
    //**** Créer un objet FormData à partir du formulaire ****//
    const formData = new FormData(formAddProjet);

    //****Configurer les options pour la requête POST ****//
    fetch("http://localhost:5678/api/works", {
      method: "POST",
      body: formData,
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        //**** Cacher la modal d'ajout d'image et afficher la modal principale ****//
        modalAddWorks.style.display = "none";
        modalPortfolio.style.display = "flex";

        //**** Réinitialiser les champs du formulaire et la prévisualisation de l'image ****//
        inputTitle.value = null;
        inputFile.value = null;
        previewImage.style.display = "none";

        //**** Mettre à jour l'affichage ****//
        displayWorksModal();
        displayWorks();
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi des données :", error);
      });
  });
}
//**** Appele de la fonction pour soumettre le formulaire ****//
submitForm();
