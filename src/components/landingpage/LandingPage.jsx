import React from 'react';

function LandingPage() {
  const landingPageStyle = {
    fontFamily: 'Roboto, sans-serif', // Using the "Roboto" font
  };

  return (
    <div className="landing-page" style={landingPageStyle}>
      <header className="text-center py-5">
        <h1 className="display-4">
          Welcome to Expense Tracker
        </h1>
        <p className="lead">Your Ultimate Financial Companion</p>
      </header>
      <main className="container mt-5">
        <section className="feature row">
          <div className="col-md-4">
            <h2>Track Your Expenses</h2>
            <p>Effortlessly manage your spending by categorizing and tracking your expenses in one place.</p>
          </div>
          <div className="col-md-4">
            <h2>Set Budget Goals</h2>
            <p>Plan your finances wisely by setting budget goals and monitoring your progress towards financial stability.</p>
          </div>
          <div className="col-md-4">
            <h2>Visualize Your Data</h2>
            <p>Gain insights into your spending habits with interactive charts and graphs, making informed financial decisions.</p>
          </div>
        </section>
      </main>
      <footer className="text-center mt-5">
        <p>&copy; 2023 Expense Tracker</p>
      </footer>
    </div>
  );
}

export default LandingPage;
