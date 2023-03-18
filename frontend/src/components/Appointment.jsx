import '../css/appointment.css'
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { auth, db } from "../lib/firebase";


// Get a reference to the Firestore collection we want to write to
const appointmentsCollection = collection(db, "appointments");

export default function Appointment() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [department, setDepartment] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleDateChange(event) {
    setDate(event.target.value);
  }

  function handleTimeChange(event) {
    setTime(event.target.value);
  }

  function handleDepartmentChange(event) {
    setDepartment(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Get the current user from Firebase auth
    const user = auth.currentUser;

    if (user) {
      // If the user is signed in, create a new appointment document in the appointments collection

      addDoc(appointmentsCollection, {
        userId: user.uid,
        date,
        time,
        timestamp: Timestamp.fromDate(new Date(date + " " + time)),
        department,
        hospital: "Deon's hospital", // Replace with the name of your hospital
        createdAt: serverTimestamp(),
      })
        .then(() => {
          setSuccessMessage("Appointment booked successfully.");
          setErrorMessage("");
          setDate("");
          setTime("");
          setDepartment("");
        })
        .catch((error) => {
          console.error("Error booking appointment: ", error);
          setErrorMessage(
            "An error occurred while booking the appointment. Please try again later."
          );
          setSuccessMessage("");
        });
    } else {
      // If the user is not signed in, display an error message
      setErrorMessage("You must be signed in to book an appointment.");
      setSuccessMessage("");
    }
  }

  return (
    <div className='background '>
      <br />
      <br />
       <div className="container mx-auto ">
      <h2 className="text-2xl font-bold centxt">Book Appointment</h2>
      <br />
      <form onSubmit={handleSubmit} class="itemms">
      
        <div className="form-control">
          <label className="label">Date</label>
          <input
            className="input input-bordered"
            type="date"
            value={date}
            onChange={handleDateChange}
            required
          />
        </div>

        <br />

        <div className="form-control ">
          <label className="label">Time</label>
          <input
            className="input input-bordered"
            type="time"
            value={time}
            onChange={handleTimeChange}
            required
          />
        </div>

        <br />

        <div className="form-control ">
          <label className="label">Department</label>
          <input
            className="input input-bordered"
            type="text"
            value={department}
            onChange={handleDepartmentChange}
            required
          />
        </div>
       
        
        <div className="form-control mt-4 btn">
        
          <button className="btn btn-primary w-full" type="submit">
            Book Appointment
           
          </button>
          
        </div>
        
       
      </form>
      <br/>
      <div class="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
  <div class="flex">
    <div class="py-1"><svg class="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
    <div>
      <p class="font-bold">{successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}</p>
      
      <br /><br />
      
    </div>
    </div>
    </div>
    </div>
    </div>
    
  );
}
