import { useState } from "react";
import PropTypes from 'prop-types';

const LoginPage = ({ onUserLoggedIn }) => {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setLoginDetails({ ...loginDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Implement logic to send data to our backend here
    // Example: await axios.post('/login', loginDetails);

    if (onUserLoggedIn) {
      onUserLoggedIn();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <input
              type="email"
              name="email"
              value={loginDetails.email}
              onChange={handleOnChange}
              placeholder="Email"
              required
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <input
              type="password"
              name="password"
              value={loginDetails.password}
              onChange={handleOnChange}
              placeholder="Password"
              required
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3">
          <div className="w-full px-3 text-right">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

LoginPage.propTypes = {
  onUserLoggedIn: PropTypes.func,
};

export default LoginPage;
