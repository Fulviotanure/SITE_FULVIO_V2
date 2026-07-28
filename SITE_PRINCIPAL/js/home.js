/* ==========================================================================
   NEUMORPHIC PORTFOLIO - FULVIO TANURE
   MODULAR JS: HOME SECTION (NEURAL CANVAS & TYPEWRITER)
   ========================================================================== */

(() => {
    document.addEventListener('DOMContentLoaded', () => {
        initNeuralCanvas();
        initTypewriterEffect();
    });

    /* ==========================================================================
       INTERACTIVE NEURAL NETWORK CANVAS (HERO BACKGROUND)
       ========================================================================== */
    function initNeuralCanvas() {
        const heroSection = document.querySelector("#home");
        const canvas = document.getElementById("neural-canvas");

        if (!heroSection || !canvas) return;

        const ctx = canvas.getContext("2d");

        let width = 0;
        let height = 0;

        const CONFIG = {
            initialNodes: 45,    // Reduzido para melhorar performance
            minNodes: 45,        // Reduzido para melhorar performance
            maxNodes: 85,        // Teto reduzido para evitar lag de processamento
            maxDistance: 280,    // Leve ajuste no alcance
            nodeRadius: 2.2,
            lineWidth: 1.2,
            speed: 0.05, // Reduced from 0.18 for a slower, more subtle movement
            birthInterval: 2400,
            nodeLifeMin: 18000,
            nodeLifeMax: 42000,
            glowStrength: 16,
        };

        const THEME = {
            primary: "#4f46e5",
            secondary: "#8b5cf6",
            accent: "#ec4899",
        };

        const nodes = [];
        let lastTime = performance.now();
        let wentHiddenAt = 0;
        let growthInterval = null;

        // ===============================
        // RESIZE
        // ===============================
        function resizeCanvas() {
            width = heroSection.offsetWidth;
            height = heroSection.offsetHeight;

            canvas.width = width * devicePixelRatio;
            canvas.height = height * devicePixelRatio;

            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;

            ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
        }

        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        // ===============================
        // NODE CLASS
        // ===============================
        class Node {
            constructor(x, y, manual = false) {
                this.id = crypto.randomUUID();
                this.x = x;
                this.y = y;
                this.vx = (Math.random() - 0.5) * CONFIG.speed;
                this.vy = (Math.random() - 0.5) * CONFIG.speed;
                this.radius = CONFIG.nodeRadius;
                this.birth = performance.now();
                this.life = CONFIG.nodeLifeMin + Math.random() * (CONFIG.nodeLifeMax - CONFIG.nodeLifeMin);
                this.opacity = 0;
                this.targetOpacity = 1;
                this.dead = false;
                this.dying = false;
                this.manual = manual;
                this.color = pickGradientColor();
            }

            update(delta) {
                if (!this.dead) {
                    // MOUSE INTERACTION: Repulsion Force
                    if (mouse.active) {
                        const dx = this.x - mouse.x;
                        const dy = this.y - mouse.y;
                        const distSq = dx * dx + dy * dy;
                        const interactRadius = 150; // Reduzido para uma área de efeito mais sutil
                        
                        if (distSq < interactRadius * interactRadius) {
                            const dist = Math.sqrt(distSq) || 1;
                            const force = (interactRadius - dist) / interactRadius;
                            // Movimento extremamente suave (reduzido de 0.8 para 0.12)
                            this.x += (dx / dist) * force * 0.12 * delta;
                            this.y += (dy / dist) * force * 0.12 * delta;
                        }
                    }

                    this.x += this.vx * delta;
                    this.y += this.vy * delta;

                    // BOUNDARIES
                    if (this.x <= 0 || this.x >= width) this.vx *= -1;
                    if (this.y <= 0 || this.y >= height) this.vy *= -1;

                    // BIRTH FADE
                    this.opacity += (this.targetOpacity - this.opacity) * 0.02;

                    // DEATH CHECK
                    const age = performance.now() - this.birth;
                    if (age >= this.life && !this.dying) {
                        this.startDeath();
                    }

                    // DYING
                    if (this.dying) {
                        this.opacity -= 0.015;
                        if (this.opacity <= 0.01) {
                            this.dead = true;
                        }
                    }
                }
            }

            startDeath() {
                this.dying = true;
            }

            draw() {
                // The glow now respects the node's current opacity (fade in/out) 
                // and has a softer center (0.4 multiplier) so it looks like light, not a solid ball
                const gradient = ctx.createRadialGradient(
                    this.x, this.y, 0, this.x, this.y, CONFIG.glowStrength
                );

                gradient.addColorStop(0, hexToRGBA(this.color, this.opacity * 0.4));
                gradient.addColorStop(1, hexToRGBA(this.color, 0));

                ctx.beginPath();
                ctx.fillStyle = gradient;
                ctx.arc(this.x, this.y, CONFIG.glowStrength, 0, Math.PI * 2);
                ctx.fill();

                // Core dot
                ctx.beginPath();
                ctx.fillStyle = hexToRGBA(this.color, this.opacity * 0.9); // Keeps the core sharp
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // ===============================
        // HELPERS
        // ===============================
        function random(min, max) {
            return Math.random() * (max - min) + min;
        }

        function pickGradientColor() {
            const palette = [THEME.primary, THEME.secondary, THEME.accent];
            return palette[Math.floor(Math.random() * palette.length)];
        }

        function hexToRGBA(hex, alpha) {
            if (hex.length === 4) {
                hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
            }
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }

        function createNode(x, y, manual = false) {
            // Conta apenas os pontos vivos para saber se atingiu o limite
            const aliveCount = nodes.filter((n) => !n.dead && !n.dying).length;

            // Se atingiu o teto, inicia a morte natural (fade out) do ponto mais velho
            if (aliveCount >= CONFIG.maxNodes) {
                forceKillOldest();
            }
            
            // Segurança anti-lag: se o usuário clicar MUITO rápido e acumular
            // muitos pontos na fase de "morte" na tela, remove instantaneamente o mais antigo
            if (nodes.length > CONFIG.maxNodes + 15) {
                nodes.shift();
            }

            const node = new Node(
                x ?? random(0, width),
                y ?? random(0, height),
                manual
            );
            nodes.push(node);
        }

        function forceKillOldest() {
            const oldest = nodes
                .filter((n) => !n.dying)
                .sort((a, b) => a.birth - b.birth)[0];
            if (oldest) {
                oldest.startDeath();
            }
        }

        // ===============================
        // INITIAL NODES
        // ===============================
        for (let i = 0; i < CONFIG.initialNodes; i++) {
            createNode();
        }

        // ===============================
        // AUTO GROWTH SYSTEM & VISIBILITY HANDLING
        // ===============================
        function startGrowthSystem() {
            if (growthInterval) clearInterval(growthInterval);
            growthInterval = setInterval(() => {
                const alive = nodes.filter((n) => !n.dead && !n.dying);
                if (alive.length < CONFIG.maxNodes) {
                    createNode();
                }
            }, CONFIG.birthInterval);
        }

        function stopGrowthSystem() {
            if (growthInterval) {
                clearInterval(growthInterval);
                growthInterval = null;
            }
        }

        startGrowthSystem();

        document.addEventListener('visibilitychange', () => {
            if (document.visibilityState === 'hidden') {
                wentHiddenAt = performance.now();
                stopGrowthSystem();
            } else if (document.visibilityState === 'visible') {
                const now = performance.now();
                lastTime = now; // Evita salto de delta gigantesco no primeiro frame pós-retorno

                if (wentHiddenAt > 0) {
                    const duration = now - wentHiddenAt;
                    // Congela a idade de todos os nós para que não expirem todos de uma vez
                    nodes.forEach(node => {
                        node.birth += duration;
                    });
                }
                wentHiddenAt = 0;

                // Repopula imediatamente se necessário
                const alive = nodes.filter((n) => !n.dead && !n.dying);
                const needed = CONFIG.minNodes - alive.length;
                if (needed > 0) {
                    for (let i = 0; i < needed; i++) {
                        createNode();
                    }
                }

                startGrowthSystem();
            }
        });

        // ===============================
        // MOUSE INTERACTION (CLICK & HOVER)
        // ===============================
        const mouse = { x: null, y: null, active: false };

        heroSection.addEventListener("mousemove", (e) => {
            const rect = heroSection.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.active = true;
        });

        heroSection.addEventListener("mouseleave", () => {
            mouse.active = false;
        });

        heroSection.addEventListener("click", (e) => {
            if (!mouse.active) return;
            createNode(mouse.x, mouse.y, true);
        });

        // ===============================
        // NETWORK CONNECTIONS
        // ===============================
        function drawConnections() {
            const aliveNodes = nodes.filter((n) => !n.dead);

            for (let i = 0; i < aliveNodes.length; i++) {
                const nodeA = aliveNodes[i];

                // conecta SEMPRE ao vizinho mais próximo
                let nearest = null;
                let nearestDistance = Infinity;

                for (let j = 0; j < aliveNodes.length; j++) {
                    if (i === j) continue;
                    const nodeB = aliveNodes[j];
                    const dx = nodeA.x - nodeB.x;
                    const dy = nodeA.y - nodeB.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < nearestDistance) {
                        nearestDistance = distance;
                        nearest = nodeB;
                    }

                    // conexões extras orgânicas
                    if (distance < CONFIG.maxDistance) {
                        const opacity =
                            (1 - distance / CONFIG.maxDistance) *
                            Math.min(nodeA.opacity, nodeB.opacity);
                        drawLine(nodeA, nodeB, opacity * 0.45);
                    }
                }

                // Conexão interativa com o cursor do mouse
                if (mouse.active) {
                    const mdx = nodeA.x - mouse.x;
                    const mdy = nodeA.y - mouse.y;
                    const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
                    
                    if (mDist < CONFIG.maxDistance * 0.7) {
                        const mOpacity = (1 - mDist / (CONFIG.maxDistance * 0.7)) * nodeA.opacity;
                        const mouseNode = { x: mouse.x, y: mouse.y, color: THEME.accent };
                        drawLine(nodeA, mouseNode, mOpacity * 0.6);
                    }
                }

                // garante rede contínua
                if (nearest) {
                    drawLine(nodeA, nearest, 0.35);
                }
            }
        }

        function drawLine(a, b, opacity) {
            const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            gradient.addColorStop(0, hexToRGBA(a.color, opacity));
            gradient.addColorStop(1, hexToRGBA(b.color, opacity));

            ctx.beginPath();
            ctx.strokeStyle = gradient;
            ctx.lineWidth = CONFIG.lineWidth;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
        }

        // Flag to check if canvas loop is currently requesting animation frame
        let isLoopRunning = true;

        // ===============================
        // ANIMATION LOOP
        // ===============================
        function animate(now) {
            if (window.accessibilitySettings && window.accessibilitySettings.pauseAnimations) {
                isLoopRunning = false;
                return; // Stop animation loop to save CPU and visual movements
            }
            isLoopRunning = true;

            const delta = now - lastTime;
            lastTime = now;

            ctx.clearRect(0, 0, width, height);

            // remove mortos
            for (let i = nodes.length - 1; i >= 0; i--) {
                if (nodes[i].dead) {
                    nodes.splice(i, 1);
                }
            }

            // update
            nodes.forEach((node) => node.update(delta));

            // connections
            drawConnections();

            // draw nodes
            nodes.forEach((node) => node.draw());

            requestAnimationFrame(animate);
        }

        // Listen for animations toggled event
        window.addEventListener('accessibility_animationsChanged', (e) => {
            const paused = e.detail.paused;
            if (paused) {
                stopGrowthSystem();
            } else {
                startGrowthSystem();
                if (!isLoopRunning) {
                    lastTime = performance.now();
                    requestAnimationFrame(animate);
                }
            }
        });

        requestAnimationFrame(animate);
    }

    /* ==========================================================================
       TYPEWRITER EFFECT (HERO INTRO)
       ========================================================================== */
    function initTypewriterEffect() {
        const textElement = document.getElementById('typewriter');
        if (!textElement) return;

        const wordsByLang = {
            pt: [
                "Sites com Entrega Rápida",
                "Banners Publicitários Ágeis",
                "Imagens Artísticas Express",
                "Edições de Imagem por IA"
            ],
            en: [
                "Fast-Delivery Websites",
                "Agile Advertising Banners",
                "Express Artistic Images",
                "AI Image Editing"
            ],
            it: [
                "Siti a Consegna Rapida",
                "Banner Pubblicitari Agili",
                "Immagini Artistiche Express",
                "Modifica di Immagini con IA"
            ]
        };

        let currentLang = (window.i18n && typeof window.i18n.getLanguage === 'function') ? window.i18n.getLanguage() : 'pt';
        let words = wordsByLang[currentLang] || wordsByLang.pt;

        let wordIdx = 0;
        let charIdx = 0;
        let isDeleting = false;
        let typingSpeed = 40;
        let timeoutId = null;
        let isTypewriterRunning = true;

        function type() {
            if (window.accessibilitySettings && window.accessibilitySettings.pauseAnimations) {
                isTypewriterRunning = false;
                return; // Stop scheduling new keystrokes
            }
            isTypewriterRunning = true;

            // Safety fallback if words array gets out of sync
            if (!words[wordIdx]) {
                wordIdx = 0;
            }
            const currentWord = words[wordIdx];
            
            if (isDeleting) {
                textElement.textContent = currentWord.substring(0, charIdx - 1);
                charIdx--;
                typingSpeed = 20; // Deleting is extremely fast as requested
            } else {
                textElement.textContent = currentWord.substring(0, charIdx + 1);
                charIdx++;
                typingSpeed = 40; // Writing is very fast as requested
            }

            // Typing logic transitions
            if (!isDeleting && charIdx === currentWord.length) {
                typingSpeed = 3000; // Pause at end of word (keep written for a while)
                isDeleting = true;
            } else if (isDeleting && charIdx === 0) {
                isDeleting = false;
                wordIdx = (wordIdx + 1) % words.length; // Next word
                typingSpeed = 400; // Pause before typing new word
            }

            timeoutId = setTimeout(type, typingSpeed);
        }

        // Listen for language changes and reset sequence instantly
        window.addEventListener('languageChanged', (e) => {
            currentLang = e.detail.language;
            words = wordsByLang[currentLang] || wordsByLang.pt;
            
            // Instantly reset animation state
            wordIdx = 0;
            charIdx = 0;
            isDeleting = false;
            if (textElement) textElement.textContent = '';
            
            // Clear current timer and restart typing sequence immediately
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(type, 500);
            }
        });

        // Listen for animations toggle
        window.addEventListener('accessibility_animationsChanged', (e) => {
            const paused = e.detail.paused;
            if (!paused && !isTypewriterRunning) {
                if (timeoutId) clearTimeout(timeoutId);
                // Start typing immediately
                timeoutId = setTimeout(type, 100);
            }
        });

        // Start typewriter effect
        timeoutId = setTimeout(type, 1000);
    }
})();
