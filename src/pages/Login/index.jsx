import React from 'react';
function Login() {
  return (
    <>
      <div>
        <h1> Login</h1>
      </div>
      <div>
        <form>
          <input type="text" id="ipt-email" placeholder="email" />
          <input type="password" id="ipt-password" placeholder="senha" />
          <button type="submit" id="btn-entrar" />
        </form>
      </div>
    </>
  );
}
export default Login;
