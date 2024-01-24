

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


// Supprimer image modal

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
        gallery.innerHTML = "";
        console.log("Projet supprimé");
        await displayWorks();
        await displayWorksModal();
      } else {
        console.error("Erreur lors de la suppression du projet");
      }
    });
  });
}

// Preview Img modal
const addForm = document.getElementById('add'); 

document.addEventListener('DOMContentLoaded', function () {
  const fileInput = document.getElementById('file');
  const imagePreview = document.getElementById('imagePreview');

  fileInput.addEventListener('change', function (event) {
      if (fileInput.files && fileInput.files[0]) {

          // Créer une URL temporaire pour l'image sélectionnée

          const imageUrl = URL.createObjectURL(fileInput.files[0]);
          imagePreview.src = imageUrl;
          imagePreview.style.display = 'block'; // Afficher l'élément img
      }
  });
});


// Ajout image le dom via modal

document.addEventListener('DOMContentLoaded', function () {
  const addForm = document.getElementById('add'); 

  // Fonction pour vérifier si les conditions sont remplies
  function conditionOk() {
    const titleInput = document.getElementById('title').value; 
    const categorySelect = document.getElementById('categories').value; 
    const fileInput = document.getElementById('file'); 
    return titleInput && fileInput.files.length > 0 && categorySelect !== "0";
  }

  // Gestionnaire d'événements pour la soumission du formulaire

  addForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    if (!conditionOk()) {
      alert("Veuillez remplir tous les champs requis.");
      return; 
    }

    const titleInput = document.getElementById('title').value; 
    const categorySelect = document.getElementById('categories').value; 
    const fileInput = document.getElementById('file'); 
    
    const formData = new FormData();
    formData.append('title', titleInput);
    formData.append('category', categorySelect);
    formData.append('image', fileInput.files[0]);

    await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
           "Authorization": `Bearer ${token}`
        },
        body: formData
    })
    .then(response => response.json())
    .then((data) => {
        console.log('Réponse de l\'API:', data);
        gallery.innerHTML = "";
        refreshModal();
        displayWorks();
        displayWorksModal()
    })
    .catch(error => {
        console.error('Erreur lors de l\'envoi du formulaire:', error);
    });
  });

  function refreshModal(){
    document.getElementById('title').value = '';
    document.getElementById('file').value = '';
    document.getElementById('imagePreview').style.display = "none";
    document.getElementById('categories').selectedIndex = 0;
  }
});


//test pour bouton validé avec changement de couleur 

const formWork = document.querySelector(".formWork");
const inputTitle = document.querySelector("#title");
const inputFile = document.querySelector("#file");
const categoriesSelect = document.querySelector("#categories");
const buttonValidForm = document.querySelector(".containerButton button");

function updateButton() {
  formWork.addEventListener("input", () => {
    if (inputTitle.value && inputFile.files.length > 0 && categoriesSelect.value !== "0") {
      buttonValidForm.classList.replace("button-inactive", "button-active");
    } else {
      buttonValidForm.classList.replace("button-active", "button-inactive");
    }
  });
}
updateButton();

// Alerte si condition non rempli 2ème modal

// addForm.addEventListener('submit', async function (event) {
//   event.preventDefault();

//   const titleInput = document.getElementById('title').value;
//   const categorySelect = document.getElementById('categories').value;
//   const fileInput = document.getElementById('file');
//   let alertMessage = '';

//   // Vérifier si le titre est rempli
//   if (!titleInput) {
//     alertMessage += 'Veuillez entrer un titre. ';
//   }

//   // Vérifier si une catégorie est sélectionnée
//   if (categorySelect === "0") {
//     alertMessage += 'Veuillez choisir une catégorie. ';
//   }

//   // Vérifier si une image est sélectionnée
//   if (!fileInput.files.length) {
//     alertMessage += 'Veuillez sélectionner une image. ';
//   }

//   // Afficher l'alerte si nécessaire et sortir de la fonction
//   if (alertMessage) {
//     alert(alertMessage);
//     return;
//   }
// });


