import React from 'react';
import './App.css'
import {QueryClient, QueryClientProvider, useQuery} from "@tanstack/react-query";
import {addScheduleTimes} from './utilities/time.jsx';
import {useData} from './utilities/firebase.jsx';
import CourseList from './components/CourseList.jsx';

const Banner = ({ title }) => (
  <header>
    <h1>{title}</h1>
  </header>
);

const Main = () => {
  const [schedule, isLoading, error] = useData('/', addScheduleTimes);

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