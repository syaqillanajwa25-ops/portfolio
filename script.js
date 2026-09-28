/* =========================================
   INITIAL THEME
   ========================================= */

(function () {

  try {

    const savedTheme =
      localStorage.getItem(
        "portfolio-theme"
      );

    const prefersDark =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

    document.documentElement.dataset.theme =
      savedTheme ||
      (
        prefersDark
          ? "dark"
          : "light"
      );

  } catch (error) {

    document.documentElement.dataset.theme =
      "light";

  }

})();



const header =
  document.getElementById(
    "header"
  );

const themeToggle =
  document.getElementById(
    "themeToggle"
  );

const menuToggle =
  document.getElementById(
    "menuToggle"
  );

const navMenu =
  document.getElementById(
    "navMenu"
  );

const navLinks =
  document.querySelectorAll(
    ".nav-link"
  );


/* =========================================
   HEADER
   ========================================= */

function updateHeader() {

  header.classList.toggle(
    "scrolled",
    window.scrollY > 25
  );

}


updateHeader();


window.addEventListener(
  "scroll",
  updateHeader,
  {
    passive: true
  }
);



/* =========================================
   THEME
   ========================================= */

function updateThemeIcon() {

  const dark =
    document.documentElement
      .dataset.theme === "dark";


  themeToggle.textContent =
    dark
      ? "☀"
      : "☾";


  themeToggle.setAttribute(
    "aria-label",
    dark
      ? "Switch to light mode"
      : "Switch to dark mode"
  );

}


updateThemeIcon();


themeToggle.addEventListener(
  "click",
  function () {

    const current =
      document.documentElement
        .dataset.theme;


    const next =
      current === "dark"
        ? "light"
        : "dark";


    document.documentElement.dataset.theme =
      next;


    try {

      localStorage.setItem(
        "portfolio-theme",
        next
      );

    } catch (error) {

      // Theme still works
      // without localStorage.

    }


    updateThemeIcon();

  }
);



/* =========================================
   MOBILE MENU
   ========================================= */

function closeMenu() {

  navMenu.classList.remove(
    "active"
  );

  menuToggle.classList.remove(
    "active"
  );

  document.body.classList.remove(
    "menu-open"
  );

  menuToggle.setAttribute(
    "aria-expanded",
    "false"
  );

}


menuToggle.addEventListener(
  "click",
  function () {

    const opened =
      navMenu.classList.toggle(
        "active"
      );


    menuToggle.classList.toggle(
      "active",
      opened
    );


    document.body.classList.toggle(
      "menu-open",
      opened
    );


    menuToggle.setAttribute(
      "aria-expanded",
      opened
        ? "true"
        : "false"
    );

  }
);


navLinks.forEach(
  function (link) {

    link.addEventListener(
      "click",
      closeMenu
    );

  }
);


document.addEventListener(
  "keydown",
  function (event) {

    if (
      event.key === "Escape"
    ) {

      closeMenu();

    }

  }
);


window.addEventListener(
  "resize",
  function () {

    if (
      window.innerWidth > 760
    ) {

      closeMenu();

    }

  }
);



/* =========================================
   REVEAL ANIMATION
   ========================================= */

const revealElements =
  document.querySelectorAll(
    ".reveal"
  );


const reduceMotion =
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;


if (
  "IntersectionObserver" in window &&
  !reduceMotion
) {

  const revealObserver =
    new IntersectionObserver(

      function (
        entries,
        observer
      ) {

        entries.forEach(
          function (entry) {

            if (
              !entry.isIntersecting
            ) {

              return;

            }


            entry.target
              .classList.add(
                "visible"
              );


            if (
              entry.target
                .classList.contains(
                  "skills-group"
                )
            ) {

              const skills =
                entry.target
                  .querySelectorAll(
                    ".skill-item"
                  );


              skills.forEach(
                function (
                  skill,
                  index
                ) {

                  setTimeout(
                    function () {

                      skill.classList.add(
                        "show"
                      );

                    },
                    index * 60
                  );

                }
              );

            }


            observer.unobserve(
              entry.target
            );

          }
        );

      },

      {
        threshold: 0.12,

        rootMargin:
          "0px 0px -40px 0px"
      }

    );


  revealElements.forEach(
    function (element) {

      revealObserver.observe(
        element
      );

    }
  );

} else {

  revealElements.forEach(
    function (element) {

      element.classList.add(
        "visible"
      );

    }
  );


  document
    .querySelectorAll(
      ".skill-item"
    )
    .forEach(
      function (skill) {

        skill.classList.add(
          "show"
        );

      }
    );

}



/* =========================================
   ACTIVE NAV
   ========================================= */

const sections =
  document.querySelectorAll(
    "main section[id], footer[id]"
  );


function updateActiveNav() {

  let activeSection =
    "";


  sections.forEach(
    function (section) {

      const top =
        section.offsetTop - 140;


      if (
        window.scrollY >= top
      ) {

        activeSection =
          section.id;

      }

    }
  );


  navLinks.forEach(
    function (link) {

      link.classList.toggle(

        "active",

        link.getAttribute(
          "href"
        ) ===
          "#" + activeSection

      );

    }
  );

}


updateActiveNav();


window.addEventListener(
  "scroll",
  updateActiveNav,
  {
    passive: true
  }
);



/* =========================================
   METRIC COUNTER
   ========================================= */

const counters =
  document.querySelectorAll(
    ".counter"
  );


if (
  counters.length > 0 &&
  "IntersectionObserver" in window &&
  !reduceMotion
) {

  const counterObserver =
    new IntersectionObserver(

      function (
        entries,
        observer
      ) {

        entries.forEach(
          function (entry) {

            if (
              !entry.isIntersecting
            ) {

              return;

            }


            const element =
              entry.target;


            const target =
              Number(
                element.dataset.value
              );


            const suffix =
              element.dataset.suffix ||
              "";


            const duration =
              850;


            const start =
              performance.now();


            function animate(now) {

              const progress =
                Math.min(
                  (
                    now -
                    start
                  ) /
                  duration,
                  1
                );


              const eased =
                1 -
                Math.pow(
                  1 - progress,
                  3
                );


              element.textContent =
                (
                  target *
                  eased
                ).toFixed(2) +
                suffix;


              if (
                progress < 1
              ) {

                requestAnimationFrame(
                  animate
                );

              }

            }


            requestAnimationFrame(
              animate
            );


            observer.unobserve(
              element
            );

          }
        );

      },

      {
        threshold: 0.6
      }

    );


  counters.forEach(
    function (counter) {

      counterObserver.observe(
        counter
      );

    }
  );

}