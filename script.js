/* =========================
   INITIAL THEME
   ========================= */

(function setInitialTheme() {

  try {

    const savedTheme =
      localStorage.getItem(
        "portfolio-theme"
      );

    const prefersDark =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;


    document.documentElement
      .dataset.theme =
        savedTheme ||
        (
          prefersDark
            ? "dark"
            : "light"
        );

  } catch (error) {

    document.documentElement
      .dataset.theme =
        "light";

  }

})();



document.addEventListener(
  "DOMContentLoaded",
  function () {

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


    /* =========================
       HEADER ON SCROLL
       ========================= */

    function updateHeader() {

      if (window.scrollY > 25) {

        header.classList.add(
          "scrolled"
        );

      } else {

        header.classList.remove(
          "scrolled"
        );

      }

    }


    updateHeader();


    window.addEventListener(
      "scroll",
      updateHeader,
      {
        passive: true
      }
    );



    /* =========================
       LIGHT / DARK MODE
       ========================= */

    function updateThemeButton() {

      const isDark =
        document.documentElement
          .dataset.theme === "dark";


      themeToggle.textContent =
        isDark
          ? "☀"
          : "☾";


      themeToggle.setAttribute(
        "aria-label",
        isDark
          ? "Switch to light theme"
          : "Switch to dark theme"
      );

    }


    updateThemeButton();


    themeToggle.addEventListener(
      "click",
      function () {

        const currentTheme =
          document.documentElement
            .dataset.theme;


        const nextTheme =
          currentTheme === "dark"
            ? "light"
            : "dark";


        document.documentElement
          .dataset.theme =
            nextTheme;


        try {

          localStorage.setItem(
            "portfolio-theme",
            nextTheme
          );

        } catch (error) {

          // Theme still works
          // if storage is unavailable.

        }


        updateThemeButton();

      }
    );



    /* =========================
       MOBILE MENU
       ========================= */

    function closeMenu() {

      navMenu.classList.remove(
        "active"
      );

      menuToggle.classList.remove(
        "active"
      );

      menuToggle.setAttribute(
        "aria-expanded",
        "false"
      );

      document.body.classList.remove(
        "menu-open"
      );

    }


    menuToggle.addEventListener(
      "click",
      function () {

        const open =
          navMenu.classList.toggle(
            "active"
          );


        menuToggle.classList.toggle(
          "active",
          open
        );


        menuToggle.setAttribute(
          "aria-expanded",
          open
            ? "true"
            : "false"
        );


        document.body.classList.toggle(
          "menu-open",
          open
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



    /* =========================
       SCROLL REVEAL
       ========================= */

    const animatedElements =
      document.querySelectorAll(
        ".hidden-anim"
      );


    const reducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;


    if (
      "IntersectionObserver" in window &&
      !reducedMotion
    ) {

      const observer =
        new IntersectionObserver(

          function (
            entries,
            currentObserver
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
                    "show-anim"
                  );


                /* Skill chips appear
                   one by one */

                if (
                  entry.target
                    .classList.contains(
                      "skills-content"
                    )
                ) {

                  const skillItems =
                    entry.target
                      .querySelectorAll(
                        ".skill-item"
                      );


                  skillItems.forEach(
                    function (
                      item,
                      index
                    ) {

                      setTimeout(
                        function () {

                          item.classList.add(
                            "show"
                          );

                        },
                        index * 55
                      );

                    }
                  );

                }


                currentObserver
                  .unobserve(
                    entry.target
                  );

              }
            );

          },

          {
            threshold: 0.12,

            rootMargin:
              "0px 0px -35px 0px"
          }

        );


      animatedElements.forEach(
        function (element) {

          observer.observe(
            element
          );

        }
      );

    } else {

      animatedElements.forEach(
        function (element) {

          element.classList.add(
            "show-anim"
          );

        }
      );


      document
        .querySelectorAll(
          ".skill-item"
        )
        .forEach(
          function (item) {

            item.classList.add(
              "show"
            );

          }
        );

    }



    /* =========================
       ACTIVE NAV LINK
       ========================= */

    const pageSections =
      document.querySelectorAll(
        "main section[id], footer[id]"
      );


    function updateActiveLink() {

      let currentSection =
        "home";


      pageSections.forEach(
        function (section) {

          const sectionTop =
            section.offsetTop - 130;


          if (
            window.scrollY >=
            sectionTop
          ) {

            currentSection =
              section.id;

          }

        }
      );


      navLinks.forEach(
        function (link) {

          const linkTarget =
            link.getAttribute(
              "href"
            );


          link.classList.toggle(

            "active",

            linkTarget ===
              "#" + currentSection

          );

        }
      );

    }


    updateActiveLink();


    window.addEventListener(
      "scroll",
      updateActiveLink,
      {
        passive: true
      }
    );

  }
);