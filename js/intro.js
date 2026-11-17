(function () {
  var b = document.body, w = document.getElementById("logoWrap");
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var tJump, tCurtain, tDone;

  function setTransform(x, y, s) {
    w.style.setProperty("--dx", x);
    w.style.setProperty("--dy", y);
    w.style.setProperty("--s", s);
  }

  function centerLogo() {
    setTransform("0px", "0px", "1");
    var r = w.getBoundingClientRect();
    if (!r.width) return;
    var dx = (innerWidth / 2) - (r.left + r.width / 2);
    var dy = (innerHeight / 2) - (r.top + r.height / 2);
    var targetSize = Math.min(112, innerWidth * 0.32);
    var scale = targetSize / r.width;
    setTransform(dx + "px", dy + "px", String(scale));
  }

  function finishIntroImmediately() {
    clearTimeout(tJump);
    clearTimeout(tCurtain);
    clearTimeout(tDone);
    b.classList.remove("nt");
    setTransform("0px", "0px", "1");
    b.classList.add("jumped", "curtain-up", "done");
    document.documentElement.classList.remove("intro-lock");
    window.scrollTo(0, 0);
  }

  try { history.scrollRestoration = "manual"; } catch (e) {}
  window.scrollTo(0, 0);

  if (reduceMotion) {
    b.classList.add("done");
  } else {
    b.classList.add("intro", "nt");
    document.documentElement.classList.add("intro-lock");
    centerLogo();

    addEventListener("resize", function () {
      if (!b.classList.contains("jumped")) centerLogo();
    });

    tJump = setTimeout(function () {
      b.classList.remove("nt");
      void w.offsetWidth;
      b.classList.add("jumped");
      setTransform("0px", "0px", "1");
    }, 320);

    tCurtain = setTimeout(function () {
      b.classList.add("curtain-up");
    }, 680);

    tDone = setTimeout(function () {
      b.classList.add("done");
      document.documentElement.classList.remove("intro-lock");
      window.scrollTo(0, 0);
    }, 1150);
  }

  var scrollHint = document.getElementById("scrollHint");
  if (scrollHint) {
    scrollHint.addEventListener("click", function () {
      finishIntroImmediately();
      var target = document.getElementById("ubicacionesSection");
      if (!target) return;
      var header = document.getElementById("topHeader");
      var offset = (header ? header.offsetHeight : 56) + 12;
      var destY = Math.max(0, target.getBoundingClientRect().top + window.scrollY - offset);
      window.scrollTo({
        top: destY,
        behavior: reduceMotion ? "auto" : "smooth"
      });
    });

    window.addEventListener("scroll", function () {
      scrollHint.classList.toggle("is-scrolled", window.scrollY > 36);
    }, { passive: true });
  }

  setTimeout(function () {
    if (!window.__appOK) {
      document.getElementById("statusText").textContent = "Sin conexión · revisa tu red";
    }
  }, 6000);

  var topBrand = document.getElementById("topBrand");
  var topHeader = document.getElementById("topHeader");
  var mainLogo = document.getElementById("logoWrap");
  function updateStickyBrand() {
    if (!topBrand || !topHeader || !mainLogo) return;
    var logoTop = mainLogo.getBoundingClientRect().top;
    var logoCoveredByHeader = window.scrollY > 0 && logoTop < topHeader.offsetHeight;
    topBrand.classList.toggle("show", logoCoveredByHeader);
  }
  window.addEventListener("scroll", updateStickyBrand, { passive: true });
  window.addEventListener("resize", updateStickyBrand);
  updateStickyBrand();
})();
