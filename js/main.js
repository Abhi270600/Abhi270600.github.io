// ── Custom cursor ──────────────────────────────────────────────
var cur = document.getElementById('cur');
var ring = document.getElementById('cur-ring');
var mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', function(e) {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx + 'px';
  cur.style.top  = my + 'px';
});

(function animRing() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top  = ry + 'px';
  requestAnimationFrame(animRing);
})();

document.querySelectorAll('a, button, .proj-card, .tl-content, .edu-card, .ach-card, .contact-row, .skill-tag').forEach(function(el) {
  el.addEventListener('mouseenter', function() { cur.classList.add('hover'); ring.classList.add('hover'); });
  el.addEventListener('mouseleave', function() { cur.classList.remove('hover'); ring.classList.remove('hover'); });
});

// ── Typed role ─────────────────────────────────────────────────
var roles = ['Software Engineer', 'Backend Developer', 'ML Engineer', 'CS @ NYU'];
var ri = 0, ci = 0, deleting = false;
var typed = document.getElementById('typed-role');

function typeRole() {
  var word = roles[ri];
  if (!deleting) {
    typed.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(typeRole, 1800); return; }
  } else {
    typed.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(typeRole, deleting ? 55 : 85);
}
typeRole();

// ── Navbar ─────────────────────────────────────────────────────
var navbar    = document.getElementById('navbar');
var hamburger = document.getElementById('hamburger');
var navLinks  = document.getElementById('navLinks');

window.addEventListener('scroll', function() {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

hamburger.addEventListener('click', function() {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(function(a) {
  a.addEventListener('click', function() {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

document.addEventListener('click', function(e) {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains('active')) {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  }
});

var resizeTimer;
window.addEventListener('resize', function() {
  document.body.classList.add('resize-animation-stopper');
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() { document.body.classList.remove('resize-animation-stopper'); }, 400);
  if (window.innerWidth > 768) {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  }
});

// ── Scroll reveal ──────────────────────────────────────────────
var revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.07 });

document.querySelectorAll('.reveal').forEach(function(el) { revealObserver.observe(el); });

// ── Project filter ─────────────────────────────────────────────
var pfBtns    = document.querySelectorAll('.pf-btn');
var projCards = document.querySelectorAll('.proj-card');

function applyFilter(filter) {
  var delay = 0;
  projCards.forEach(function(card) {
    var cats = (card.getAttribute('data-category') || '').split(' ');
    var show = filter === 'all' || cats.indexOf(filter) !== -1;
    if (show) {
      card.style.display = 'flex';
      card.getBoundingClientRect();
      card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      card.style.opacity = '0';
      card.style.transform = 'translateY(14px)';
      (function(c, d) {
        setTimeout(function() {
          c.style.opacity = '1';
          c.style.transform = 'translateY(0)';
        }, d);
      })(card, delay);
      delay += 55;
    } else {
      card.style.transition = 'opacity 0.25s ease';
      card.style.opacity = '0';
      setTimeout(function() { card.style.display = 'none'; }, 260);
    }
  });
}

pfBtns.forEach(function(btn) {
  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    pfBtns.forEach(function(b) { b.classList.remove('active'); });
    btn.classList.add('active');
    applyFilter(btn.getAttribute('data-filter'));
  });
});

// ── Smooth scroll ──────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(function(a) {
  a.addEventListener('click', function(e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  applyFilter('all');
});