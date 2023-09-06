import React from 'react';
//  import './LandingPage.css'; // Import CSS for the LandingPage component

function LandingPage() {
  return (
    <div className="landing-page">
      <header>
        <h1>Welcome to Expense Tracker</h1>
        <p>Your Ultimate Financial Companion</p>
      </header>
      <main>
        <section className="feature">
          <h2>Track Your Expenses</h2>
          <p>Effortlessly manage your spending by categorizing and tracking your expenses in one place.</p>
        </section>
        <section className="feature">
          <h2>Set Budget Goals</h2>
          <p>Plan your finances wisely by setting budget goals and monitoring your progress towards financial stability.</p>
        </section>
        <section className="feature">
          <h2>Visualize Your Data</h2>
          <p>Gain insights into your spending habits with interactive charts and graphs, making informed financial decisions.</p>
        </section>
      </main>
      <footer>
        <p>&copy; 2023 Expense Tracker</p>
      </footer>
    </div>
  );
}

export default LandingPage;
