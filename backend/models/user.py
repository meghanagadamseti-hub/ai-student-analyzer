# models/user.py
from datetime import datetime, timezone
from database import db


class User(db.Model):
    __tablename__ = "users"

    id           = db.Column(db.Integer,     primary_key=True, autoincrement=True)
    firebase_uid = db.Column(db.String(128), unique=True, nullable=True, index=True)
    name         = db.Column(db.String(255), nullable=True)
    email        = db.Column(db.String(255), unique=True, nullable=True, index=True)
    photo_url    = db.Column(db.Text,        nullable=True)
    created_at   = db.Column(
        db.DateTime,
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )

    # ── Relationships ────────────────────────────────────────────────────
    resumes        = db.relationship("Resume",          back_populates="user",
                                     cascade="all, delete-orphan", lazy="dynamic")
    learning_plans = db.relationship("LearningPlan",    back_populates="user",
                                     cascade="all, delete-orphan", lazy="dynamic")
    mock_interviews= db.relationship("MockInterview",   back_populates="user",
                                     cascade="all, delete-orphan", lazy="dynamic")
    coach_chats    = db.relationship("CareerCoachChat", back_populates="user",
                                     cascade="all, delete-orphan", lazy="dynamic")

    def to_dict(self):
        return {
            "id":           self.id,
            "firebase_uid": self.firebase_uid,
            "name":         self.name,
            "email":        self.email,
            "photo_url":    self.photo_url,
            "created_at":   self.created_at.isoformat() if self.created_at else None,
        }

    def __repr__(self):
        return f"<User id={self.id} email={self.email!r}>"
