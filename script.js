// Custom Cursor
const cursorGlow = document.querySelector('.cursor-glow');
const cursorDot = document.querySelector('.cursor-dot');
document.addEventListener('mousemove', e => {
  if (cursorGlow) {
    cursorGlow.style.left = e.clientX - 14 + 'px';
    cursorGlow.style.top = e.clientY - 14 + 'px';
  }
  if (cursorDot) {
    cursorDot.style.left = e.clientX - 3 + 'px';
    cursorDot.style.top = e.clientY - 3 + 'px';
  }
});

// Loading Screen
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.loader')?.classList.add('hidden');
  }, 2200);
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 80);
});

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = menuToggle.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = 'none';
    spans[1].style.opacity = '1';
    spans[2].style.transform = 'none';
  }
});

// Close mobile menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('open');
    const spans = menuToggle?.querySelectorAll('span');
    if (spans) {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });
});

// Scroll Reveal
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('active');
      }, index * 120);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealElements.forEach(el => revealObserver.observe(el));

// Button Ripple Effect
document.querySelectorAll('.cta-btn, .submit-btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = e.clientX - rect.left - size / 2 + 'px';
    ripple.style.top = e.clientY - rect.top - size / 2 + 'px';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

// Testimonial Slider
const track = document.querySelector('.testimonial-track');
const dots = document.querySelectorAll('.testimonial-dots .dot');
let currentSlide = 0;
const totalSlides = dots.length;

function goToSlide(index) {
  currentSlide = index;
  if (track) track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => goToSlide(i));
});

setInterval(() => {
  if (totalSlides > 0) {
    goToSlide((currentSlide + 1) % totalSlides);
  }
}, 4500);

// Hero Particles Generation
const particlesContainer = document.querySelector('.hero-particles');
if (particlesContainer) {
  for (let i = 0; i < 40; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 6 + 's';
    particle.style.animationDuration = (4 + Math.random() * 4) + 's';
    particle.style.width = particle.style.height = (2 + Math.random() * 4) + 'px';
    particlesContainer.appendChild(particle);
  }
}

// Parallax on scroll for hero
window.addEventListener('scroll', () => {
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    const scrolled = window.scrollY;
    heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    heroContent.style.opacity = 1 - scrolled / 700;
  }
});
