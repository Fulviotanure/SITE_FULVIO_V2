/* ==========================================================================
   NEUMORPHIC PORTFOLIO - FULVIO TANURE
   I18N LOCALIZATION ENGINE (PT, EN, IT)
   ========================================================================== */

(() => {
    // 1. Translations dictionary
    const dictionary = {
        pt: {
            accessibility: {
                skip_link: "Pular para o conteúdo principal",
                lang_btn_aria: "Alterar idioma",
                menu_btn_aria: "Menu de navegação",
                menu_open: "Abrir menu de navegação",
                menu_close: "Fechar menu de navegação",
                portfolio_item_aria: "Ver detalhes do projeto: {title}",
                widget_aria: "Opções de Acessibilidade",
                menu_title: "Acessibilidade",
                option_pause_animations: "Pausar Animações",
                option_high_contrast: "Alto Contraste",
                option_large_text: "Texto Maior",
                contrast_btn_aria: "Alternar alto contraste",
                theme_btn_aria: "Alternar tema claro/escuro"
            },
            nav: {
                home: "Home",
                services: "Especialidades",
                portfolio: "Criações",
                contact: "Contato"
            },
            hero: {
                badge: "SOLUÇÕES COM INTELIGÊNCIA ARTIFICIAL",
                title: "Inovação Visual <br>e Design por <span class=\"highlight\">IA</span>",
                subtitle_prefix: "Desenvolvimento de soluções visuais e de design inteligente alimentados por Inteligência Artificial. Projetos focados em agilidade e prazos de entrega reduzidos através da criação de ",
                subtitle_suffix: " aliando alto refinamento estético e engenharia de prompts avançada.",
                cta: "Ver Criações",
                wmacro: "Acessar wMacro"
            },
            services: {
                sub: "O QUE EU FAÇO",
                title: "Especialidades Digitais",
                desc: "Combinando criatividade humana e algoritmos avançados para entregar resultados rápidos, estéticos e altamente otimizados.",
                s1_title: "Criação de Imagens e Arte",
                s1_text: "Geração de artes conceituais, ilustrações personalizadas e visuais de altíssimo nível usando modelos de difusão de última geração, adaptados à identidade de sua marca.",
                s2_title: "Banners & Social Media",
                s2_text: "Desenvolvimento de peças publicitárias inteligentes e banners otimizados para redes sociais e anúncios. Design focado em conversão com layout calibrado por inteligência artificial.",
                s3_title: "Edição & Upscaling",
                s3_text: "Remoção de fundos complexos, restauração de fotos antigas, expansão inteligente de bordas (outpainting) e aumento de resolução (upscaling) sem perda de fidelidade.",
                s4_title: "Sites & Web Apps",
                s4_text: "Desenvolvimento de landing pages, sites institucionais e painéis dinâmicos interativos. Criação de interfaces web modernas e esteticamente alinhadas à identidade do seu projeto, aliadas a uma arquitetura robusta conectada a APIs.",
                s5_title: "Código & Aplicativos",
                s5_text: "Construção de aplicativos robustos e estruturação de bases de código limpas, modernas e escaláveis. Transformando ideias complexas em soluções mobile nativas e híbridas."
            },
            portfolio: {
                sub: "MEU PORTFÓLIO",
                title: "Galeria de Criações",
                desc: "Explore alguns dos projetos e conceitos desenvolvidos com o poder das melhores ferramentas de inteligência artificial do mercado.",
                filter_all: "Tudo",
                filter_images: "Imagens IA",
                filter_banners: "Banners",
                filter_editing: "Edições",
                badge_images: "Imagens IA",
                badge_banners: "Banners",
                badge_editing: "Edições",
                
                p1_title: "Arte Conceito",
                p1_desc: "A Arte Conceito é o alicerce visual para a idealização de universos, cenários e personagens. Através da exploração de formas, proporções, atmosferas e vestimentas, este processo estabelece a direção artística e a identidade estética fundamentais que guiarão toda a produção visual de um projeto criativo.",
                p2_title: "Conceito Criativo de Marcas",
                p2_desc: "O Conceito Criativo de Marcas materializa os valores e a essência de um negócio em elementos visuais e sensoriais tangíveis. Envolve o desenvolvimento de embalagens inteligentes, texturas e mockups que geram valor de marca e criam uma conexão emocional e tátil única com o cliente.",
                p3_title: "Ideias e Design de Logos",
                p3_desc: "A criação de logotipos e identidades visuais consiste em sintetizar o propósito de uma empresa em símbolos memoráveis. O foco é projetar marcas inteligentes, minimalistas e dinâmicas que garantam excelente legibilidade, adaptabilidade em diferentes meios e forte apelo estético.",
                p4_title: "Banner Web Publicidade",
                p4_desc: "Criação de banners digitais otimizados para alta conversão em campanhas de tráfego pago. Integração de copywriting persuasivo e design atraente gerado por IA.",
                p5_title: "Banner Impressos Eventos",
                p5_desc: "Design de banners em altíssima resolução e painéis físicos para feiras e eventos corporativos. Foco em legibilidade à distância e impacto visual.",
                p6_title: "Banner Web Páginas",
                p6_desc: "Banners institucionais e headers envolventes para sites e landing pages. Incorporação de identidade visual da marca para uma primeira impressão memorável.",
                p7_title: "Modificação de Imagem",
                p7_desc: "Alteração avançada de imagens utilizando IA generativa. Adição e remoção de elementos complexos, troca de fundos e ajustes de iluminação sem perder o realismo.",
                p8_title: "Restauração de Fotos",
                p8_desc: "Restauração digital de fotografias antigas ou danificadas. Recuperação de detalhes perdidos, remoção de ruídos, arranhões e colorização inteligente por IA.",
                p9_title: "Criação de Fotos",
                p9_desc: "Geração de fotografias hiper-realistas para catálogos, campanhas e redes sociais a partir do zero, dispensando a necessidade de estúdios fotográficos."
            },
            contact: {
                sub: "VAMOS TRABALHAR JUNTOS?",
                title: "Iniciar Projeto",
                desc: "Precisa de imagens exclusivas, banners altamente persuasivos ou de um site inovador para o seu projeto? Entre em contato agora.",
                info_title: "Informações de Contato",
                info_desc: "Sinta-se livre para entrar em contato através das minhas redes ou do formulário ao lado. Responderemos o mais breve possível.",
                card_email_label: "E-mail Comercial",
                card_whatsapp_label: "WhatsApp",
                card_location_label: "Localização",
                card_location_value: "Vitória - ES, Brasil",
                form_name_label: "Seu Nome",
                form_name_placeholder: "Digite seu nome completo",
                form_email_label: "Seu E-mail",
                form_email_placeholder: "exemplo@email.com",
                form_service_label: "Serviço de Interesse",
                form_service_placeholder: "Selecione um serviço",
                form_service_images: "Criação de Imagens e Arte Digital",
                form_service_banners: "Design de Banners & Anúncios",
                form_service_editing: "Edição e Tratamento de Imagens",
                form_service_sites: "Desenvolvimento de Websites",
                form_service_other: "Outro Projeto Baseado em IA",
                form_message_label: "Detalhes do seu Projeto",
                form_message_placeholder: "Conte-nos brevemente o que você precisa...",
                form_send: "Enviar Mensagem",
                sending: "Enviando...",
                thanks: "Muito Obrigado, {name}!",
                success_msg: "Sua mensagem foi enviada com sucesso! Fulvio Tanure entrará em contato em breve para tirar suas ideias do papel.",
                close: "Fechar",
                sim_title: "Modo Simulação Ativo:",
                sim_msg: "Para enviar e-mails de verdade para a sua caixa de entrada, coloque sua chave do Web3Forms no arquivo <code>js/contact.js</code>."
            },
            footer: {
                motto: "Modelando o futuro visual através da inteligência artificial aplicada ao design digital.",
                copy: "&copy; 2026 Fulvio Tanure. Todos os direitos reservados. Design Neomórfico & Inteligência Artificial.",
                accessibility_statement: "Este site segue as diretrizes de acessibilidade WCAG 2.1 nível AA."
            },
            modal: {
                close: "Fechar"
            }
        },
        en: {
            accessibility: {
                skip_link: "Skip to main content",
                lang_btn_aria: "Change language",
                menu_btn_aria: "Navigation menu",
                menu_open: "Open navigation menu",
                menu_close: "Close navigation menu",
                portfolio_item_aria: "View project details: {title}",
                widget_aria: "Accessibility Options",
                menu_title: "Accessibility",
                option_pause_animations: "Pause Animations",
                option_high_contrast: "High Contrast",
                option_large_text: "Larger Text",
                contrast_btn_aria: "Toggle high contrast",
                theme_btn_aria: "Toggle light/dark theme"
            },
            nav: {
                home: "Home",
                services: "Specialties",
                portfolio: "Creations",
                contact: "Contact"
            },
            hero: {
                badge: "AI-POWERED SOLUTIONS",
                title: "Visual Innovation <br>and Design by <span class=\"highlight\">AI</span>",
                subtitle_prefix: "Development of visual solutions and intelligent design powered by Artificial Intelligence. Projects focused on agility and reduced delivery times through the creation of ",
                subtitle_suffix: " combining high aesthetic refinement and advanced prompt engineering.",
                cta: "View Creations",
                wmacro: "Access wMacro"
            },
            services: {
                sub: "WHAT I DO",
                title: "Digital Specialties",
                desc: "Combining human creativity and advanced algorithms to deliver fast, aesthetic, and highly optimized results.",
                s1_title: "Image & Art Creation",
                s1_text: "Generation of concept arts, custom illustrations, and top-tier visuals using state-of-the-art diffusion models, tailored to your brand identity.",
                s2_title: "Banners & Social Media",
                s2_text: "Development of smart advertising pieces and banners optimized for social networks and ads. Conversion-focused design with layouts calibrated by artificial intelligence.",
                s3_title: "Editing & Upscaling",
                s3_text: "Removal of complex backgrounds, restoration of old photos, intelligent border expansion (outpainting), and resolution upscaling without loss of fidelity.",
                s4_title: "Websites & Web Apps",
                s4_text: "Development of landing pages, corporate websites, and interactive dynamic panels. Creation of modern web interfaces aesthetically aligned with your project identity, combined with a robust API-connected architecture.",
                s5_title: "Code & Applications",
                s5_text: "Building robust applications and structuring clean, modern, and scalable codebases. Turning complex ideas into native and hybrid mobile solutions."
            },
            portfolio: {
                sub: "MY PORTFOLIO",
                title: "Creations Gallery",
                desc: "Explore some of the projects and concepts developed with the power of the best artificial intelligence tools on the market.",
                filter_all: "All",
                filter_images: "AI Images",
                filter_banners: "Banners",
                filter_editing: "Edits",
                badge_images: "AI Images",
                badge_banners: "Banners",
                badge_editing: "Edits",
                
                p1_title: "Concept Art",
                p1_desc: "Concept Art is the visual foundation for the idealization of universes, scenarios, and characters. Through the exploration of shapes, proportions, atmospheres, and clothing, this process establishes the core artistic direction and aesthetic identity that will guide the entire visual production of a creative project.",
                p2_title: "Creative Brand Concept",
                p2_desc: "Creative Brand Concept materializes a business's values and essence into tangible visual and sensory elements. It involves developing smart packaging, textures, and mockups that build brand equity and create a unique emotional and tactile connection with the customer.",
                p3_title: "Logo Ideas & Design",
                p3_desc: "Creating logos and visual identities consists of synthesizing a company's purpose into memorable symbols. The focus is to design smart, minimalist, and dynamic brands that ensure excellent readability, adaptability across different media, and strong aesthetic appeal.",
                p4_title: "Web Advertising Banner",
                p4_desc: "Creation of digital banners optimized for high conversion in paid traffic campaigns. Integration of persuasive copywriting and attractive design generated by AI.",
                p5_title: "Event Printed Banner",
                p5_desc: "High-resolution digital banner design and physical panels for trade shows and corporate events. Focus on legibility from a distance and visual impact.",
                p6_title: "Web Pages Banner",
                p6_desc: "Institutional banners and engaging headers for websites and landing pages. Incorporation of the brand's visual identity for a memorable first impression.",
                p7_title: "Image Modification",
                p7_desc: "Advanced modification of images using generative AI. Addition and removal of complex elements, background changes, and lighting adjustments without losing realism.",
                p8_title: "Photo Restoration",
                p8_desc: "Digital restoration of old or damaged photographs. Recovery of lost details, removal of noise, scratches, and intelligent colorization by AI.",
                p9_title: "Photo Creation",
                p9_desc: "Generation of hyper-realistic photographs for catalogs, campaigns, and social networks from scratch, eliminating the need for photo studios."
            },
            contact: {
                sub: "LET'S WORK TOGETHER?",
                title: "Start Project",
                desc: "Need exclusive images, highly persuasive banners, or an innovative website for your project? Contact me now.",
                info_title: "Contact Information",
                info_desc: "Feel free to get in touch through my social networks or the form on the side. I will respond as soon as possible.",
                card_email_label: "Commercial Email",
                card_whatsapp_label: "WhatsApp",
                card_location_label: "Location",
                card_location_value: "Vitoria - ES, Brazil",
                form_name_label: "Your Name",
                form_name_placeholder: "Type your full name",
                form_email_label: "Your Email",
                form_email_placeholder: "example@email.com",
                form_service_label: "Service of Interest",
                form_service_placeholder: "Select a service",
                form_service_images: "Image & Digital Art Creation",
                form_service_banners: "Banners & Ads Design",
                form_service_editing: "Image Editing & Treatment",
                form_service_sites: "Website Development",
                form_service_other: "Other AI-Based Project",
                form_message_label: "Project Details",
                form_message_placeholder: "Tell us briefly what you need...",
                form_send: "Send Message",
                sending: "Sending...",
                thanks: "Thank You, {name}!",
                success_msg: "Your message has been sent successfully! Fulvio Tanure will get in touch shortly to bring your ideas to life.",
                close: "Close",
                sim_title: "Simulation Mode Active:",
                sim_msg: "To send real emails to your inbox, put your Web3Forms key in the <code>js/contact.js</code> file."
            },
            footer: {
                motto: "Shaping the visual future through artificial intelligence applied to digital design.",
                copy: "&copy; 2026 Fulvio Tanure. All rights reserved. Neumorphic Design & Artificial Intelligence.",
                accessibility_statement: "This website complies with WCAG 2.1 Level AA accessibility guidelines."
            },
            modal: {
                close: "Close"
            }
        },
        it: {
            accessibility: {
                skip_link: "Salta al contenuto principale",
                lang_btn_aria: "Cambia lingua",
                menu_btn_aria: "Menu di navigazione",
                menu_open: "Apri il menu di navigazione",
                menu_close: "Chiudi il menu di navigazione",
                portfolio_item_aria: "Visualizza i dettagli del progetto: {title}",
                widget_aria: "Opzioni di Accessibilità",
                menu_title: "Accessibilità",
                option_pause_animations: "Pausa Animazioni",
                option_high_contrast: "Alto Contrasto",
                option_large_text: "Testo Più Grande",
                contrast_btn_aria: "Alterna alto contrasto",
                theme_btn_aria: "Alterna tema chiaro/scuro"
            },
            nav: {
                home: "Home",
                services: "Specialità",
                portfolio: "Creazioni",
                contact: "Contatti"
            },
            hero: {
                badge: "SOLUZIONI CON INTELLIGENZA ARTIFICIALE",
                title: "Innovazione Visiva <br>e Design da <span class=\"highlight\">IA</span>",
                subtitle_prefix: "Sviluppo di soluzioni visive e di design intelligente alimentate dall'Intelligenza Artificiale. Progetti focalizzati su agilità e tempi di consegna ridotti attraverso la creazione di ",
                subtitle_suffix: " unendo un alto raffinamento estetico e un'ingegneria dei prompt avanzata.",
                cta: "Vedi Creazioni",
                wmacro: "Accedi a wMacro"
            },
            services: {
                sub: "COSA FACCIO",
                title: "Specialità Digitali",
                desc: "Combinando creatività umana e algoritmi avanzati per fornire risultati rapidi, estetici e altamente ottimizzati.",
                s1_title: "Creazione di Immagini e Arte",
                s1_text: "Generazione di concept art, illustrazioni personalizzate e visual di altissimo livello utilizzando modelli di diffusione di ultima generazione, adatti all'identità del tuo brand.",
                s2_title: "Banner & Social Media",
                s2_text: "Sviluppo di pezzi pubblicitari intelligenti e banner ottimizzati per social network e annunci. Design incentrato sulla conversione con layout calibrato dall'intelligenza artificiale.",
                s3_title: "Modifica & Upscaling",
                s3_text: "Rimozione di sfondi complessi, restauro di foto antiche, espansione intelligente dei bordi (outpainting) e aumento della risoluzione (upscaling) senza perdita di fedeltà.",
                s4_title: "Siti & Web App",
                s4_text: "Sviluppo di landing page, siti aziendali e pannelli dinamici interattivi. Creazione di interfacce web moderne ed esteticamente allineate all'identità del tuo progetto, unite a un'architettura robusta connessa alle API.",
                s5_title: "Codice & Applicazioni",
                s5_text: "Costruzione di applicazioni robuste e strutturazione di codebase pulite, moderne e scalabili. Trasformando idee complesse in soluzioni mobile native e ibride."
            },
            portfolio: {
                sub: "IL MIO PORTFOLIO",
                title: "Galleria delle Creazioni",
                desc: "Esplora alcuni dei progetti e concetti sviluppati con il potere dei migliori strumenti di intelligenza artificiale sul mercato.",
                filter_all: "Tutto",
                filter_images: "Immagini IA",
                filter_banners: "Banner",
                filter_editing: "Modifiche",
                badge_images: "Immagini IA",
                badge_banners: "Banner",
                badge_editing: "Modifiche",
                
                p1_title: "Concept Art",
                p1_desc: "La Concept Art è la base visiva per l'idealizzazione di universi, scenari e personaggi. Attraverso l'esplorazione di forme, proporzioni, atmosfere e abbigliamenti, questo processo stabilisce la direzione artistica e l'identità estetica fondamentali che guideranno l'intera produzione visiva di un progetto creativo.",
                p2_title: "Concetto Creativo di Marca",
                p2_desc: "Il Concetto Creativo di Marca concretizza i valori e l'essenza di un'attività in elementi visivi e sensoriali tangibili. Comporta lo sviluppo di imballaggi intelligenti, texture e mockup che creano valore di marca e generano una connessione emotiva e tattile unica con il cliente.",
                p3_title: "Idee & Design di Logo",
                p3_desc: "La creazione di loghi e identità visive consiste nel sintetizzare lo scopo di un'azienda in simboli memorabili. L'obiettivo è progettare marchi intelligenti, minimalisti e dinamici che garantiscano un'eccellente leggibilità, adattabilità su diversi media e forte impatto estetico.",
                p4_title: "Banner Web Pubblicità",
                p4_desc: "Creazione di banner digitali ottimizzati per un'alta conversione nelle campagne di traffico a pagamento. Integrazione di copywriting persuasivo e design accattivante generato dall'IA.",
                p5_title: "Banner Stampati per Eventi",
                p5_desc: "Design di banner digitali ad altissima risoluzione e pannelli fisici per fiere ed eventi aziendali. Focus sulla leggibilità a distanza e sull'impatto visivo.",
                p6_title: "Banner per Pagine Web",
                p6_desc: "Banner istituzionali e header accattivanti per siti e landing page. Incorporazione dell'identità visiva del brand per una prima impressione memorabile.",
                p7_title: "Modifica dell'Immagine",
                p7_desc: "Modifica avanzata delle immagini tramite IA generativa. Aggiunta e rimozione di elementi complessi, cambio di sfondi e regolazione dell'illuminazione senza perdere il realismo.",
                p8_title: "Restauro di Foto",
                p8_desc: "Restauro digitale di fotografie antiche o danneggiate. Recupero dei dettagli persi, rimozione del rumore, dei graffi e colorizzazione intelligente tramite IA.",
                p9_title: "Creazione di Foto",
                p9_desc: "Generazione di fotografie iperrealistiche per cataloghi, campagne e social network da zero, eliminando la necessità di studi fotografici."
            },
            contact: {
                sub: "LAVORIAMO INSIEME?",
                title: "Avvia Progetto",
                desc: "Hai bisogno di immagini esclusive, banner altamente persuasivi o di un sito web innovativo per il tuo progetto? Contattami ora.",
                info_title: "Informazioni di Contatto",
                info_desc: "Sentiti libero di metterti in contatto tramite i miei social network o il modulo a lato. Risponderò il prima possibile.",
                card_email_label: "Email Commerciale",
                card_whatsapp_label: "WhatsApp",
                card_location_label: "Posizione",
                card_location_value: "Vitoria - ES, Brasile",
                form_name_label: "Il Tuo Nome",
                form_name_placeholder: "Digita il tuo nome completo",
                form_email_label: "La Tua Email",
                form_email_placeholder: "esempio@email.com",
                form_service_label: "Servizio di Interesse",
                form_service_placeholder: "Seleziona un servizio",
                form_service_images: "Creazione di Immagini e Arte Digitale",
                form_service_banners: "Design di Banner & Annunci",
                form_service_editing: "Modifica & Trattamento di Immagini",
                form_service_sites: "Sviluppo di Siti Web",
                form_service_other: "Altro Progetto basato su IA",
                form_message_label: "Dettagli del Progetto",
                form_message_placeholder: "Raccontaci brevemente di cosa hai bisogno...",
                form_send: "Invia Messaggio",
                sending: "Invio in corso...",
                thanks: "Grazie Mille, {name}!",
                success_msg: "Il tuo messaggio è stato inviato con successo! Fulvio Tanure ti contatterà presto per dare vita alle tue idee.",
                close: "Chiudi",
                sim_title: "Modalità Simulazione Attiva:",
                sim_msg: "Per inviare email reali alla tua casella di posta, inserisci la tua chiave Web3Forms nel file <code>js/contact.js</code>."
            },
            footer: {
                motto: "Plasmare il futuro visivo attraverso l'intelligenza artificiale applicata al design digitale.",
                copy: "&copy; 2026 Fulvio Tanure. Tutti i diritti riservati. Design Neomorfico & Intelligenza Artificiale.",
                accessibility_statement: "Questo sito rispetta le linee guida di accessibilità WCAG 2.1 livello AA."
            },
            modal: {
                close: "Chiudi"
            }
        }
    };

    // Flags mapping (SVG vector icons for 100% cross-platform compatibility including Windows)
    const flags = {
        pt: '<img src="img/flags/pt.svg" alt="Português" class="flag-icon">',
        en: '<img src="img/flags/en.svg" alt="English" class="flag-icon">',
        it: '<img src="img/flags/it.svg" alt="Italiano" class="flag-icon">'
    };

    let activeLang = 'pt';

    // 2. Main translation retrieval function
    function t(key, variables = {}) {
        const keys = key.split('.');
        let translation = dictionary[activeLang];

        for (const k of keys) {
            if (translation && translation[k] !== undefined) {
                translation = translation[k];
            } else {
                // Fallback to Portuguese key if not found
                let fallback = dictionary['pt'];
                for (const fk of keys) {
                    if (fallback && fallback[fk] !== undefined) {
                        fallback = fallback[fk];
                    } else {
                        fallback = key; // Return raw key if completely missing
                    }
                }
                translation = fallback;
                break;
            }
        }

        // Variable replacement
        if (typeof translation === 'string') {
            let result = translation;
            for (const [varName, varVal] of Object.entries(variables)) {
                result = result.replace(new RegExp(`{${varName}}`, 'g'), varVal);
            }
            return result;
        }

        return translation;
    }

    // 3. Dynamic DOM Translator
    function translateDOM() {
        // Set HTML lang attribute
        document.documentElement.setAttribute('lang', activeLang === 'pt' ? 'pt-BR' : activeLang);

        // Find all elements with data-i18n
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(el => {
            const key = el.getAttribute('data-i18n');
            const translation = t(key);
            
            if (typeof translation === 'string') {
                // If it contains HTML tags, inject as innerHTML, otherwise textContent
                if (translation.includes('<') && translation.includes('>')) {
                    el.innerHTML = translation;
                } else {
                    el.textContent = translation;
                }
            }
        });

        // Translate specific attributes (placeholder, aria-label)
        const placeholders = document.querySelectorAll('[data-i18n-placeholder]');
        placeholders.forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            el.setAttribute('placeholder', t(key));
        });

        const ariaLabels = document.querySelectorAll('[data-i18n-aria-label]');
        ariaLabels.forEach(el => {
            const key = el.getAttribute('data-i18n-aria-label');
            el.setAttribute('aria-label', t(key));
        });
    }

    // 4. Update Seletor Button UI state
    function updateSelectorUI() {
        const langBtn = document.getElementById('lang-btn');
        if (!langBtn) return;

        const flagSpan = langBtn.querySelector('.lang-flag');
        const textSpan = langBtn.querySelector('.lang-text');
        
        if (flagSpan) flagSpan.innerHTML = flags[activeLang];
        if (textSpan) textSpan.textContent = activeLang.toUpperCase();

        // Update active class in dropdown items
        const dropdownItems = document.querySelectorAll('.lang-dropdown-item');
        dropdownItems.forEach(item => {
            if (item.getAttribute('data-lang') === activeLang) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // 5. Change language engine
    function setLanguage(lang) {
        if (!dictionary[lang]) return;
        
        activeLang = lang;
        localStorage.setItem('portfolio-lang', lang);
        
        translateDOM();
        updateSelectorUI();

        // Dispatch a global event so that other scripts (e.g. typewriter, forms) can adapt
        const event = new CustomEvent('languageChanged', { detail: { language: lang } });
        window.dispatchEvent(event);
    }

    // 6. Automatically detect browser language preferences
    function detectLanguage() {
        // First check localStorage
        const savedLang = localStorage.getItem('portfolio-lang');
        if (savedLang && dictionary[savedLang]) {
            return savedLang;
        }

        // Then check browser languages
        const browserLanguages = navigator.languages || [navigator.language || ''];
        for (const lang of browserLanguages) {
            const code = lang.substring(0, 2).toLowerCase();
            if (dictionary[code]) {
                return code;
            }
        }

        // Default fallback
        return 'pt';
    }

    // 7. Initialize Localization
    function init() {
        const detected = detectLanguage();
        activeLang = detected;
        translateDOM();
        updateSelectorUI();
    }

    // Expose APIs to window
    window.i18n = {
        t: t,
        setLanguage: setLanguage,
        getLanguage: () => activeLang,
        init: init
    };

    // Auto-init DOM translation on content loaded
    document.addEventListener('DOMContentLoaded', () => {
        init();
    });
})();
