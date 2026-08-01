/* ==========================================================================
   NEUMORPHIC PORTFOLIO - FULVIO TANURE
   MODULAR JS: HOME SECTION (NEURAL CANVAS & TYPEWRITER)
   ========================================================================== */

(() => {
    document.addEventListener('DOMContentLoaded', () => {
        initNeuralCanvas();
        initTypewriterEffect();
        initCodeCardsAnimation();
        initRealtimeTypewriter();
    });

    /* ==========================================================================
       SYNTAX HIGHLIGHTER UTILITY
       ========================================================================== */
    function highlightLine(str) {
        if (!str) return "";
        if (str.trim().startsWith("//")) {
            return `<span class="code-comment">${str.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</span>`;
        }

        const KEYWORDS = new Set([
            'import', 'from', 'export', 'default', 'function', 'async', 'await',
            'const', 'let', 'var', 'for', 'of', 'in', 'while', 'do', 'try', 'catch',
            'if', 'else', 'throw', 'new', 'return', 'continue', 'break', 'typeof',
            'instanceof', 'class', 'extends', 'super', 'this'
        ]);

        const BUILTINS = new Set([
            'console', 'Date', 'Math', 'Error', 'JSON', 'Array', 'Object', 'String',
            'Number', 'Boolean', 'Promise', 'TensorUtils', 'VectorDB', 'TelemetryService',
            'GlobalState', 'React', 'useState', 'useEffect', 'config',
            'HyperNode', 'QuantumEngine', 'SingularityGateway', 'RuntimeFlags',
            'ENGINE_VERSION', 'GALAXY_CLUSTER', 'QUANTUM_SIGNATURE',
            'MAX_PHOTON_STREAM', 'TEMPORAL_OFFSET', 'CORE_STABILITY_LIMIT', 'DEBUG_MODE'
        ]);

        const BOOLEANS = new Set(['true', 'false', 'null', 'undefined']);

        let result = "";
        let i = 0;
        const len = str.length;

        while (i < len) {
            // Comentário no meio da linha
            if (str[i] === '/' && str[i + 1] === '/') {
                const commentText = str.substring(i);
                result += `<span class="code-comment">${commentText.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</span>`;
                break;
            }

            // Strings (aspas simples, duplas ou template literal)
            if (str[i] === '"' || str[i] === "'" || str[i] === '`') {
                const quote = str[i];
                let start = i;
                i++;
                while (i < len && str[i] !== quote) {
                    if (str[i] === '\\') i++;
                    i++;
                }
                if (i < len) i++;
                const strVal = str.substring(start, i);
                result += `<span class="code-string">${strVal.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</span>`;
                continue;
            }

            // Números
            if (/\d/.test(str[i])) {
                let start = i;
                while (i < len && /[\d.]/.test(str[i])) i++;
                const numVal = str.substring(start, i);
                result += `<span class="code-num">${numVal}</span>`;
                continue;
            }

            // Identificadores (palavras, variáveis, funções, propriedades)
            if (/[a-zA-Z_$]/.test(str[i])) {
                let start = i;
                while (i < len && /[\w$]/.test(str[i])) i++;
                const word = str.substring(start, i);

                let peek = i;
                while (peek < len && /\s/.test(str[peek])) peek++;
                const isFnCall = peek < len && str[peek] === '(';

                let lookBehind = start - 1;
                while (lookBehind >= 0 && /\s/.test(str[lookBehind])) lookBehind--;
                const isProp = lookBehind >= 0 && str[lookBehind] === '.';

                if (KEYWORDS.has(word)) {
                    result += `<span class="code-keyword">${word}</span>`;
                } else if (BUILTINS.has(word)) {
                    result += `<span class="code-builtin">${word}</span>`;
                } else if (BOOLEANS.has(word)) {
                    result += `<span class="code-bool">${word}</span>`;
                } else if (isFnCall) {
                    result += `<span class="code-func">${word}</span>`;
                } else if (isProp) {
                    result += `<span class="code-prop">${word}</span>`;
                } else {
                    result += `<span class="code-var">${word}</span>`;
                }
                continue;
            }

            // Operadores (=, +, -, *, /, !, ===, =>, &&, ||...)
            if (/[=+\-*\/%<>!&|^~?:]/.test(str[i])) {
                let start = i;
                while (i < len && /[=+\-*\/%<>!&|^~?:]/.test(str[i])) i++;
                const opVal = str.substring(start, i);
                result += `<span class="code-operator">${opVal.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</span>`;
                continue;
            }

            // Pontuação e caracteres especiais ({}, (), ;, ., virgulas)
            const ch = str[i];
            if (/[{}();,.]/.test(ch)) {
                result += `<span class="code-punct">${ch}</span>`;
            } else {
                result += ch.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            }
            i++;
        }

        return result;
    }

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
            initialNodes: 45,
            minNodes: 45,
            maxNodes: 85,
            maxDistance: 280,
            nodeRadius: 2.2,
            lineWidth: 1.2,
            speed: 0.05,
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
                    if (this.x <= 0 || this.x >= width) this.vx *= -1;
                    if (this.y <= 0 || this.y >= height) this.vy *= -1;
                    this.opacity += (this.targetOpacity - this.opacity) * 0.02;
                    const age = performance.now() - this.birth;
                    if (age >= this.life && !this.dying) this.startDeath();
                    if (this.dying) {
                        this.opacity -= 0.015;
                        if (this.opacity <= 0.01) this.dead = true;
                    }
                }
            }

            startDeath() { this.dying = true; }

            draw() {
                const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, CONFIG.glowStrength);
                gradient.addColorStop(0, hexToRGBA(this.color, this.opacity * 0.4));
                gradient.addColorStop(1, hexToRGBA(this.color, 0));
                ctx.beginPath();
                ctx.fillStyle = gradient;
                ctx.arc(this.x, this.y, CONFIG.glowStrength, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.fillStyle = hexToRGBA(this.color, this.opacity * 0.9);
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function random(min, max) { return Math.random() * (max - min) + min; }

        function pickGradientColor() {
            const palette = [THEME.primary, THEME.secondary, THEME.accent];
            return palette[Math.floor(Math.random() * palette.length)];
        }

        function hexToRGBA(hex, alpha) {
            if (hex.length === 4) hex = '#' + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            return `rgba(${r}, ${g}, ${b}, ${alpha})`;
        }

        function createNode(x, y, manual = false) {
            const aliveCount = nodes.filter((n) => !n.dead && !n.dying).length;
            if (aliveCount >= CONFIG.maxNodes) forceKillOldest();
            if (nodes.length > CONFIG.maxNodes + 15) nodes.shift();
            const node = new Node(x ?? random(0, width), y ?? random(0, height), manual);
            nodes.push(node);
        }

        function forceKillOldest() {
            const oldest = nodes.filter((n) => !n.dying).sort((a, b) => a.birth - b.birth)[0];
            if (oldest) oldest.startDeath();
        }

        for (let i = 0; i < CONFIG.initialNodes; i++) createNode();

        function startGrowthSystem() {
            if (growthInterval) clearInterval(growthInterval);
            growthInterval = setInterval(() => {
                const alive = nodes.filter((n) => !n.dead && !n.dying);
                if (alive.length < CONFIG.maxNodes) createNode();
            }, CONFIG.birthInterval);
        }

        function stopGrowthSystem() {
            if (growthInterval) { clearInterval(growthInterval); growthInterval = null; }
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
                    nodes.forEach(node => { node.birth += duration; });
                }
                wentHiddenAt = 0;
                const alive = nodes.filter((n) => !n.dead && !n.dying);
                const needed = CONFIG.minNodes - alive.length;
                if (needed > 0) { for (let i = 0; i < needed; i++) createNode(); }
                startGrowthSystem();
            }
        });

        const mouse = { x: null, y: null, active: false };

        heroSection.addEventListener("mousemove", (e) => {
            const rect = heroSection.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
            mouse.active = true;
        });

        heroSection.addEventListener("mouseleave", () => { mouse.active = false; });

        heroSection.addEventListener("click", () => {
            if (!mouse.active) return;
            createNode(mouse.x, mouse.y, true);
        });

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
                    if (distance < nearestDistance) { nearestDistance = distance; nearest = nodeB; }
                    if (distance < CONFIG.maxDistance) {
                        const opacity = (1 - distance / CONFIG.maxDistance) * Math.min(nodeA.opacity, nodeB.opacity);
                        drawLine(nodeA, nodeB, opacity * 0.45);
                    }
                }
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
                if (nearest) drawLine(nodeA, nearest, 0.35);
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

        let isLoopRunning = true;

        function animate(now) {
            if (window.accessibilitySettings && window.accessibilitySettings.pauseAnimations) {
                isLoopRunning = false;
                return;
            }
            isLoopRunning = true;
            const delta = now - lastTime;
            lastTime = now;
            ctx.clearRect(0, 0, width, height);
            for (let i = nodes.length - 1; i >= 0; i--) { if (nodes[i].dead) nodes.splice(i, 1); }
            nodes.forEach((node) => node.update(delta));
            drawConnections();
            nodes.forEach((node) => node.draw());
            requestAnimationFrame(animate);
        }

        window.addEventListener('accessibility_animationsChanged', (e) => {
            const paused = e.detail.paused;
            if (paused) {
                stopGrowthSystem();
            } else {
                startGrowthSystem();
                if (!isLoopRunning) { lastTime = performance.now(); requestAnimationFrame(animate); }
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
        let wordIdx = 0, charIdx = 0, isDeleting = false, typingSpeed = 40;
        let timeoutId = null, isTypewriterRunning = true;

        function type() {
            if (window.accessibilitySettings && window.accessibilitySettings.pauseAnimations) {
                isTypewriterRunning = false;
                return;
            }
            isTypewriterRunning = true;
            if (!words[wordIdx]) wordIdx = 0;
            const currentWord = words[wordIdx];
            if (isDeleting) {
                textElement.textContent = currentWord.substring(0, charIdx - 1);
                charIdx--;
                typingSpeed = 20;
            } else {
                textElement.textContent = currentWord.substring(0, charIdx + 1);
                charIdx++;
                typingSpeed = 40;
            }
            if (!isDeleting && charIdx === currentWord.length) { typingSpeed = 3000; isDeleting = true; }
            else if (isDeleting && charIdx === 0) { isDeleting = false; wordIdx = (wordIdx + 1) % words.length; typingSpeed = 400; }
            timeoutId = setTimeout(type, typingSpeed);
        }

        window.addEventListener('languageChanged', (e) => {
            currentLang = e.detail.language;
            words = wordsByLang[currentLang] || wordsByLang.pt;
            wordIdx = 0; charIdx = 0; isDeleting = false;
            if (textElement) textElement.textContent = '';
            if (timeoutId) { clearTimeout(timeoutId); timeoutId = setTimeout(type, 500); }
        });

        window.addEventListener('accessibility_animationsChanged', (e) => {
            const paused = e.detail.paused;
            if (!paused && !isTypewriterRunning) {
                if (timeoutId) clearTimeout(timeoutId);
                timeoutId = setTimeout(type, 100);
            }
        });

        timeoutId = setTimeout(type, 1000);
    }

    /* ==========================================================================
       HERO CODE CARDS ANIMATION (CONVENTIONAL VS VIBE CODING)
       ========================================================================== */
    function initCodeCardsAnimation() {
        const vibePrompt = document.getElementById('ai-prompt-text');
        const vibePreview = document.getElementById('ai-vibe-preview');
        const fastCodeArea = document.getElementById('ai-fast-code');

        if (!vibePrompt || !vibePreview || !fastCodeArea) return;

        let isAnimating = true;
        async function sleep(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

        // --- Vibe Coding Stages (5 Prompts) ---
        const vibeStages = [
            // ── STAGE 1: Dashboard Admin ─────────────────────────────────────
            {
                prompt: "Generate admin dashboard with dynamic charts",
                fastCode: "import Dashboard from '@/components/Dashboard';\nimport { LineChart, BarChart } from 'recharts';\nimport { useAdminData } from '@/hooks/useData';\nimport React, { useState, useEffect } from 'react';\n\nexport default function Admin() {\n  const { stats, revenue, isLoading } = useAdminData();\n  const [timeRange, setTimeRange] = useState('7d');\n\n  if (isLoading) return <LoadingSpinner />;\n\n  return (\n    <div className='p-4 min-h-screen bg-gray-50'>\n      <header className='flex justify-between items-center'>\n         <h1 className='text-2xl font-bold'>Admin Dashboard</h1>\n         <DateSelector value={timeRange} onChange={setTimeRange} />\n      </header>\n      \n      <main className='mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6'>\n        <div className='col-span-2 bg-white rounded shadow p-4'>\n          <h2>Revenue Overview</h2>\n          <LineChart data={stats} width={800} height={300} />\n        </div>\n        <div className='bg-white rounded shadow p-4'>\n          <h2>User Growth</h2>\n          <BarChart data={revenue} width={300} height={300} />\n        </div>\n      </main>\n    </div>\n  );\n}",
                previewHTML: `
                    <div class="mini-ui">
                        <div class="mini-nav"><span class="mini-title" style="width:40%"></span><div class="mini-nav-dots"><div class="mini-nav-dot"></div><div class="mini-nav-dot"></div></div></div>
                        <div class="ai-preview-chart" style="width: 100%;"></div>
                        <div class="ai-preview-chart" style="width: 75%; background: linear-gradient(90deg, #10b981 30%, #34d399 70%);"></div>
                        <div class="ai-preview-chart" style="width: 50%; background: linear-gradient(90deg, #f59e0b 30%, #fbbf24 70%);"></div>
                    </div>`
            },
            // ── STAGE 2: Landing Imobiliária ─────────────────────────────────
            {
                prompt: "Create real estate landing page with glassmorphism",
                fastCode: "import Hero from '@/components/Hero';\nimport PropertyGrid from '@/components/Grid';\nimport ContactForm from '@/components/Contact';\nimport { motion } from 'framer-motion';\n\nexport default function RealEstate() {\n  return (\n    <main className='bg-slate-50 overflow-hidden relative'>\n      <div className='absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-300 rounded-full blur-[120px] opacity-50 z-0' />\n      \n      <nav className='relative z-10 glass-nav'>\n        <Logo /> <Menu />\n      </nav>\n\n      <Hero title='Encontre seu lar perfeito' subtitle='Mais de 10.000 propriedades esperando por você.' />\n      \n      <section className='py-20 relative z-10'>\n         <PropertyGrid filters={['Casa', 'Apartamento', 'Luxo']} />\n      </section>\n\n      <ContactForm />\n    </main>\n  );\n}\n\nconst glass = 'bg-white bg-opacity-20 backdrop-blur-lg border border-white/30 shadow-xl';\n",
                previewHTML: `
                    <div class="mini-ui">
                        <div class="mini-hero" style="background: linear-gradient(135deg, #e2e8f0, #f8fafc); border: 1px solid rgba(255,255,255,0.5); backdrop-filter: blur(4px);">
                            <div class="mini-title" style="width:50%; background:#64748b;"></div>
                            <div class="mini-sub" style="width:70%; background:#94a3b8;"></div>
                            <div class="mini-btn" style="background:#3b82f6;"></div>
                        </div>
                        <div class="mini-grid">
                            <div class="mini-card" style="height:30px;"><div class="mini-title" style="width:80%"></div></div>
                            <div class="mini-card" style="height:30px;"><div class="mini-title" style="width:80%"></div></div>
                        </div>
                    </div>`
            },
            // ── STAGE 3: App Financeiro ──────────────────────────────────────
            {
                prompt: "Finance app with dark mode cards",
                fastCode: "import BalanceCard from '@/components/Balance';\nimport Transactions from '@/components/List';\n\nexport default function FintechApp() {\n  return (\n    <div className='bg-slate-950 text-white min-h-screen flex flex-col p-6'>\n      <header className='flex justify-between'>\n        <UserAvatar />\n        <SettingsIcon />\n      </header>\n\n      <div className='mt-8 relative'>\n        <h2 className='text-slate-400 text-sm'>Total Balance</h2>\n        <h1 className='text-4xl font-bold'>$ 14,500.00</h1>\n      </div>\n\n      <BalanceCard \n         cardNumber='**** **** **** 4021'\n         validThru='12/28'\n         cardHolder='John Doe'\n         theme='neon-purple'\n      />\n\n      <section className='mt-8 flex-1 bg-slate-900 rounded-t-3xl p-6'>\n        <h3 className='text-lg mb-4'>Recent Transactions</h3>\n        <Transactions limit={5} />\n      </section>\n    </div>\n  );\n}",
                previewHTML: `
                    <div class="mini-ui dark">
                        <div class="mini-nav"><span class="mini-title" style="width:30%"></span></div>
                        <div class="mini-card" style="background: linear-gradient(135deg, #4f46e5, #9333ea); border: none; margin: 4px 0; height: 35px; display:flex; flex-direction:column; justify-content:center;">
                            <div class="mini-sub" style="background:rgba(255,255,255,0.7); width: 30%"></div>
                            <div class="mini-title" style="background:#fff; width: 60%; margin-top:2px;"></div>
                        </div>
                        <div class="mini-card" style="height: 12px; display:flex; align-items:center;"><div class="mini-sub"></div></div>
                        <div class="mini-card" style="height: 12px; display:flex; align-items:center;"><div class="mini-sub"></div></div>
                    </div>`
            },
            // ── STAGE 4: E-commerce minimalista ──────────────────────────────
            {
                prompt: "Fashion e-commerce with minimalist layout",
                fastCode: "import ProductGallery from './Gallery';\nimport CartBtn from './Cart';\nimport { AnimatePresence } from 'framer-motion';\n\nexport default function Store() {\n  return (\n    <div className='font-sans text-slate-900 bg-white'>\n      <nav className='flex justify-between items-center py-6 px-12 border-b border-gray-100'>\n        <span className='font-bold text-xl tracking-widest uppercase'>Minimalist</span>\n        <div className='flex gap-8 text-sm'>\n          <a href='/new'>New Arrivals</a>\n          <a href='/collection'>Collection</a>\n          <a href='/about'>About</a>\n        </div>\n        <CartBtn />\n      </nav>\n\n      <main className='max-w-7xl mx-auto py-16'>\n        <header className='text-center mb-16'>\n          <h1 className='text-5xl font-light mb-4'>Fall 2026</h1>\n          <p className='text-gray-400 max-w-md mx-auto'>Discover the essence of pure design.</p>\n        </header>\n        <ProductGallery layout='masonry' />\n      </main>\n    </div>\n  );\n}",
                previewHTML: `
                    <div class="mini-ui" style="background: #fff; padding: 4px;">
                        <div class="mini-nav" style="background: transparent; border-bottom: 1px solid #e2e8f0; border-radius: 0;">
                            <div class="mini-title" style="width:30%; background:#1e293b;"></div>
                            <div class="mini-nav-dots"><div class="mini-nav-dot" style="background:#1e293b;"></div></div>
                        </div>
                        <div class="mini-grid" style="grid-template-columns: 1fr 1fr 1fr;">
                            <div class="mini-card" style="height:40px; background:#f1f5f9; border:none;"></div>
                            <div class="mini-card" style="height:40px; background:#f1f5f9; border:none;"></div>
                            <div class="mini-card" style="height:40px; background:#f1f5f9; border:none;"></div>
                        </div>
                        <div class="mini-sub" style="margin: 4px auto; background:#64748b;"></div>
                    </div>`
            },
            // ── STAGE 5: Portfólio Neumórfico ────────────────────────────────
            {
                prompt: "Creative portfolio with neumorphic buttons",
                fastCode: "import Projects from './Projects';\nimport NeumorphicBtn from './Button';\nimport { NeumorphicCard } from './UI';\n\nexport default function Portfolio() {\n  return (\n    <main className='bg-gray-200 min-h-screen p-10 flex flex-col items-center justify-center font-sans'>\n      <NeumorphicCard className='w-full max-w-4xl p-12 text-center rounded-3xl'>\n        <h1 className='text-6xl font-extrabold text-gray-700 tracking-tight mb-6'>\n          Creative Developer\n        </h1>\n        <p className='text-gray-500 mb-12 max-w-2xl mx-auto'>\n          Crafting tactile digital experiences using light, shadow, and code.\n        </p>\n        \n        <div className='flex justify-center gap-6'>\n          <NeumorphicBtn variant='outset'>View Work</NeumorphicBtn>\n          <NeumorphicBtn variant='inset'>Contact Me</NeumorphicBtn>\n        </div>\n\n        <section className='mt-20 text-left'>\n          <h2 className='text-2xl text-gray-600 mb-8'>Selected Projects</h2>\n          <Projects />\n        </section>\n      </NeumorphicCard>\n    </main>\n  );\n}",
                previewHTML: `
                    <div class="mini-ui" style="background: #e2e8f0; padding: 6px; gap: 8px;">
                        <div class="mini-hero" style="background: transparent; padding: 0;">
                            <div class="mini-title" style="width: 40%; background: #64748b;"></div>
                        </div>
                        <div style="display:flex; justify-content:center; gap:8px;">
                            <div class="mini-btn" style="background:#e2e8f0; box-shadow: 2px 2px 4px #cbd5e1, -2px -2px 4px #f8fafc; border-radius: 20px; width:50px; height: 16px;"></div>
                            <div class="mini-btn" style="background:#e2e8f0; box-shadow: inset 2px 2px 4px #cbd5e1, inset -2px -2px 4px #f8fafc; border-radius: 20px; width:50px; height: 16px;"></div>
                        </div>
                        <div class="mini-card" style="background: #e2e8f0; box-shadow: 3px 3px 6px #cbd5e1, -3px -3px 6px #f8fafc; border:none; height: 30px;"></div>
                    </div>`
            },
            // ── STAGE 6 (NOVO): SaaS Analytics ─────────────────────────────
            {
                prompt: "SaaS analytics platform with real-time KPIs",
                fastCode: "import { useRealtime } from '@/hooks/useRealtime';\nimport KPICard from '@/components/KPICard';\nimport PieChart from '@/components/PieChart';\nimport LiveFeed from '@/components/LiveFeed';\n\nexport default function Analytics() {\n  const { kpis, events } = useRealtime('/api/metrics');\n\n  return (\n    <div className='min-h-screen bg-[#0a0f1e] text-white p-8'>\n      <header className='mb-10 flex items-center justify-between'>\n        <h1 className='text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'>\n          Analytics Pro\n        </h1>\n        <span className='flex items-center gap-2 text-green-400 text-sm'>\n          <span className='w-2 h-2 rounded-full bg-green-400 animate-pulse'></span>\n          Live\n        </span>\n      </header>\n\n      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>\n        {kpis.map(kpi => (\n          <KPICard key={kpi.id} title={kpi.name} value={kpi.value} trend={kpi.trend} />\n        ))}\n      </div>\n\n      <div className='grid grid-cols-3 gap-6'>\n        <div className='col-span-2 bg-slate-900 rounded-2xl p-6'>\n          <LiveFeed events={events} maxItems={20} />\n        </div>\n        <PieChart data={kpis} />\n      </div>\n    </div>\n  );\n}",
                previewHTML: `
                    <div class="mini-ui dark" style="gap:4px;">
                        <div class="mini-nav" style="background:rgba(6,182,212,0.1); border-radius:4px;">
                            <div class="mini-title" style="width:35%; background:linear-gradient(90deg,#06b6d4,#3b82f6);"></div>
                            <div style="width:8px;height:8px;border-radius:50%;background:#22c55e;flex-shrink:0;"></div>
                        </div>
                        <div class="mini-grid" style="grid-template-columns:1fr 1fr 1fr 1fr; gap:3px;">
                            <div class="mini-card" style="background:#0f172a;border-color:rgba(6,182,212,0.2);height:20px;"></div>
                            <div class="mini-card" style="background:#0f172a;border-color:rgba(6,182,212,0.2);height:20px;"></div>
                            <div class="mini-card" style="background:#0f172a;border-color:rgba(6,182,212,0.2);height:20px;"></div>
                            <div class="mini-card" style="background:#0f172a;border-color:rgba(6,182,212,0.2);height:20px;"></div>
                        </div>
                        <div class="mini-grid" style="grid-template-columns:2fr 1fr; gap:3px; flex:1;">
                            <div class="mini-card" style="background:#0f172a; border-color:rgba(255,255,255,0.05); flex-direction:column; gap:2px; height:40px;">
                                <div class="ai-preview-chart" style="width:90%; height:4px; background:linear-gradient(90deg,#06b6d4,#3b82f6);"></div>
                                <div class="ai-preview-chart" style="width:60%; height:4px; background:linear-gradient(90deg,#8b5cf6,#ec4899);"></div>
                                <div class="ai-preview-chart" style="width:75%; height:4px; background:linear-gradient(90deg,#10b981,#06b6d4);"></div>
                            </div>
                            <div class="mini-card" style="background:#0f172a;border-color:rgba(255,255,255,0.05);height:40px;display:flex;align-items:center;justify-content:center;">
                                <div style="width:24px;height:24px;border-radius:50%;border:4px solid transparent;border-top-color:#06b6d4;border-right-color:#3b82f6;border-bottom-color:#8b5cf6;"></div>
                            </div>
                        </div>
                    </div>`
            },
            // ── STAGE 7 (NOVO): App de Chat / Mensagens ──────────────────────
            {
                prompt: "Chat app with integrated AI and history",
                fastCode: "import { useState, useRef, useEffect } from 'react';\nimport { sendMessage } from '@/lib/ai';\nimport MessageBubble from '@/components/Bubble';\nimport TypingIndicator from '@/components/Typing';\n\nexport default function ChatApp() {\n  const [messages, setMessages] = useState([\n    { role: 'assistant', content: 'Olá! Como posso ajudar?' }\n  ]);\n  const [input, setInput] = useState('');\n  const [isTyping, setIsTyping] = useState(false);\n  const bottomRef = useRef(null);\n\n  const handleSend = async () => {\n    if (!input.trim()) return;\n    const userMsg = { role: 'user', content: input };\n    setMessages(prev => [...prev, userMsg]);\n    setInput('');\n    setIsTyping(true);\n\n    const reply = await sendMessage([...messages, userMsg]);\n    setIsTyping(false);\n    setMessages(prev => [...prev, { role: 'assistant', content: reply }]);\n    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });\n  };\n\n  return (\n    <div className='flex flex-col h-screen bg-white'>\n      <nav className='p-4 border-b flex items-center gap-3'>\n        <div className='w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-pink-500' />\n        <div><p className='font-semibold'>AI Assistant</p><p className='text-xs text-green-500'>Online</p></div>\n      </nav>\n      <main className='flex-1 overflow-y-auto p-4 space-y-3'>\n        {messages.map((m, i) => <MessageBubble key={i} {...m} />)}\n        {isTyping && <TypingIndicator />}\n        <div ref={bottomRef} />\n      </main>\n      <footer className='p-4 border-t flex gap-2'>\n        <input className='flex-1 rounded-full border px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-400'\n          value={input} onChange={e => setInput(e.target.value)}\n          onKeyDown={e => e.key === 'Enter' && handleSend()}\n          placeholder='Digite sua mensagem...'\n        />\n        <button onClick={handleSend} className='w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center text-white'>\n          ➤\n        </button>\n      </footer>\n    </div>\n  );\n}",
                previewHTML: `
                    <div class="mini-ui" style="background:#fff; gap:3px;">
                        <div class="mini-nav" style="background:#f8fafc; border-bottom:1px solid #e2e8f0; border-radius:0; height:18px;">
                            <div style="display:flex;align-items:center;gap:4px;">
                                <div style="width:10px;height:10px;border-radius:50%;background:linear-gradient(135deg,#7c3aed,#ec4899);flex-shrink:0;"></div>
                                <div class="mini-title" style="width:40%;background:#334155;"></div>
                            </div>
                            <div style="width:6px;height:6px;border-radius:50%;background:#22c55e;flex-shrink:0;"></div>
                        </div>
                        <div style="flex:1;display:flex;flex-direction:column;gap:4px;padding:4px;overflow:hidden;">
                            <div style="display:flex;justify-content:flex-start;">
                                <div style="background:#f1f5f9;border-radius:0 8px 8px 8px;padding:3px 6px;max-width:70%;">
                                    <div class="mini-sub" style="background:#94a3b8;width:80%;"></div>
                                </div>
                            </div>
                            <div style="display:flex;justify-content:flex-end;">
                                <div style="background:linear-gradient(135deg,#7c3aed,#a78bfa);border-radius:8px 0 8px 8px;padding:3px 6px;max-width:60%;">
                                    <div class="mini-sub" style="background:rgba(255,255,255,0.7);width:90%;"></div>
                                </div>
                            </div>
                            <div style="display:flex;justify-content:flex-start;">
                                <div style="background:#f1f5f9;border-radius:0 8px 8px 8px;padding:3px 6px;max-width:80%;">
                                    <div class="mini-sub" style="background:#94a3b8;width:100%;"></div>
                                </div>
                            </div>
                        </div>
                        <div style="display:flex;align-items:center;gap:3px;padding:3px;border-top:1px solid #e2e8f0;">
                            <div style="flex:1;height:12px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:20px;"></div>
                            <div style="width:14px;height:14px;border-radius:50%;background:#7c3aed;flex-shrink:0;"></div>
                        </div>
                    </div>`
            },
            // ── STAGE 8 (NOVO): Portfólio 3D Parallax ──────────────────────
            {
                prompt: "3D portfolio with parallax and magnetic cursor",
                fastCode: "import { useRef, useEffect } from 'react';\nimport { Canvas } from '@react-three/fiber';\nimport { OrbitControls, Float, Text3D } from '@react-three/drei';\nimport { gsap } from 'gsap';\nimport { ScrollTrigger } from 'gsap/ScrollTrigger';\n\ngsap.registerPlugin(ScrollTrigger);\n\nexport default function Portfolio3D() {\n  const heroRef = useRef(null);\n\n  useEffect(() => {\n    const el = heroRef.current;\n    const onMove = (e) => {\n      const { clientX: x, clientY: y } = e;\n      const cx = window.innerWidth / 2, cy = window.innerHeight / 2;\n      gsap.to(el, {\n        rotateX: (y - cy) / 40,\n        rotateY: (cx - x) / 40,\n        duration: 0.8, ease: 'power2.out'\n      });\n    };\n    window.addEventListener('mousemove', onMove);\n    return () => window.removeEventListener('mousemove', onMove);\n  }, []);\n\n  return (\n    <main className='min-h-screen bg-[#050510] overflow-hidden'>\n      <Canvas className='absolute inset-0'>\n        <ambientLight intensity={0.3} />\n        <pointLight position={[10, 10, 10]} color='#7c3aed' />\n        <Float speed={2} rotationIntensity={0.5}>\n          <Text3D font='/fonts/outfit.json'>\n            FULVIO\n            <meshStandardMaterial color='#a78bfa' />\n          </Text3D>\n        </Float>\n        <OrbitControls enableZoom={false} enablePan={false} />\n      </Canvas>\n      <div ref={heroRef} className='relative z-10 p-16'>\n        <h1 className='text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-pink-400'>\n          Creative Dev\n        </h1>\n        <p className='text-slate-400 mt-4 text-xl'>Building the future, one pixel at a time.</p>\n      </div>\n    </main>\n  );\n}",
                previewHTML: `
                    <div class="mini-ui dark" style="background:linear-gradient(135deg,#050510,#0d0d2b);gap:3px;">
                        <div style="flex:1;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;">
                            <div style="position:absolute;width:40px;height:40px;border-radius:50%;background:radial-gradient(circle,rgba(124,58,237,0.4),transparent 70%);top:10%;left:20%;"></div>
                            <div style="position:absolute;width:30px;height:30px;border-radius:50%;background:radial-gradient(circle,rgba(236,72,153,0.3),transparent 70%);bottom:15%;right:25%;"></div>
                            <div style="text-align:center;">
                                <div class="mini-title" style="width:80px;height:7px;background:linear-gradient(90deg,#7c3aed,#ec4899);margin:0 auto 4px;border-radius:4px;"></div>
                                <div class="mini-sub" style="width:50px;background:rgba(255,255,255,0.3);margin:0 auto;"></div>
                            </div>
                        </div>
                        <div style="display:flex;gap:3px;padding:0 3px 3px;">
                            <div class="mini-card" style="background:rgba(124,58,237,0.15);border-color:rgba(124,58,237,0.3);flex:1;height:16px;"></div>
                            <div class="mini-card" style="background:rgba(236,72,153,0.15);border-color:rgba(236,72,153,0.3);flex:1;height:16px;"></div>
                            <div class="mini-card" style="background:rgba(6,182,212,0.15);border-color:rgba(6,182,212,0.3);flex:1;height:16px;"></div>
                        </div>
                    </div>`
            },
            // ── STAGE 9 (NOVO): App Mobile Todo / Produtividade ───────────────
            {
                prompt: "Mobile task app with drag-and-drop and AI",
                fastCode: "import { useState } from 'react';\nimport { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';\nimport { suggestTask } from '@/lib/ai';\n\nconst COLUMNS = [\n  { id: 'todo', title: 'A Fazer', color: '#3b82f6' },\n  { id: 'doing', title: 'Em Progresso', color: '#f59e0b' },\n  { id: 'done', title: 'Concluído', color: '#10b981' }\n];\n\nexport default function TaskBoard() {\n  const [tasks, setTasks] = useState({\n    todo: [\n      { id: '1', text: 'Criar wireframes' },\n      { id: '2', text: 'Revisar design system' }\n    ],\n    doing: [{ id: '3', text: 'Implementar auth' }],\n    done: [{ id: '4', text: 'Setup do projeto' }]\n  });\n\n  const onDragEnd = ({ source: s, destination: d }) => {\n    if (!d) return;\n    const src = [...tasks[s.droppableId]];\n    const dst = [...tasks[d.droppableId]];\n    const [moved] = src.splice(s.index, 1);\n    dst.splice(d.index, 0, moved);\n    setTasks({ ...tasks, [s.droppableId]: src, [d.droppableId]: dst });\n  };\n\n  return (\n    <div className='min-h-screen bg-gray-50 p-6'>\n      <header className='mb-6 flex justify-between items-center'>\n        <h1 className='text-2xl font-bold'>My Board</h1>\n        <button onClick={() => suggestTask(tasks)} className='btn-gradient text-sm'>\n          ✨ Sugerir com IA\n        </button>\n      </header>\n      <DragDropContext onDragEnd={onDragEnd}>\n        <div className='grid grid-cols-3 gap-4'>\n          {COLUMNS.map(col => (\n            <Droppable key={col.id} droppableId={col.id}>\n              {(prov) => (\n                <div ref={prov.innerRef} {...prov.droppableProps}\n                  className='bg-white rounded-2xl p-4 shadow-sm min-h-[300px]'\n                >\n                  <h2 style={{ color: col.color }} className='font-semibold mb-3'>{col.title}</h2>\n                  {tasks[col.id].map((task, i) => (\n                    <Draggable key={task.id} draggableId={task.id} index={i}>\n                      {(p) => (\n                        <div ref={p.innerRef} {...p.draggableProps} {...p.dragHandleProps}\n                          className='bg-gray-50 border rounded-lg p-3 mb-2 text-sm cursor-grab'\n                        >\n                          {task.text}\n                        </div>\n                      )}\n                    </Draggable>\n                  ))}\n                  {prov.placeholder}\n                </div>\n              )}\n            </Droppable>\n          ))}\n        </div>\n      </DragDropContext>\n    </div>\n  );\n}",
                previewHTML: `
                    <div class="mini-ui" style="background:#f8fafc;gap:4px;">
                        <div class="mini-nav" style="background:#fff;border-bottom:1px solid #e2e8f0;border-radius:0;height:18px;">
                            <div class="mini-title" style="width:35%;background:#0f172a;"></div>
                            <div class="mini-btn" style="background:linear-gradient(90deg,#7c3aed,#ec4899);width:40px;height:12px;border-radius:20px;"></div>
                        </div>
                        <div class="mini-grid" style="grid-template-columns:1fr 1fr 1fr;gap:3px;flex:1;align-items:start;">
                            <div style="display:flex;flex-direction:column;gap:2px;">
                                <div style="height:5px;background:#3b82f6;border-radius:2px;margin-bottom:2px;"></div>
                                <div class="mini-card" style="height:14px;"></div>
                                <div class="mini-card" style="height:14px;"></div>
                            </div>
                            <div style="display:flex;flex-direction:column;gap:2px;">
                                <div style="height:5px;background:#f59e0b;border-radius:2px;margin-bottom:2px;"></div>
                                <div class="mini-card" style="height:14px;background:#fffbeb;border-color:#fde68a;"></div>
                            </div>
                            <div style="display:flex;flex-direction:column;gap:2px;">
                                <div style="height:5px;background:#10b981;border-radius:2px;margin-bottom:2px;"></div>
                                <div class="mini-card" style="height:14px;background:#f0fdf4;border-color:#bbf7d0;"></div>
                                <div class="mini-card" style="height:14px;background:#f0fdf4;border-color:#bbf7d0;"></div>
                            </div>
                        </div>
                    </div>`
            }
        ];

        async function typePrompt(text) {
            let typed = "";
            for (let i = 0; i < text.length; i++) {
                if (!isAnimating) return;
                typed += text[i];
                vibePrompt.innerHTML = typed + '<span class="code-cursor"></span>';
                await sleep(15);
            }
            vibePrompt.innerHTML = typed + '<span class="code-cursor" style="animation: none; opacity: 0.5;"></span>';
        }

        async function cycleVibeStages() {
            let stageIdx = 0;
            while (true) {
                if (window.accessibilitySettings && window.accessibilitySettings.pauseAnimations) {
                    await sleep(1000);
                    continue;
                }

                let stage = vibeStages[stageIdx];

                // 1. Limpa tudo
                vibePrompt.innerHTML = '<span class="code-cursor"></span>';
                vibePreview.style.display = 'none';
                fastCodeArea.style.opacity = '0';
                await sleep(500);

                // 2. Digita o prompt
                await typePrompt(stage.prompt);
                await sleep(300);

                // 3. Mostra código rápido gerado
                fastCodeArea.innerHTML = '';
                fastCodeArea.style.opacity = '1';

                let blocks = stage.fastCode.split('\n');
                let codeHTML = "";
                for (let b of blocks) {
                    if (!isAnimating) return;

                    let highlighted = highlightLine(b);
                    codeHTML += highlighted + "<br>";
                    fastCodeArea.innerHTML = codeHTML;
                    fastCodeArea.scrollTop = fastCodeArea.scrollHeight;
                    await sleep(35);
                }

                await sleep(500);

                // 4. Fade out código, show Preview
                fastCodeArea.style.opacity = '0';
                await sleep(300);
                vibePreview.innerHTML = stage.previewHTML;
                vibePreview.style.display = 'flex';

                await sleep(4000);

                stageIdx = (stageIdx + 1) % vibeStages.length;
            }
        }

        // Inicia a rotina
        cycleVibeStages();
    }

    /* ==========================================================================
       REAL-TIME CONTINUOUS TYPEWRITER WITH TYPOS FOR LEFT CODE CARD (60 LINES)
       ========================================================================== */
    function initRealtimeTypewriter() {
        const bodyEl = document.getElementById("trad-code-body");
        if (!bodyEl) return;

        const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

        const FAKE_60_LINES = [
            { text: "\"use strict\";", typo: null },
            { text: "", typo: null },
            { text: "const ENGINE_VERSION = \"12.94.Ω\";", typo: { at: 22, wrong: "v12-omega", back: 9 } },
            { text: "const GALAXY_CLUSTER = \"Andromeda-X\";", typo: null },
            { text: "const QUANTUM_SIGNATURE = \"0xA7F3-OMEGA-9B\";", typo: null },
            { text: "const MAX_PHOTON_STREAM = 8192;", typo: { at: 26, wrong: "4096", back: 4 } },
            { text: "const TEMPORAL_OFFSET = 0.00000042;", typo: null },
            { text: "const DEBUG_MODE = true;", typo: null },
            { text: "const CORE_STABILITY_LIMIT = 0.985;", typo: null },
            { text: "", typo: null },
            { text: "const RuntimeFlags = Object.freeze({", typo: null },
            { text: "    IDLE: 0,", typo: null },
            { text: "    BOOTING: 1,", typo: null },
            { text: "    ACTIVE: 2,", typo: null },
            { text: "    COLLAPSING: 3,", typo: null },
            { text: "    RECOVERING: 4", typo: null },
            { text: "});", typo: null },
            { text: "", typo: null },
            { text: "class HyperNode {", typo: { at: 6, wrong: "Hyperlayer", back: 10 } },
            { text: "    constructor(id) {", typo: null },
            { text: "        this.id = id;", typo: null },
            { text: "        this.energy = Math.random() * 5000;", typo: null },
            { text: "        this.entropy = Math.random();", typo: { at: 20, wrong: "calculateEntropy()", back: 18 } },
            { text: "        this.vector = {", typo: null },
            { text: "            x: Math.random(),", typo: null },
            { text: "            y: Math.random(),", typo: null },
            { text: "            z: Math.random()", typo: null },
            { text: "        };", typo: null },
            { text: "        this.online = true;", typo: null },
            { text: "        this.timestamp = Date.now();", typo: null },
            { text: "    }", typo: null },
            { text: "", typo: null },
            { text: "    synchronize() {", typo: null },
            { text: "        this.energy *= 1.002;", typo: null },
            { text: "        this.entropy *= 0.995;", typo: null },
            { text: "    }", typo: null },
            { text: "", typo: null },
            { text: "    injectPhoton(value) {", typo: null },
            { text: "        this.energy += value;", typo: null },
            { text: "    }", typo: null },
            { text: "", typo: null },
            { text: "    collapse() {", typo: null },
            { text: "        this.online = false;", typo: null },
            { text: "        this.energy = 0;", typo: null },
            { text: "    }", typo: null },
            { text: "", typo: null },
            { text: "    serialize() {", typo: null },
            { text: "        return {", typo: null },
            { text: "            id: this.id,", typo: null },
            { text: "            energy: this.energy,", typo: null },
            { text: "            entropy: this.entropy,", typo: null },
            { text: "            vector: this.vector,", typo: null },
            { text: "            online: this.online", typo: null },
            { text: "        };", typo: null },
            { text: "    }", typo: null },
            { text: "}", typo: null },
            { text: "", typo: null },
            { text: "class QuantumEngine {", typo: null },
            { text: "    constructor(seed) {", typo: null },
            { text: "        this.seed = seed;", typo: null },
            { text: "        this.nodes = [];", typo: null },
            { text: "        this.state = RuntimeFlags.IDLE;", typo: { at: 20, wrong: "BOOTING", back: 7 } },
            { text: "        this.cycles = 0;", typo: null },
            { text: "        this.energy = 100000;", typo: null },
            { text: "        this.logs = [];", typo: null },
            { text: "    }", typo: null },
            { text: "", typo: null },
            { text: "    boot() {", typo: null },
            { text: "        this.state = RuntimeFlags.BOOTING;", typo: null },
            { text: "        this.log(\"Initializing HyperCore...\");", typo: null },
            { text: "        this.energy += this.seed * 50;", typo: null },
            { text: "    }", typo: null },
            { text: "", typo: null },
            { text: "    createNodes(quantity) {", typo: null },
            { text: "        for (let i = 0; i < quantity; i++) {", typo: null },
            { text: "            this.nodes.push(", typo: null },
            { text: "                new HyperNode(`QNODE-${i.toString(16).padStart(4, \"0\")}`)", typo: { at: 40, wrong: "toHex()", back: 7 } },
            { text: "            );", typo: null },
            { text: "        }", typo: null },
            { text: "        this.log(`${quantity} HyperNodes allocated.`);", typo: null },
            { text: "    }", typo: null },
            { text: "", typo: null },
            { text: "    stabilize() {", typo: null },
            { text: "        this.nodes.forEach(node => {", typo: null },
            { text: "            node.synchronize();", typo: null },
            { text: "        });", typo: null },
            { text: "        this.energy *= CORE_STABILITY_LIMIT;", typo: null },
            { text: "        this.state = RuntimeFlags.ACTIVE;", typo: null },
            { text: "        this.log(\"Quantum field stabilized.\");", typo: null },
            { text: "    }", typo: null },
            { text: "", typo: null },
            { text: "    executeCycle() {", typo: null },
            { text: "        this.cycles++;", typo: null },
            { text: "        for (const node of this.nodes) {", typo: null },
            { text: "            const photon =", typo: null },
            { text: "                Math.sin(node.energy / 1000) *", typo: { at: 22, wrong: "cos(", back: 4 } },
            { text: "                MAX_PHOTON_STREAM;", typo: null },
            { text: "            node.injectPhoton(photon);", typo: null },
            { text: "            if (node.entropy > 0.95) {", typo: null },
            { text: "                node.entropy *= 0.9;", typo: null },
            { text: "            }", typo: null },
            { text: "            if (node.energy > 15000) {", typo: null },
            { text: "                node.energy *= 0.92;", typo: null },
            { text: "            }", typo: null },
            { text: "        }", typo: null },
            { text: "        this.log(`Cycle ${this.cycles} executed.`);", typo: null },
            { text: "    }", typo: null },
            { text: "", typo: null },
            { text: "    calculateEntropy() {", typo: null },
            { text: "        return this.nodes.reduce((sum, node) => {", typo: null },
            { text: "            return sum + node.entropy;", typo: null },
            { text: "        }, 0) / this.nodes.length;", typo: null },
            { text: "    }", typo: null },
            { text: "", typo: null },
            { text: "    buildPhotonMesh() {", typo: null },
            { text: "        return this.nodes.map(node => ({", typo: null },
            { text: "            id: node.id,", typo: null },
            { text: "            photon: node.energy * TEMPORAL_OFFSET,", typo: { at: 30, wrong: "TEMPORAL_SHIFT", back: 14 } },
            { text: "            entropy: node.entropy,", typo: null },
            { text: "            checksum:", typo: null },
            { text: "                Math.floor(node.energy * 17)", typo: null },
            { text: "                    .toString(16)", typo: null },
            { text: "                    .toUpperCase()", typo: null },
            { text: "        }));", typo: null },
            { text: "    }", typo: null },
            { text: "", typo: null },
            { text: "    renderDiagnostics() {", typo: null },
            { text: "        return {", typo: null },
            { text: "            version: ENGINE_VERSION,", typo: null },
            { text: "            cluster: GALAXY_CLUSTER,", typo: null },
            { text: "            state: this.state,", typo: null },
            { text: "            cycles: this.cycles,", typo: null },
            { text: "            entropy: this.calculateEntropy(),", typo: null },
            { text: "            nodes: this.nodes.length,", typo: null },
            { text: "            signature: QUANTUM_SIGNATURE", typo: null },
            { text: "        };", typo: null },
            { text: "    }", typo: null },
            { text: "", typo: null },
            { text: "    log(message) {", typo: null },
            { text: "        const record = {", typo: null },
            { text: "            timestamp: new Date().toISOString(),", typo: null },
            { text: "            message", typo: null },
            { text: "        };", typo: null },
            { text: "        this.logs.push(record);", typo: null },
            { text: "        if (DEBUG_MODE) {", typo: null },
            { text: "            console.log(", typo: null },
            { text: "                `[LOG ${record.timestamp}]`,", typo: null },
            { text: "                message", typo: null },
            { text: "            );", typo: null },
            { text: "        }", typo: null },
            { text: "    }", typo: null },
            { text: "}", typo: null },
            { text: "", typo: null },
            { text: "class SingularityGateway {", typo: null },
            { text: "    constructor(engine) {", typo: null },
            { text: "        this.engine = engine;", typo: null },
            { text: "        this.protocol = \"OMEGA-LINK\";", typo: { at: 24, wrong: "ALPHA-LINK", back: 10 } },
            { text: "        this.dimension = \"Sector-77\";", typo: null },
            { text: "    }", typo: null },
            { text: "", typo: null },
            { text: "    open() {", typo: null },
            { text: "        console.log(`Opening ${this.protocol}...`);", typo: null },
            { text: "        return {", typo: null },
            { text: "            status: \"CONNECTED\",", typo: null },
            { text: "            dimension: this.dimension,", typo: null },
            { text: "            nodes: this.engine.nodes.length", typo: null },
            { text: "        };", typo: null },
            { text: "    }", typo: null },
            { text: "", typo: null },
            { text: "    transmit(mesh) {", typo: null },
            { text: "        return mesh.map(packet => ({", typo: null },
            { text: "            ...packet,", typo: null },
            { text: "            encrypted: true,", typo: null },
            { text: "            latency: Math.random() * 2,", typo: null },
            { text: "            resonance: packet.photon * 400", typo: { at: 32, wrong: "photonFlux", back: 10 } },
            { text: "        }));", typo: null },
            { text: "    }", typo: null },
            { text: "}", typo: null },
            { text: "", typo: null },
            { text: "function calculateQuantumNoise(mesh) {", typo: null },
            { text: "    let noise = 0;", typo: null },
            { text: "    for (const packet of mesh) {", typo: null },
            { text: "        noise += Math.cos(packet.photon) * packet.entropy;", typo: null },
            { text: "    }", typo: null },
            { text: "    return noise;", typo: null },
            { text: "}", typo: null },
            { text: "", typo: null },
            { text: "function generateTemporalHash(length = 64) {", typo: null },
            { text: "    const alphabet = \"0123456789ABCDEFΩΣΔXYZ\";", typo: null },
            { text: "    let hash = \"\";", typo: null },
            { text: "    for (let i = 0; i < length; i++) {", typo: null },
            { text: "        hash += alphabet[Math.floor(Math.random() * alphabet.length)];", typo: { at: 20, wrong: "Math.ceil(", back: 10 } },
            { text: "    }", typo: null },
            { text: "    return hash;", typo: null },
            { text: "}", typo: null },
            { text: "", typo: null },
            { text: "const engine = new QuantumEngine(4421);", typo: null },
            { text: "engine.boot();", typo: null },
            { text: "engine.createNodes(64);", typo: null },
            { text: "engine.stabilize();", typo: null },
            { text: "", typo: null },
            { text: "for (let i = 0; i < 25; i++) {", typo: null },
            { text: "    engine.executeCycle();", typo: null },
            { text: "}", typo: null },
            { text: "", typo: null },
            { text: "const mesh = engine.buildPhotonMesh();", typo: null },
            { text: "const gateway = new SingularityGateway(engine);", typo: null },
            { text: "const channel = gateway.open();", typo: null },
            { text: "const packets = gateway.transmit(mesh);", typo: null },
            { text: "const diagnostics = engine.renderDiagnostics();", typo: null },
            { text: "const noise = calculateQuantumNoise(mesh);", typo: null },
            { text: "const quantumHash = generateTemporalHash(128);", typo: { at: 24, wrong: "generateHash(256)", back: 17 } },
            { text: "", typo: null },
            { text: "console.table(diagnostics);", typo: null },
            { text: "console.log(\"Photon Packets:\", packets.length);", typo: null },
            { text: "console.log(\"Quantum Noise:\", noise.toFixed(8));", typo: null },
            { text: "console.log(\"Temporal Hash:\", quantumHash);", typo: null },
            { text: "console.log(\"Gateway:\", channel.status);", typo: null },
            { text: "console.log(\"Cluster:\", GALAXY_CLUSTER);", typo: null },
            { text: "console.log(\"Runtime:\", ENGINE_VERSION);", typo: null },
            { text: "console.log(\"Simulation Completed Successfully.\");", typo: null },
            { text: "console.log(\"Awaiting Neural Synchronization...\");", typo: null },
            { text: "console.log(\"HyperCore Ready.\");", typo: null },
            { text: "", typo: null }
        ];

        async function runTypingLoop() {
            while (true) {
                bodyEl.innerHTML = "";

                for (let lineIndex = 0; lineIndex < FAKE_60_LINES.length; lineIndex++) {
                    const lineData = FAKE_60_LINES[lineIndex];
                    const lineDiv = document.createElement("div");
                    lineDiv.className = "code-line";
                    bodyEl.appendChild(lineDiv);

                    let currentText = "";
                    let fullText = lineData.text;

                    // Se for linha em branco
                    if (!fullText) {
                        lineDiv.innerHTML = '<br>';
                        await sleep(50);
                        continue;
                    }

                    // Simula digitação caractere por caractere
                    for (let i = 0; i < fullText.length; i++) {
                        // Introduz erro de digitação proposital
                        if (lineData.typo && i === lineData.typo.at) {
                            let wrongStr = lineData.typo.wrong;
                            for (let w = 0; w < wrongStr.length; w++) {
                                currentText += wrongStr[w];
                                lineDiv.innerHTML = highlightLine(currentText) + '<span class="code-cursor"></span>';
                                bodyEl.scrollTop = bodyEl.scrollHeight;
                                await sleep(35 + Math.random() * 40);
                            }
                            await sleep(220);

                            for (let b = 0; b < lineData.typo.back; b++) {
                                currentText = currentText.slice(0, -1);
                                lineDiv.innerHTML = highlightLine(currentText) + '<span class="code-cursor"></span>';
                                bodyEl.scrollTop = bodyEl.scrollHeight;
                                await sleep(50);
                            }

                            await sleep(150);
                        }

                        currentText += fullText[i];
                        lineDiv.innerHTML = highlightLine(currentText) + '<span class="code-cursor"></span>';
                        bodyEl.scrollTop = bodyEl.scrollHeight;
                        await sleep(22 + Math.random() * 30);
                    }

                    lineDiv.innerHTML = highlightLine(currentText);
                    await sleep(80 + Math.random() * 100);
                }

                // Pausa no final antes de reiniciar
                await sleep(2500);

                // Fade out suave: apaga linha por linha de trás para frente
                const allLines = bodyEl.querySelectorAll(".code-line");
                for (let k = allLines.length - 1; k >= 0; k--) {
                    allLines[k].style.transition = "opacity 0.08s ease";
                    allLines[k].style.opacity = "0";
                    await sleep(18);
                }
                await sleep(300);
            }
        }

        runTypingLoop();
    }

})();
