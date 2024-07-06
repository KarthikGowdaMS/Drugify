import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/logincontext';
import { UsernameContext } from '../context/usernamecontext';
import axios from 'axios';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import BASE_URL from '../config';
// import { UserNameContext } from '../context/namecontext';
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';

export default function SignUp(props) {
  const { setIsLoggedIn } = useContext(AuthContext);
  const { setUsername } = useContext(UsernameContext);
  const navigate = useNavigate();
  //   const [showPassword, setShowPassword] = useState(false);
  //   const [confirmPassword, setConfirmPassword] = useState('');
  //   const [samePassword, setSamePassword] = useState(true);
  //   const { updateUserName } = useContext(UserNameContext);

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    username: '',
    mobile:'',
    age:'',
  });

  //   const togglePasswordVisibility = () => {
  //     setShowPassword(!showPassword);
  //   };

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${BASE_URL}/auth/signup`,
        {
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          username: credentials.username,
        },
        { withCredentials: true } // Include this in the request config
      );

      console.log(response);

      if (response.status === 200 && response.status < 300) {
        const json = response.data;
        if (json.success) {
          props.showAlert('Signup Success', 'success');
          setUsername(json.user.username);
          setIsLoggedIn(true);
          navigate('/Search');
        }
      } else {
        props.showAlert('Something error occurred', 'danger');
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 400) {
        const json = error.response.data;
        console.log(json);
        props.showAlert(json.error, 'danger');
      } else {
        props.showAlert('Invalid Credentials', 'danger');
      }
      navigate('/signup');
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;

    setCredentials((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  async function handleGOauthLogin(e) {
    e.preventDefault();
    window.open(`${BASE_URL}/auth/google`, '_self');
  }

  return (
    // <div>
    //   <h1>Login</h1>
    //   <form onSubmit={handleSubmit}>
    //     <label>
    //       Email:
    //       <input
    //         name="email"
    //         type="email"
    //         value={credentials.email}
    //         onChange={handleChange}
    //       />
    //     </label>

    //     <label>
    //       Username:
    //       <input
    //         name="username"
    //         type="text"
    //         value={credentials.username}
    //         onChange={handleChange}
    //       />
    //     </label>
    //     <label>
    //       Name:
    //       <input
    //         name="name"
    //         type="text"
    //         value={credentials.name}
    //         onChange={handleChange}
    //       />
    //     </label>

    //     <label>
    //       Password:
    //       <input
    //         type="password"
    //         value={credentials.password}
    //         onChange={handleChange}
    //         name="password"
    //       />
    //     </label>
    //     <input type="submit" value="Submit" />
    //   </form>

    //   <button
    //     onClick={handleOauthLogin}
    //     className="btn btn-primary login-button btn-submit"
    //     type="submit"
    //   >
    //     Sign In With Google
    //   </button>
    // </div>

    <div className=" flex-grow items-center p-28">
      <form
        className="flex flex-col max-w-md gap-4 mx-auto mt-8 p-4 bg-white rounded shadow-md"
        onSubmit={handleSubmit}
      >
        <div className="flex justify-center">
          <h1 className="text-4xl">Sign Up</h1>
        </div>
        <div>
          <Label
            htmlFor="username"
            className="mb-2 block"
            value="Your username"
          />
          <TextInput
            id="username"
            type="text"
            required
            className="w-full"
            onChange={handleChange}
            name="username"
          />
        </div>
        <div>
          <Label htmlFor="name" className="mb-2 block" value="Your name" />
          <TextInput
            id="name"
            type="text"
            required
            className="w-full"
            onChange={handleChange}
            name="name"
          />
        </div>
        <div>
          <Label htmlFor="email1" className="mb-2 block" value="Your email" />
          <TextInput
            id="email1"
            type="email"
            placeholder="name@unicampnie.com"
            required
            className="w-full"
            onChange={handleChange}
            name="email"
          />
        </div>
        <div>
          <Label
            htmlFor="password1"
            className="mb-2 block"
            value="Your password"
          />
          <TextInput
            id="password1"
            type="password"
            required
            className="w-full"
            onChange={handleChange}
            name="password"
          />
        </div>
        <div>
          <Label
            htmlFor="age"
            className="mb-2 block"
            value="Your age"
          />
          <TextInput
            id="age"
            type="number"
            required
            className="w-full"
            onChange={handleChange}
            name="age"
          />
        </div>
        <div>
          <Label
            htmlFor="mobile"
            className="mb-2 block"
            value="Your Mobile"
          />
          <TextInput
            id="mobile"
            type="number"
            required
            className="w-full"
            onChange={handleChange}
            name="number"
          />
        </div>
        <Button type="submit" className="mt-4 w-full">
          Submit
        </Button>
        <Button
          onClick={handleGOauthLogin}
          className="mt-2 w-full"
          type="submit"
        >
          Sign In With Google
        </Button>
        <div className="text-center">
          <Link to="/login" className="text-slate-500 hover:text-slate-700">
            <span>Already have an account? Sign In</span>
          </Link>
        </div>
      </form>
    </div>
  );
}
