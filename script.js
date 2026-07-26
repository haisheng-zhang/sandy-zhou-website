let currentLang = 'en';

function render(lang) {
  const data = window.siteData[lang];
  
  // Nav
  const navLinks = document.querySelectorAll('.nav a');
  navLinks[0].textContent = data.nav.about;
  navLinks[1].textContent = data.nav.work;
  navLinks[2].textContent = data.nav.programmes;
  navLinks[3].textContent = data.nav.products;
  navLinks[4].textContent = data.nav.trust;
  navLinks[5].textContent = data.nav.contact;
  document.getElementById("lang-btn").textContent = lang === 'en' ? "中文" : "English";

  // Hero
  document.getElementById("hero-eyebrow").textContent = data.hero.eyebrow;
  document.getElementById("hero-title").textContent = data.hero.title;
  document.getElementById("hero-subtitle").textContent = data.hero.subtitle;
  document.getElementById("hero-zh").textContent = data.hero.zh;
  document.getElementById("hero-primary-link").textContent = data.hero.btnPrimary;
  document.getElementById("hero-primary-link").href = data.hero.primaryLink;
  document.querySelector(".btn-secondary").textContent = data.hero.btnSecondary;

  // About
  document.querySelector("#about .eyebrow").textContent = data.about.eyebrow;
  document.querySelector("#about h2").textContent = data.about.title;
  const aboutCopy = document.getElementById("about-copy");
  aboutCopy.innerHTML = "";
  data.about.content.forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    aboutCopy.appendChild(p);
  });

  // Work
  document.querySelector("#what-i-do .eyebrow").textContent = data.work.eyebrow;
  document.querySelector("#what-i-do .section-title").textContent = data.work.title;
  document.querySelector("#what-i-do .section-intro").textContent = data.work.intro;
  const workGrid = document.getElementById("work-grid");
  workGrid.innerHTML = "";
  data.work.items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "work-card";
    card.innerHTML = `<h3 class="work-title">${item.title}</h3><p class="work-desc">${item.desc}</p>`;
    workGrid.appendChild(card);
  });

  // Philosophy
  document.querySelector(".philosophy .eyebrow").textContent = data.philosophy.eyebrow;
  document.querySelector(".philosophy h2").textContent = data.philosophy.title;
  document.querySelector(".philosophy p:last-child").textContent = data.philosophy.desc;

  // Programmes
  document.querySelector("#programmes .eyebrow").textContent = data.programmes.eyebrow;
  document.querySelector("#programmes .section-title").textContent = data.programmes.title;
  document.querySelector("#programmes .section-intro").textContent = data.programmes.intro;
  const programmeList = document.getElementById("programme-list");
  programmeList.innerHTML = "";
  data.programmes.items.forEach((item) => {
    const block = document.createElement("article");
    block.className = "programme-item";
    block.innerHTML = `
      <div class="programme-head">
        <div><h3 class="programme-title">${item.title}</h3></div>
        <div class="programme-type">${item.type}</div>
      </div>
      <p class="programme-desc">${item.desc}</p>
      <a class="programme-link" href="${item.link}" target="_blank" rel="noopener">${item.linkLabel} →</a>
    `;
    programmeList.appendChild(block);
  });

  // Products
  document.querySelector("#products .eyebrow").textContent = data.products.eyebrow;
  document.querySelector("#products .section-title").textContent = data.products.title;
  document.querySelector("#products .section-intro").textContent = data.products.intro;
  const productGrid = document.getElementById("product-grid");
  productGrid.innerHTML = "";
  data.products.items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <h3 class="product-title">${item.title}</h3>
      <p class="product-desc">${item.desc}</p>
      ${item.link ? `<a class="product-link" href="${item.link}" target="_blank" rel="noopener">Explore →</a>` : ''}
    `;
    productGrid.appendChild(card);
  });

  // Links
  document.querySelector(".link-list").previousElementSibling.textContent = data.links.title;
  const linkList = document.getElementById("link-list");
  linkList.innerHTML = "";
  data.links.items.forEach((item) => {
    const link = document.createElement("a");
    link.className = "link-item";
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noopener";
    link.innerHTML = `
      <div>
        <div class="link-label">${item.label}</div>
        <div class="link-note">${item.note}</div>
      </div>
      <div aria-hidden="true">→</div>
    `;
    linkList.appendChild(link);
  });

  // Testimonials
  document.querySelector("#testimonials .section-title").textContent = data.testimonials.title;
  const testimonialGrid = document.getElementById("testimonial-grid");
  testimonialGrid.innerHTML = "";
  data.testimonials.items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "testimonial-card";
    card.innerHTML = `
      <p>“${item.text}”</p>
      <div class="testimonial-name">${item.name}</div>
    `;
    testimonialGrid.appendChild(card);
  });

  // Contact
  document.querySelector("#contact .eyebrow").textContent = data.contact.eyebrow;
  document.querySelector("#contact h2").textContent = data.contact.title;
  document.querySelector(".contact-copy").textContent = data.contact.copy;
  const contactItems = document.getElementById("contact-items");
  contactItems.innerHTML = "";
  data.contact.items.forEach((item) => {
    const block = document.createElement("div");
    block.className = "contact-item";
    block.innerHTML = `
      <div class="contact-label">${item.label}</div>
      <div class="contact-value"><a href="${item.href}" target="_blank" rel="noopener">${item.value}</a></div>
    `;
    contactItems.appendChild(block);
  });

  // Footer
  document.querySelector(".footer-brand").textContent = "Sandy Zhou";
  document.querySelector(".footer-tagline").textContent = data.footer.tagline;
  document.getElementById("year").textContent = new Date().getFullYear();
}

// Initialize
render(currentLang);

// Lang Toggle
document.getElementById("lang-btn").addEventListener("click", () => {
  currentLang = currentLang === 'en' ? 'zh' : 'en';
  render(currentLang);
});

// Mobile Menu
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
  menuToggle.classList.toggle('active');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    menuToggle.classList.remove('active');
  });
});
