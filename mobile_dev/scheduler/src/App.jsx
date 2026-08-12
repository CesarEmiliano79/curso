import React from 'react';
import './App.css'

const schedule = {
  title: "CS Courses for 2018-2019",
  "couses": {
    "F101": {
      "id": "F101",
      "meets": "MWF 11:00-11:50",
      "title": "Computer Science: Concepts, Philosophy, and Connections"
    },
    "F110": {
      "id": "F110",
      "meets": "MWF 10:00-10:50",
      "title": "Intro Programming for non-majors"
    },
    "F111": {
      "id": "F111",
      "meets": "MWF 10:00-10:50",
      "title": "Fundamentals of Computer Programming I"
    },
    "W110": {
      "id": "W110",
      "meets": "MWF 10:00-10:50",
      "title": "Fundamentals of Computer Programming I"
    },
    "S313": {
      "id": "S313",
      "meets": "TuTh 15:30-16:50",
      "title": "Tangible Interaction Design and Learning"
    },
    "S314": {
      "id": "S314",
      "meets": "TuTh 9:00-10:50",
      "title": "Tech & Human Interaction"
    }
  }
};

const Banner = ({ title }) => (
  <header>
    <h1>{title}</h1>
  </header>
);

const terms = {
  "F": "Fall",
  "W": "Winter",
  "S": "Spring"
};

const getCourseTerm = course => (
  terms[course.id.charAt(0)]
);

const getCourseNumber = course => (
  course.id.slice(1, 4)
);

const Couse = ({ courses }) => (
  <div className="card m-1 p-2">
    <div className="card-body">
      <div className="card-title">{getCourseTerm(courses)} CS {getCourseNumber(courses)}</div>
      <div className="card-text">{courses.title}</div>
    </div>
  </div>
);

const CouseList = ({ courses }) => (
  <div className="course-list">
    {Object.values(courses).map(course => (
      <Couse key={course.id} courses={course} />
    ))}
  </div>
);

const App = () => (
  <div className="container">
    <Banner title={schedule.title} />
    <CouseList courses={schedule.couses} />
  </div>
);

export default App;