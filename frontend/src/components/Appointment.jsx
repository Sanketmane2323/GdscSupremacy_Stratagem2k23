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
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold">Book Appointment</h2>
      <form onSubmit={handleSubmit}>
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
        <div className="form-control">
          <label className="label">Time</label>
          <input
            className="input input-bordered"
            type="time"
            value={time}
            onChange={handleTimeChange}
            required
          />
        </div>
        <div className="form-control">
          <label className="label">Department</label>
          <input
            className="input input-bordered"
            type="text"
            value={department}
            onChange={handleDepartmentChange}
            required
          />
        </div>
        <div className="form-control mt-4">
          <button className="btn btn-primary w-full" type="submit">
            Book Appointment
          </button>
        </div>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
