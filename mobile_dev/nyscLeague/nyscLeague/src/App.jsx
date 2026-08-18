import React from 'react';
import './App.css'

const nysc = {
  title: "NYSC Soccer League"
};

const Banner = ({title}) => (
  <header>
    <h1>{title}</h1>
  </header>
);

const Main = () => (
  <Banner title={nysc.title}/>
);

const App = () => (
  <Main/>
);

export default App;
