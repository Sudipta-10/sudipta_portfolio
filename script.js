document.addEventListener('DOMContentLoaded', () => {
    /* ==========================================================================
       Mobile Menu Toggle
       ========================================================================== */
    const hamburger = document.querySelector('.hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinksContainer.classList.toggle('active');
        // Toggle icon between bars and close
        const icon = hamburger.querySelector('i');
        if (navLinksContainer.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    /* ==========================================================================
       Navbar Scroll Effect & Active Link Highlighting
       ========================================================================== */
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Navbar background
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
            navbar.style.boxShadow = 'none';
        }

        // Active Link Highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust offset to trigger active state earlier
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       Scroll Reveal Animations (Intersection Observer)
       ========================================================================== */
    const faders = document.querySelectorAll('.fade-in');

    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    /* ==========================================================================
       Typewriter Effect for Hero Section
       ========================================================================== */
    const TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        const i = this.loopNum % this.toRotate.length;
        const fullTxt = this.toRotate[i];

        if (this.isDeleting) {
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        let delta = 150 - Math.random() * 50;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
            delta = this.period;
            this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.loopNum++;
            delta = 500;
        }

        setTimeout(() => {
            this.tick();
        }, delta);
    };

    const elements = document.getElementsByClassName('typewrite');
    for (let i = 0; i < elements.length; i++) {
        const toRotate = elements[i].getAttribute('data-type');
        const period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }

    /* ==========================================================================
       Antigravity Particle Physics Canvas
       ========================================================================== */
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        const particles = [];
        const colors = ['#00d2ff', '#ff007f', '#3a7bd5', '#ff8a00', '#7b2cbf'];
        const mouse = { x: -1000, y: -1000 };

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
            initParticles();
        });

        window.addEventListener('mousemove', (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        window.addEventListener('mouseout', () => {
            mouse.x = -1000;
            mouse.y = -1000;
        });

        class Particle {
            constructor() {
                this.reset();
            }
            reset() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.baseX = this.x;
                this.baseY = this.y;
                // Dash properties like Antigravity site
                this.length = Math.random() * 8 + 4;
                // Point inward/radially
                this.angle = Math.atan2(height/2 - this.y, width/2 - this.x); 
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.speed = Math.random() * 0.4 + 0.1;
                this.angleOffset = (Math.random() - 0.5) * 0.005; // Slight swirling orbit
            }
            update() {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let dist = Math.sqrt(dx*dx + dy*dy);
                // Repel radius roughly 200px
                let force = Math.max(0, 200 - dist) / 200;
                
                if (dist < 200) {
                    this.x -= (dx / dist) * force * 12; // Push away strongly
                    this.y -= (dy / dist) * force * 12;
                } else {
                    // Elastic return to base position smoothly
                    this.x += (this.baseX - this.x) * 0.05;
                    this.y += (this.baseY - this.y) * 0.05;
                }

                // Slow rotation/movement around the center
                let cx = width/2;
                let cy = height/2;
                let currentAngle = Math.atan2(this.baseY - cy, this.baseX - cx);
                let currentRadius = Math.sqrt((this.baseX - cx)**2 + (this.baseY - cy)**2);
                currentAngle += this.angleOffset;
                
                this.baseX = cx + Math.cos(currentAngle) * currentRadius;
                this.baseY = cy + Math.sin(currentAngle) * currentRadius;
                
                // Keep the dashed particle oriented towards center
                this.angle = Math.atan2(cy - this.y, cx - this.x);
            }
            draw() {
                ctx.beginPath();
                ctx.moveTo(this.x, this.y);
                // Draw a short trailing line
                ctx.lineTo(this.x + Math.cos(this.angle)*this.length, this.y + Math.sin(this.angle)*this.length);
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 1.8;
                ctx.lineCap = 'round';
                ctx.stroke();
            }
        }

        function initParticles() {
            particles.length = 0;
            // Generate denser particle field just like the image
            let numParticles = (window.innerWidth * window.innerHeight) / 4000;
            for (let i = 0; i < numParticles; i++) {
                particles.push(new Particle());
            }
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }

        initParticles();
        animate();
    }
});
