import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);
  const url = "http://localhost:4000";

  const [data, setData] = useState({
    firstName: "",
    email: "",
    lastName: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    password: "",
    docAvatar: null,
    role: "Patient",
  });
  console.log(data);
  const navigateTo = useNavigate();
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const handleRegistration = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:4000/api/user/patien/register",

      data
    );
    console.log(response.data);
    if (response.data.succes) {
      const { token } = response.data;
      console.log(token);
      toast.success(response.data.message);
      navigateTo("/login");
      Cookies.set("paitenToken", token, { expires: 7 });
      setIsAuthenticated(true);
    } else {
      toast.error(response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <div className="container form-component register-form">
        <h2>Sign Up</h2>
        <p>Please Sign Up To Continue</p>

        <form onSubmit={handleRegistration}>
          <div>
            <input
              name="firstName"
              type="text"
              placeholder="First Name"
              value={data.firstName}
              onChange={onChangeHandler}
            />
            <input
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={data.lastName}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={data.email}
              onChange={onChangeHandler}
              name="email"
            />
            <input
              name="phone"
              type="number"
              placeholder="Mobile Number"
              value={data.phone}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <input
              name="nic"
              type="number"
              placeholder="NIC"
              value={data.nic}
              onChange={onChangeHandler}
            />
            <input
              name="dob"
              type={"date"}
              placeholder="Date of Birth"
              value={data.dob}
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <select
              name="gender"
              value={data.gender}
              onChange={onChangeHandler}
            >
              <option value="">Select Gender</option>
              <option name="Male" value="Male">
                Male
              </option>
              <option name="Female" value="Female">
                Female
              </option>
            </select>
            <input
              type="password"
              placeholder="Password"
              value={data.emailpassword}
              onChange={onChangeHandler}
              name="password"
            />
          </div>
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 }}>Already Registered?</p>
            <Link
              to={"/signin"}
              style={{ textDecoration: "none", color: "#271776ca" }}
            >
              Login Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit">Register</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
