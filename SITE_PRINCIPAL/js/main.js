/* ==========================================================================
   NEUMORPHIC PORTFOLIO - FULVIO TANURE
   JAVASCRIPT CORE GLOBAL LOGIC
   ========================================================================== */

(() => {
    document.addEventListener('DOMContentLoaded', () => {
        // Dark mode removed
        initMobileNavigation();
        initScrollSpy();
        initLanguageManager();
        initAccessibilityHelper();
        initPhotographyPreloader();
    });


       MOBILE NAVIGATION MENU & BOTTOM NAV
       ========================================================================== */
    function initMobileNavigation() {
        const mobileToggleBtn = document.getElementById('mobile-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');
        const bottomNavLinks = document.querySelectorAll('.mobile-bottom-nav-item');

        function updateMobileToggleAria() {
            const isActive = document.body.classList.contains('mobile-active');
            mobileToggleBtn.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            
            // Set dynamic aria-label
            const openLabel = window.i18n && typeof window.i18n.t === 'function' ? window.i18n.t('accessibility.menu_open') : "Abrir menu";
            const closeLabel = window.i18n && typeof window.i18n.t === 'function' ? window.i18n.t('accessibility.menu_close') : "Fechar menu";
            mobileToggleBtn.setAttribute('aria-label', isActive ? closeLabel : openLabel);
        }

        if (mobileToggleBtn) {
            mobileToggleBtn.addEventListener('click', () => {
                document.body.classList.toggle('mobile-active');
                updateMobileToggleAria();
            });
            // Update labels on language change
            window.addEventListener('languageChanged', updateMobileToggleAria);
        }

        // Close menu when clicking on any navigation link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                document.body.classList.remove('mobile-active');
                if (mobileToggleBtn) updateMobileToggleAria();
            });
        });

        // Tactile quick active response on bottom nav tap
        bottomNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                bottomNavLinks.forEach(item => {
                    item.classList.remove('active');
                    item.removeAttribute('aria-current');
                });
                link.classList.add('active');
                link.setAttribute('aria-current', 'page');
            });
        });
    }

    /* ==========================================================================
       SCROLL ACTIVE LINK MONITOR (SCROLLSPY)
       ========================================================================== */
    function initScrollSpy() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        const bottomNavLinks = document.querySelectorAll('.mobile-bottom-nav-item');

        if (!sections.length) return;

        window.addEventListener('scroll', () => {
            let currentSectionId = '';
            const scrollPosition = window.scrollY + 150; // offset height threshold

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            if (currentSectionId) {
                // Update desktop nav
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    link.removeAttribute('aria-current');
                    if (link.getAttribute('href') === `#${currentSectionId}`) {
                        link.classList.add('active');
                        link.setAttribute('aria-current', 'page');
                    }
                });

                // Update mobile bottom nav
                bottomNavLinks.forEach(link => {
                    link.classList.remove('active');
                    link.removeAttribute('aria-current');
                    if (link.getAttribute('href') === `#${currentSectionId}`) {
                        link.classList.add('active');
                        link.setAttribute('aria-current', 'page');
                    }
                });
            }
        });
    }

    /* ==========================================================================
       LANGUAGE SELECTOR ACTIONS (PT / EN / IT INTERACTION)
       ========================================================================== */
    function initLanguageManager() {
        const langBtn = document.getElementById('lang-btn');
        const langDropdown = document.getElementById('lang-dropdown');
        const dropdownItems = document.querySelectorAll('.lang-dropdown-item');

        if (!langBtn || !langDropdown) return;

        // Toggle dropdown open/close
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isExpanded = langBtn.getAttribute('aria-expanded') === 'true';
            
            langBtn.setAttribute('aria-expanded', !isExpanded);
            langDropdown.classList.toggle('show');
            langBtn.classList.toggle('active');
        });

        // Click handler for dropdown items
        dropdownItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                const selectedLang = item.getAttribute('data-lang');
                if (window.i18n && typeof window.i18n.setLanguage === 'function') {
                    window.i18n.setLanguage(selectedLang);
                }
                
                // Close dropdown
                langDropdown.classList.remove('show');
                langBtn.classList.remove('active');
                langBtn.setAttribute('aria-expanded', 'false');
            });
        });

        // Close dropdown when clicking anywhere else on the document
        document.addEventListener('click', (e) => {
            if (langDropdown.classList.contains('show') && !e.target.closest('.lang-selector-wrapper')) {
                langDropdown.classList.remove('show');
                langBtn.classList.remove('active');
                langBtn.setAttribute('aria-expanded', 'false');
            }
        });

        // Close dropdown with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && langDropdown.classList.contains('show')) {
                langDropdown.classList.remove('show');
                langBtn.classList.remove('active');
                langBtn.setAttribute('aria-expanded', 'false');
                langBtn.focus();
            }
        });
    }

    /* ==========================================================================
       ACCESSIBILITY HELPER (AUTOMATION)
       ========================================================================== */
    function initAccessibilityHelper() {
        // Automatically add aria-hidden="true" to all decorative SVGs
        document.querySelectorAll('svg').forEach(svg => {
            if (!svg.hasAttribute('aria-label') && !svg.hasAttribute('role') && !svg.hasAttribute('aria-hidden')) {
                svg.setAttribute('aria-hidden', 'true');
            }
        });
    }

    /* ==========================================================================
       PHOTOGRAPHY BACKGROUND ASSETS PRELOADER
       ========================================================================== */
    function initPhotographyPreloader() {
        const runPreloader = () => {
            // Evita consumir dados caso o usuário ative economia de dados no navegador
            if (navigator.connection && navigator.connection.saveData) {
                return;
            }

            // 1. Carrega o photos_data.js dinamicamente
            const script = document.createElement('script');
            script.src = 'PAGINAS/SITE_FOTO/photos_data.js';
            script.onload = () => {
                if (typeof photosData !== 'undefined' && Array.isArray(photosData)) {
                    // Pré-carrega folhas de estilo e scripts principais da fotografia
                    const assets = [
                        { href: 'PAGINAS/SITE_FOTO/styles.css', as: 'style' },
                        { href: 'PAGINAS/SITE_FOTO/app.js', as: 'script' }
                    ];
                    assets.forEach(asset => {
                        const link = document.createElement('link');
                        link.rel = 'prefetch';
                        link.href = asset.href;
                        if (asset.as) link.setAttribute('as', asset.as);
                        document.head.appendChild(link);
                    });

                    // Pré-carrega apenas as fotos principais (até 15) para otimizar desempenho e dados
                    const maxPreload = Math.min(photosData.length, 15);
                    let index = 0;
                    const preloadNext = () => {
                        if (index >= maxPreload) {
                            return;
                        }
                        const photo = photosData[index];
                        if (photo && photo.src) {
                            const img = new Image();
                            img.src = 'PAGINAS/SITE_FOTO/' + photo.src;
                            img.onload = img.onerror = () => {
                                index++;
                                setTimeout(preloadNext, 200);
                            };
                        } else {
                            index++;
                            preloadNext();
                        }
                    };

                    preloadNext();
                }
            };
            document.body.appendChild(script);
        };

        // Executa apenas quando o navegador estiver totalmente ocioso (idle)
        if ('requestIdleCallback' in window) {
            window.requestIdleCallback(() => {
                // Pequeno timeout extra para garantir que a renderização inicial terminou
                setTimeout(runPreloader, 3000);
            });
        } else {
            window.addEventListener('load', () => {
                setTimeout(runPreloader, 5000);
            });
        }
    }
})();
