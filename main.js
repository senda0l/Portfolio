const switcher = document.querySelector(".slider"),
  body = document.body,
  img = document.querySelectorAll(".dark1"),
  gmail = document.querySelector(".mail"),
  imgs = document.querySelectorAll(".light1"),
  sections = document.querySelectorAll("section"),
  navLinks = document.querySelectorAll(".nav-link"),
  switcherText = document.querySelector(".switcher-text"),
  input = document.querySelector(".input"),
  light = document.querySelector(".cursor-light");

switcher.addEventListener("click", () => {
  body.classList.toggle("dark");

  gmail.classList.toggle("active");

  img.forEach((darkimg) => {
    darkimg.classList.toggle("active");
  });

  imgs.forEach((lightimg) => {
    lightimg.classList.toggle("light");
  });

  if (input.checked) {
  switcherText.textContent = translations["switcher-light"];
} else {
  switcherText.textContent = translations["switcher-dark"];
}
const theme=body.classList.contains('dark')?"dark":"light";
localStorage.setItem("theme",theme);
});

const savedTheme = localStorage.getItem("theme") || "dark";

if (savedTheme === "dark") {
  body.classList.add("dark");
  input.checked = false;

  gmail.classList.add("active");

  img.forEach((darkimg) => {
    darkimg.classList.add("active");
  });

  imgs.forEach((lightimg) => {
    lightimg.classList.add("light");
  });

} 



const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute("id");
      const link = document.querySelector(`.nav-link[href="#${id}"]`);
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove("active"));
        if (link) link.classList.add("active");
      }
    });
  },
  {
    threshold: 0.3,
  }
);

sections.forEach((section) => {
  observer.observe(section);
});


document.addEventListener('mousemove', (e) => {
  if (document.body.classList.contains('dark')) {
    const x = e.clientX;
    const y = e.clientY;

    light.style.transform = `translate3d(${x -230}px, ${y -230}px, 0)`;
  }
});


let translations = {};

async function LoadLanguage(lang) {
  try {

    const res = await fetch(`./locales/${lang}.json`);
    if (!res.ok) throw new Error(`Failed to load ${lang} translations`);
    
    translations = await res.json();  
    applyTranslations();
    localStorage.setItem("lang", lang);
  } catch (err) {
    console.error(err);
  }
}

function applyTranslations() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (translations[key]) {
      el.innerHTML = translations[key];
    }
  });
}

document.getElementById("lang-switcher").addEventListener('change', (e) => {
  LoadLanguage(e.target.value);
});

const savedLang = localStorage.getItem("lang") || "en";

document.getElementById("lang-switcher").value = savedLang;

LoadLanguage(savedLang);
