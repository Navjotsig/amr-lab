# AMR Lab website migration audit

**Source reviewed:** https://sites.google.com/iitrpr.ac.in/ashwani-sharma/  
**Review date:** 30 October 2026

This file records the public sections found during the first-pass audit. It is intended to prevent accidental deletion of a page category during redesign.

## Existing navigation and migration coverage

| Existing section | What is publicly listed | Replacement location |
|---|---|---|
| Home | Lab identity, Dr. Ashwani Sharma, Associate Professor, Department of Electrical Engineering, IIT Ropar; two video embeds; news/recent paper announcements | Home page hero, research/publication highlights, consolidated news area, and two explicit video-transfer placeholders |
| Research and Projects | 7 research areas; 7 ongoing sponsored projects; 5 completed sponsored projects; 2 completed industrial consultancy projects | `research.html` |
| Publications | Journals, conferences, granted patents, filed patents; the existing page numbers journal entries through 71 and conference entries through 43 | `publications.html`; imported bibliographic data is in `data.js` and must be cross-checked against the live source |
| Team Members | Team leader, postdoctoral fellows, current doctoral students, co-supervised scholars, part-time PhD scholars, master's students, project staff; former PhD graduates, former postdocs, master's students, undergraduate projects, DEP projects, internships, and other lab scholars | `team.html` with Current Members, Alumni & Former Members, and Student & Project Archive tabs |
| Awards and Achievements | Navigation item exists, but the page returned no readable award entries during this audit | `awards.html` displays only award mentions explicitly in the bibliography and keeps a clear verified-awards placeholder |
| Academic Activities | Workshops organised; invited talks; other outreach; institute-level and department-level activities across multiple years | `activities.html` timeline; initial migration includes main visible 2026–2019 entries and summaries |
| Openings | Project/internship CV enquiries; PhD/MS-R positions and selection note; current project staff/JRF status shown as not available | `openings.html` |
| Contact Us | AMR Lab, Room 304, Electrical Engineering Department, J. C. Bose Block, IIT Ropar Main Campus, Rupnagar, Punjab 140001; ashwani.sharma@iitrpr.ac.in; map embed | `contact.html` |

## Content that should be copied/verified before the old site is retired

1. **Publication-by-publication parity:** The current Google Site contains a long bibliography (journal list runs to item 71; conference list to item 43), plus patents granted and filed. The replacement data now contains 71 journal records, 43 conference records, 6 granted patents, and 5 filed patents—the same visible counts as the current page. The three missing journal entries and seven missing conference entries identified during the audit have been added. This is count-level parity, not yet a PI-certified line-by-line export: verify every author, title, venue, year, page range, DOI, patent number, and legal status against the live page and the PI's approved CV/ORCID/IEEE records before launch.
2. **Team roster and biographies:** The replacement contains 32 current roster entries, 8 former PhD/postdoctoral members, and a 93-entry student archive spanning master's projects, undergraduate projects, DEP projects, internships, and a former lab scholar. The archive preserves titles and names from the source, including entries whose source page does not provide a project title. Reconcile each current member's exact designation, joining date, funding source, supervisor/co-supervisor, full biography, and portrait with the source page before launch.
3. **Original media:** The home page exposes two embedded videos (`AMRlab1.mp4` and `IMC AMR LAB.mp4`) and several image assets. Download the lab-owned originals from the Google Site/Drive and add them to the new site's `assets/` folder. Do not substitute unrelated stock or research images for genuine lab photographs.
4. **Awards:** The Awards & Achievements page is present in navigation but its content did not appear in the public text extraction. Conference papers on the Publications page do mention Best Paper Awards. Ask the lab for its approved award list or keep the separate Awards section clearly marked as awaiting verified entries.
5. **Academic activities:** The current page contains long year-wise entries. The replacement preserves the main visible workshops, invited talks, outreach, and institute/department role categories, but the full chronology and each individual entry should be checked line-by-line before launch.
6. **Project status:** Confirm whether projects with end dates in 2026 are still active or complete as of the publication date. Status labels in this draft follow the source page's Ongoing/Completed grouping.
7. **News and announcements:** Current home page repeats many paper-accepted notices. Replace the repeated feed with a clean, dated News & Updates area and retain each announcement only once after confirming its publication date.

## Research categories found

- Antenna Engineering and Communication Systems
- Wireless power and data transfer
- RF Energy Harvesting
- Near-field forming and its applications
- Antenna design for IoT and 5G
- Static and Dynamic charging solutions for Electric Vehicles
- Wireless communication and networks

## Operational note

The old Google Site should remain online during content verification. Deployment of this draft does not give the new site control over the Google Site. Only its owner/authorised editor can change the old site's publishing or deletion settings.


## Multi-page implementation

The replacement uses separate HTML pages—`index.html`, `research.html`, `publications.html`, `team.html`, `activities.html`, `awards.html`, `openings.html`, and `contact.html`—with a shared navigation/footer shell. Inner pages provide a breadcrumb and Back to Home link. The static architecture is suitable for GitHub Pages and can later be moved to an institute-hosted subdomain.
