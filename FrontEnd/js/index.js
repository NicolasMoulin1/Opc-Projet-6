//****  Variables  ****//
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");
const body = document.querySelector("body");
const modalGallery = document.querySelector(".modalGallery");

//**** Variables pour la partie connexion ****//
const token = sessionStorage.getItem("token");
const logout = document.querySelector(".login");
const adminEdit = document.querySelectorAll(".adminEdit");


//****  Déclaration des fonction  ****//

function main() {
  getWorks();
  displayWorks();
  getCategorys();
  displayCategorysButton();
}

//****  Déclaration de la fonction Main  ****//

main();

//****  Affichige des Images  ****//

//****  Récupérer qui retourne le tableau des images  ****/

async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}

//****  Affichage des works dans le dom */

async function displayWorks() {
  const arrayWorks = await getWorks();
  console.log(arrayWorks);
  gallery.innerHTML = "";
  arrayWorks.forEach((work) => {
    const figure = document.createElement("figure");
    figure.setAttribute("data-category", work.categoryId);
    const button = document.createElement("button");
    button.setAttribute("data.category", work.categoryId);
    const img = document.createElement("img");
    const figcaption = document.createElement("figcaption");
    img.src = work.imageUrl;
    figcaption.textContent = work.title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallery.appendChild(figure);

    //**** Ajout des images dans la modal ****//
  });
}

//******************************      Affichage des buttons par catégories      ***********************************//

//*****************************   Récupérer le tableau des catégories   *******************************//

async function getCategorys() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}

async function displayCategorysButton() {
  const categorys = await getCategorys();
  console.log(categorys);
  categorys.forEach((categorys) => {
    const filterButton = document.createElement("button");
    filterButton.innerText = categorys.name;
    filterButton.setAttribute("data-id", categorys.id);
    filterButton.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      const projets = document.querySelectorAll(".gallery figure");
      projets.forEach((projet) => {
        projet.style.display = "block";
        if (projet.getAttribute("data-category") != id) {
          projet.style.display = "none";
        }
      });
      console.log(id);
    });
    filters.appendChild(filterButton);
  });
  const buttonTous = document.getElementById("btnTous");
  buttonTous.addEventListener("click", (e) => {
    const projets = document.querySelectorAll(".gallery figure");
    projets.forEach((projet) => {
      projet.style.display = "block";
    });
    console.log("buttonTous");
  });
}

//**** ici commence le mode édition ****//
//**** Si l'utilisateur est connecté ****//
//**** Voici mon token ****//
//console.log(token);

if (token) {
  //console.log("je suis connecter");
  logout.textContent = "logout";
  const modifier = document.querySelector(".modifier");
  const buttonAdd = document.querySelector(".buttonAdd");
  modifier.style.display = "block";
  adminEdit.forEach((element) => {
    element.style.display = "block";
  });
  const filters = document.querySelector(".filters");
  filters.style.display = "none";
  //console.log(logout);
}
logout.addEventListener("click", (e) => {
  console.log("je me deconnecte car mon token est vide");
  console.log("je click sur logout");
  window.sessionStorage.setItem("token", "");
  window.location.href = "index.html";
  if (token == "") {
    window.location.href = "login.html";
  }
});
