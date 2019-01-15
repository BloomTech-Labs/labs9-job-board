exports.seed = function(knex) {
  return knex("jobs").insert([
    {
      title: "Web Dev",
      salary: "90,000",
      topSkills: "python, CSS",
      addSkills: "soft skills",
      familiar: "C++",
      description:
        "We are seeking a Senior Software Engineer to join our Cloud Engineering team. This is a great role for a versatile full stack developer capable of working on multiple platforms and technology stacks. In this position, you will be an integral part of the development of web services and cloud infrastructure to support our product back-end and web console. ",
      requirements:
        "Experience writing and shipping code with a modern web application framework (Rails, Laravel, Django, etc…). Excellent command of modern web browsers. Experience with version control fundamentals. Strong understanding of AWS.",
      active: true,
      college_Degree: false,
      users_id: 1
    },
    {
      title: "Web design",
      salary: "50,000",
      topSkills: "Javascript, css",
      addSkills: "sales",
      familiar: "work",
      description:
        "The Full-Stack developer is responsible for developing software components and architecture patterns. Create user interfaces and visualizations to provide decision makers and data scientists access to platform data. Operationally support platform components and databases.",
      requirements:
        "Bachelor's degree or 4+ years of experience or 2+ with a MS degree. * 2+ years of hands-on development experience. * Experience with object-oriented programing in Java or Go. * Spring Framework exposure is preferred. * Experience with CI/CD tools like Jenkins, Travis CI, etc. * Frontend skills in JavaScript, HTML, and CSS is required. * Ember.js experience is preferred. ",
      college_Degree: false,
      users_id: 2
    },
    {
      title: "Full Stack",
      salary: "60,000",
      topSkills: "Node.js, React",
      addSkills: "photoshop",
      familiar: "web design",
      description:
        "Analytics Corporation has an on-site opportunity for a skilled Full Stack .Net developer who can work for Straveda as a W2 employee. USC/GC/EAD (CPT/EAD candidates will not be considered). ",
      requirements:
        "Required Work Experience : 3 plus years with .Net development experience including both webforms and MVC or MVVM. Three plus years in full-stack Microsoft web development, including SQL Server Healthcare Industry experience desirable but not required. USC/GC/EAD on Straveda Payroll W2. Position is on-site in Longmont, CO. NO C2C ",
      active: false,
      college_Degree: false,
      users_id: 3
    },
    {
      title: "Data Science",
      salary: "60,000",
      topSkills: "Python, Statistics",
      addSkills: "Javascipt",
      familiar: "react",
      description:
        "Position for a talented individual for a Software Developer who fulfills an important role within the organization’s product team. Core functions of the role require a developer with",
      requirements:
        "3 plus years with .Net development experience including both webforms and MVC or MVVM. Three plus years in full-stack Microsoft web development,",
      active: true,
      college_Degree: true,
      users_id: 4
    },
    {
      title: "Junior Quality Engineer",
      salary: "70,000",
      topSkills: "JavaScript, HTML",
      addSkills: "Mathematics",
      familiar: "Physics, Computer Science",
      description:
        "QE team is a rapidly growing & very well diversified team with very strong focus on cutting-edge test automation tools & technologies.",
      requirements:
        "Bachelors degree in Computer Science or related field is preferred. 1-2 years of experience in a QA or testing environment",
      college_Degree: false,
      users_id: 5
    },
    {
      title: "Senior Software Engineer",
      salary: "50,000",
      topSkills: "C, C++",
      addSkills: "JavaScript, CSS",
      familiar: "HTML",
      description:
        "The Senior Software Engineer role requires an experienced software engineer who can operate across the whole stack: ",
      requirements:
        " low-level C firmware, high-level C++ and Python applications, build systems, software delivery systems, API architecture, software documentation and customer support. If this begins to describe you, keep reading.",
      active: true,
      college_Degree: false,
      users_id: 4
    },
    {
      title: "Senior Software Engineer",
      salary: "80,000",
      topSkills: "JavaScript, CSS",
      addSkills: "HTML",
      familiar: "C, C++",
      description:
        " Senior Software Engineer to join our Cloud Engineering team. This is a great role for a versatile full stack developer capable of working on multiple platforms and technology stacks. In this position, you will be an integral part of the development of web services and cloud infrastructure to support our product back-end and web console.",
      requirements: "JavaScript, CSS",
      college_Degree: false,
      users_id: 5
    },
    {
      title: "Python Application Developer III",
      salary: "130,000",
      topSkills: "Python",
      addSkills: "Django",
      familiar: "Rails",
      description:
        "ork will consist primarily of advancing the maturity of several applications for managing data related to building energy performance and data exchange. The successful applicant will work collaboratively to identify, design, implement, and test new functionality. ",
      requirements:
        "Relevant PhD . Or, relevant Master's Degree and 3 or more years of experience . Or, relevant Bachelor's Degree and 5 or more years of experience . Demonstrates broad understanding and wide application of engineering technical procedures, principles, theories and concepts in the field. General knowledge of other related disciplines.",
      college_Degree: false,
      users_id: 6
    },
    {
      title: "Senior Software Engineer",
      salary: "90,000",
      topSkills: "JavaScript, CSS",
      addSkills: "Python",
      familiar: "rails",
      description:
        "We are seeking a full stack web developer to help build and lead the next generation of investing software within the alternative investment market",
      requirements: "3+ years of Application Development experience",
      college_Degree: false,
      users_id: 7
    },
    {
      title: "Software Engineer",
      salary: "65,000",
      topSkills: "HTML, JavaScript, CSS",
      addSkills: "AJAX",
      familiar: "Python",
      description:
        "As a member of one of our product teams, this person will be responsible for creating, enhancing, and supporting common features. Working side-by-side with Product Owners, Quality Assurance Engineers, and Business Stakeholders.",
      requirements:
        "Must be proficient in object-oriented design and development and unit-testing, Web Services, and web pages preferably inASP.NETand/orASP.NETMVC with C#",
      college_Degree: false,
      users_id: 8
    }
  ]);
};
