import React from "react";
import { Link } from 'react-router-dom';

const Home = ({ message }) => {
  return (
      <div>
          <h1>{ message }</h1>
          <a href="/sign_in">Sign In</a>
          <a href="/results">View Results</a>
      </div>
  );
};

export default Home;
