# models/learning.py
import json
from datetime import datetime, timezone
from database import db


class LearningPlan(db.Model):
    __tablename__ = "learning_plans"

    id         = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id    = db.Column(db.Integer, db.ForeignKey("users.id",
                            ondelete="SET NULL"), nullable=True, index=True)
    company_id = db.Column(db.Integer, db.ForeignKey("companies.id",
                            ondelete="SET NULL"), nullable=True, index=True)
    role_id    = db.Column(db.Integer, db.ForeignKey("company_roles.id",
                            ondelete="SET NULL"), nullable=True, index=True)

    # Full learning plan payload stored as JSON
    roadmap_json  = db.Column(db.Text, nullable=True)   # list of week objects
    progress      = db.Column(db.Integer, default=0)    # 0-100 overall progress %
    created_at    = db.Column(
        db.DateTime,
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )

    # Snapshot strings for quick display
    company_name = db.Column(db.String(255), nullable=True)
    role_name    = db.Column(db.String(255), nullable=True)

    # ── Relationships ────────────────────────────────────────────────────
    user    = db.relationship("User",        back_populates="learning_plans")
    company = db.relationship("Company")
    role    = db.relationship("CompanyRole", back_populates="learning_plans")

    @property
    def roadmap(self):
        try:
            return json.loads(self.roadmap_json) if self.roadmap_json else []
        except (ValueError, TypeError):
            return []

    @roadmap.setter
    def roadmap(self, value):
        self.roadmap_json = json.dumps(value) if value is not None else "[]"

    def to_dict(self):
        return {
            "id":           self.id,
            "user_id":      self.user_id,
            "company":      self.company_name or "",
            "role":         self.role_name or "",
            "roadmap":      self.roadmap,
            "progress":     self.progress,
            "created_at":   self.created_at.isoformat() if self.created_at else None,
        }

    def __repr__(self):
        return f"<LearningPlan id={self.id} user_id={self.user_id}>"
