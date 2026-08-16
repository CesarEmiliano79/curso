import React from 'react';
import './App.css'
import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";
import {addScheduleTimes} from './utilities/time.jsx';
import CourseList from './components/CourseList.jsx';

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