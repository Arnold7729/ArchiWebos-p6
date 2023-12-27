

  //Variable



  const gallery = document.querySelector(".gallery");
  const filters = document.querySelector(".filters");
  

// Fonction pour les Works

  async function genProjet() {
    const workFetch = await fetch("http://localhost:5678/api/works");
    return await workFetch.json();
  }
  genProjet();

  // Affichage des Works dans le dom

  async function displayWorks() {
    const arrayWorks = await genProjet();
    arrayWorks.forEach((work) => {
      createWorks(work);
    });
  }
displayWorks();




function createWorks(work) {
  const projet = document.createElement("figure"); 
  projet.setAttribute("class", "figure");
  projet.setAttribute("id", work.id);  
  projet.setAttribute("data-category", work.categoryId); 
  const image = document.createElement("img");
  image.src = work.imageUrl; 
  const subtitle = document.createElement("figcaption");
  subtitle.innerText = work.title;
  gallery.appendChild(projet);
  projet.appendChild(image);
  projet.appendChild(subtitle);
}



// bouton 

async function getCat() {
  const response = await fetch ("http://localhost:5678/api/categories");
  return await response.json();
}

 

async function createBtn() {
  const categories = await getCat();
    // Ajout du bouton "Tous"
    const allButton = document.createElement("button");
    allButton.textContent = "Tous";
    filters.appendChild(allButton);
    // Ajout du gestionnaire d'événements pour le bouton "Tous"
    allButton.addEventListener("click", async () => {
      // Efface le contenu de la galerie avant d'afficher tous les travaux
      gallery.innerHTML = "";
      displayWorks(); // Afficher tous les travaux
    });
      // Ajout des boutons de catégorie
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category.name;
    button.id = category.id;
    filters.appendChild(button);
    // Ajout du gestionnaire d'événements pour filtrer par catégorie
    button.addEventListener("click", async () => {
      gallery.innerHTML = "";
      // Filtrer les travaux par catégorie
      const filteredWorks = (await genProjet()).filter(
        (work) => work.categoryId === category.id
      );
      // Afficher les travaux filtrés
      filteredWorks.forEach((work) => {
        createWorks(work);
      });
    });
  });
}
createBtn();
