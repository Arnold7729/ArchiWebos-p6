
// document.addEventListener('DOMContentLoaded', function () {
//     document.getElementById('loginForm').addEventListener('submit', function (event) {
//         event.preventDefault(); // Empêche le formulaire de se soumettre normalement

//         // Récupérer les valeurs des champs d'entrée
//         const email = document.getElementById('email').value;
//         const password = document.getElementById('password').value;

//         // Données à envoyer avec la requête POST
//         const formData = {
//             email: email,
//             password: password
//         };

//         // Effectuer la requête POST avec Fetch
//         fetch('http://localhost:5678/api/users/login', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': 'bearer' + token,
//             },
//             body: JSON.stringify(formData)
//         })
//         .then(response => response.json())
//         .then(data => {
//             // Traiter la réponse de l'API
//             console.log('Réponse de l\'API:', data);
//             // test
            
//              window.sessionStorage.loged = true;
//              window.location.href= "index.html";
//             //test
//         })
        
//         .catch(error => {
//             // Gérer les erreurs de la requête
//             alert("Email ou mot de passe incorrect")
//             console.error('Erreur de la requête:', error);
//         });
//     });
// });

// test 


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('loginForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Empêche le formulaire de se soumettre normalement

        // Récupérer les valeurs des champs d'entrée
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

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
                alert("Token non disponible dans la réponse de l'API");
            }
        })
        .catch(error => {
            // Gérer les erreurs de la requête
            alert("Email ou mot de passe incorrect")
            console.error('Erreur de la requête:', error);
        });
    });
});

