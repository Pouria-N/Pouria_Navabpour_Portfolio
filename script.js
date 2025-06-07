"use strict";

const projects = [
  {
    title: "TECHNOLOGICAL AMBIVALENCE IN URBAN-DASHBOARDS",
    location: "TORINO, ITALY",
    year: "2024",
    image: "./images/project-00.jpg",
    type: "university",
    idNumber: "00",
  },
  {
    title: "Urban Regeneration",
    location: "Borgo san paolo, Torino, italy",
    year: "2024",
    image: "./images/project-01.jpg",
    type: "university",
    idNumber: "01",
  },
  {
    title: "Climate-Responsive Mixed-Use Development",
    location: "St. John District, Portland, OR",
    year: "2024",
    image: "./images/project-02.jpg",
    type: "university",
    idNumber: "02",
  },
  {
    title: "Unlocking Heritage-Led Urban Planning",
    location: "Venaria Reale, To, italy",
    year: "2023",
    image: "./images/project-03.jpg",
    type: "university",
    idNumber: "03",
  },
  {
    title: "Enhancing Perviousness",
    location: "Madonna di Campagna, Torino, italy",
    year: "2023",
    image: "./images/project-04.jpg",
    type: "university",
    idNumber: "04",
  },
  {
    title: "Energy Challenges and Sustainability",
    location: "CORIO, TO, ITALY",
    year: "2023",
    image: "./images/project-05.jpg",
    type: "university",
    idNumber: "05",
  },
  {
    title: "Trace of a Lost Path: Museum of Crafts",
    location: "mashhad, iran",
    year: "2019",
    image: "./images/project-06.jpg",
    type: "university",
    idNumber: "06",
  },
  {
    title: "Khorasan Cultural Center",
    location: "tus, mashhad, iran",
    year: "2018",
    image: "./images/project-07.jpg",
    type: "university",
    idNumber: "07",
  },
  {
    title: "fazelian house",
    location: "Yazd, iran",
    year: "2022",
    image: "./images/project-08.jpg",
    type: "professional",
    idNumber: "08",
  },
  {
    title: "Office building facade design",
    location: "tabriz, Iran",
    year: "2022",
    image: "./images/project-09.jpg",
    type: "professional",
    idNumber: "09",
  },
  {
    title: "villa",
    location: "varzeghan, east azerbaijan, iran",
    year: "2021",
    image: "./images/project-10.jpg",
    type: "professional",
    idNumber: "10",
  },
  {
    title: "small house renovation",
    location: "tabriz, iran",
    year: "2020",
    image: "./images/project-11.jpg",
    type: "professional",
    idNumber: "11",
  },
  {
    title: "interior design",
    location: "tabriz, iran",
    year: "2020",
    image: "./images/project-12.jpg",
    type: "professional",
    idNumber: "12",
  },
];

const overlay = document.querySelector(".overlay");

// Open and Close Nav

function menuHandler() {
  document.querySelector(".menu-icon").addEventListener("click", function () {
    document.querySelector("header nav .wrapper").classList.add("nav-open");
  });

  document
    .querySelector("#close-nav-menu")
    .addEventListener("click", function () {
      document
        .querySelector("header nav .wrapper")
        .classList.remove("nav-open");
    });
}

// Project Population
function populateProjects(projectList) {
  let projectSection = document.querySelector(".projects-area");
  projectSection.textContent = "";
  // Run a loop through the projects and create an HTML element ("project-item") for each of them
  projectList.forEach(function (project, index) {
    // Create the HTML element for the individual project
    let projectElm = document.createElement("div");
    projectElm.classList.add("project-item");
    projectElm.id = project.idNumber;

    // Create the project image
    let projectImage = document.createElement("img");
    projectImage.src = project.image;
    projectImage.alt = "Image for " + project.title;

    // Create the project details section
    let projectDetails = document.createElement("div");
    projectDetails.classList.add("project-details");

    // Create project title, author, price-title, year, and price
    let projectTitle = document.createElement("h3");
    projectTitle.classList.add("project-title");
    projectTitle.textContent = project.title;

    let projectYear = document.createElement("h4");
    projectYear.classList.add("project-year");
    projectYear.textContent = project.year;

    let projectLocation = document.createElement("h4");
    projectLocation.classList.add("project-location");
    projectLocation.textContent = project.location;

    // Append the project title, and location
    projectDetails.append(projectTitle);
    projectDetails.append(projectYear);
    projectDetails.append(projectLocation);

    // Add all child HTML elements of the project
    projectElm.append(projectImage);
    projectElm.append(projectDetails);

    // Add complete individual project to the project section
    projectSection.append(projectElm);

    projectElm.addEventListener("click", function () {
      console.log(project.idNumber);
      const projectId = "p" + project.idNumber;
      const modal = document.getElementById(projectId);
      if (!modal) return;
      modal.classList.remove("hidden");
      overlay.classList.remove("hidden");

      // SLIDER: Show images one by one

      const slides = modal.querySelector(".slides");
      const images = modal.querySelectorAll(".slides img");
      const prev = modal.querySelector(".prev");
      const next = modal.querySelector(".next");

      if (slides && images.length > 0 && prev && next) {
        let index = 0;

        function showSlide(i) {
          index = (i + images.length) % images.length;
          slides.style.transform = `translateX(-${index * 100}%)`;
        }

        prev.addEventListener("click", () => showSlide(index - 1));
        next.addEventListener("click", () => showSlide(index + 1));

        showSlide(index);
      }
    });
  });
}

// Project Section
function projectHandler() {
  let academicProjects = projects.filter(function (item) {
    return item.type === "university";
  });
  let professionalProjects = projects.filter(function (item) {
    return item.type === "professional";
  });

  populateProjects(projects);

  document.querySelector(
    ".projects-filter label[for=all] span.project-amount"
  ).textContent = projects.length;
  document.querySelector(
    ".projects-filter label[for=academic] span.project-amount"
  ).textContent = academicProjects.length;
  document.querySelector(
    ".projects-filter label[for=professional] span.project-amount"
  ).textContent = professionalProjects.length;

  let projectsFilter = document.querySelector(".projects-filter");
  projectsFilter.addEventListener("click", function (e) {
    if (e.target.id === "all") {
      populateProjects(projects);
    } else if (e.target.id === "academic") {
      populateProjects(academicProjects);
    } else if (e.target.id === "professional") {
      populateProjects(professionalProjects);
    }
  });
}

// Close Modal

function closeAllModals() {
  const openModals = document.querySelectorAll("section.modal:not(.hidden)");
  openModals.forEach((modal) => {
    modal.classList.add("hidden");
  });
  overlay.classList.add("hidden");
}

function closeHandler() {
  document.querySelectorAll(".close").forEach(function (btn) {
    btn.addEventListener("click", function () {
      closeAllModals();
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeAllModals();
    }
  });

  overlay.addEventListener("click", function () {
    closeAllModals();
  });
}

// Footer Section

function footerHandler() {
  let currentYear = new Date().getFullYear();
  document.querySelector(
    "footer"
  ).textContent = `© ${new Date().getFullYear()} Pouria Navabpour. All rights reserved.`;
}

// Handlers
menuHandler();
footerHandler();
projectHandler();
closeHandler();
footerHandler();
