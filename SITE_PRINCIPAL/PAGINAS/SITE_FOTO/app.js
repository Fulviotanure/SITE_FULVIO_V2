// FULVIO TANURE | FOTOGRAFIA - Modern Portfolio Engine (Light & Interactive Edition)

// --- State Management ---
let activeFilter = "todos";
let filteredPhotos = [];
let isLoading = false;
let currentLightboxIndex = 0;
let revealObserver = null;

// Masonry State
let masonryCols = [];
let masonryColHeights = [];
let resizeTimeout;

// Lightbox Zoom & Pan State
let lightboxScale = 1;
let lightboxTranslateX = 0;
let lightboxTranslateY = 0;
let isDraggingLightbox = false;
let startDragX = 0;
let startDragY = 0;
let startTouchDistance = 0;
let startTouchScale = 1;
let isPinching = false;




// --- DOM Elements ---
const header = document.querySelector("header");
const navMenu = document.getElementById("navMenu");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.querySelectorAll(".nav-link");
const filterButtons = document.querySelectorAll(".filter-btn");
const galleryGrid = document.getElementById("galleryGrid");
const spinner = document.getElementById("spinner");
const lightbox = document.getElementById("lightbox");
const lightboxImg = lightbox.querySelector(".lightbox-img");
const lightboxCaption = lightbox.querySelector(".lightbox-caption");
const lightboxMeta = lightbox.querySelector(".lightbox-meta");
const lightboxClose = lightbox.querySelector(".lightbox-close");
const lightboxPrev = lightbox.querySelector(".lightbox-prev");
const lightboxNext = lightbox.querySelector(".lightbox-next");
const contactForm = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");
const backButtonContainer = document.getElementById("backButtonContainer");



// --- Banco de fotos (preenchido via API ou fallback estático) ---
let photos = [];

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  setupHeaderScroll();
  setupMenuToggle();
  setupScrollReveal();
  setupLightbox();
  setupContactForm();
  setupScrollIndicator();

  // Carrega fotos diretamente do banco de dados estático
  if (typeof photosData !== "undefined" && Array.isArray(photosData)) {
    photos = photosData;
    console.log(`[Static] ${photos.length} fotos carregadas do arquivo de dados`);
  } else {
    console.warn("Nenhuma fonte de fotos disponível.");
  }
  initGallery();
});

function initGallery() {
  setupFilterButtons();
  
  // Roteador baseado no hash da URL para SEO
  window.addEventListener("hashchange", handleRouting);
  handleRouting();
}

function handleRouting() {
  const hash = window.location.hash.substring(1);
  
  if (hash.startsWith("ensaios/")) {
    const category = hash.split("/")[1];
    updateFilterButtonsActiveState("ensaios");
    openPhotoshoot(category);
  } else {
    const filter = ["retratos", "cenas", "ensaios"].includes(hash) ? hash : "todos";
    updateFilterButtonsActiveState(filter);
    applyCategoryFilter(filter);
  }
}



// --- Scroll-Reveal Logic (IntersectionObserver) ---
function setupScrollReveal() {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-active");
        revealObserver.unobserve(entry.target); // Animate once
      }
    });
  }, {
    root: null,
    rootMargin: "0px 0px 150px 0px", // Trigger 150px before entering viewport for extremely smooth entry
    threshold: 0.01
  });

  // Observe all static reveal items on initial load
  const revealItems = document.querySelectorAll(".reveal");
  revealItems.forEach(item => {
    revealObserver.observe(item);
  });
}

// --- Header Scroll Effect ---
function setupHeaderScroll() {
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", handleScroll);
  handleScroll();
}

// --- Mobile Navigation Drawer Menu ---
function setupMenuToggle() {
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("open");
    navMenu.classList.toggle("open");
  });

  const mobileLinks = navMenu.querySelectorAll("a");
  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("open");
      navMenu.classList.remove("open");
    });
  });
}

// --- Portfolio Filter & Category selection ---
function setupFilterButtons() {
  // Links update the hash natively via href.
}

