// ── Theme toggle ───────────────────────────────────────────────
var themeToggle = document.getElementById('themeToggle');
var htmlEl = document.documentElement;

function syncThemeIcon() {
  var isDark = htmlEl.getAttribute('data-theme') === 'dark';
  themeToggle.innerHTML = isDark ? '&#9789;' : '&#9788;';
}
syncThemeIcon();

themeToggle.addEventListener('click', function() {
  var isDark = htmlEl.getAttribute('data-theme') === 'dark';
  if (isDark) {
    htmlEl.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
  } else {
    htmlEl.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
  syncThemeIcon();
});

// ── Typed role ─────────────────────────────────────────────────
var roles = ['Software Engineer.', 'Backend Developer.', 'AI Engineer.'];
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
if (typed) typeRole();

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
  if (window.innerWidth > 860) {
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

// ── Scroll spy (active nav link) ─────────────────────────────────
var navSections = document.querySelectorAll('section[id]');
var navLinkMap = {};
document.querySelectorAll('.nav-links a').forEach(function(a) {
  navLinkMap[a.getAttribute('href').slice(1)] = a;
});

var spyObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(e) {
    var link = navLinkMap[e.target.id];
    if (!link) return;
    if (e.isIntersecting) {
      Object.keys(navLinkMap).forEach(function(id) { navLinkMap[id].classList.remove('active'); });
      link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

navSections.forEach(function(sec) { spyObserver.observe(sec); });

// ── Project filter ─────────────────────────────────────────────
var pfBtns     = document.querySelectorAll('.pf-btn');
var projEntries = document.querySelectorAll('.proj-entry');

function applyFilter(filter) {
  var delay = 0;
  projEntries.forEach(function(entry) {
    var cats = (entry.getAttribute('data-category') || '').split(' ');
    var show = filter === 'all' || cats.indexOf(filter) !== -1;
    if (show) {
      entry.style.display = 'block';
      entry.getBoundingClientRect();
      entry.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
      entry.style.opacity = '0';
      entry.style.transform = 'translateY(14px)';
      (function(el, d) {
        setTimeout(function() {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, d);
      })(entry, delay);
      delay += 45;
    } else {
      entry.style.transition = 'opacity 0.2s ease';
      entry.style.opacity = '0';
      setTimeout(function() { entry.style.display = 'none'; }, 200);
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
      window.scrollTo({ top: target.offsetTop - 76, behavior: 'smooth' });
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  applyFilter('all');
});
