/* ==========================================================================
   NEUMORPHIC PORTFOLIO - FULVIO TANURE
   MODULAR JS: PORTFOLIO SECTION (FILTERS)
   ========================================================================== */

(() => {
    document.addEventListener('DOMContentLoaded', () => {
        initPortfolioFilters();
        initPortfolioModal();
    });

    /* ==========================================================================
       PORTFOLIO FILTER ENGINE
       ========================================================================== */
    function initPortfolioFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioGrid = document.getElementById('portfolio-grid');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        if (!portfolioGrid) return;

        // Initialize aria-pressed state
        filterBtns.forEach(btn => {
            const isActive = btn.classList.contains('active');
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and set aria-pressed to false
                filterBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                
                // Add active to clicked button and set aria-pressed to true
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
                
                const filterValue = btn.getAttribute('data-filter');

                portfolioItems.forEach(item => {
                    const category = item.getAttribute('data-category');

                    if (filterValue === 'all' || category === filterValue) {
                        item.style.display = 'flex';
                        // Trigger reflow for fade in transition
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 50);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    /* ==========================================================================
       PORTFOLIO MODAL (LIGHTBOX) ENGINE
       ========================================================================== */
    function initPortfolioModal() {
        const modal = document.getElementById('portfolio-modal');
        if (!modal) return;

        const closeBtn = document.getElementById('modal-close-btn');
        const modalImgContainer = document.getElementById('modal-img-container');
        const modalTitle = document.getElementById('modal-title');
        const modalDesc = document.getElementById('modal-desc');
        const modalTags = document.getElementById('modal-tags');
        
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        let lastFocusedElement = null;

        // Dynamic Aria Labels & Keyboard triggers
        function updatePortfolioAccessibility() {
            portfolioItems.forEach(item => {
                item.setAttribute('tabindex', '0');
                item.setAttribute('role', 'button');
                item.setAttribute('aria-haspopup', 'dialog');
                
                const titleNode = item.querySelector('.portfolio-item-title');
                if (titleNode) {
                    const title = titleNode.textContent.trim();
                    const ariaLabel = window.i18n && typeof window.i18n.t === 'function'
                        ? window.i18n.t('accessibility.portfolio_item_aria', { title: title })
                        : `Ver detalhes do projeto: ${title}`;
                    item.setAttribute('aria-label', ariaLabel);
                }
            });
        }

        // Run initially
        updatePortfolioAccessibility();

        // Update when language changes
        window.addEventListener('languageChanged', updatePortfolioAccessibility);

        portfolioItems.forEach(item => {
            // Adiciona cursor de clique
            item.style.cursor = 'pointer';

            const openHandler = (e) => {
                // Previne que outros eventos disparem se clicar em botões dentro do card
                if (e.target.closest('.portfolio-tags')) return;

                // Guarda o último elemento focado para restaurar no encerramento
                lastFocusedElement = item;

                // Extrai dados do card clicado
                const imgContainer = item.querySelector('.portfolio-img-container');
                const titleNode = item.querySelector('.portfolio-item-title');
                const descNode = item.querySelector('.portfolio-item-desc');
                const tagsNode = item.querySelector('.portfolio-tags');

                // 1. Limpa o container e clona a imagem ou SVG
                modalImgContainer.innerHTML = '';
                modalImgContainer.className = 'modal-img-col'; 

                if (imgContainer) {
                    const imgElement = imgContainer.querySelector('img');
                    const svgElement = imgContainer.querySelector('svg');
                    
                    if (imgElement) {
                        const newImg = document.createElement('img');
                        newImg.src = imgElement.src;
                        newImg.alt = imgElement.alt || 'Imagem do Projeto';
                        newImg.style.cursor = 'zoom-in';
                        newImg.title = 'Clique para ver em tela cheia (Teclado: Enter/Espaço)';
                        newImg.tabIndex = 0;
                        newImg.setAttribute('role', 'button');
                        newImg.setAttribute('aria-label', 'Ampliar imagem');
                        modalImgContainer.appendChild(newImg);

                        // Evento para abrir o zoom em tela cheia
                        newImg.addEventListener('click', () => {
                            openFullscreenZoom(newImg);
                        });
                        newImg.addEventListener('keydown', (evt) => {
                            if (evt.key === 'Enter' || evt.key === ' ') {
                                evt.preventDefault();
                                openFullscreenZoom(newImg);
                            }
                        });
                    } else if (svgElement) {
                        const newSvg = svgElement.cloneNode(true);
                        const placeholder = imgContainer.querySelector('.placeholder-img');
                        if (placeholder && placeholder.classList.length > 1) {
                             const bgClass = Array.from(placeholder.classList).find(c => c.startsWith('img-neon-'));
                             if (bgClass) modalImgContainer.classList.add(bgClass);
                        }
                        modalImgContainer.appendChild(newSvg);
                    }
                }

                // 2. Preenche os textos
                if (titleNode) modalTitle.textContent = titleNode.textContent;
                if (descNode) modalDesc.textContent = descNode.textContent;
                
                // 3. Clona as tags
                modalTags.innerHTML = '';
                if (tagsNode) {
                    Array.from(tagsNode.children).forEach(tag => {
                        modalTags.appendChild(tag.cloneNode(true));
                    });
                }

                // 4. Mostra o modal e trava o scroll da página
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';

                // Move focus to modal close button
                setTimeout(() => {
                    closeBtn.focus();
                }, 50);
            };

            item.addEventListener('click', openHandler);
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openHandler(e);
                }
            });
        });

        // Lógica de fechamento
        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
            
            // Retorna o foco para o elemento original
            if (lastFocusedElement) {
                lastFocusedElement.focus();
            }
        };

        closeBtn.addEventListener('click', closeModal);

        // Fecha ao clicar fora da caixa do modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Fecha com a tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });

        // Trap focus inside modal
        modal.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && modal.classList.contains('active')) {
                const focusableElements = Array.from(modal.querySelectorAll('button, [tabindex="0"], img[tabindex="0"]'));
                if (focusableElements.length === 0) return;
                
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey) { // Shift + Tab
                    if (document.activeElement === firstElement) {
                        lastElement.focus();
                        e.preventDefault();
                    }
                } else { // Tab
                    if (document.activeElement === lastElement) {
                        firstElement.focus();
                        e.preventDefault();
                    }
                }
            }
        });

        // Função auxiliar para o Overlay de Zoom
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

            // Clica na imagem para alternar zoom (tamanho real)
            img.addEventListener('click', (e) => {
                e.stopPropagation(); // Evita que feche o overlay
                img.classList.toggle('zoomed');
                
                if (img.classList.contains('zoomed')) {
                    const rect = zoomOverlay.getBoundingClientRect();
                    const offsetX = e.clientX / rect.width;
                    const offsetY = e.clientY / rect.height;
                    zoomOverlay.scrollLeft = img.offsetWidth * offsetX - rect.width / 2;
                    zoomOverlay.scrollTop = img.offsetHeight * offsetY - rect.height / 2;
                }
            });
            
            // Clica fora da imagem (ou no fundo escuro) para fechar
            zoomOverlay.addEventListener('click', () => {
                closeZoom();
            });

            // ESC key to close zoom
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
