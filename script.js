function scrollToExplore(){
  document.getElementById("explore").scrollIntoView({behavior:"smooth"});
}


// ---------- Custom Cursor ----------
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

// ---------- Cursor Hover Effects on Links & Cards ----------
const hoverTargets = document.querySelectorAll('a, .pg-highlight-card, .explore-card');
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '50px';
    cursor.style.height = '50px';
    cursor.style.borderColor = '#06b6d4';
    cursor.style.transform = 'translate(-50%, -50%) scale(1.3)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '24px';
    cursor.style.height = '24px';
    cursor.style.borderColor = '#4f46e5';
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
  });
});

// ---------- 1. Hero Section Text Animation ----------
const heroText = document.querySelector('.hero h1');
let heroIndex = 0;
if(heroText){
  const heroWords = ["Find Your Perfect PG","Comfortable & Affordable","Live Smart, Live Happy"];
  setInterval(() => {
    heroText.innerText = heroWords[heroIndex];
    heroIndex = (heroIndex + 1) % heroWords.length;
  }, 3000);
}

// ---------- 2. Smooth Scroll for Nav Links ----------
const navLinks = document.querySelectorAll('a[href^="#"]');
navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({behavior:'smooth'});
  });
});

// ---------- 3. PG Card Hover Glow ----------
const pgCards = document.querySelectorAll('.pg-highlight-card');
pgCards.forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.boxShadow = '0 28px 70px rgba(79,70,229,0.4)';
  });
  card.addEventListener('mouseleave', () => {
    card.style.boxShadow = '0 18px 48px rgba(0,0,0,0.08)';
  });
});

// ---------- 4. Reveal on Scroll ----------
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('active');
    }
  });
}, {threshold:0.1});
revealElements.forEach(el => observer.observe(el));

// ---------- 5. Floating Explore Buttons ----------
const exploreBtns = document.querySelectorAll('.explore-card');
exploreBtns.forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btn.style.transform = `rotateX(${-(y/rect.height - 0.5)*10}deg) rotateY(${(x/rect.width - 0.5)*10}deg)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'rotateX(0deg) rotateY(0deg)';
  });
});

// ---------- 6. Scroll Progress Bar ----------
const progressBar = document.createElement('div');
progressBar.classList.add('scroll-progress');
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  progressBar.style.width = scrollPercent + '%';
});

// ---------- 7. Back to Top Button ----------
const topBtn = document.createElement('button');
topBtn.innerText = '↑';
topBtn.classList.add('back-to-top');
document.body.appendChild(topBtn);

topBtn.addEventListener('click', () => {
  window.scrollTo({top:0, behavior:'smooth'});
});

window.addEventListener('scroll', () => {
  if(window.scrollY > 400){
    topBtn.style.opacity = 1;
  } else {
    topBtn.style.opacity = 0;
  }
});

// ---------- 8. Random Card Animation for Fun ----------
setInterval(() => {
  const randomCard = pgCards[Math.floor(Math.random()*pgCards.length)];
  randomCard.style.transform += ' translateY(-5px)';
  setTimeout(()=> randomCard.style.transform = randomCard.style.transform.replace(' translateY(-5px)',''), 500);
}, 4000);




// ---------- Active Navbar Link ----------
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.navbar a');
  const currentPage = window.location.pathname.split("/").pop(); // e.g., "about.html" or "index.html"

  navLinks.forEach(link => {
    link.classList.remove('active'); // remove existing

    const linkHref = link.getAttribute('href').split("/").pop(); // e.g., "about.html" or "index.html#hero"

    // Case 1: Exact page match (about.html, listings.html, contact.html)
    if (linkHref === currentPage) {
      link.classList.add('active');
    }

    // Case 2: Anchors in index.html (#hero, #explore)
    else if (currentPage === "" || currentPage === "index.html") {
      if (linkHref.includes("#hero") && window.location.hash === "" || window.location.hash === "#hero") {
        link.classList.add('active');
      } else if (linkHref.includes("#explore") && window.location.hash === "#explore") {
        link.classList.add('active');
      }
    }
  });
});



// ---------- Active Navbar Link Based on Page ----------
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.navbar a');
  const currentPage = window.location.pathname.split("/").pop(); // current page filename

  navLinks.forEach(link => {
    // remove existing active
    link.classList.remove('active');

    // check if link href matches current page
    const linkPage = link.getAttribute('href');
    if(linkPage === currentPage || (linkPage.includes("#") && currentPage === "index.html")) {
      link.classList.add('active');
    }
  });
});
