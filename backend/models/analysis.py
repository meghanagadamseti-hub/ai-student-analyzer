# models/analysis.py
import json
from datetime import datetime, timezone
from database import db


class ResumeAnalysis(db.Model):
    __tablename__ = "resume_analyses"

    id          = db.Column(db.Integer, primary_key=True, autoincrement=True)
    resume_id   = db.Column(db.Integer, db.ForeignKey("resumes.id",
                             ondelete="CASCADE"), nullable=False, index=True)
    company_id  = db.Column(db.Integer, db.ForeignKey("companies.id",
                             ondelete="SET NULL"), nullable=True, index=True)
    role_id     = db.Column(db.Integer, db.ForeignKey("company_roles.id",
                             ondelete="SET NULL"), nullable=True, index=True)

    # ── Score fields ────────────────────────────────────────────────────
    ats_score        = db.Column(db.Integer, nullable=True)
    skill_match_pct  = db.Column(db.Integer, nullable=True)
    placement_level  = db.Column(db.String(100), nullable=True)

    # ── JSON blobs for lists / dicts ────────────────────────────────────
    matched_skills_json          = db.Column(db.Text, nullable=True)
    missing_skills_json          = db.Column(db.Text, nullable=True)
    improvement_suggestions_json = db.Column(db.Text, nullable=True)
    ats_breakdown_json           = db.Column(db.Text, nullable=True)

    # ── Snapshot strings (denormalised for history display) ─────────────
    company_name = db.Column(db.String(255), nullable=True)
    role_name    = db.Column(db.String(255), nullable=True)
    experience   = db.Column(db.String(100), nullable=True)

    analyzed_at  = db.Column(
        db.DateTime,
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )

    # ── Relationships ────────────────────────────────────────────────────
    resume  = db.relationship("Resume",      back_populates="analyses")
    company = db.relationship("Company")
    role    = db.relationship("CompanyRole", back_populates="analyses")

    # ── JSON property helpers ─────────────────────────────────────────────
    def _get_json(self, col):
        try:
            return json.loads(col) if col else []
        except (ValueError, TypeError):
            return []

    def _set_json(self, value):
        return json.dumps(value) if value is not None else "[]"

    @property
    def matched_skills(self):
        return self._get_json(self.matched_skills_json)

    @matched_skills.setter
    def matched_skills(self, v):
        self.matched_skills_json = self._set_json(v)

    @property
    def missing_skills(self):
        return self._get_json(self.missing_skills_json)

    @missing_skills.setter
    def missing_skills(self, v):
        self.missing_skills_json = self._set_json(v)

    @property
    def improvement_suggestions(self):
        return self._get_json(self.improvement_suggestions_json)

    @improvement_suggestions.setter
    def improvement_suggestions(self, v):
        self.improvement_suggestions_json = self._set_json(v)

    @property
    def ats_breakdown(self):
        try:
            return json.loads(self.ats_breakdown_json) if self.ats_breakdown_json else {}
        except (ValueError, TypeError):
            return {}

    @ats_breakdown.setter
    def ats_breakdown(self, v):
        self.ats_breakdown_json = json.dumps(v) if v else "{}"

    def to_dict(self):
        return {
            "id":                      self.id,
            "resume_id":               self.resume_id,
            "company":                 self.company_name or "",
            "role":                    self.role_name or "",
            "experience":              self.experience or "",
            "ats_score":               self.ats_score,
            "skill_match_pct":         self.skill_match_pct,
            "placement_level":         self.placement_level or "",
            "matched_skills":          self.matched_skills,
            "missing_skills":          self.missing_skills,
            "improvement_suggestions": self.improvement_suggestions,
            "ats_breakdown":           self.ats_breakdown,
            "analyzed_at":             self.analyzed_at.isoformat() if self.analyzed_at else None,
        }

    def __repr__(self):
        return (
            f"<ResumeAnalysis id={self.id} "
            f"resume_id={self.resume_id} ats={self.ats_score}>"
        )
