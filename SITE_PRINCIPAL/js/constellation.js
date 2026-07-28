/* ==========================================================================
   CONSTELLATION / NETWORK BACKGROUND CANVAS ANIMATION
   ========================================================================== */
(function () {
    const canvas = document.getElementById('constellation-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle nodes configuration
    const particleCount = Math.floor(Math.min(width, 1400) / 18);
    const maxDistance = 140;
    const particles = [];

    // Delicate line color palette matching reference design
    const colors = [
        'rgba(37, 99, 235, 0.45)',   // Soft Royal Blue
        'rgba(236, 72, 153, 0.45)',  // Soft Magenta / Pink
        'rgba(245, 158, 11, 0.45)',  // Soft Amber / Gold
        'rgba(6, 182, 212, 0.45)',   // Soft Cyan
        'rgba(139, 92, 246, 0.35)'   // Delicate Purple/Indigo accent
    ];

    function Particle() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.radius = Math.random() * 2 + 1.5;
        this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    Particle.prototype.update = function () {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
    };

    Particle.prototype.draw = function () {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
    };

    function init() {
        particles.length = 0;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        init();
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDistance) {
                    const alpha = (1 - dist / maxDistance) * 0.5;
                    const gradient = ctx.createLinearGradient(
                        particles[i].x,
                        particles[i].y,
                        particles[j].x,
                        particles[j].y
                    );
                    gradient.addColorStop(0, particles[i].color.replace(/[\d\.]+\)$/, alpha + ')'));
                    gradient.addColorStop(1, particles[j].color.replace(/[\d\.]+\)$/, alpha + ')'));

                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }

        // Draw particles
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }

        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize);
    init();
    animate();
})();
