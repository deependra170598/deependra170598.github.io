document.documentElement.classList.add("js");

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-nav");

if (menuButton && navigation) {
  menuButton.hidden = false;

  const closeMenu = () => {
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("is-open");
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuButton.focus();
    }
  });

  window.matchMedia("(max-width: 760px)").addEventListener("change", closeMenu);
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

const printButton = document.querySelector("[data-print]");
if (printButton) {
  printButton.hidden = false;
  printButton.addEventListener("click", () => window.print());
}

const phdDropdown = document.querySelector("[data-phd-dropdown]");
if (phdDropdown instanceof HTMLDetailsElement) {
  const summary = phdDropdown.querySelector("summary");
  let isHovering = false;
  let pointerType = "";

  phdDropdown.addEventListener("pointerenter", (event) => {
    if (event.pointerType !== "touch") {
      isHovering = true;
      phdDropdown.open = true;
    }
  });

  phdDropdown.addEventListener("pointerleave", () => {
    isHovering = false;
    if (!phdDropdown.contains(document.activeElement)) phdDropdown.open = false;
  });

  phdDropdown.addEventListener("focusout", () => {
    requestAnimationFrame(() => {
      if (!isHovering && !phdDropdown.contains(document.activeElement)) phdDropdown.open = false;
    });
  });

  summary.addEventListener("pointerdown", (event) => {
    pointerType = event.pointerType;
  });

  summary.addEventListener("click", (event) => {
    if (event.detail > 0 && pointerType !== "touch") event.preventDefault();
  });
}
