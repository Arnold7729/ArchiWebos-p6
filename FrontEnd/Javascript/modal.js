// Affichage modal




const admin = document.querySelector("#portfolio .admin");
const logout = document.querySelector("header nav ul .loginB");
const containerModals = document.querySelector(".containerModals");
const faxmark = document.querySelector(".containerModals .fa-xmark");
const faxmark2 = document.querySelector(".modalAddWork .fa-xmark");
const icon = document.querySelector(".portfolio .fa-pen-square");
const btnModif = document.querySelector(".projetModif .modifier");
const token = window.sessionStorage.getItem('token');
const ajout = document.querySelector(".ajout");
const modalAddWork = document.querySelector(".modalAddWork");
const arrowLeft = document.querySelector(".modalAddWork .fa-arrow-left");


// Si connecté (en vérifiant le token)
if (token) {  
  admin.textContent = "modifier";
  logout.textContent = "logout";
  btnModif.style.display = "flex";
  logout.addEventListener("click", () => {
  window.sessionStorage.removeItem('token'); // Supprime le token pour déconnecter
  });
}


// Faire apparaitre la modal en cliquant sur "modifier"

admin.addEventListener("click", () => {
    containerModals.style.display = "flex";
});

// Faire disparaitre la modal à l'aide de la croix

faxmark.addEventListener("click", () => {
    containerModals.style.display = "none";
});

// Faire disparaitre la modal au click en dehors de celle ci + refresh

containerModals.addEventListener("click", (e) =>{
  if (e.target.className == "containerModals") {
    containerModals.style.display = "none";
  }
});

// Faire apparaitre la modal 2 pour ajouter des Works + refresh ***************

ajout.addEventListener("click", () =>{
  modalAddWork.style.display = "flex";
});

faxmark2.addEventListener("click", () => { 
  modalAddWork.style.display = "none";
  containerModals.style.display = "none";
  inputFile.value = "";
  inputTitle.value = "";
  imagePreview.style.display= "none";
  const categoriesSelect = document.getElementById("categories");
  categoriesSelect.value = "0";
});

// Revenir en arriere ( sur la 1ère modal ) + refresh 

arrowLeft.addEventListener("click", () => {
  modalAddWork.style.display = "none";
  inputFile.value = "";
  inputTitle.value = "";
  imagePreview.style.display= "none";
  const categoriesSelect = document.getElementById("categories");
  categoriesSelect.value = "0";
})

