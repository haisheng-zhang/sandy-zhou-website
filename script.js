let currentLang = "en";
let activeProgrammeKey = "";
let dynamicServiceGroups = null;

function setSection(id, block) {
  const section = document.getElementById(id);
  section.querySelector(".section-eyebrow").textContent = block.eyebrow;
  section.querySelector(".section-title").textContent = block.title;
  const intro = section.querySelector(".section-intro");
  if (intro) intro.textContent = block.intro;
}

function render(lang) {
  const d = window.siteData[lang];
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.querySelectorAll(".nav a").forEach((link, i) => { link.textContent = d.nav[i]; });
  document.getElementById("lang-btn").textContent = lang === "en" ? "中文" : "English";

  ["eyebrow", "title", "subtitle", "zh"].forEach(k => { document.getElementById(`hero-${k}`).textContent = d.hero[k]; });
  document.getElementById("hero-primary-link").textContent = d.hero.primary;
  document.getElementById("hero-secondary-link").textContent = d.hero.secondary;

  setSection("about", d.about);
  document.getElementById("about-copy").innerHTML = d.about.content.map(p => `<p>${p}</p>`).join("");
  ["workEyebrow", "workTitle", "workCopy", "approachEyebrow", "approachTitle", "approachCopy"].forEach(k => {
    document.getElementById(k.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)).textContent = d.principles[k];
  });

  setSection("portfolio", d.portfolio);
  document.getElementById("portfolio-grid").innerHTML = d.portfolio.items.map(item => `<article class="portfolio-card"><div class="portfolio-count">${item.count}</div><h3>${item.title}</h3><p class="portfolio-topics">${item.desc}</p><p>${item.details}</p></article>`).join("");
  document.getElementById("method-strip").innerHTML = `<span>${d.portfolio.methodLabel}</span><p>${d.portfolio.method}</p>`;

  setSection("programmes", d.programmes);
  document.getElementById("direction-grid").innerHTML = d.programmes.directions.map(item => item.key === "bespoke"
    ? `<article class="direction-card"><p class="card-tag">${item.tag}</p><h3>${item.title}</h3><p>${item.desc}</p><a href="#contact">${item.link} →</a></article>`
    : `<article class="direction-card"><p class="card-tag">${item.tag}</p><h3>${item.title}</h3><p>${item.desc}</p><button class="direction-link" type="button" data-programme="${item.key}" aria-expanded="false">${item.link} →</button></article>`
  ).join("");
  document.querySelectorAll("[data-programme]").forEach(button => button.addEventListener("click", () => toggleProgramme(button.dataset.programme)));
  activeProgrammeKey = "";
  document.getElementById("programme-detail").innerHTML = "";
  document.getElementById("scenarios-eyebrow").textContent = d.programmes.scenariosEyebrow;
  document.getElementById("scenarios-title").textContent = d.programmes.scenariosTitle;
  document.getElementById("scenarios-intro").textContent = d.programmes.scenariosIntro;
  document.getElementById("scenario-grid").innerHTML = d.programmes.scenarios.map((item, i) => `<a class="scenario-card" href="#contact"><span>${String(i + 1).padStart(2, "0")}</span>${item}</a>`).join("");

  setSection("activities", d.activities);
  document.getElementById("activity-grid").innerHTML = d.activities.items.map(item => `<article class="activity-card"><img src="${item.image}" alt="" /><div><p class="card-tag">${item.type}</p><h3>${item.title}</h3><p>${item.desc}</p></div></article>`).join("");
  document.getElementById("feedback-eyebrow").textContent = d.activities.feedbackEyebrow;
  document.getElementById("feedback-title").textContent = d.activities.feedbackTitle;
  document.getElementById("testimonial-grid").innerHTML = d.activities.feedback.map(item => `<article class="testimonial-card"><p>“${item.text}”</p><strong>${item.name}</strong></article>`).join("");

  setSection("products", d.products);
  document.getElementById("product-grid").innerHTML = d.products.items.map((item, i) => `<article class="product-card"><div class="product-number">0${i + 1}</div><h3>${item.title}</h3><p>${item.desc}</p><a href="${item.link}" target="_blank" rel="noopener">${item.label} →</a></article>`).join("");

  setSection("contact", d.contact);
  document.querySelector(".contact-copy").textContent = d.contact.copy;
  document.getElementById("form-link").textContent = d.contact.formLabel;
  document.getElementById("form-note").textContent = d.contact.formNote;
  const formUrl = (window.contentConfig || {}).formUrl;
  document.getElementById("form-link").href = formUrl || "#";
  document.getElementById("form-link").style.display = formUrl ? "inline-flex" : "none";
  document.getElementById("form-note").style.display = d.contact.formNote ? "block" : "none";
  document.getElementById("contact-items").innerHTML = d.contact.items.map(item => `<div class="contact-item"><div class="contact-label">${item.label}</div><div class="contact-value"><a href="${item.href}" target="_blank" rel="noopener">${item.value}</a></div></div>`).join("");
  document.querySelector(".footer-tagline").textContent = d.footer;
  document.getElementById("year").textContent = new Date().getFullYear();
}

function toggleProgramme(key) {
  activeProgrammeKey = activeProgrammeKey === key ? "" : key;
  document.querySelectorAll("[data-programme]").forEach(button => button.setAttribute("aria-expanded", String(button.dataset.programme === activeProgrammeKey)));
  renderProgrammeDetail(activeProgrammeKey);
}

