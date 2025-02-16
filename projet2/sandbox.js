// selectionne le champ d'entree pour ajouter une nouvelle tache (input avec name="add")
const inputfield = document.querySelector('input[name="add"]');

// selectionne la liste non ordonnee (<ul>) qui contiendra les taches
const todolist = document.querySelector('ul');

// selectionne toutes les icones i existantes
const effacer = document.querySelectorAll("i");

const search = document.querySelectorAll('input[name="search"]');

// selectionne la barre de recherche en utilisant une classe
const barre_de_recherche = document.querySelector('.form-control.m-auto');

// ajoute un ecouteur d'evenement sur le champ d'entree pour detecter l'appui sur la touche "enter"
inputfield.addEventListener("keypress", function(e) {
    if (e.key === "Enter") { // si l'utilisateur appuie sur "enter"
        e.preventDefault(); // empeche le comportement par defaut 

        // cree un nouvel element li pour representer la tache
        const nouveau_lst_objet = document.createElement('li');
        nouveau_lst_objet.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
        
        // ajoute le texte de la tache et l'icone de suppression a l'interieur du <li>
        nouveau_lst_objet.innerHTML = `
            <span>${inputfield.value}</span>
            <i class="far fa-trash-alt delete"></i>
        `;
        
        // ajoute le nouvel element a la liste des taches
        todolist.appendChild(nouveau_lst_objet);

        // reinitialise le champ d'entree pour preparer une nouvelle saisie
        inputfield.value = '';
        
        // ajoute un ecouteur d'evenement sur l'icone de suppression pour supprimer la tache au clic
        const suppr_icon = nouveau_lst_objet.querySelector('.delete');
        suppr_icon.addEventListener("click", function() {
            nouveau_lst_objet.remove(); 
        });
    }
});

// ajoute un ecouteur d'evenement sur la liste des taches pour gerer la suppression
todolist.addEventListener("click", function(e) {
    // si l'element clique possede la classe "delete"
    if (e.target.classList.contains("delete")) {
        // supprime l'element li le plus proche 
        e.target.closest("li").remove();
    }
});

// fonction pour mettre a jour l'affichage des taches en fonction de la recherche
function mise_a_jour_recherche() {
    // recupere le terme recherche en minuscule
    const recherche = barre_de_recherche.value.toLowerCase();

    // selectionne tous les elements li de la liste a filtrer
    // verifier que le selecteur ".list-group.todos li" correspond bien a la structure html
    const elements_to_do = document.querySelectorAll(".list-group.todos li");

    // parcourt chaque tache pour verifier si elle correspond au terme recherche
    elements_to_do.forEach(item => {
        // recupere le texte de la tache en minuscule
        const todoText = item.querySelector('span').textContent.toLowerCase();

        // si le texte de la tache commence par le terme recherche
        if (todoText.startsWith(recherche)) {
            // affiche l'element
            item.style.visibility = "visible"; 
            item.style.height = "auto"; 
            item.style.position = "static";
        } else {
            // sinon, masque l'element
            item.style.visibility = "hidden"; 
            item.style.height = "0px";
            item.style.position = "absolute";
        }
    });
}

// ajoute un ecouteur sur la barre de recherche pour filtrer les taches en temps reel lors de la saisie
barre_de_recherche.addEventListener("input", mise_a_jour_recherche);
