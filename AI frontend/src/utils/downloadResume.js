/**
 * downloadResume.js
 * Generates a clean, resume-only HTML document inside a hidden iframe
 * and triggers the browser print dialog on just that content.
 *
 * Usage:
 *   import { downloadResumePDF } from "../utils/downloadResume";
 *   downloadResumePDF(form, accentColor);
 *
 * form fields used:
 *   name, title, email, phone, location, github, linkedin,
 *   summary, skills, experience, projects, education,
 *   certifications, achievements
 */

export function downloadResumePDF(form = {}, accent = "#7C3AED") {
  const {
    name           = "Your Name",
    title          = "",
    email          = "",
    phone          = "",
    location       = "",
    github         = "",
    linkedin       = "",
    summary        = "",
    skills         = "",
    experience     = "",
    projects       = "",
    education      = "",
    certifications = "",
    achievements   = "",
  } = form;

  /* ── helpers ── */
  const esc   = (s = "") => String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  const nl2br = (s = "") => esc(s).replace(/\n/g, "<br/>");
  const section = (heading, body) =>
    body.trim()
      ? `<div class="section">
           <h2>${esc(heading)}</h2>
           <div class="body">${body}</div>
         </div>`
      : "";

  /* Skills as chips */
  const skillChips = skills
    ? skills.split(",")
        .map(s => s.trim())
        .filter(Boolean)
        .map(s => `<span class="chip">${esc(s)}</span>`)
        .join(" ")
    : "";

  /* Contact row */
  const contacts = [email, phone, location, github, linkedin]
    .filter(Boolean)
    .map(c => `<span>${esc(c)}</span>`)
    .join(" &nbsp;·&nbsp; ");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <title>${esc(name)} — Resume</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Inter', Arial, sans-serif;
      font-size: 11pt;
      color: #1a1a1a;
      background: #fff;
      padding: 28mm 20mm;
      line-height: 1.55;
    }

    /* ── Header ── */
    .resume-header {
      border-bottom: 3px solid ${accent};
      padding-bottom: 10px;
      margin-bottom: 16px;
    }
    .resume-header h1 {
      font-size: 22pt;
      font-weight: 800;
      color: #111;
      margin-bottom: 2px;
    }
    .resume-header .job-title {
      font-size: 11pt;
      color: #555;
      margin-bottom: 6px;
    }
    .contact-row {
      font-size: 9pt;
      color: #666;
    }
    .contact-row span + span::before { content: "  ·  "; }

    /* ── Sections ── */
    .section { margin-bottom: 14px; }
    .section h2 {
      font-size: 9.5pt;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: ${accent};
      margin-bottom: 6px;
      padding-bottom: 2px;
      border-bottom: 1px solid #e5e5e5;
    }
    .body {
      font-size: 10.5pt;
      color: #222;
      white-space: pre-wrap;
      line-height: 1.6;
    }

    /* ── Skills chips ── */
    .chip {
      display: inline-block;
      background: ${accent}18;
      color: ${accent};
      border: 1px solid ${accent}35;
      border-radius: 4px;
      padding: 1px 8px;
      font-size: 9pt;
      font-weight: 600;
      margin: 2px 2px 2px 0;
    }

    /* ── Print only ── */
    @media print {
      body { padding: 12mm 14mm; }
      @page { margin: 10mm 12mm; }
    }
  </style>
</head>
<body>

  <div class="resume-header">
    <h1>${esc(name)}</h1>
    ${title ? `<div class="job-title">${esc(title)}</div>` : ""}
    ${contacts ? `<div class="contact-row">${contacts}</div>` : ""}
  </div>

  ${section("Professional Summary", nl2br(summary))}
  ${skillChips ? section("Skills", `<div>${skillChips}</div>`) : ""}
  ${section("Work Experience", nl2br(experience))}
  ${section("Projects", nl2br(projects))}
  ${section("Education", nl2br(education))}
  ${section("Certifications", nl2br(certifications))}
  ${section("Achievements", nl2br(achievements))}

</body>
</html>`;

  /* ── Inject hidden iframe, print, then remove ── */
  const iframe = document.createElement("iframe");
  iframe.style.cssText = "position:fixed;top:-9999px;left:-9999px;width:0;height:0;border:0;";
  document.body.appendChild(iframe);

  const doc = iframe.contentDocument || iframe.contentWindow.document;
  doc.open();
  doc.write(html);
  doc.close();

  /* Wait for fonts / images then print */
  iframe.contentWindow.onload = () => {
    setTimeout(() => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      setTimeout(() => document.body.removeChild(iframe), 1000);
    }, 300);
  };

  /* Fallback if onload already fired */
  setTimeout(() => {
    if (document.body.contains(iframe)) {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      setTimeout(() => {
        if (document.body.contains(iframe)) document.body.removeChild(iframe);
      }, 1500);
    }
  }, 800);
}
