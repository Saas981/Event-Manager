// Contact.js
import React from 'react';

function Contact() {
  return (
    <div>
      <h2>Contact Us</h2>
      <p>
        Feel free to reach out to us for any inquiries or collaborations. We'd love to hear from you!
      </p>
      <p>
        Email us at: <a href="mailto:growyourventures@gmail.com">growyourventures@gmail.com</a>
      </p>
      <p>
        You can also follow us on social media for the latest updates:
      </p>
      <ul>
        <li>Twitter: <a href="https://twitter.com/yourventures">twitter.com/yourventures</a></li>
        <li>Instagram: <a href="https://www.instagram.com/growyourventures">instagram.com/growyourventures</a></li>
        {/* Add more social media links as needed */}
      </ul>
    </div>
  );
}

export default Contact;
