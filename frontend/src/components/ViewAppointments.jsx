import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { db } from "../lib/firebase";

export default function ViewAppointments({ userId }) {
  const [appointments, setAppointments] = useState([]);

  function getAppointments() {
    const appointmentsRef = collection(db, "appointments");
    getDocs(query(appointmentsRef, where("userId", "==", userId)))
      .then((querySnapshot) => {
        const appointmentsData = [];
        querySnapshot.forEach((doc) => {
          appointmentsData.push(doc.data());
        });
        setAppointments(appointmentsData);
        console.log("Appointments fetched");
      })
      .catch((error) => {
        console.log("Error getting appointments: ", error);
      });
  }

  useEffect(() => {
    getAppointments();
  }, [userId]);

  return (
    <div>
      <h1 className="text-2xl font-bold my-4">My Appointments</h1>
      <button className="btn" onClick={() => getAppointments()}>
        Refresh
      </button>
      {appointments.length > 0 ? (
        <ul className="flex flex-col">
          {appointments.map((appointment) => (
            <div className="card shadow-xl" key={appointment.id}>
              <div className="card-bod">
                <p>Date: {appointment.date}</p>
                <p>Time: {appointment.time}</p>
                {/* <p>Hospital: {appointment.hospital}</p> */}
              </div>
            </div>
          ))}
        </ul>
      ) : (
        <p>No appointments found</p>
      )}
    </div>
  );
}
