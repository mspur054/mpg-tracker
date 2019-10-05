import React from "react";

const PasswordChangePage = () => {
  return (
    <div>
      <form>
        <h1>Change Password</h1>
        <input type="text" name="email" placeholder="Email Address" />
        <input type="text" name="password" placeholder="Password" />
        <button type="submit">CHANGE PASSWORD</button>
      </form>
    </div>
  );
};

export default PasswordChangePage;
