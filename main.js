const switcher = document.querySelector(".slider"),
  body = document.body,
  img = document.querySelectorAll(".dark1"),
  gmail = document.querySelector(".mail"),
  imgs = document.querySelectorAll(".light1"),
  sections = document.querySelectorAll("section"),
  navLinks = document.querySelectorAll(".nav-link"),
  switcherText = document.querySelector(".switcher-text"),
  input = document.querySelector('.input')

switcher.addEventListener("click", () => {
  body.classList.toggle("dark");

  gmail.classList.toggle("active");

  img.forEach((darkimg) => {
    darkimg.classList.toggle("active");
  });

  imgs.forEach((lightimg) => {
    lightimg.classList.toggle("light");
  });

  if(input.checked){
    switcherText.textContent='Light Theme'
  }else{
    switcherText.textContent='Dark Theme';
  }
});

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
    threshold: 0.9,
  }
);

sections.forEach((section) => {
  observer.observe(section);
});
