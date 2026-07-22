function RequiredSkills() {

  const skills = [
    "DSA",
    "React",
    "Node.js",
    "Python",
    "SQL",
    "Git",
    "Docker",
    "AWS",
    "OOP",
    "DBMS",
    "Operating System",
    "Computer Networks",
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-xl font-bold mb-5">
        📋 Required Skills
      </h2>

      <p className="text-gray-500 mb-4">
        Google • Software Engineer
      </p>

      <div className="flex flex-wrap gap-3">

        {skills.map((skill) => (

          <span
            key={skill}
            className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full"
          >
            {skill}
          </span>

        ))}

      </div>

      <div className="mt-6">

        <p className="font-semibold">
          Skill Match
        </p>

        <div className="w-full bg-gray-200 rounded-full h-4 mt-2">

          <div
            className="bg-indigo-600 h-4 rounded-full"
            style={{ width: "72%" }}
          />

        </div>

        <p className="mt-2 font-bold text-indigo-600">
          72% Match
        </p>

      </div>

    </div>
  );
}

export default RequiredSkills;