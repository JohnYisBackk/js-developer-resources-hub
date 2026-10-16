"use strict";

// ======================================================
// SELECTED ELEMENTS
// ======================================================

// HEADER
const navLinks = document.querySelectorAll(".nav-link");
const themeBtn = document.getElementById("themeBtn");

// HERO
const exploreResourcesBtn = document.querySelector(".hero-button.primary");
const watchDemoBtn = document.querySelector(".hero-button.secondary");

// STATS
const resourcesValue = document.getElementById("resourcesValue");
const categoriesValue = document.getElementById("categoriesValue");
const favoriteToolsValue = document.getElementById("favoriteToolsValue");
const trendingValue = document.getElementById("trendingValue");

// SEARCH & CATEGORIES
const searchInput = document.getElementById("searchInput");
const searchShortcut = document.querySelector(".search-shortcut");
const categoryButtons = document.querySelectorAll(".category-button");

// FEATURED RESOURCES
const resourcesGrid = document.getElementById("resourcesGrid");
const viewAllResourcesBtn = document.getElementById("viewAllResourcesBtn");
const viewAllResourcesText = viewAllResourcesBtn.querySelector("span");

// TRENDING RESOURCES
const trendingItems = document.querySelectorAll(".trending-item");
const trendingViewAllBtn = document.querySelector(".trending-arrow-icon");

// ======================================================
// STATE
// ======================================================

let favoriteResources = [];
let searchTerm = "";
let activeCategory = "all";
let isShowingAll = false;

let currentTheme = "dark";

// ======================================================
// RESOURCES DATA
// ======================================================

const resources = [
  {
    id: 1,
    name: "MDN Web Docs",
    description:
      "Documentation and guides for HTML, CSS, JavaScript and Web APIs.",
    category: "javascript",
    url: "https://developer.mozilla.org/",
    logo: "https://www.google.com/s2/favicons?domain=developer.mozilla.org&sz=64",
  },

  {
    id: 2,
    name: "JavaScript.info",
    description:
      "Modern JavaScript tutorials covering everything from basics to advanced topics.",
    category: "javascript",
    url: "https://javascript.info/",
    logo: "https://www.google.com/s2/favicons?domain=javascript.info&sz=64",
  },

  {
    id: 3,
    name: "CSS-Tricks",
    description:
      "Articles, guides and practical techniques for modern CSS development.",
    category: "css",
    url: "https://css-tricks.com/",
    logo: "https://www.google.com/s2/favicons?domain=css-tricks.com&sz=64",
  },

  {
    id: 4,
    name: "Can I Use",
    description:
      "Check browser support for modern HTML, CSS and JavaScript features.",
    category: "css",
    url: "https://caniuse.com/",
    logo: "https://www.google.com/s2/favicons?domain=caniuse.com&sz=64",
  },

  {
    id: 5,
    name: "React Docs",
    description:
      "Official React documentation, guides and interactive learning resources.",
    category: "react",
    url: "https://react.dev/",
    logo: "https://www.google.com/s2/favicons?domain=react.dev&sz=64",
  },

  {
    id: 6,
    name: "GitHub Docs",
    description:
      "Documentation for GitHub, Git, repositories and developer workflows.",
    category: "tools",
    url: "https://docs.github.com/",
    logo: "https://www.google.com/s2/favicons?domain=github.com&sz=64",
  },

  {
    id: 7,
    name: "Postman",
    description: "Platform for building, testing and working with APIs.",
    category: "apis",
    url: "https://www.postman.com/",
    logo: "https://www.google.com/s2/favicons?domain=postman.com&sz=64",
  },

  {
    id: 8,
    name: "JSONPlaceholder",
    description:
      "Free fake REST API perfect for testing and learning Fetch API.",
    category: "apis",
    url: "https://jsonplaceholder.typicode.com/",
    logo: "https://www.google.com/s2/favicons?domain=jsonplaceholder.typicode.com&sz=64",
  },

  {
    id: 9,
    name: "Figma",
    description:
      "Collaborative interface design tool for websites and applications.",
    category: "design",
    url: "https://www.figma.com/",
    logo: "https://www.google.com/s2/favicons?domain=figma.com&sz=64",
  },

  {
    id: 10,
    name: "Regex101",
    description:
      "Build, test and debug regular expressions directly in the browser.",
    category: "tools",
    url: "https://regex101.com/",
    logo: "https://www.google.com/s2/favicons?domain=regex101.com&sz=64",
  },

  {
    id: 11,
    name: "Vercel",
    description:
      "Deploy frontend applications and websites with a modern cloud platform.",
    category: "tools",
    url: "https://vercel.com/",
    logo: "https://www.google.com/s2/favicons?domain=vercel.com&sz=64",
  },

  {
    id: 12,
    name: "Netlify",
    description: "Platform for deploying and hosting modern frontend projects.",
    category: "tools",
    url: "https://www.netlify.com/",
    logo: "https://www.google.com/s2/favicons?domain=netlify.com&sz=64",
  },

  {
    id: 13,
    name: "freeCodeCamp",
    description:
      "Free coding lessons, projects and certifications for web developers.",
    category: "learning",
    url: "https://www.freecodecamp.org/",
    logo: "https://www.google.com/s2/favicons?domain=freecodecamp.org&sz=64",
  },

  {
    id: 14,
    name: "Frontend Mentor",
    description:
      "Practice frontend development by building real-world design challenges.",
    category: "learning",
    url: "https://www.frontendmentor.io/",
    logo: "https://www.google.com/s2/favicons?domain=frontendmentor.io&sz=64",
  },

  {
    id: 15,
    name: "DevDocs",
    description:
      "Fast searchable documentation for many programming languages and tools.",
    category: "learning",
    url: "https://devdocs.io/",
    logo: "https://www.google.com/s2/favicons?domain=devdocs.io&sz=64",
  },
];