function updateFilterButtonsActiveState(activeFilter) {
  filterButtons.forEach(btn => {
    if (btn.getAttribute("data-filter") === activeFilter) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

// --- Fisher-Yates Shuffle ---
function shuffleArray(arr) {
  const shuffled = [...arr]; // cria cópia para não alterar o array original
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// --- Initialize Masonry Columns ---
function initMasonryColumns() {
  galleryGrid.innerHTML = "";
  masonryCols = [];
  masonryColHeights = [];
  
  let colCount = 4;
  if (window.innerWidth <= 1200) colCount = 3;
  
  for (let i = 0; i < colCount; i++) {
    const col = document.createElement("div");
    col.className = "masonry-col";
    galleryGrid.appendChild(col);
    masonryCols.push(col);
    masonryColHeights.push(0);
  }
}

// Resizing logic for responsive layout re-shuffling
window.addEventListener("resize", () => {
  if (!galleryGrid || galleryGrid.classList.contains("album-view") || !filteredPhotos.length) return;
  
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    let newColCount = 4;
    if (window.innerWidth <= 1200) newColCount = 3;
    
    if (newColCount !== masonryCols.length) {
      initMasonryColumns();
      
      isLoading = true;
      for (let i = 0; i < filteredPhotos.length; i++) {
        const photo = filteredPhotos[i];
        const card = createPhotoCard(photo, i);
        
        let shortestIndex = 0;
        let minHeight = masonryColHeights[0];
        for (let j = 1; j < masonryColHeights.length; j++) {
          if (masonryColHeights[j] < minHeight) {
            shortestIndex = j;
            minHeight = masonryColHeights[j];
          }
        }
        
        masonryCols[shortestIndex].appendChild(card);
        
        const photoHeight = photo.height || 1000;
        const photoWidth = photo.width || 1000;
        masonryColHeights[shortestIndex] += photoHeight / photoWidth;
        
        if (revealObserver) {
          revealObserver.observe(card);
        }
      }
      isLoading = false;
    }
  }, 250);
});

function applyCategoryFilter(filter) {
  activeFilter = filter;
  galleryGrid.innerHTML = "";
  
  const titleEl = document.getElementById("portfolioTitle");
  if (titleEl) {
    if (filter === "todos") titleEl.textContent = "GALERIA";
    else if (filter === "retratos") titleEl.textContent = "RETRATOS";
    else if (filter === "cenas") titleEl.textContent = "CENAS";
    else if (filter === "ensaios") titleEl.textContent = "ENSAIOS";
  }

  if (backButtonContainer) {
    backButtonContainer.style.display = "none";
    backButtonContainer.innerHTML = "";
  }
  galleryGrid.classList.remove("album-view");
  
  if (filter === "todos") {
    // Galeria: todas as fotos exceto ensaios privados, em ordem aleatória a cada carregamento
    const base = photos.filter(p => p.category !== "karen" && p.category !== "raphaela");
    filteredPhotos = shuffleArray(base);
  } else if (filter === "ensaios") {
    // Render Photoshoots Album Index (Karen & Raphaela)
    galleryGrid.classList.add("album-view");
    
    const countKaren = photos.filter(p => p.category === "karen").length;
    const countRaphaela = photos.filter(p => p.category === "raphaela").length;
    
    // Find cover photos (2nd photo for Karen, 7th photo for Raphaela)
    const coverKaren = photos.filter(p => p.category === "karen")[1]?.src || "";
    const coverRaphaela = photos.filter(p => p.category === "raphaela")[6]?.src || "";
    
    galleryGrid.innerHTML = `
      <a href="#ensaios/karen" class="album-card reveal reveal-up">
        <div class="album-cover-container">
          <img src="${coverKaren}" alt="KAREN" loading="lazy">
        </div>
        <div class="album-info">
          <h3 class="album-title">KAREN</h3>
          <p class="album-count">${countKaren} Fotos</p>
        </div>
      </a>
      <a href="#ensaios/raphaela" class="album-card reveal reveal-up">
        <div class="album-cover-container">
          <img src="${coverRaphaela}" alt="RAPHAELA" loading="lazy">
        </div>
        <div class="album-info">
          <h3 class="album-title">RAPHAELA</h3>
          <p class="album-count">${countRaphaela} Fotos</p>
        </div>
      </a>
    `;
    
    const revealCards = galleryGrid.querySelectorAll(".reveal");
    revealCards.forEach(c => revealObserver.observe(c));
    
    spinner.style.display = "none";
    isLoading = false;
    return;
  } else if (filter === "cenas") {
    // Cenas: agrupa urbana + natureza + macro sob uma única visão artística
    filteredPhotos = photos.filter(p => p.category === "cenas");
  } else if (filter === "retratos") {
    filteredPhotos = photos.filter(p => p.category === "pessoas");
  }

  initMasonryColumns();
  spinner.style.display = "flex";
  loadAllPhotos();
}

function openPhotoshoot(category) {
  galleryGrid.classList.remove("album-view");
  galleryGrid.innerHTML = "";
  
  const titleEl = document.getElementById("portfolioTitle");
  if (titleEl) {
    titleEl.textContent = "ENSAIO — " + category.toUpperCase();
  }

  if (backButtonContainer) {
    backButtonContainer.style.display = "flex";
    backButtonContainer.innerHTML = `
      <a href="#ensaios" class="btn-back">
        &larr; Voltar para Ensaios
      </a>
    `;
    // Ensure back button transitions nicely
    backButtonContainer.classList.add("reveal", "reveal-fade");
    revealObserver.observe(backButtonContainer);
  }

  filteredPhotos = photos.filter(p => p.category === category);
  
  initMasonryColumns();
  spinner.style.display = "flex";
  loadAllPhotos();
}

function loadAllPhotos() {
  if (isLoading) return;
  isLoading = true;

  for (let i = 0; i < filteredPhotos.length; i++) {
    const photo = filteredPhotos[i];
    const card = createPhotoCard(photo, i);
    
    let shortestIndex = 0;
    let minHeight = masonryColHeights[0];
    for (let j = 1; j < masonryColHeights.length; j++) {
      if (masonryColHeights[j] < minHeight) {
        shortestIndex = j;
        minHeight = masonryColHeights[j];
      }
    }
    
    masonryCols[shortestIndex].appendChild(card);
    
    const photoHeight = photo.height || 1000;
    const photoWidth = photo.width || 1000;
    masonryColHeights[shortestIndex] += photoHeight / photoWidth;
    
    if (revealObserver) {
      revealObserver.observe(card);
    }
  }

  spinner.style.display = "none";
  isLoading = false;
}

function createPhotoCard(photo, index) {
  const item = document.createElement("div");
  // Set reveal animation classes so the element transitions nicely on scroll
  item.className = "gallery-item reveal reveal-up";
  item.setAttribute("data-index", index);
  
  // Aplica aspect-ratio inline se as dimensões estiverem disponíveis
  const aspectStyle = (photo.width && photo.height) ? `style="aspect-ratio: ${photo.width} / ${photo.height};"` : "";

  item.innerHTML = `
    <div class="image-container" ${aspectStyle}>
      <img src="${photo.src}" alt="${photo.title}" loading="lazy">
    </div>
  `;

  const img = item.querySelector("img");
  const container = item.querySelector(".image-container");

  const setLoaded = () => {
    container.classList.add("loaded");
  };

  img.addEventListener("load", setLoaded);
  img.addEventListener("error", setLoaded);

  // Se a imagem já foi baixada (do cache), completa instantaneamente
  if (img.complete) {
    setLoaded();
  }

  item.addEventListener("click", () => {
    openLightbox(index);
  });

  return item;
}

// --- Lightbox ---
// --- Lightbox Zoom & Pan Helpers ---
function resetLightboxZoom() {
  lightboxScale = 1;
  lightboxTranslateX = 0;
  lightboxTranslateY = 0;
  isDraggingLightbox = false;
  isPinching = false;
  if (lightboxImg) {
    lightboxImg.style.transform = "translate3d(0px, 0px, 0px) scale(1)";
    lightboxImg.style.cursor = "zoom-in";
  }
}

function updateLightboxTransform() {
  if (!lightboxImg) return;
  lightboxImg.style.transform = `translate3d(${lightboxTranslateX}px, ${lightboxTranslateY}px, 0px) scale(${lightboxScale})`;
  lightboxImg.style.cursor = lightboxScale > 1 ? "grab" : "zoom-in";
}

// --- Lightbox ---
function setupLightbox() {
  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", showPrevImage);
  lightboxNext.addEventListener("click", showNextImage);
  
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.classList.contains("lightbox-image-wrapper")) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "ArrowLeft") showPrevImage();
    else if (e.key === "ArrowRight") showNextImage();
    else if (e.key === "Escape") closeLightbox();
  });

  // --- MOUSE WHEEL ZOOM (DESKTOP) ---
  lightbox.addEventListener("wheel", (e) => {
    if (!lightbox.classList.contains("open")) return;
    e.preventDefault();
    
    const zoomSpeed = 0.12;
    const direction = e.deltaY < 0 ? 1 : -1;
    
    lightboxScale = Math.min(Math.max(1, lightboxScale + direction * zoomSpeed), 4);
    
    if (lightboxScale === 1) {
      lightboxTranslateX = 0;
      lightboxTranslateY = 0;
    }
    updateLightboxTransform();
  }, { passive: false });

  // --- CLICK & DRAG PAN (DESKTOP) ---
  lightboxImg.addEventListener("mousedown", (e) => {
    if (lightboxScale <= 1) return;
    e.preventDefault();
    isDraggingLightbox = true;
    startDragX = e.clientX - lightboxTranslateX;
    startDragY = e.clientY - lightboxTranslateY;
    lightboxImg.style.cursor = "grabbing";
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDraggingLightbox || lightboxScale <= 1) return;
    e.preventDefault();
    lightboxTranslateX = e.clientX - startDragX;
    lightboxTranslateY = e.clientY - startDragY;
    
    const maxDragX = (lightboxScale - 1) * (window.innerWidth / 2);
    const maxDragY = (lightboxScale - 1) * (window.innerHeight / 2);
    lightboxTranslateX = Math.min(Math.max(-maxDragX, lightboxTranslateX), maxDragX);
    lightboxTranslateY = Math.min(Math.max(-maxDragY, lightboxTranslateY), maxDragY);
    
    updateLightboxTransform();
  });

  window.addEventListener("mouseup", () => {
    if (isDraggingLightbox) {
      isDraggingLightbox = false;
      if (lightboxImg) {
        lightboxImg.style.cursor = lightboxScale > 1 ? "grab" : "zoom-in";
      }
    }
  });

  // --- TOUCH GESTURES: PINCH-TO-ZOOM & DRAG (MOBILE) ---
  lightbox.addEventListener("touchstart", (e) => {
    if (!lightbox.classList.contains("open")) return;
    
    if (e.touches.length === 2) {
      isPinching = true;
      startTouchDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      startTouchScale = lightboxScale;
    } else if (e.touches.length === 1 && lightboxScale > 1) {
      isDraggingLightbox = true;
      startDragX = e.touches[0].clientX - lightboxTranslateX;
      startDragY = e.touches[0].clientY - lightboxTranslateY;
    }
  });

  lightbox.addEventListener("touchmove", (e) => {
    if (!lightbox.classList.contains("open")) return;
    
    if (e.touches.length === 2 && isPinching) {
      e.preventDefault();
      const currentDistance = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      if (startTouchDistance > 0) {
        const scaleFactor = currentDistance / startTouchDistance;
        lightboxScale = Math.min(Math.max(1, startTouchScale * scaleFactor), 4);
        if (lightboxScale === 1) {
          lightboxTranslateX = 0;
          lightboxTranslateY = 0;
        }
        updateLightboxTransform();
      }
    } else if (e.touches.length === 1 && isDraggingLightbox && lightboxScale > 1) {
      e.preventDefault();
      lightboxTranslateX = e.touches[0].clientX - startDragX;
      lightboxTranslateY = e.touches[0].clientY - startDragY;
      
      const maxDragX = (lightboxScale - 1) * (window.innerWidth / 2);
      const maxDragY = (lightboxScale - 1) * (window.innerHeight / 2);
      lightboxTranslateX = Math.min(Math.max(-maxDragX, lightboxTranslateX), maxDragX);
      lightboxTranslateY = Math.min(Math.max(-maxDragY, lightboxTranslateY), maxDragY);
      
      updateLightboxTransform();
    }
  }, { passive: false });

  lightbox.addEventListener("touchend", (e) => {
    if (e.touches.length < 2) {
      isPinching = false;
    }
    if (e.touches.length === 0) {
      isDraggingLightbox = false;
    }
  });
}

