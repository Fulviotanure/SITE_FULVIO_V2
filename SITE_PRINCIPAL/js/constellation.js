/* ==========================================================================
   CONSTELLATION / NETWORK BACKGROUND CANVAS ANIMATION
   ========================================================================== */
(function () {
    const heroSection = document.querySelector("#home");
    const canvas = document.getElementById('constellation-canvas');
    if (!canvas || !heroSection) return;

    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;

    const CONFIG = {
        initialNodes: 80,
        minNodes: 80,
        maxNodes: 110,
        maxDistance: 280,
        nodeRadius: 2.2,
        lineWidth: 1.0,
        speed: 0.05,
        birthInterval: 2400,
        nodeLifeMin: 18000,
        nodeLifeMax: 42000,
        glowStrength: 3,
    };

    // Apenas as 3 cores originais (Vermelho, Azul, Amarelo). As demais cores surgem do gradiente entre os nós!
    const THEME = {
        primary: "#60a5fa",   // Azul suave
        secondary: "#f87171", // Vermelho suave
        accent: "#facc15"     // Amarelo suave
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
                    const interactRadius = 150; 
                    
                    if (distSq < interactRadius * interactRadius) {
                        const dist = Math.sqrt(distSq) || 1;
                        const force = (interactRadius - dist) / interactRadius;
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
            ctx.fillStyle = hexToRGBA(this.color, this.opacity * 0.9);
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
        const aliveCount = nodes.filter((n) => !n.dead && !n.dying).length;

        if (aliveCount >= CONFIG.maxNodes) {
            forceKillOldest();
        }
        
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
            lastTime = now; 

            if (wentHiddenAt > 0) {
                const duration = now - wentHiddenAt;
                nodes.forEach(node => {
                    node.birth += duration;
                });
            }
            wentHiddenAt = 0;

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

                if (distance < CONFIG.maxDistance) {
                    const opacity =
                        (1 - distance / CONFIG.maxDistance) *
                        Math.min(nodeA.opacity, nodeB.opacity);
                    drawLine(nodeA, nodeB, opacity * 0.85);
                }
            }

            if (mouse.active) {
                const mdx = nodeA.x - mouse.x;
                const mdy = nodeA.y - mouse.y;
                const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
                
                if (mDist < CONFIG.maxDistance * 0.7) {
                    const mOpacity = (1 - mDist / (CONFIG.maxDistance * 0.7)) * nodeA.opacity;
                    const mouseNode = { x: mouse.x, y: mouse.y, color: THEME.accent };
                    drawLine(nodeA, mouseNode, mOpacity * 0.85);
                }
            }

            if (nearest) {
                drawLine(nodeA, nearest, 0.65);
            }
        }
    }

    function drawLine(a, b, opacity) {
        const gradient = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
        const softOpacity = opacity * 0.5; // Reduz a opacidade para dar aspecto suave
        gradient.addColorStop(0, hexToRGBA(a.color, softOpacity));
        gradient.addColorStop(1, hexToRGBA(b.color, softOpacity));

        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = CONFIG.lineWidth;
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
    }

    let isLoopRunning = true;

    // ===============================
    // ANIMATION LOOP
    // ===============================
    function animate(now) {
        if (window.accessibilitySettings && window.accessibilitySettings.pauseAnimations) {
            isLoopRunning = false;
            return; 
        }
        isLoopRunning = true;

        const delta = now - lastTime;
        lastTime = now;

        ctx.clearRect(0, 0, width, height);

        for (let i = nodes.length - 1; i >= 0; i--) {
            if (nodes[i].dead) {
                nodes.splice(i, 1);
            }
        }

        nodes.forEach((node) => node.update(delta));
        drawConnections();
        nodes.forEach((node) => node.draw());

        requestAnimationFrame(animate);
    }

    window.addEventListener('accessibility_animationsChanged', (e) => {
        if (!e.detail.paused && !isLoopRunning) {
            lastTime = performance.now();
            requestAnimationFrame(animate);
        }
    });

    requestAnimationFrame(animate);
})();
