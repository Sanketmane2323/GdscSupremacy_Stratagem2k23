import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Appointment from "../components/Appointment";
import ViewAppointments from "../components/ViewAppointments";
import { auth } from "../lib/firebase";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.currentUser) navigate("/");
  }, [auth]);

  return (
    <section>
      <button
        onClick={() => {
          auth.signOut();
          navigate("/");
        }}
        className="btn btn-primary"
      >
        Log Out
      </button>
      <Appointment />
      <ViewAppointments userId={auth.currentUser?.uid} />
    </section>
  );
}
