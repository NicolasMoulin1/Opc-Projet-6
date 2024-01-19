//**** Variables pour l'affichage des modales ****//
const modifier = document.querySelector(".modifier");
const buttonAdd = document.querySelector(".buttonAdd");
const modalPortfolio = document.querySelector(".modalPortfolio")
const modalAddWorks = document.querySelector(".modalAddWorks")


//**** Variable pour fermée les modales ****//
const modalContent = document.getElementById("modalContent");
const modalContentWork = document.querySelector(".modalContentWork");



function mainModal() {
    displayModal()
    displayWorksModal();
    closeModalGallery();
    displayModalAddWorks();
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

function closeModalGallery() {
  //**** Fermeture de la modal de la croix 1 ****//
  const xmarkModal = document.querySelector(".modalPortfolio span .fa-xmark");
  xmarkModal.addEventListener("click", () => {
    console.log("On quitte la modal1");
    modalContent.style.display = "none";
  });
  //**** Fermeture de la modal de la croix 2 ****//
  const xmarkModal2 = document.querySelector(".modalAddWorks .fa-xmark");
  xmarkModal2.addEventListener("click", () => {
    console.log("On quitte la modal2");
    modalContent.style.display = "none";
  });
  //**** On ferme la modal au clic sur la partie grise ****//
  body.addEventListener("click", (e) => {
    console.log("on quiite la modal10");
    if (e.target == modalContent) {
      modalContent.style.display = "none"
      modalAddWorks.style.display = "none";
    }
  })
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


//****  ****//
