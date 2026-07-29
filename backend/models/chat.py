# models/chat.py
from datetime import datetime, timezone
from database import db


class CareerCoachChat(db.Model):
    __tablename__ = "career_coach_chats"

    id           = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id      = db.Column(db.Integer, db.ForeignKey("users.id",
                              ondelete="SET NULL"), nullable=True, index=True)
    user_message = db.Column(db.Text,    nullable=False)
    ai_response  = db.Column(db.Text,    nullable=True)
    created_at   = db.Column(
        db.DateTime,
        nullable=False,
        default=lambda: datetime.now(timezone.utc),
    )

    # ── Relationships ────────────────────────────────────────────────────
    user = db.relationship("User", back_populates="coach_chats")

    def to_dict(self):
        return {
            "id":           self.id,
            "user_id":      self.user_id,
            "user_message": self.user_message,
            "ai_response":  self.ai_response or "",
            "created_at":   self.created_at.isoformat() if self.created_at else None,
        }

    def __repr__(self):
        return f"<CareerCoachChat id={self.id} user_id={self.user_id}>"
