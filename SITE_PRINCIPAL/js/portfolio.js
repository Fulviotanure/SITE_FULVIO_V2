/* ==========================================================================
   NEUMORPHIC PORTFOLIO - FULVIO TANURE
   MODULAR JS: GALLERY & PORTFOLIO MODALS ENGINE
   ========================================================================== */

(() => {
    document.addEventListener('DOMContentLoaded', () => {
        initGalleryModals();
    });

    function initGalleryModals() {
        // Modal elements
        const galleryListModal = document.getElementById('gallery-list-modal');
        const galleryCloseBtn = document.getElementById('gallery-modal-close');
        
        const sitesListModal = document.getElementById('sites-list-modal');
        const sitesCloseBtn = document.getElementById('sites-modal-close');
        
        const detailModal = document.getElementById('portfolio-modal');
        const detailCloseBtn = document.getElementById('modal-close-btn');
        const modalImgContainer = document.getElementById('modal-img-container');
        const modalTitle = document.getElementById('modal-title');
        const modalDesc = document.getElementById('modal-desc');
        const modalTags = document.getElementById('modal-tags');

        // Triggers
        const btnOpenGallery = document.getElementById('btn-open-gallery');
        const btnOpenSites = document.getElementById('btn-open-sites');
        const mobileNavSites = document.getElementById('mobile-nav-sites');
        const portfolioNavLinks = document.querySelectorAll('a[href="#portfolio"]');

        let lastFocusedElement = null;

        // --- Helper functions for modals ---
        function openModal(modalEl) {
            if (!modalEl) return;
            modalEl.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal(modalEl) {
            if (!modalEl) return;
            modalEl.classList.remove('active');
            // Check if any other modal is active
            const anyActive = document.querySelector('.modal-overlay.active');
            if (!anyActive) {
                document.body.style.overflow = '';
            }
            if (lastFocusedElement) {
                lastFocusedElement.focus();
            }
        }

        // --- Event Triggers ---
        if (btnOpenGallery) {
            btnOpenGallery.addEventListener('click', (e) => {
                e.preventDefault();
                lastFocusedElement = btnOpenGallery;
                openModal(galleryListModal);
            });
        }

        if (mobileNavSites) {
            mobileNavSites.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                lastFocusedElement = mobileNavSites;
                openModal(sitesListModal);
            });
        }

        portfolioNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                lastFocusedElement = link;
                openModal(sitesListModal);
            });
        });

        if (btnOpenSites) {
            btnOpenSites.addEventListener('click', (e) => {
                e.preventDefault();
                lastFocusedElement = btnOpenSites;
                openModal(sitesListModal);
            });
        }

        // --- Close Buttons ---
        if (galleryCloseBtn) {
            galleryCloseBtn.addEventListener('click', () => closeModal(galleryListModal));
        }

        if (sitesCloseBtn) {
            sitesCloseBtn.addEventListener('click', () => closeModal(sitesListModal));
        }

        if (detailCloseBtn) {
            detailCloseBtn.addEventListener('click', () => closeModal(detailModal));
        }

        // Close on backdrop click
        [galleryListModal, sitesListModal, detailModal].forEach(modalEl => {
            if (!modalEl) return;
            modalEl.addEventListener('click', (e) => {
                if (e.target === modalEl) {
                    closeModal(modalEl);
                }
            });
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (detailModal && detailModal.classList.contains('active')) {
                    closeModal(detailModal);
                } else if (galleryListModal && galleryListModal.classList.contains('active')) {
                    closeModal(galleryListModal);
                } else if (sitesListModal && sitesListModal.classList.contains('active')) {
                    closeModal(sitesListModal);
                }
            }
        });

        // --- Clicking on an item inside 3x2 Gallery Modal -> Open Individual Detail Modal ---
        const galleryItems = document.querySelectorAll('#gallery-list-modal .gallery-grid-item');
        
        galleryItems.forEach(item => {
            item.setAttribute('tabindex', '0');
            item.setAttribute('role', 'button');

            const openDetailHandler = (e) => {
                lastFocusedElement = item;
                
                const title = item.getAttribute('data-title') || 'Projeto';
                const imgSrc = item.getAttribute('data-img') || '';
                const desc = item.getAttribute('data-desc') || '';
                const tagsStr = item.getAttribute('data-tags') || '';
                const bgStyle = item.getAttribute('data-bg') || '';

                // Populate Detail Modal
                if (modalTitle) modalTitle.textContent = title;
                if (modalDesc) modalDesc.textContent = desc;

                // Populate Image
                if (modalImgContainer) {
                    modalImgContainer.innerHTML = '';
                    modalImgContainer.className = 'modal-img-col';

                    if (imgSrc) {
                        const newImg = document.createElement('img');
                        newImg.src = imgSrc;
                        newImg.alt = title;
                        newImg.style.cursor = 'zoom-in';
                        if (bgStyle === 'white') {
                            newImg.style.backgroundColor = 'white';
                        }
                        modalImgContainer.appendChild(newImg);

                        newImg.addEventListener('click', () => openFullscreenZoom(newImg));
                    }
                }

                // Populate Tags
                if (modalTags) {
                    modalTags.innerHTML = '';
                    if (tagsStr) {
                        const tagsArr = tagsStr.split(',');
                        tagsArr.forEach(tagText => {
                            const tagSpan = document.createElement('span');
                            tagSpan.className = 'p-tag';
                            tagSpan.textContent = tagText.trim();
                            modalTags.appendChild(tagSpan);
                        });
                    }
                }

                // Open Detail Modal
                openModal(detailModal);

                setTimeout(() => {
                    if (detailCloseBtn) detailCloseBtn.focus();
                }, 50);
            };

            item.addEventListener('click', openDetailHandler);
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openDetailHandler(e);
                }
            });
        });

        // Contact link inside sites modal
        const sitesContactLink = document.getElementById('sites-contact-link');
        if (sitesContactLink) {
            sitesContactLink.addEventListener('click', () => {
                closeModal(sitesListModal);
            });
        }

        // Fullscreen Image Zoom Overlay
        function openFullscreenZoom(newImgElement) {
            const zoomOverlay = document.createElement('div');
            zoomOverlay.className = 'zoom-overlay';
            
            const img = document.createElement('img');
            img.src = newImgElement.src;
            img.alt = newImgElement.alt;
            
            zoomOverlay.appendChild(img);
            document.body.appendChild(zoomOverlay);
            
            setTimeout(() => {
                zoomOverlay.classList.add('active');
            }, 10);
            
            const closeZoom = () => {
                zoomOverlay.classList.remove('active');
                setTimeout(() => {
                    zoomOverlay.remove();
                    newImgElement.focus();
                }, 300);
            };

            img.addEventListener('click', (e) => {
                e.stopPropagation();
                img.classList.toggle('zoomed');
            });
            
            zoomOverlay.addEventListener('click', closeZoom);

            const handleZoomEsc = (e) => {
                if (e.key === 'Escape') {
                    closeZoom();
                    document.removeEventListener('keydown', handleZoomEsc);
                }
            };
            document.addEventListener('keydown', handleZoomEsc);
        }
    }
})();
