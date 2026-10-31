(() => {
  const data = window.AMR_DATA || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const esc = (value = "") => String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
  const initials = name => String(name).split(/\s+/).filter(Boolean).slice(0, 2).map(s => s[0]).join("").toUpperCase();

  // Research cards (full research page and homepage preview)
  const researchMarkup = items => items.map(item => `
    <article class="research-card"><span class="card-number">${esc(item.number)} / 07</span><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p><div class="tag-row">${(item.tags || []).map(tag => `<span class="tag">${esc(tag)}</span>`).join("")}</div></article>
  `).join("");
  if ($("#researchGrid")) $("#researchGrid").innerHTML = researchMarkup(data.research || []);
  if ($("#homeResearchGrid")) $("#homeResearchGrid").innerHTML = researchMarkup((data.research || []).slice(0, 4));

  // Projects
  function projectMarkup(projects) {
    return projects.map(p => `
      <article class="project-card"><div><span class="project-kind">${esc(p.kind === "consultancy" ? "Industrial consultancy" : "Sponsored research")}</span><h3>${esc(p.title)}</h3><p>${esc(p.sponsor)}</p></div><div class="project-period"><div>${esc(p.period)}</div><div style="margin-top:9px"><span class="status-pill ${p.status === "ongoing" ? "status-open" : "status-complete"}">${p.status === "ongoing" ? "Ongoing" : "Completed"}</span></div></div></article>
    `).join("");
  }
  let projectFilter = "all";
  function renderProjects() {
    const projects = (data.projects || []).filter(p => projectFilter === "all" || (projectFilter === "consultancy" ? p.kind === "consultancy" : p.status === projectFilter && p.kind !== "consultancy"));
    if ($("#projectCount")) $("#projectCount").textContent = `${projects.length} records`;
    if ($("#projectGrid")) $("#projectGrid").innerHTML = projectMarkup(projects) || `<div class="empty-state">No projects match this filter.</div>`;
  }
  $$('[data-project-filter]').forEach(btn => btn.addEventListener("click", () => {
    projectFilter = btn.dataset.projectFilter;
    $$('[data-project-filter]').forEach(b => b.classList.toggle("active", b === btn));
    renderProjects();
  }));
  renderProjects();
  if ($("#homeProjectGrid")) $("#homeProjectGrid").innerHTML = projectMarkup((data.projects || []).filter(p => p.status === "ongoing").slice(0, 3));

  // News cards
  if ($("#newsGrid")) $("#newsGrid").innerHTML = (data.news || []).map(item => `
    <article class="news-card"><span class="news-type">Research highlight · ${esc(item.venue)}</span><h3>${esc(item.title)}</h3><p>${esc(item.note)}</p></article>
  `).join("");

  // Publication search, filters, and count summary
  let pubType = "journals";
  function pubSource() {
    if (pubType === "journals") return (data.journals || []).map(p => ({...p, type:"Journal"}));
    if (pubType === "conferences") return (data.conferences || []).map(p => ({...p, type:"Conference"}));
    if (pubType === "granted") return (data.patentsGranted || []).map(p => ({...p, citation:p.detail, type:"Patent granted"}));
    return (data.patentsFiled || []).map(p => ({...p, citation:p.detail, type:"Patent filed"}));
  }
  function renderPublications() {
    if (!$("#publicationList")) return;
    const q = $("#publicationSearch") ? $("#publicationSearch").value.trim().toLowerCase() : "";
    const records = pubSource().filter(p => `${p.title} ${p.citation || ""} ${p.year || ""} ${p.doi || ""}`.toLowerCase().includes(q));
    $("#publicationList").innerHTML = records.length ? records.map(p => `
      <article class="publication-card"><div class="publication-card-top"><span class="publication-year">${esc(p.year || "")}</span><span class="publication-type">${esc(p.type)}</span></div><h3>${esc(p.title)}</h3><p>${esc(p.citation || "")}</p>${p.doi ? `<a href="https://doi.org/${encodeURIComponent(p.doi)}" target="_blank" rel="noreferrer">DOI: ${esc(p.doi)} ↗</a>` : ""}</article>
    `).join("") : `<div class="empty-state">No records found. Try a different search term.</div>`;
  }
  $$('[data-pub-filter]').forEach(btn => btn.addEventListener("click", () => {
    pubType = btn.dataset.pubFilter;
    $$('[data-pub-filter]').forEach(b => b.classList.toggle("active", b === btn));
    renderPublications();
  }));
  if ($("#publicationSearch")) $("#publicationSearch").addEventListener("input", renderPublications);
  if ($("#journalCount")) $("#journalCount").textContent = (data.journals || []).length;
  if ($("#conferenceCount")) $("#conferenceCount").textContent = (data.conferences || []).length;
  if ($("#patentCount")) $("#patentCount").textContent = (data.patentsGranted || []).length + (data.patentsFiled || []).length;
  renderPublications();
  if ($("#homePublicationGrid")) {
    const featured = (data.journals || []).slice(0, 3);
    $("#homePublicationGrid").innerHTML = featured.map(p => `<article class="home-publication"><span>${esc(p.year)}</span><h3>${esc(p.title)}</h3><p>${esc(p.citation)}</p></article>`).join("");
  }

  // People directory
  let peopleFilter = "current";
  function renderPeople() {
    if (!$("#peopleGrid")) return;
    const records = peopleFilter === "current" ? (data.currentPeople || [])
      : peopleFilter === "alumni" ? (data.alumni || [])
      : (data.studentProjects || []).map(line => {
          const parts = String(line).split(" — ");
          const name = parts.shift() || "Student project";
          const detail = parts.join(" — ");
          const role = /^(DEP Project|Intern|UG Project|UG Capstone|Former lab scholar)/.test(name) ? name.split(" — ")[0] : "Student / project";
          return {name, role, detail, group:"Student archive"};
        });
    const query = $("#peopleSearch") ? $("#peopleSearch").value.trim().toLowerCase() : "";
    const filtered = records.filter(p => `${p.name} ${p.role || ""} ${p.detail || ""} ${p.group || ""}`.toLowerCase().includes(query));
    $("#peopleGrid").innerHTML = filtered.map(p => `
      <article class="person-card"><div class="person-initials">${esc(initials(p.name))}</div><h3>${esc(p.name)}</h3><div class="person-role">${esc(p.role || "Former member")}</div><p class="person-detail">${esc(p.detail || "")}</p>${p.group ? `<span class="person-group">${esc(p.group)}</span>` : ""}</article>
    `).join("");
    if ($("#peopleCount")) $("#peopleCount").textContent = `${filtered.length} of ${records.length} entries`;
  }
  if ($("#peopleSearch")) $("#peopleSearch").addEventListener("input", renderPeople);
  $$('[data-people-filter]').forEach(btn => btn.addEventListener("click", () => {
    peopleFilter = btn.dataset.peopleFilter;
    $$('[data-people-filter]').forEach(b => b.classList.toggle("active", b === btn));
    renderPeople();
  }));
  renderPeople();

  // Academic activity timeline
  let activityIndex = 0;
  function renderActivities() {
    if (!$("#activityNav") || !$("#activityContent")) return;
    $("#activityNav").innerHTML = (data.activities || []).map((a, i) => `<button class="${i === activityIndex ? "active" : ""}" data-activity="${i}">${esc(a.year)} · ${esc(a.title)}</button>`).join("");
    const a = data.activities[activityIndex];
    $("#activityContent").innerHTML = `<h3>${esc(a.title)} <span style="color:#4e91b3">/ ${esc(a.year)}</span></h3><ul>${a.items.map(item => `<li>${esc(item)}</li>`).join("")}</ul>`;
    $$('[data-activity]').forEach(btn => btn.addEventListener("click", () => { activityIndex = Number(btn.dataset.activity); renderActivities(); }));
  }
  renderActivities();

  // Awards currently documented in the source bibliography; do not infer other awards.
  if ($("#awardsGrid")) {
    const awardItems = (data.conferences || []).filter(p => /Best Paper Award/i.test(p.citation || ""));
    $("#awardsGrid").innerHTML = awardItems.length ? awardItems.map(p => `<article class="award-card"><span class="award-year">${esc(p.year)}</span><h3>${esc(p.title)}</h3><p>${esc(p.citation)}</p></article>`).join("") : `<div class="empty-state">No verified award entries are available yet.</div>`;
  }
})();
