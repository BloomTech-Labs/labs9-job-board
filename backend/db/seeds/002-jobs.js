exports.seed = function(knex) {
  return knex("table_name").insert([
    {
      title: "Web Dev",
      salary: "90,000",
      topSkills: "python, CSS",
      addSkills: "soft skills",
      familier: "C++",
      description:
        "Untangle is seeking a Senior Software Engineer to join our Cloud Engineering team. This is a great role for a versatile full stack developer capable of working on multiple platforms and technology stacks. In this position, you will be an integral part of the development of web services and cloud infrastructure to support our product back-end and web console. ",
      requirements:
        "Experience writing and shipping code with a modern web application framework (Rails, Laravel, Django, etc…). Excellent command of modern web browsers. Experience with version control fundamentals. Strong understanding of AWS.",
      active: true,
      collegeDegree: false,
      users_id: 1
    },
    {
      title: "Web design",
      salary: "50,000",
      topSkills: "Javascript, css",
      addSkills: "sales",
      familier: "work",
      description:
        "The Full-Stack developer is responsible for developing software components and architecture patterns. Create user interfaces and visualizations to provide decision makers and data scientists access to platform data. Operationally support platform components and databases.",
      requirements:
        "Bachelor's degree or 4+ years of experience or 2+ with a MS degree. * 2+ years of hands-on development experience. * Experience with object-oriented programing in Java or Go. * Spring Framework exposure is preferred. * Experience with CI/CD tools like Jenkins, Travis CI, etc. * Frontend skills in JavaScript, HTML, and CSS is required. * Ember.js experience is preferred. ",
      collegeDegree: "true",
      users_id: 9
    },
    {
      title: "Full Stack",
      salary: "60,000",
      topSkills: "Node.js, React",
      addSkills: "photoshop",
      familier: "web design",
      description: "build things from ground up",
      requirements: "6 years of full stack development",
      active: false,
      collegeDegree: false,
      users_id: 1
    },
    {
      title: "Data Science",
      salary: "60,000",
      topSkills: "Python, Statistics",
      addSkills: "Javascipt",
      familier: "react",
      description: "",
      requirements:
        "3 plus years with .Net development experience including both webforms and MVC or MVVM. Three plus years in full-stack Microsoft web development,",
      active: "",
      collegeDegree: "",
      users_id: 2
    },
    {
      title: "rowValue1",
      salary: "60,000",
      topSkills: "",
      addSkills: "",
      familier: "",
      description: "",
      requirements: "",
      active: "",
      collegeDegree: "",
      users_id: 3
    },
    {
      title: "rowValue1",
      salary: "50,000",
      topSkills: "",
      addSkills: "",
      familier: "",
      description: "",
      requirements: "",
      active: "",
      collegeDegree: "",
      users_id: 4
    },
    {
      title: "rowValue1",
      salary: "40,000",
      topSkills: "",
      addSkills: "",
      familier: "",
      description: "",
      requirements: "",
      active: "",
      collegeDegree: "",
      users_id: 5
    },
    {
      title: "rowValue1",
      salary: "30,000",
      topSkills: "",
      addSkills: "",
      familier: "",
      description: "",
      requirements: "",
      active: "",
      collegeDegree: "",
      users_id: 6
    },
    {
      title: "rowValue1",
      salary: "40,000",
      topSkills: "",
      addSkills: "",
      familier: "",
      description: "",
      requirements: "",
      active: "",
      collegeDegree: "",
      users_id: 7
    },
    {
      title: "rowValue1",
      salary: "65,000",
      topSkills: "",
      addSkills: "",
      familier: "",
      description: "",
      requirements: "",
      active: "",
      collegeDegree: "",
      users_id: 8
    }
  ]);
};
