document.addEventListener('DOMContentLoaded', function () {
    
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.querySelector(".alertP");
   
    // Ajoutez un gestionnaire d'événements de soumission au formulaire
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Empêche le formulaire de se soumettre normalement

        // Récupérer les valeurs des champs d'entrée
        const email = emailInput.value;
        const password = passwordInput.value;

        // Données à envoyer avec la requête POST
        const formData = {
            email: email,
            password: password
        };

        // Effectuer la requête POST pour obtenir le token
        fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            // Traiter la réponse de l'API
            console.log('Réponse de l\'API:', data);

            // Vérifier si la réponse contient un token
            if (data.token) {
                // Stocker le token dans une variable
                const token = data.token;

                // Stocker le token dans le sessionStorage
                window.sessionStorage.setItem('token', token);
                
                // Rediriger vers la page d'accueil
                window.location.href = "index.html";
            } else {
                // Gérer le cas où aucun token n'est retourné
                emailInput.classList.add("mdp");
                passwordInput.classList.add("mdp");
                errorMessage.textContent = "Email ou mot de passe incorrect";
            }
        })
        .catch(error => {
            // Gérer les erreurs de la requête
            alert("Email ou mot de passe incorrect");
            console.error('Erreur de la requête:', error);
        });
    });
});