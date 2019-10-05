import React from "react";

const PasswordForgetPage = () => {
  return (
    <div>
      <form>
        <h1>Forgot Password</h1>
        <input type="text" name="email" placeholder="Email Address" />
        <button type="submit">SUBMIT</button>
      </form>
    </div>
  );
};

export default PasswordForgetPage;
