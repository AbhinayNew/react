import './login.css';
import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void; }) => {


        const apiKey = process.env.REACT_APP_API_KEY;
    const apiUrl = process.env.REACT_APP_API_URL;

    alert(`API Key: ${apiKey}`);
    alert(`API URL: ${apiUrl}`);

    const userString = sessionStorage.getItem('1');
    const user = userString ? JSON.parse(userString) : null;


    if (user && email === user.email) {
      alert('Login successful!');
      // You can add further logic here, like redirecting the user
    } else {
      alert('Login failed. Please check your email and password.');
    }
  };

  return (
    <section className="vh-200">
      <div className="container py-6 h-800">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-8 col-md-8 col-lg-8 col-xl-5">
            <div className="card shadow-2-strong">
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Sign in</h3>
                <form onSubmit={handleSubmit}>
                  <div data-mdb-input-init className="form-outline mb-4">
                  <label className="form-label" htmlFor="typeEmailX-2">Email</label>
                    <input
                      type="email"
                      id="typeEmailX-2"
                      className="form-control form-control-lg"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
          
                  </div>

                  <div data-mdb-input-init className="form-outline mb-4">
                    <input
                      type="password"
                      id="typePasswordX-2"
                      className="form-control form-control-lg"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label className="form-label" htmlFor="typePasswordX-2">Password</label>
                  </div>

                  <div className="form-check d-flex justify-content-start mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="form1Example3"
                      checked={rememberMe}
                      onChange={() => setRememberMe(!rememberMe)}
                    />
                    <label className="form-check-label" htmlFor="form1Example3"> Remember password </label>
                  </div>
                  <div className="button-container">
                  <button

                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                  >
                    Login
                  </button>

                  <button

                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                    >
                    Sign Up
                    </button>


                 </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