function renderProgrammeDetail(key) {
  const detail = document.getElementById("programme-detail");
  if (!key) { detail.innerHTML = ""; detail.classList.remove("is-open"); return; }
  const group = (dynamicServiceGroups && dynamicServiceGroups[key]) || window.siteData[currentLang].programmes.detailGroups[key];
  if (!group) return;
  detail.innerHTML = `<div class="programme-detail-heading"><h3>${group.title}</h3><p>${group.intro}</p></div><div class="programme-card-grid">${group.items.map(item => `<article class="programme-item"><div class="programme-type">${item.type}</div><h3>${item.title}</h3><p class="programme-desc">${item.desc}</p><a class="programme-link" href="${item.link}" ${item.link.startsWith("#") ? "" : 'target="_blank" rel="noopener"'}>${item.linkLabel} →</a></article>`).join("")}</div>`;
  detail.classList.add("is-open");
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[c]);
}

function parseCsv(text) {
  const rows = []; let row = []; let cell = ""; let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') quoted = false;
      else cell += c;
    } else if (c === '"') quoted = true;
    else if (c === ",") { row.push(cell); cell = ""; }
    else if (c === "\n") { row.push(cell.replace(/\r$/, "")); rows.push(row); row = []; cell = ""; }
    else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  const headers = rows.shift() || [];
  return rows.filter(r => r.some(Boolean)).map(r => Object.fromEntries(headers.map((h, i) => [h.trim(), r[i] || ""])));
}

async function fetchSheet(url) {
  if (!url) return [];
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(`Content sheet returned ${response.status}`);
  return parseCsv(await response.text());
}

async function loadDynamicContent() {
  const config = window.contentConfig || {};
  try {
    const services = await fetchSheet(config.servicesCsvUrl);
    const visibleServices = services.filter(x => (x.active || "").toLowerCase() === "yes").sort((a,b) => Number(a.sort_order)-Number(b.sort_order));
    if (visibleServices.length) {
      dynamicServiceGroups = {};
      for (const key of ["regular", "team-building"]) {
        const fallback = window.siteData[currentLang].programmes.detailGroups[key];
        dynamicServiceGroups[key] = { title:fallback.title, intro:fallback.intro, items:visibleServices.filter(x => x.category === key).map(x => ({
          title: escapeHtml(currentLang === "zh" ? x.title_zh : (x.title_en || x.title_zh)),
          type: escapeHtml([x.duration, x.price_sgd ? `S$${x.price_sgd}${key === "team-building" ? "/人" : ""}` : x.price_note_zh].filter(Boolean).join(" · ")),
          desc: escapeHtml(currentLang === "zh" ? x.intro_zh : (x.intro_en || x.intro_zh)),
          linkLabel: currentLang === "zh" ? "咨询详情" : "Enquire",
          link: escapeHtml(x.booking_url || "#contact")
        })) };
      }
      if (activeProgrammeKey) renderProgrammeDetail(activeProgrammeKey);
    }
  } catch (error) { console.warn("Services sheet unavailable; fixed content is shown.", error); }

  try {
    const activities = await fetchSheet(config.activitiesCsvUrl);
    const visibleActivities = activities.filter(x => (x.visible || "").toLowerCase() === "yes" && x.type !== "feedback").sort((a,b) => new Date(b.publish_date)-new Date(a.publish_date));
    if (visibleActivities.length) document.getElementById("activity-grid").innerHTML = visibleActivities.map(x => `<article class="activity-card">${x.cover_image ? `<img src="${escapeHtml(x.cover_image)}" alt="" />` : ""}<div><p class="card-tag">${escapeHtml(x.type)}</p><h3>${escapeHtml(currentLang === "zh" ? x.title_zh : (x.title_en || x.title_zh))}</h3><p>${escapeHtml(currentLang === "zh" ? x.summary_zh : (x.summary_en || x.summary_zh))}</p>${x.external_url || x.xiaohongshu_url || x.tiktok_url ? `<a class="programme-link" href="${escapeHtml(x.external_url || x.xiaohongshu_url || x.tiktok_url)}" target="_blank" rel="noopener">${currentLang === "zh" ? "查看详情" : "View update"} →</a>` : ""}</div></article>`).join("");
    const feedback = activities.filter(x => (x.visible || "").toLowerCase() === "yes" && x.type === "feedback");
    if (feedback.length) document.getElementById("testimonial-grid").innerHTML = feedback.map(x => `<article class="testimonial-card"><p>“${escapeHtml(currentLang === "zh" ? x.feedback_text_zh : (x.feedback_text_en || x.feedback_text_zh))}”</p><strong>${escapeHtml(x.feedback_name)}</strong></article>`).join("");
  } catch (error) { console.warn("Activities sheet unavailable; fixed content is shown.", error); }
}

render(currentLang); loadDynamicContent();
document.getElementById("lang-btn").addEventListener("click", () => { currentLang = currentLang === "en" ? "zh" : "en"; render(currentLang); loadDynamicContent(); });
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuToggle.addEventListener("click", () => { const open = nav.classList.toggle("active"); menuToggle.classList.toggle("active", open); menuToggle.setAttribute("aria-expanded", String(open)); });
document.querySelectorAll(".nav a").forEach(link => link.addEventListener("click", () => { nav.classList.remove("active"); menuToggle.classList.remove("active"); menuToggle.setAttribute("aria-expanded", "false"); }));
