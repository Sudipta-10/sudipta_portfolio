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
        // Navbar background effect is handled purely by CSS backdrop-filter now.
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
       Apply Unique Colors to Cards
       ========================================================================== */
    const cards = document.querySelectorAll('.glass-card');
    const lightColors = [
        { bg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(246, 113, 18, 0.15))', hover: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(246, 113, 18, 0.3))' }, // Orange
        { bg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(0, 210, 255, 0.15))',  hover: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(0, 210, 255, 0.3))' },  // Light Blue
        { bg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(16, 185, 129, 0.15))', hover: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(16, 185, 129, 0.3))' }, // Emerald Green
        { bg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(139, 92, 246, 0.15))', hover: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(139, 92, 246, 0.3))' }, // Purple
        { bg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(236, 72, 153, 0.15))', hover: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(236, 72, 153, 0.3))' }, // Pink
        { bg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(250, 204, 21, 0.15))', hover: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(250, 204, 21, 0.3))' }, // Yellow
        { bg: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(6, 182, 212, 0.15))',   hover: 'linear-gradient(135deg, rgba(255, 255, 255, 0.5), rgba(6, 182, 212, 0.3))' }   // Cyan
    ];
    
    cards.forEach((card, index) => {
        // Use modulus to cycle through colors if there are more cards than colors
        const color = lightColors[index % lightColors.length];
        card.style.setProperty('--glass-bg', color.bg);
        card.style.setProperty('--glass-bg-hover', color.hover);
    });


});