function openLightbox(index) {
  currentLightboxIndex = index;
  updateLightboxImage();
  
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  resetLightboxZoom();
  
  setTimeout(() => {
    lightboxImg.src = "";
  }, 400);
}

function showPrevImage() {
  if (currentLightboxIndex > 0) {
    currentLightboxIndex--;
  } else {
    currentLightboxIndex = filteredPhotos.length - 1;
  }
  updateLightboxImage();
}

function showNextImage() {
  if (currentLightboxIndex < filteredPhotos.length - 1) {
    currentLightboxIndex++;
  } else {
    currentLightboxIndex = 0;
  }
  updateLightboxImage();
}

function updateLightboxImage() {
  const photo = filteredPhotos[currentLightboxIndex];
  if (!photo) return;

  lightboxImg.style.opacity = "0";
  resetLightboxZoom();

  const imgLoader = new Image();
  imgLoader.src = photo.src;
  
  imgLoader.onload = () => {
    lightboxImg.src = photo.src;
    lightboxImg.alt = photo.title;
    
    // lightboxCaption.textContent = photo.title;
    
    let categoryLabel = photo.category;
    if (photo.category === "cenas") categoryLabel = "Cenas";
    else if (photo.category === "pessoas") categoryLabel = "Retratos";
    else if (photo.category === "karen") categoryLabel = "Ensaio — KAREN";
    else if (photo.category === "raphaela") categoryLabel = "Ensaio — RAPHAELA";

    lightboxMeta.textContent = `${categoryLabel} • ${currentLightboxIndex + 1} de ${filteredPhotos.length}`;
    
    lightboxImg.style.opacity = "1";
  };
}

