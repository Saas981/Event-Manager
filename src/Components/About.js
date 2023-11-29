// About.js
import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router for navigation
import PropTypes from 'prop-types';

const aboutStyle = {
  padding: '20px',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#f5f5f5',
};

function About({ title, description, author, date }) {
  return (
    <section style={aboutStyle}>
      <h2>{title}</h2>
      <p>{description}</p>
      {author && date && (
        <div>
          <p>
            <strong>Author:</strong> {author}
          </p>
          <p>
            <strong>Date:</strong> {date}
          </p>
        </div>
      )}
      <p>
        Go back to <Link to="/">Home</Link>.
      </p>
    </section>
  );
}

About.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  author: PropTypes.string,
  date: PropTypes.string,
};

About.defaultProps = {
  author: '',
  date: '',
};

export default About;

