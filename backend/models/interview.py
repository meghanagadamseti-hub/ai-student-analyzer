# models/interview.py
import json
from datetime import datetime, timezone
from database import db


class MockInterview(db.Model):
    __tablename__ = "mock_interviews"

    id           = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id      = db.Column(db.Integer, db.ForeignKey("users.id",
                              ondelete="SET NULL"), nullable=True, index=True)
    company_id   = db.Column(db.Integer, db.ForeignKey("companies.id",
                              ondelete="SET NULL"), nullable=True, index=True)
    role_id      = db.Column(db.Integer, db.ForeignKey("company_roles.id",
                              ondelete="SET NULL"), nullable=True, index=True)

    score        = db.Column(db.Float,        nullable=True)
    feedback_json= db.Column(db.Text,         nullable=True)  # JSON list of strings
    experience   = db.Column(db.String(100),  nullable=True)
    completed_at = db.Column(
        db.DateTime,
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )

    # Snapshot strings
    company_name = db.Column(db.String(255), nullable=True)
    role_name    = db.Column(db.String(255), nullable=True)

    # ── Relationships ────────────────────────────────────────────────────
    user      = db.relationship("User",        back_populates="mock_interviews")
    company   = db.relationship("Company")
    role      = db.relationship("CompanyRole", back_populates="mock_interviews")
    questions = db.relationship("InterviewQuestion", back_populates="interview",
                                cascade="all, delete-orphan", lazy="dynamic")

    @property
    def feedback(self):
        try:
            return json.loads(self.feedback_json) if self.feedback_json else []
        except (ValueError, TypeError):
            return []

    @feedback.setter
    def feedback(self, value):
        self.feedback_json = json.dumps(value) if value is not None else "[]"

    def to_dict(self):
        return {
            "id":           self.id,
            "user_id":      self.user_id,
            "company":      self.company_name or "",
            "role":         self.role_name or "",
            "experience":   self.experience or "",
            "score":        self.score,
            "feedback":     self.feedback,
            "completed_at": self.completed_at.isoformat() if self.completed_at else None,
        }

    def __repr__(self):
        return f"<MockInterview id={self.id} user_id={self.user_id} score={self.score}>"


class InterviewQuestion(db.Model):
    __tablename__ = "interview_questions"

    id           = db.Column(db.Integer,  primary_key=True, autoincrement=True)
    interview_id = db.Column(db.Integer,  db.ForeignKey("mock_interviews.id",
                              ondelete="CASCADE"), nullable=False, index=True)
    question     = db.Column(db.Text,     nullable=False)
    answer       = db.Column(db.Text,     nullable=True)
    ai_feedback  = db.Column(db.Text,     nullable=True)
    score        = db.Column(db.Float,    nullable=True)
    question_type= db.Column(db.String(50), nullable=True)   # Technical / Coding / Behavioral / HR

    # ── Relationships ────────────────────────────────────────────────────
    interview = db.relationship("MockInterview", back_populates="questions")

    def to_dict(self):
        return {
            "id":            self.id,
            "interview_id":  self.interview_id,
            "type":          self.question_type or "",
            "question":      self.question,
            "answer":        self.answer or "",
            "ai_feedback":   self.ai_feedback or "",
            "score":         self.score,
        }

    def __repr__(self):
        return f"<InterviewQuestion id={self.id} interview_id={self.interview_id}>"
