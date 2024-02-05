//****  Variables  ****//
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");
const body = document.querySelector("body")
const modalGallery = document.querySelector(".modalGallery");
const select = document.querySelector("select")

//**** Variables pour la partie connexion ****//
const token = sessionStorage.getItem("token");
const logout = document.querySelector(".login");
const adminEdit = document.querySelectorAll(".adminEdit");


//**** Fonction principale ****//
function main() {
  displayWorks();
  displayCategorysButton();
}

//**** Appel de la fonction principale ****//
main();

//**** Affichage des Images ****//
//**** Fonction pour récupérer le tableau des images ****//
async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  return await response.json();
}

//**** Fonction pour afficher les works dans le DOM ****/
async function displayWorks() {
  const arrayWorks = await getWorks();
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
  });
}

//**** Affichage des buttons par catégories ****//
//**** Récupérer le tableau des catégories ****//
async function getCategorys() {
  const response = await fetch("http://localhost:5678/api/categories");
  return await response.json();
}

//**** Fonction pour afficher les boutons de catégories ****/
async function displayCategorysButton() {
  const categorys = await getCategorys();
  categorys.forEach((categorys) => {
    const filterButton = document.createElement("button");
    filterButton.innerText = categorys.name;
    filterButton.setAttribute("data-id", categorys.id);
    filterButton.addEventListener("click", (e) => {
      const id = e.target.getAttribute("data-id");
      document.querySelector(".active").classList.remove("active")
      e.target.classList.add("active")
      const projets = document.querySelectorAll(".gallery figure");
      projets.forEach((projet) => {
        projet.style.display = "block";
        if (projet.getAttribute("data-category") != id) {
          projet.style.display = "none";
        }
      });
    });
    filters.appendChild(filterButton);
    
    //**** Ajout des option dans le select ****//
    const option = document.createElement("option")
    option.innerText = categorys.name
    option.value = categorys.id
    select.appendChild(option)
  });
  const buttonTous = document.getElementById("btnTous");
  buttonTous.addEventListener("click", (e) => {
    document.querySelector(".active").classList.remove("active")
    e.target.classList.add("active")
    const projets = document.querySelectorAll(".gallery figure");
    projets.forEach((projet) => {
      projet.style.display = "block";
    });
  });
}

//**** Mode édition ****//
//**** Si l'utilisateur est connecté ****//
//**** Vérification du token ****//
if (token) {
  logout.textContent = "logout";
  const modifier = document.querySelector(".modifier");
  const buttonAdd = document.querySelector(".buttonAdd");
  modifier.style.display = "block";
  adminEdit.forEach((element) => {
    element.style.display = "block";
  });
  const filters = document.querySelector(".filters");
  filters.style.display = "none";

}
//**** Déconnexion si le token est vide ****//
logout.addEventListener("click", (e) => {
  window.sessionStorage.setItem("token", "");
  window.sessionStorage.setItem("userId", "");
  window.location.href = "index.html";
  if (token == "") {
    window.location.href = "login.html";
  }
});
