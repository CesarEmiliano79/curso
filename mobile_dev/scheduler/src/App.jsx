import React, {useState} from 'react';
import './App.css'
import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";

const fetchSchedule = async () => {
  const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return addScheduleTimes(await response.json());
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

const meetsPat = /^((?:M|Tu|W|Th|F)+) +(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d) *$/;

const timeParts = meets => {
  const [match, days, hh1, mm1, hh2, mm2] = meetsPat.exec(meets) || [];
  return !match ? {} : {
    days,
    hours: {
      start: hh1 * 60 + mm1 * 1,
      end: hh2 * 60 + mm2 * 1
    }
  };
};

const getCourseTerm = course => (
  terms[course.id.charAt(0)]
);

const getCourseNumber = course => (
  course.id.slice(1, 4)
);

const toggle = (x, lst) => (
  lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
);

const hasConflict = (course, selected) => (
  selected.some(selection => courseConflict(course, selection))
);

const mapValues = (fn, obj) => (
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, fn(value)])
  )
);

const addCourseTime = course => ({
  ...course,
  ...timeParts(course.meets)
});

const addScheduleTimes = schedule => ({
  title: schedule.title,
  courses: mapValues(addCourseTime, schedule.courses)
});

const days = ['M', 'Tu', 'W', 'Th', 'F'];

const daysOverlap = (days1, days2) => (
  days.some(day => days1.includes(day) && days2.includes(day))
);

const hoursOverlap = (hours1, hours2) => (
  hours1.start < hours2.end && hours2.start < hours1.end
);

const timeConflict = (course1, course2) => (
  daysOverlap(course1.days, course2.days) &&
  hoursOverlap(course1.hours, course2.hours)
);

const courseConflict = (course1, course2) => (
  getCourseTerm(course1) === getCourseTerm(course2) &&
  timeConflict(course1, course2)
);

const Course = ({ course, selected, setSelected }) => {
  const isSelected = selected.includes(course);
  const isDisabled = !isSelected && hasConflict(course, selected);
  const style = { backgroundColor: isDisabled? 'lightgray' :  isSelected ? '#B0E5A4' : 'white' };
  return (
    <div className="card m-1 p-2"
      onClick={isDisabled ? null: () => setSelected(toggle(course, selected))}
      style={style}>
      <div className="card-body">
        <div className="card-title">{getCourseTerm(course)} CS {getCourseNumber(course)}</div>
        <div className="card-text">{course.title}</div>
        <div className="card-footer">
          <small className="text-muted">{course.meets}</small>
        </div>
      </div>
    </div>
  );
};

const TermButton = ({ term, setTerm, checked }) => (
  <>
    <input type="radio" id={term} className="btn-check" autoComplete="off"
      checked={checked}
      onChange={() => setTerm(term)}/>
    <label className="btn btn-success m-1 p-2" htmlFor={term}>
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
  const [selected, setSelected] = useState([]);
  const termCourses = Object.values(courses).filter(course => term === getCourseTerm(course));
  return (
    <>
      <TermSelector term={term} setTerm={setTerm}/>
      <div className="course-list">
        {termCourses.map(course => (
          <Course key={course.id} course={course}
          selected={selected}
          setSelected={setSelected} />
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