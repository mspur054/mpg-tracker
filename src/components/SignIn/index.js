import React from "react";

const SignInPage = () => {
  return (
    <div>
      <form>
        <h1>Log In</h1>
        <input type="text" name="email" placeholder="Email Address" />
        <input type="text" name="password" placeholder="Password" />
        <button type="submit">LOG IN</button>
        <a href="#">Forgot Password?</a>
      </form>
    </div>
  );
};

export default SignInPage;
