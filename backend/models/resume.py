# models/resume.py
from datetime import datetime, timezone
from database import db


class Resume(db.Model):
    __tablename__ = "resumes"

    id             = db.Column(db.Integer,     primary_key=True, autoincrement=True)
    # user_id is nullable: anonymous uploads are still tracked
    user_id        = db.Column(db.Integer,     db.ForeignKey("users.id",
                                                ondelete="SET NULL"), nullable=True, index=True)
    filename       = db.Column(db.String(512), nullable=False)
    extracted_text = db.Column(db.Text,        nullable=True)
    uploaded_at    = db.Column(
        db.DateTime,
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )

    # ── Relationships ────────────────────────────────────────────────────
    user     = db.relationship("User",           back_populates="resumes")
    analyses = db.relationship("ResumeAnalysis", back_populates="resume",
                               cascade="all, delete-orphan", lazy="dynamic")

    def to_dict(self):
        return {
            "id":          self.id,
            "user_id":     self.user_id,
            "filename":    self.filename,
            "uploaded_at": self.uploaded_at.isoformat() if self.uploaded_at else None,
        }

    def __repr__(self):
        return f"<Resume id={self.id} filename={self.filename!r}>"
