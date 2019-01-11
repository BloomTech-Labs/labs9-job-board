exports.seed = function(knex) {
  return knex("table_name").insert([
    {
      title: "Web Dev",
      salary: "90,000",
      topSkills: "python, CSS",
      addSkills: "soft skills",
      familier: "C++",
      description: "Can build things",
      requirements: "Not a code monkey",
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
      description: "works well with others",
      requirements: "2 years of javascript",
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