// ======================================================
// RENDER RESOURCES
// ======================================================

function renderResources(resourcesToRender) {
  resourcesGrid.innerHTML = "";

  const visibleResources = isShowingAll
    ? resourcesToRender
    : resourcesToRender.slice(0, 10);

  visibleResources.forEach((resource) => {
    const isFavorite = favoriteResources.includes(resource.id);

    const resourceCard = `
    <article class="resource-card">
  <div class="resource-card-header">
    <div class="resource-icon">
      <img src="${resource.logo}" alt="${resource.name} logo"/>
    </div>

    <strong>${resource.name}</strong>

    <button class="resource-favorite" type="button" data-id="${resource.id}" 
    aria-label="Add ${resource.name} to favorites">
      <i class="bi ${isFavorite ? "bi-heart-fill" : "bi-heart"}"></i> 
    </button>
  </div>

  <p>${resource.description}</p>

  <span class="resource-category">${resource.category}</span>

  <a href="${resource.url}" class="resource-link" target="_blank" rel="noopener noreferrer">
    Visit Resource
    <i class="bi bi-arrow-up-right"></i>
  </a>
</article>  
    `;

    resourcesGrid.insertAdjacentHTML("beforeend", resourceCard);
  });
}

// ======================================================
// SEARCH RESOURCES
// ======================================================

function searchResources() {
  searchTerm = searchInput.value.toLowerCase().trim();

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.name.toLowerCase().includes(searchTerm) ||
      resource.description.toLowerCase().includes(searchTerm) ||
      resource.category.toLowerCase().includes(searchTerm);

    const matchesCategory =
      activeCategory === "all" || resource.category === activeCategory;

    return matchesSearch && matchesCategory;
  });

  renderResources(filteredResources);
}

// ======================================================
// FILTER BY CATEGORY
// ======================================================

function filterByCategory(event) {
  activeCategory = event.currentTarget.dataset.category;

  categoryButtons.forEach((button) => {
    button.classList.remove("active");
  });

  event.currentTarget.classList.add("active");

  searchResources();
}

// ======================================================
// FAVORITES
// ======================================================

function toggleFavorites(event) {
  const favoriteButton = event.target.closest(".resource-favorite");

  if (!favoriteButton) return;

  const resourceId = Number(favoriteButton.dataset.id);

  if (favoriteResources.includes(resourceId)) {
    favoriteResources = favoriteResources.filter((id) => id !== resourceId);
  } else {
    favoriteResources.push(resourceId);
  }

  searchResources();
  updateStats();
}

// ======================================================
// UPDATE STATS
// ======================================================

function updateStats() {
  resourcesValue.textContent = resources.length;

  categoriesValue.textContent = categoryButtons.length - 1;

  favoriteToolsValue.textContent = favoriteResources.length;

  trendingValue.textContent = trendingItems.length;
}

// ======================================================
// VIEW ALL RESOURCES
// ======================================================

function toggleViewAll() {
  isShowingAll = !isShowingAll;

  searchResources();

  viewAllResourcesText.textContent = isShowingAll ? "show Less" : "View All";
}

// ======================================================
// KEYBOARD SEARCH SHORTCUT
// ======================================================

function handleSearchShortcut(event) {
  const isSearchShortcut =
    (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";

  if (!isSearchShortcut) return;

  event.preventDefault();

  searchInput.focus();
}

// ======================================================
// HERO ACTIONS
// ======================================================

function scrollToResources() {
  resourcesGrid.scrollIntoView({
    behavior: "smooth",
  });
}

// ======================================================
// THEME
// ======================================================

function loadTheme() {
  const storedTheme = localStorage.getItem("developerResourcesTheme");

  if (storedTheme) {
    currentTheme = storedTheme;
  }

  applyTheme();
}

function applyTheme() {
  document.documentElement.dataset.theme = currentTheme;
}

function toggleTheme() {
  currentTheme = currentTheme === "dark" ? "light" : "dark";

  applyTheme();

  localStorage.setItem("developerResourcesTheme", currentTheme);
}

// ======================================================
// NAVIGATION
// ======================================================

navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    navLinks.forEach((navLink) => {
      navLink.classList.remove("active");
    });

    link.classList.add("active");

    const linkTarget = link.dataset.link;

    if (linkTarget === "home") {
      document.querySelector(".hero-section").scrollIntoView({
        behavior: "smooth",
      });
    }

    if (linkTarget === "resources") {
      document.querySelector(".featured-section").scrollIntoView({
        behavior: "smooth",
      });
    }

    if (linkTarget === "categories") {
      document.querySelector(".filters-section").scrollIntoView({
        behavior: "smooth",
      });
    }

    if (linkTarget === "favorites") {
      document.querySelector(".featured-section").scrollIntoView({
        behavior: "smooth",
      });
    }

    if (linkTarget === "about") {
      document.querySelector(".footer").scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// ======================================================
// EVENT LISTENERS
// ======================================================

resourcesGrid.addEventListener("click", toggleFavorites);

searchInput.addEventListener("input", searchResources);

categoryButtons.forEach((button) => {
  button.addEventListener("click", filterByCategory);
});

viewAllResourcesBtn.addEventListener("click", toggleViewAll);

exploreResourcesBtn.addEventListener("click", scrollToResources);

document.addEventListener("keydown", handleSearchShortcut);

themeBtn.addEventListener("click", toggleTheme);

// ======================================================
// INIT APP
// ======================================================

function initApp() {
  loadTheme();

  renderResources(resources);

  updateStats();
}

initApp();
