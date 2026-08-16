export const toggle = (x, lst) => (
  lst.includes(x) ? lst.filter(y => y !== x) : [x, ...lst]
);

export const terms = {
  "F": "Fall",
  "W": "Winter",
  "S": "Spring"
};

export const getCourseTerm = course => (
  terms[course.id.charAt(0)]
);

export const getCourseNumber = course => (
  course.id.slice(1, 4)
);

export const hasConflict = (course, selected) => (
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

export const addScheduleTimes = schedule => ({
  title: schedule.title,
  courses: mapValues(addCourseTime, schedule.courses)
});

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

export const courseConflict = (course1, course2) => (
  getCourseTerm(course1) === getCourseTerm(course2) &&
  timeConflict(course1, course2)
);

