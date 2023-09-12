import React from "react";

function PrivateRoute({ children, isLoggedIn }) {
  if (isLoggedIn) {
    return children;
  }
  return <Navigate to="/login" replace />;
}
