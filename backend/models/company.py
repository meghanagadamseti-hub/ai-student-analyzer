# models/company.py
import json
from database import db


class Company(db.Model):
    __tablename__ = "companies"

    id          = db.Column(db.Integer,     primary_key=True, autoincrement=True)
    name        = db.Column(db.String(255), nullable=False, unique=True, index=True)
    description = db.Column(db.Text,        nullable=True)
    website     = db.Column(db.String(512), nullable=True)
    logo        = db.Column(db.String(512), nullable=True)

    # ── Extra metadata stored as JSON text ───────────────────────────────
    # locations, package, difficulty, hiring_category
    locations_json       = db.Column(db.Text, nullable=True)   # JSON list
    package              = db.Column(db.String(100), nullable=True)
    difficulty           = db.Column(db.String(50),  nullable=True)
    hiring_category      = db.Column(db.String(100), nullable=True)

    # ── Relationships ────────────────────────────────────────────────────
    roles = db.relationship("CompanyRole", back_populates="company",
                            cascade="all, delete-orphan", lazy="dynamic")

    # ── Computed helpers ─────────────────────────────────────────────────
    @property
    def locations(self):
        try:
            return json.loads(self.locations_json) if self.locations_json else []
        except (ValueError, TypeError):
            return []

    @locations.setter
    def locations(self, value):
        self.locations_json = json.dumps(value) if value else "[]"

    def get_role_names(self):
        """Return sorted list of role name strings for this company."""
        return sorted(r.role_name for r in self.roles)

    def to_dict(self):
        """
        Shape matches what the frontend expects from GET /companies.
        Backward-compatible with the old get_all_companies_meta() output.
        """
        return {
            "name":             self.name,
            "description":      self.description or "",
            "logo":             self.logo or "/logos/image.png",
            "locations":        self.locations,
            "package":          self.package or "",
            "difficulty":       self.difficulty or "Medium",
            "hiring_category":  self.hiring_category or "",
            "roles":            self.get_role_names(),
            "website":          self.website or "",
        }

    def __repr__(self):
        return f"<Company id={self.id} name={self.name!r}>"


class CompanyRole(db.Model):
    __tablename__ = "company_roles"

    id               = db.Column(db.Integer,     primary_key=True, autoincrement=True)
    company_id       = db.Column(db.Integer,     db.ForeignKey("companies.id",
                                                  ondelete="CASCADE"), nullable=False, index=True)
    role_name        = db.Column(db.String(255), nullable=False)
    experience_level = db.Column(db.String(100), nullable=True)   # e.g. "Fresher / 0-3 Years"

    # ── Role-level metadata ───────────────────────────────────────────────
    package          = db.Column(db.String(100), nullable=True)
    location         = db.Column(db.String(255), nullable=True)
    difficulty       = db.Column(db.String(50),  nullable=True)
    hiring_category  = db.Column(db.String(100), nullable=True)
    role_description = db.Column(db.Text,        nullable=True)

    # preferred_skills stored as JSON list
    preferred_skills_json = db.Column(db.Text, nullable=True)

    # skill_groups stored as JSON dict
    skill_groups_json = db.Column(db.Text, nullable=True)

    __table_args__ = (
        db.UniqueConstraint("company_id", "role_name", name="uq_company_role"),
    )

    # ── Relationships ────────────────────────────────────────────────────
    company  = db.relationship("Company",       back_populates="roles")
    skills   = db.relationship("RequiredSkill", back_populates="role",
                               cascade="all, delete-orphan", lazy="dynamic")
    analyses = db.relationship("ResumeAnalysis", back_populates="role",
                               cascade="all, delete-orphan", lazy="dynamic")
    learning_plans  = db.relationship("LearningPlan",  back_populates="role",
                                      cascade="all, delete-orphan", lazy="dynamic")
    mock_interviews = db.relationship("MockInterview",  back_populates="role",
                                      cascade="all, delete-orphan", lazy="dynamic")

    # ── Computed helpers ─────────────────────────────────────────────────
    @property
    def preferred_skills(self):
        try:
            return json.loads(self.preferred_skills_json) if self.preferred_skills_json else []
        except (ValueError, TypeError):
            return []

    @preferred_skills.setter
    def preferred_skills(self, value):
        self.preferred_skills_json = json.dumps(value) if value else "[]"

    @property
    def skill_groups(self):
        try:
            return json.loads(self.skill_groups_json) if self.skill_groups_json else {}
        except (ValueError, TypeError):
            return {}

    @skill_groups.setter
    def skill_groups(self, value):
        self.skill_groups_json = json.dumps(value) if value else "{}"

    def get_required_skill_names(self):
        """Return list of required skill name strings."""
        return [s.skill_name for s in self.skills]

    def to_dict(self):
        return {
            "id":               self.id,
            "company_id":       self.company_id,
            "role_name":        self.role_name,
            "experience_level": self.experience_level or "",
            "package":          self.package or "",
            "location":         self.location or "",
            "difficulty":       self.difficulty or "Medium",
            "hiring_category":  self.hiring_category or "",
            "role_description": self.role_description or "",
            "skills":           self.get_required_skill_names(),
            "preferred_skills": self.preferred_skills,
            "skill_groups":     self.skill_groups,
        }

    def __repr__(self):
        return f"<CompanyRole id={self.id} role={self.role_name!r} company_id={self.company_id}>"


class RequiredSkill(db.Model):
    __tablename__ = "required_skills"

    id         = db.Column(db.Integer,     primary_key=True, autoincrement=True)
    role_id    = db.Column(db.Integer,     db.ForeignKey("company_roles.id",
                                            ondelete="CASCADE"), nullable=False, index=True)
    skill_name = db.Column(db.String(255), nullable=False)

    __table_args__ = (
        db.UniqueConstraint("role_id", "skill_name", name="uq_role_skill"),
    )

    # ── Relationships ────────────────────────────────────────────────────
    role = db.relationship("CompanyRole", back_populates="skills")

    def __repr__(self):
        return f"<RequiredSkill id={self.id} skill={self.skill_name!r} role_id={self.role_id}>"
