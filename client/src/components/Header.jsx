// import { useState, useEffect,useContext } from "react";
// import { Navbar, Dropdown, Avatar, Button } from "flowbite-react";
// import Logo from "../Logo1.png";
// import { Link,useLocation } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import "../css/Header.css";
// import axios from "axios";
// import BASE_URL from "../config";
// import { AuthContext } from "../context/logincontext";
// export default function Header() {
//   const{isLoggedIn,setIsLoggedIn}=useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = async () => {
//     try {
//       const response = await axios.get(${BASE_URL}/auth/logout, {
//         withCredentials: true,
//       });
//       localStorage.setItem("isLoggedIn", "false");
//       setIsLoggedIn(false);
//       navigate("/");
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Navbar fluid className="bg-blue-900 py-2 px-4 ">
//       <Navbar.Brand href="/">
//         <img
//           src={Logo}
//           className="mr-3 h-8 sm:h-10 rounded-full"
//           alt="UniCamp Logo"
//         />
//         <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
//           UniCamp
//         </span>
//       </Navbar.Brand>
//       <div className="flex md:order-2 items-center">
//         {isLoggedIn ? (
//           <>
//             <Dropdown
//               arrowIcon={false}
//               inline
//               label={
//                 <Avatar
//                   alt="User Profile"
//                   img={Logo}
//                   rounded
//                   className="hover:shadow-lg shadow-blue-50"
//                 />
//               }
//             >
//               <Dropdown.Header>
//                 <span className="block text-sm">Username</span>
//                 <span className="block truncate text-sm font-medium">
//                   name@flowbite.com
//                 </span>
//               </Dropdown.Header>
//               <Dropdown.Item as={Link} to="/profile">
//                 Profile
//               </Dropdown.Item>
//               <Dropdown.Divider />
//               <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
//             </Dropdown>
//             <Button
//               className="bg-blue-300 text-black border-collapse ml-5"
//               onClick={handleLogout}
//             >
//               Logout
//             </Button>
//           </>
//         ) : (
//           <Button
//             as={Link}
//             to="/login"
//             className="bg-blue-300 text-black border-collapse ml-5"
//           >
//             Sign In
//           </Button>
//         )}
//         <Navbar.Toggle />
//       </div>
//       {isLoggedIn && (
//         <Navbar.Collapse className="items-center justify-between">
//           <Navbar.Link as={Link} to="/" className="nav-link">
//             Home
//           </Navbar.Link>
//           <Navbar.Link as={Link} to="/dashboard" className="nav-link">
//             Dashboard
//           </Navbar.Link>
//           <Navbar.Link as={Link} to="/blogs" className="nav-link">
//             Blogs
//           </Navbar.Link>
//         </Navbar.Collapse>
//       )}
//     </Navbar>
//   );
// }

import { useState, useEffect, useContext } from 'react';
import { Navbar, Dropdown, Avatar, Button } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../css/Header.css';
import axios from 'axios';
import BASE_URL from '../config';
import { AuthContext } from '../context/logincontext';
import { UsernameContext } from '../context/usernamecontext';

export default function Header() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const { username, setUsername } = useContext(UsernameContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/logout`, {
        withCredentials: true,
      });
      localStorage.setItem('isLoggedIn', 'false');
      setUsername('');
      setIsLoggedIn(false);
      navigate('/');
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar
      fluid
      className={`navbar-fixed  bg-blue-900 px-4 ${
        isLoggedIn ? 'py-2' : 'pt-3'
      }`}
    >
      <Navbar.Brand href="/" className=' title no-underline text-xl self-center whitespace-nowrap  font-semibold custom-font text-white'>
        <span>
          Drugify
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2 items-center">
        {isLoggedIn ? (
          <>
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User Profile"
                  rounded
                  className="hover:shadow-lg shadow-blue-50"
                >
                </Avatar>
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{username}</span>
              </Dropdown.Header>
              <Dropdown.Item
                as={Link}
                to={`/profile`}
                className="no-underline"
              >
                Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
            </Dropdown>

            <Button
              as={Link}
            to="/"
            onClick={handleLogout}
            className="navbar-custom-button no-underline text-black"
          >
              <span className="navbar-custom-button-text">Logout</span>
            </Button>
          </>
        ) : (
          <Button
            as={Link}
            to="/login"
            className="navbar-custom-button no-underline text-black"
          >
            <span className="navbar-custom-button-text">Sign In</span>
          </Button>
        )}
        <Navbar.Toggle />
      </div>
      {isLoggedIn && (
        <Navbar.Collapse className="navbar-collapse-custom">
          <Navbar.Link as={Link} to="/search" className="nav-link">
            <span className="text-lg links">Search</span>
          </Navbar.Link>
          <Navbar.Link as={Link} to="/search/history" className="nav-link">
            <span className="text-lg links">History</span>
          </Navbar.Link>
          <Navbar.Link as={Link} to="/drug/add" className="nav-link">
            <span className="text-lg links">Add Drug</span>
          </Navbar.Link>
        </Navbar.Collapse>
      )}
    </Navbar>
  );
}
