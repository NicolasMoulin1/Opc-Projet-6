

//Variable globale//

const gallery = document.querySelector(".gallery")

function main() {
    getWorks()
    displayWorks()
}

main ()

async function getWorks() {
    
  const response = await fetch ("http://localhost:5678/api/works")
  return await response.json()
}



async function displayWorks(){

   const arrayWorks = await getWorks()
    console.log(arrayWorks)
    arrayWorks.forEach(work => {
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const figcaption = document.createElement("figcaption")
        img.src = work.imageUrl
        figcaption.textContent = work.title  
        figure.appendChild(img)
        figure.appendChild(figcaption)
        gallery.appendChild(figure)
    });
}

const filter = document.querySelector(".filter")

async function getCategories() {

    const response = await fetch ("http://localhost:5678/api/categories")
    return await response.json()
}

getCategories()
filters()

async function filters() {

    const arrayFilters = await getCategories()
    console.log(arrayFilters)
    arrayFilters.forEach(categorie => {
        const filterButton = document.createElement("button")
        filterButton.innerText = categorie.name
        filter.appendChild(filterButton)
        
    })
}
