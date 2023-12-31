// Affichage modal

// Si connecter

const loged = window.sessionStorage.loged;
const admin = document.querySelector("#portfolio .admin");
const logout = document.querySelector("header nav ul .loginB");
const containerModals = document.querySelector(".containerModals");
const faxmark = document.querySelector(".containerModals .fa-xmark");
const icon = document.querySelector(".portfolio .fa-pen-square");
const btnModif = document.querySelector(".projetModif .modifier")

if (loged == "true") {
  admin.textContent = "modifier";
  logout.textContent = "logout";
  btnModif.style.display = "flex";
  logout.addEventListener ("click" , () =>{
    window.sessionStorage.loged = false;
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

