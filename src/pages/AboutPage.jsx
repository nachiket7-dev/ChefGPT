import React from 'react';

const AboutPage = () => {
  return (
    <div className="about-page" style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1 className="fadeIn">About Chef GPT</h1>
      <section>
        <h2>Features</h2>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>AI-powered personalized recipe generation based on your ingredients</li>
          <li>User authentication with email/password and Google sign-in</li>
          <li>Save and view your favorite recipes</li>
          <li>Easy-to-use interface with responsive design</li>
        </ul>
      </section>
      <section>
        <h2>About</h2>
        <p>
          Chef GPT is your AI-powered cooking assistant that helps you create delicious recipes tailored to the ingredients you have on hand. Our mission is to make cooking fun, easy, and personalized for everyone.
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
