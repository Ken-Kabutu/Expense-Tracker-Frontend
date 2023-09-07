import React from 'react';

function LandingPage() {
  const landingPageStyle = {
    fontFamily: 'Roboto, sans-serif', // Using the "Roboto" font
    minHeight: '200vh', // Fill the viewport height
    background: 'url("data:image/jpeg;base64,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") no-repeat center center fixed', // Replace with your image URL
    backgroundSize: 'cover', // Cover the entire container
  };

  return (
    <div className="landing-page" style={landingPageStyle}>
      <header className="text-center py-5">
        <h1 className="display-4 text-white">Welcome to Expense Tracker</h1>
        <p className="lead text-white">Your Ultimate Financial Companion</p>
      </header>
      <main className="container mt-5">
        <section className="feature row">
          <div className="col-md-4">
            <h2 className="text-white">Track Your Expenses</h2>
            <p className="text-white">Effortlessly manage your spending by categorizing and tracking your expenses in one place.</p>
          </div>
          <div className="col-md-4">
            <h2 className="text-white">Set Budget Goals</h2>
            <p className="text-white">Plan your finances wisely by setting budget goals and monitoring your progress towards financial stability.</p>
          </div>
          <div className="col-md-4">
            <h2 className="text-white">Visualize Your Data</h2>
            <p className="text-white">Gain insights into your spending habits with interactive charts and graphs, making informed financial decisions.</p>
          </div>
        </section>
      </main>
      <footer className="text-center mt-5">
        <p className="text-white">&copy; 2023 Expense Tracker</p>
      </footer>
    </div>
  );
}

export default LandingPage;
