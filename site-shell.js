(() => {
  const links = [
    ["index.html", "Home"],
    ["research.html", "Research & Projects"],
    ["publications.html", "Publications"],
    ["team.html", "People"],
    ["activities.html", "Academic Activities"],
    ["awards.html", "Awards"],
    ["openings.html", "Openings"],
    ["contact.html", "Contact"]
  ];
  const page = location.pathname.split("/").pop() || "index.html";
  const header = document.getElementById("siteHeader");
  const footer = document.getElementById("siteFooter");
  const nav = links.map(([href, label]) => `<a href="${href}" class="nav-link ${page === href ? "active" : ""}" ${page === href ? 'aria-current="page"' : ""}>${label}</a>`).join("");

  if (header) header.innerHTML = `
    <div class="topline"><div class="container topline-inner"><span>Indian Institute of Technology Ropar</span><a href="https://www.iitrpr.ac.in/" target="_blank" rel="noreferrer">IIT Ropar official website ↗</a></div></div>
    <header class="site-header" id="top"><div class="container nav-wrap">
      <a class="brand" href="index.html" aria-label="AMR Lab home"><span class="brand-mark" aria-hidden="true"><span></span><span></span><span></span></span><span class="brand-copy"><strong>AMR LAB</strong><small>Antenna &amp; Microwave Research Lab</small></span></a>
      <button class="menu-toggle" id="menuToggle" aria-label="Open navigation" aria-expanded="false"><span></span><span></span><span></span></button>
      <nav class="main-nav" id="mainNav" aria-label="Main navigation">${nav}</nav>
    </div></header>`;

  if (footer) footer.innerHTML = `
    <footer class="site-footer"><div class="container footer-main">
      <a class="brand brand-footer" href="index.html"><span class="brand-mark"><span></span><span></span><span></span></span><span class="brand-copy"><strong>AMR LAB</strong><small>IIT Ropar · Electrical Engineering</small></span></a>
      <div class="footer-links"><a href="research.html">Research</a><a href="publications.html">Publications</a><a href="team.html">People</a><a href="activities.html">Activities</a><a href="openings.html">Openings</a><a href="contact.html">Contact</a></div>
      <a href="#top" class="back-top">Back to top ↑</a>
    </div><div class="container footer-bottom"><span>© <span id="yearNow"></span> Antenna/Microwave Research Lab, IIT Ropar</span><span>Department of Electrical Engineering · Indian Institute of Technology Ropar</span></div></footer>`;

  const toggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  if (toggle && mainNav) {
    toggle.addEventListener("click", () => {
      const open = mainNav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
    });
    mainNav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }));
  }
  const year = document.getElementById("yearNow");
  if (year) year.textContent = new Date().getFullYear();
})();
