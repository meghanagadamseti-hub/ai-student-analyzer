# models/__init__.py
# Import all models so Flask-Migrate can discover them in one shot.
from .user      import User
from .company   import Company, CompanyRole, RequiredSkill
from .resume    import Resume
from .analysis  import ResumeAnalysis
from .learning  import LearningPlan
from .interview import MockInterview, InterviewQuestion
from .chat      import CareerCoachChat

__all__ = [
    "User",
    "Company", "CompanyRole", "RequiredSkill",
    "Resume",
    "ResumeAnalysis",
    "LearningPlan",
    "MockInterview", "InterviewQuestion",
    "CareerCoachChat",
]