// --- Contact Form ---
function setupContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector(".btn-submit");
    const origText = submitBtn.textContent;

    submitBtn.textContent = "Enviando...";
    submitBtn.disabled = true;

    const nameVal = document.getElementById("name").value.trim();
    const emailVal = document.getElementById("email").value.trim();
    const subjectVal = document.getElementById("subject").value.trim();
    const messageVal = document.getElementById("message").value.trim();

    const web3FormsAccessKey = "bf2e767b-e809-4b59-968e-9ba6d342f3f2";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          access_key: web3FormsAccessKey,
          name: nameVal,
          email: emailVal,
          subject: `Novo Contato da Fotografia: ${subjectVal}`,
          from_name: "Fotografia Fulvio Tanure",
          message: `Assunto: ${subjectVal}\n\nMensagem:\n${messageVal}`
        })
      });

      const result = await response.json();

      submitBtn.textContent = origText;
      submitBtn.disabled = false;

      if (response.status === 200 && result.success) {
        showSuccessModal(nameVal);
        contactForm.reset();
      } else {
        console.error("Erro Web3Forms:", result);
        alert("Ops! Ocorreu um erro ao enviar sua mensagem: " + (result.message || ""));
      }
    } catch (error) {
      console.error("Erro de conexão:", error);
      submitBtn.textContent = origText;
      submitBtn.disabled = false;
      alert("Falha na conexão de rede ao enviar a mensagem. Por favor, verifique sua internet.");
    }
  });
}

