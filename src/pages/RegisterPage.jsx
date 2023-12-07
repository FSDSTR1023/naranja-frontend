import { useState } from "react";
import PropTypes from 'prop-types';

const RegisterPage = ({ onUserRegistered }) => {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Implement logic to send data to our backend here
    // Example: await axios.post('/register', user);

    setUser({
      name: "",
      surname: "",
      email: "",
      password: "",
    });

    if (onUserRegistered) {
      onUserRegistered();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="text-2xl font-semibold mb-4">Create User</h2>
      <form className="w-full max-w-lg" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3 mb-4 md:mb-0">
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleOnChange}
              placeholder="Name"
              required
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
          <div className="w-full px-3">
            <input
              type="text"
              name="surname"
              value={user.surname}
              onChange={handleOnChange}
              placeholder="Surname"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-4">
          <div className="w-full px-3">
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleOnChange}
              placeholder="Email"
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </div>
        </div>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleOnChange}
              placeholder="Password"
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
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

RegisterPage.propTypes = {
  onUserRegistered: PropTypes.func,
};

export default RegisterPage;
