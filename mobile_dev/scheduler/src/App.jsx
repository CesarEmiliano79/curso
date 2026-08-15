import React, {useState} from 'react';
import './App.css'
import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";

const fetchSchedule = async () => {
  const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return await response.json();
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

const Course = ({ courses }) => (
  <div className="card m-1 p-2">
    <div className="card-body">
      <div className="card-title">{getCourseTerm(courses)} CS {getCourseNumber(courses)}</div>
      <div className="card-text">{courses.title}</div>
    </div>
  </div>
);

const TermButton = ({ term, setTerm, checked }) => (
  <>
    <input type="radio" id={term} className="btn-check" autoComplete="off"
      checked={checked}
      onChange={() => setTerm(term)}/>
    <label class="btn btn-success m-1 p-2" htmlFor={term}>
      {term}
    </label>
  </>
);

const TermSelector = ({ term, setTerm }) => (
  <div className="btn-group">
    {
      Object.values(terms).map(value => (
        <TermButton key={value} term={value} setTerm={setTerm} checked={value === term}/>
      ))
    }
  </div>
);

const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Fall');
  const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));
  return (
    <>
      <TermSelector term={term} setTerm={setTerm}/>
      <div className="course-list">
        {termCourses.map(course => (
          <Course key={course.id} courses={course} />
        ))}
      </div>
    </>
  );
};

const Main = () => {
  const {data: schedule, isLoading, error} = useQuery({
    queryKey: ['schedule'],
    queryFn: fetchSchedule
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="container">
      <Banner title={schedule.title} />
      <CourseList courses={schedule.courses} />
    </div>
  );
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Main />
  </QueryClientProvider>
);

export default App;