function showSuccessModal(clientName) {
  const modal = document.getElementById("successModal");
  if (!modal) return;

  const modalTitle = modal.querySelector("#modalTitle");
  const modalMessage = modal.querySelector("#modalMessage");
  const closeBtn = modal.querySelector("#closeModalBtn");

  const firstName = clientName.split(" ")[0];
  modalTitle.textContent = `Muito Obrigado, ${firstName}!`;
  modalMessage.textContent = "Sua mensagem foi enviada com sucesso! Entrarei em contato em breve.";

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  const handleEsc = (e) => {
    if (e.key === "Escape") {
      closeModal();
      document.removeEventListener("keydown", handleEsc);
    }
  };

  closeBtn.onclick = closeModal;
  document.addEventListener("keydown", handleEsc);
}

// --- Scroll Indicator & Active Page highlight ---
function setupScrollIndicator() {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  // Handle clicks on header navigation links that have category filters
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      const targetFilter = link.getAttribute("data-nav-filter");
      if (targetFilter) {
        const filterBtn = document.querySelector(`.filter-btn[data-filter="${targetFilter}"]`);
        if (filterBtn) {
          // Trigger the filter button click to switch views
          filterBtn.click();
        }
      }
    });
  });

  window.addEventListener("scroll", () => {
    let current = "";
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}


