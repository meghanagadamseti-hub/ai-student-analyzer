/**
 * Rule-based AI content generator (LLM-ready).
 * Preserves existing offline behaviour — no backend calls.
 */
export function generateAIContent(featureId, formData, company) {
  const skills = formData.skills || "Python, React, SQL";

  switch (featureId) {
    case "summary":
      return `Results-driven software engineer with expertise in ${skills}. Passionate about building scalable, user-centric applications that deliver measurable business impact. Seeking to leverage technical skills and problem-solving abilities at ${company || "a leading technology company"}.`;
    case "projects":
      return `• Developed a full-stack web application using React and Flask serving 1,000+ daily active users, improving response time by 40%.\n• Designed and deployed a REST API with JWT authentication handling 10,000+ requests/day with 99.9% uptime.\n• Built an automated data pipeline using Python and SQL, reducing manual processing time by 65%.`;
    case "experience":
      return `• Engineered ${skills.split(",")[0]?.trim() || "React"} features adopted by 500+ enterprise clients, increasing user retention by 28%.\n• Collaborated across cross-functional teams to deliver 15+ sprint features on schedule with zero critical bugs.\n• Reduced deployment time by 50% by implementing CI/CD pipeline using GitHub Actions and Docker.`;
    case "skills":
      return `${skills}, Git, Linux, REST APIs, Docker, AWS, System Design, DSA, Agile, JIRA`;
    case "achievements":
      return `• Ranked in top 5% of 10,000+ participants in national coding competition.\n• Delivered 3 production features in first month — recognised by engineering manager.\n• Reduced bug count by 60% after introducing automated testing framework.\n• Mentored 2 junior developers improving team velocity by 25%.`;
    case "certs":
      return `• AWS Certified Cloud Practitioner\n• Google Data Analytics Professional Certificate\n• Meta Front-End Developer Certificate`;
    case "ats":
      return `Add these ATS keywords for ${company || "top companies"}: System Design, Microservices, CI/CD, REST API, Docker, Kubernetes, Agile, Git. Use action verbs: Engineered, Architected, Optimised, Deployed, Reduced, Improved.`;
    case "company":
      return `For ${company || "this company"}: Emphasise ${company === "Amazon" ? "Leadership Principles, AWS, and measurable ownership" : company === "Google" ? "algorithms, DSA, scalable systems, and open-source contributions" : company === "Microsoft" ? "Azure, teamwork, enterprise experience, and growth mindset" : "relevant technical skills and quantifiable project achievements"}. Add specific metrics to every bullet point.`;
    case "grammar":
      return `Grammar looks good. Consider: Use active voice ("Developed" not "Was responsible for"), start each bullet with a strong verb, keep sentences under 20 words, quantify every impact.`;
    case "bullets":
      return `Weak: "Worked on backend." → Strong: "Engineered high-throughput REST APIs using Flask processing 50,000+ daily requests with sub-100ms latency."\n\nWeak: "Built a website." → Strong: "Developed responsive React web application improving user engagement by 42% and reducing bounce rate by 30%."\n\nWeak: "Helped team." → Strong: "Collaborated with 6-person agile team to deliver 12 sprint features, contributing 800+ lines of reviewed, production-ready code."`;
    default:
      return `AI suggestion for ${featureId}: Add relevant details with quantified outcomes.`;
  }
}
