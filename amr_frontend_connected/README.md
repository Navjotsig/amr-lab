# AMR Lab — IIT Ropar website

A responsive, multi-page static website for the Antenna/Microwave Research Lab (AMR Lab), Department of Electrical Engineering, IIT Ropar.

## Run locally

No package manager or build step is required.

1. Extract `amr_lab_website.zip`.
2. Open a terminal inside the extracted `amr_lab_website` folder.
3. Start a local server:
   - Python: `python -m http.server 8000`
   - or VS Code: use the Live Server extension and choose **Open with Live Server**.
4. Open `http://localhost:8000` in a browser.

Do not open the HTML as a code file in the VS Code editor pane. Open it in a browser or use a local server.

## Pages included

- `index.html` — home, laboratory introduction, research highlights, publication highlights, and news.
- `research.html` — research themes, funded projects, and consultancy projects.
- `publications.html` — searchable journal papers, conference papers, granted patents, and filed patents.
- `team.html` — current members, alumni/former members, student projects, DEP projects, interns, and faculty profile.
- `activities.html` — workshops, invited talks, outreach, and academic/institutional activities.
- `awards.html` — award entries explicitly mentioned in the source bibliography and a placeholder for the lab-approved complete awards list.
- `openings.html` — PhD/MS(R), project, internship, and project-staff/JRF information.
- `contact.html` — lab contact details and campus map.

Every inner page has a breadcrumb and a **Back to Home** link. The shared navigation and footer are rendered by `site-shell.js`.

## Project files

- `styles.css` — responsive visual design and page layouts.
- `data.js` — editable structured content (research themes, projects, news, publications, patents, people, student archive, and activities).
- `site-shell.js` — shared navigation, active-page indicator, mobile menu, and footer.
- `app.js` — page-specific rendering, publication search/filtering, project filters, people tabs, activity navigation, and awards.
- `MIGRATION_AUDIT.md` — source-site inventory, counts, and pre-launch verification checklist.
- `assets/README.txt` — instructions for adding original lab portraits, photographs, and videos.

## Recommended deployment

**Recommended first deployment: GitHub Pages.** This site is static, requires no server or database, and can be hosted from a public repository with HTTPS.

1. Create a new GitHub repository, for example `amr-lab-website`.
2. Upload the *contents* of this folder to the repository root (not the ZIP file). Keep all HTML pages, CSS, JavaScript, and the `assets` folder in their current relative paths.
3. Open **Settings → Pages** in the repository.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then save.
6. Open the generated GitHub Pages URL. Test every navigation link and page on desktop and mobile.
7. After lab approval, request an institutional subdomain (for example, an approved `*.iitrpr.ac.in` address) from IIT Ropar's IT/web team if desired.

## Editing content

Most factual content is in `data.js`. Keep the object names and properties unchanged unless the corresponding render logic in `app.js` is updated as well. Publication records use `year`, `title`, `citation`, and optional `doi`. Team records use `name`, `role`, `group`, and `detail`.

## Important migration safety

Keep the existing Google Site published until the new website is content-approved and tested at its final public URL. Do not delete the old site as part of the first deployment. Only the Google Site owner or an authorised editor can unpublish/delete it or change its sharing settings. After approval, the owner can retire the old site and configure any redirect or replacement notice permitted by Google Sites and the institute's domain setup.
