import FormField from "./FormField";
import { EDITOR_TABS } from "./constants";

function TabPanel({ id, labelledBy, active, children }) {
  return (
    <div
      id={id}
      role="tabpanel"
      aria-labelledby={labelledBy}
      hidden={!active}
      className={active ? "space-y-3" : undefined}
    >
      {active && children}
    </div>
  );
}

export default function ResumeEditor({ form, editorTab, setEditorTab, setField }) {
  return (
    <div className="theme-card rounded-2xl p-4 sm:p-5 flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-semibold text-base" style={{ color: "var(--text-primary)" }}>
          Edit Content
        </h2>
        <div
          role="tablist"
          aria-label="Resume sections"
          className="flex gap-1 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin"
        >
          {EDITOR_TABS.map((tab) => {
            const tabId = `editor-tab-${tab.id}`;
            const panelId = `editor-panel-${tab.id}`;
            const isActive = editorTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={tabId}
                aria-controls={panelId}
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setEditorTab(tab.id)}
                className="px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize transition-all whitespace-nowrap flex-shrink-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                style={
                  isActive
                    ? {
                        background: "rgba(124,58,237,0.18)",
                        color: "#A78BFA",
                        border: "1px solid rgba(124,58,237,0.30)",
                        outlineColor: "#A78BFA",
                      }
                    : {
                        background: "transparent",
                        color: "var(--text-faint)",
                        border: "1px solid transparent",
                        outlineColor: "#A78BFA",
                      }
                }
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <TabPanel id="editor-panel-personal" labelledBy="editor-tab-personal" active={editorTab === "personal"}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField label="Full Name" value={form.name} onChange={(v) => setField("name", v)} placeholder="Your Name" />
          <FormField label="Job Title" value={form.title} onChange={(v) => setField("title", v)} placeholder="Software Engineer" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField label="Email" value={form.email} onChange={(v) => setField("email", v)} placeholder="you@email.com" />
          <FormField label="Phone" value={form.phone} onChange={(v) => setField("phone", v)} placeholder="+91 XXXXX XXXXX" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField label="Location" value={form.location} onChange={(v) => setField("location", v)} placeholder="City, Country" />
          <FormField label="GitHub" value={form.github} onChange={(v) => setField("github", v)} placeholder="github.com/username" />
        </div>
        <FormField label="LinkedIn" value={form.linkedin} onChange={(v) => setField("linkedin", v)} placeholder="linkedin.com/in/username" />
        <FormField
          label="Professional Summary"
          type="textarea"
          value={form.summary}
          onChange={(v) => setField("summary", v)}
          placeholder="2-3 lines about your career goals and top skills..."
        />
      </TabPanel>

      <TabPanel id="editor-panel-skills" labelledBy="editor-tab-skills" active={editorTab === "skills"}>
        <FormField
          label="Technical Skills (comma separated)"
          type="textarea"
          value={form.skills}
          onChange={(v) => setField("skills", v)}
          placeholder="Python, React, SQL, Docker, AWS..."
        />
        <FormField
          label="Certifications"
          type="textarea"
          value={form.certifications}
          onChange={(v) => setField("certifications", v)}
          placeholder="AWS Cloud Practitioner, Google Analytics Cert..."
        />
      </TabPanel>

      <TabPanel id="editor-panel-experience" labelledBy="editor-tab-experience" active={editorTab === "experience"}>
        <FormField
          label="Work Experience & Internships"
          type="textarea"
          value={form.experience}
          onChange={(v) => setField("experience", v)}
          placeholder={"• Role @ Company (Month Year – Month Year)\n• Achievement bullet 1\n• Achievement bullet 2"}
        />
      </TabPanel>

      <TabPanel id="editor-panel-projects" labelledBy="editor-tab-projects" active={editorTab === "projects"}>
        <FormField
          label="Projects"
          type="textarea"
          value={form.projects}
          onChange={(v) => setField("projects", v)}
          placeholder={"• Project Name | Tech Stack\n• What it does and its measurable impact"}
        />
      </TabPanel>

      <TabPanel id="editor-panel-education" labelledBy="editor-tab-education" active={editorTab === "education"}>
        <FormField
          label="Education"
          type="textarea"
          value={form.education}
          onChange={(v) => setField("education", v)}
          placeholder="Degree — University — Year — CGPA"
        />
      </TabPanel>
    </div>
  );
}
