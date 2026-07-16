document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. LOADING SCREEN REMOVAL
    // ==========================================
    const loader = document.getElementById("loading-screen");
    if (loader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                loader.style.opacity = "0";
                loader.style.visibility = "hidden";
            }, 600); // Penundaan halus untuk kenyamanan visual
        });
    }

    // ==========================================
    // 2. CYBER NET NEON PARTICLE BACKGROUND
    // ==========================================
    const canvas = document.getElementById("particle-canvas");
    const ctx = canvas.getContext("2d");

    let particles = [];
    const particleCount = 45;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            this.speedX = (Math.random() - 0.5) * 0.6;
            this.speedY = (Math.random() - 0.5) * 0.6;
            this.color = Math.random() > 0.5 ? '#9d4edd' : '#00f0ff';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 8;
            ctx.shadowColor = this.color;
            ctx.fill();
            ctx.shadowBlur = 0; // reset shadow
        }
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    initParticles();

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // ==========================================
    // 3. STICKY NAVBAR & SCROLL REVEAL ENGINE
    // ==========================================
    const navbar = document.getElementById("main-navbar");
    const revealElements = document.querySelectorAll(".scroll-reveal");
    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    function handleScrollEffects() {
        const scrollPos = window.scrollY;

        // Sticky Navbar state changer
        if (scrollPos > 40) {
            navbar.classList.add("sticky-active");
        } else {
            navbar.classList.remove("sticky-active");
        }

        // Active Navigation Link Highlighting
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute("id");

            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${id}`) {
                        link.classList.add("active");
                    }
                });
            }
        });

        // Scroll Animation trigger
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (elementTop < windowHeight * 0.85) {
                el.classList.add("active");
            }
        });

        // Back To Top Visibility Toggle
        const bttButton = document.getElementById("back-to-top");
        if (scrollPos > 400) {
            bttButton.classList.add("visible");
        } else {
            bttButton.classList.remove("visible");
        }
    }

    window.addEventListener("scroll", handleScrollEffects);
    handleScrollEffects(); // Trigger sekali di awal pemuatan halaman

    // ==========================================
    // 4. RIPPLE CLICK EFFECT ON BUTTONS
    // ==========================================
    const rippleButtons = document.querySelectorAll(".ripple");

    rippleButtons.forEach(btn => {
        btn.addEventListener("click", function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement("span");
            ripple.classList.add("ripple-effect");
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ==========================================
    // 5. BACK TO TOP CLICK MECHANISM
    // ==========================================
    const bttButton = document.getElementById("back-to-top");
    if (bttButton) {
        bttButton.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
