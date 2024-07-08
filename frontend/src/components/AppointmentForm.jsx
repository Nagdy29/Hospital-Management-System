import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    appointment_date: "",
    department: "",
    doctor_firstName: "",
    address: "",
  });
  console.log(data);
  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];
  const url = "http://localhost:4000";

  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/user/doctor",
        { withCredentials: true }
      );
      setDoctors(data.doctors);
      console.log(data.doctors);
    };
    fetchDoctors();
  }, []);
  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };
  const handleAppointment = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:4000/api/appoient/post",
      data
    );
    console.log(response.data);

    if (response.data.succes == true) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <>
      <div className="container form-component appointment-form">
        <h2>Appointment</h2>
        <form onSubmit={handleAppointment}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={data.firstName}
              onChange={onChangeHandler}
              name="firstName"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={data.lastName}
              onChange={onChangeHandler}
              name="lastName"
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
              type="number"
              placeholder="Mobile Number"
              value={data.phone}
              onChange={onChangeHandler}
              name="phone"
            />
          </div>
          <div>
            <input
              type="number"
              placeholder="NIC"
              value={data.nic}
              onChange={onChangeHandler}
              name="nic"
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={data.dob}
              onChange={onChangeHandler}
              name="dob"
            />
          </div>
          <div>
            <select
              value={data.gender}
              onChange={onChangeHandler}
              name="gender"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="date"
              placeholder="Appointment Date"
              value={data.appointment_date}
              onChange={onChangeHandler}
              name="appointment_date"
            />
          </div>
          <div>
            <select
              value={data.department}
              onChange={onChangeHandler}
              name="department"
            >
              {departmentsArray.map((depart, index) => {
                return (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                );
              })}
            </select>
            <select
              value={`${data.doctor_firstName}`}
              onChange={onChangeHandler}
              name="doctor_firstName"
            >
              <option value="">Select Doctor</option>
              {doctors.map((doctor, index) => (
                <option
                  value={`${doctor.firstName} ${doctor.lastName}`}
                  key={index}
                >
                  {doctor.firstName} {doctor.lastName}
                </option>
              ))}
            </select>
          </div>
          <textarea
            rows="10"
            value={data.address}
            onChange={onChangeHandler}
            name="address"
            placeholder="Address"
          />

          <button style={{ margin: "0 auto" }}>GET APPOINTMENT</button>
        </form>
      </div>
    </>
  );
};

export default AppointmentForm;
