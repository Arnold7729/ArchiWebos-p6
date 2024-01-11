

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

// Affichage works dans la galerie photo

const workModal = document.querySelector(".workModal");

async function displayWorksModal() {
  workModal.innerHTML = "";
  const modal = await genProjet();
  modal.forEach(work => {
    const figure = document.createElement("figure")
    const img = document.createElement("img")
    const div = document.createElement("div")
    const trash = document.createElement("i")
    trash.classList.add("fa-solid","fa-trash-can")
    trash.id = work.id
    img.src = work.imageUrl;
    div.appendChild(trash)
    figure.appendChild(div)
    figure.appendChild(img)
    workModal.appendChild(figure)
  });
  // async pour function deleteWork
  deleteWork();
}
displayWorksModal();

// // Supp image modal

function deleteWork() {
  const workAll = document.querySelectorAll(".fa-trash-can");
  workAll.forEach(trash => {
    trash.addEventListener("click", async (e) => {
      e.preventDefault();  
  
      const id = trash.id;
      const token = window.sessionStorage.getItem('token');

      const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        console.log("Projet supprimé");
        await displayWorks();
        await displayWorksModal();
      } else {
        console.error("Erreur lors de la suppression du projet");
      }
    });
  });
}

