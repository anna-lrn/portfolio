function toggleMode() {
    document.body.classList.toggle('dark-mode');
    var logos = document.querySelectorAll('.logo');
    logos.forEach(function(logo) {
      logo.classList.toggle('invert');
    });
  }

  document.addEventListener("DOMContentLoaded", function() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "projects.json", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var projects = JSON.parse(xhr.responseText);
            var projectList = document.getElementById("projects-list");

            projects.forEach(function(project) {
                var projectItem = document.createElement("div");
                projectItem.classList.add("project-item");
                projectItem.innerHTML = "<img src='" + project.cover + "' alt='Project Cover'><p id=\"project-date\">" + project.date + "</p><p id=\"project-titre\">"+ project.titre +"</p><p id=\"project-category\">" + project.categorie + "</p>";
                projectItem.addEventListener("click", function() {
                    displayProjectDetails(project);
                });
                projectList.appendChild(projectItem);
            });
        }
    };
    xhr.send();
});

function displayProjectDetails(project) {
  var projectDetails = document.getElementById("project-details");
  var projectTitle = document.getElementById("project-title");
  var projectOverlay = document.getElementById("overlay");
  var projectDate = document.getElementById("project-date");
  var projectCover = document.getElementById("project-cover");
  var projectCover2 = document.getElementById("project-cover2");
  var projectCategorie = document.getElementById("project-categorie");
  var projectDescription = document.getElementById("project-description");
  var projectImages = document.getElementById("project-images");
  var closeButton = document.getElementById("close-button");
  var closeButton2 = document.getElementById("close-button2");
  
  projectTitle.textContent = project.titre;
  projectDate.textContent = project.date;
  projectCover.setAttribute("src", project.cover);
  projectCover2.setAttribute("src", project.cover);
  projectDescription.innerHTML = project['desc-longue'];
  projectCategorie.textContent = project.categorie;
  
  projectImages.innerHTML = "";
  project.images.forEach(function(image) {
      var imgContainer = document.createElement("div");
      imgContainer.classList.add("image-container");

      var img = document.createElement("img");
      img.setAttribute("src", "projets/" + image);
      img.setAttribute("alt", "Project Image");

      imgContainer.appendChild(img);

      // Ajouter une description sous l'image si elle est disponible dans le projet
      if (project.imageDescriptions && project.imageDescriptions[image]) {
          var imgDescription = document.createElement("p");
          imgDescription.textContent = project.imageDescriptions[image];
          imgContainer.appendChild(imgDescription);
      }

      projectImages.appendChild(imgContainer);
  });
    
    projectDetails.style.display = "flex";
    projectOverlay.style.display = "block";

    
    closeButton.addEventListener("click", closeProject);
    closeButton2.addEventListener("click", closeProject);
    projectOverlay.addEventListener("click", closeProject);
}

function closeProject() {
  var projectDetails = document.getElementById("project-details");
  var projectOverlay = document.getElementById("overlay");
  projectDetails.style.display = "none";
  projectOverlay.style.display = "none";
  }

function openAPropos() {
  var apropos = document.getElementById("apropos");
  var aproposOverlay = document.getElementById("aproposOverlay");
  apropos.style.left = "0vw";
  aproposOverlay.style.display = "block";
}

function closeAPropos () {
  var apropos = document.getElementById("apropos");
  var aproposOverlay = document.getElementById("aproposOverlay");
  apropos.style.left = "calc(var(--aproposSize)*-1)";
  aproposOverlay.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "experiences.json", true);
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
          var xps = JSON.parse(xhr.responseText);
          var xpList = document.getElementById("experiences");

          xps.forEach(function(xp) {
              var xpItem = document.createElement("div");
              xpItem.classList.add("timeline");
              xpItem.innerHTML = "<img src=\"" + xp.img + "\" alt=\"\"><div class=\"timelineText\"><p class=\"bold\">" + xp.poste + "</p><p>" + xp.date + "</p><p>" + xp.desc + "</p></div>";
              xpList.appendChild(xpItem);
          });
      }
  };
  xhr.send();
});

document.addEventListener("DOMContentLoaded", function() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "formations.json", true);
  xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
          var forms = JSON.parse(xhr.responseText);
          var formList = document.getElementById("formations");

          forms.forEach(function(form) {
              var formItem = document.createElement("div");
              formItem.classList.add("timeline");
              formItem.innerHTML = "<img src=\"" + form.img + "\" alt=\"\"><div class=\"timelineText\"><p class=\"bold\">" + form.nom + "</p><p>" + form.lieu + "</p><p>" + form.date + "</p><p>" + form.desc + "</p></div>";
              formList.appendChild(formItem);
          });
      }
  };
  xhr.send();
});

document.addEventListener("DOMContentLoaded", function() {
  var maxRotation = 2; // Définir la valeur maximale de rotation

  // Sélectionner tous les éléments <li> dans la liste
  var listItems = document.querySelectorAll('#badges *');

  // Appliquer une rotation initiale à chaque élément <li>
  listItems.forEach(function(item) {
      applyRotation(item);
  });

  // Ajouter un gestionnaire d'événements à chaque survol
  listItems.forEach(function(item) {
      item.addEventListener("mouseover", function() {
          applyRotation(item); // Appliquer une nouvelle rotation au survol
      });
  });

  // Fonction pour appliquer une rotation à un élément
  function applyRotation(element) {
      // Calculer une rotation aléatoire entre -5 et 5 degrés
      var rotation = Math.random() * (2 * maxRotation) - maxRotation;

      // Appliquer la rotation à l'élément
      element.style.transform = "rotate(" + rotation + "deg)";
  }
});



