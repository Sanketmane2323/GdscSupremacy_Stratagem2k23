import { useRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { auth, db } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, collection, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

import Header from "../partials/Header";
import Banner from "../partials/Banner";

export default function SignUp() {
  const { register: signUpRegister, handleSubmit: handleSignUpSubmit } =
    useForm();

  const usersRef = collection(db, "users");

  const faceio = useRef();

  useEffect(() => {
    faceio.current = new faceIO("fioae1a6");
  }, []);

  const handleFaceEnroll = async (email) => {
    try {
      let response = await faceio.current.enroll({
        locale: "auto",
        payload: {
          email: email,
        },
      });
      return response;
    } catch (error) {
      return error;
    }
  };

  const onSignUpSubmit = async (data) => {
    console.log(data);

    const faceRes = await handleFaceEnroll(data.email);
    const userRes = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    const userDoc = await setDoc(doc(db, "users", auth.currentUser.uid), {
      email: auth.currentUser.email,
      facialId: faceRes.facialId,
      gender: faceRes.details.gender,
      age: faceRes.details.age,
    });

    console.log(faceRes, userRes, userDoc);

    handleFaceEnroll()
      .then((faceRes) => {
        console.log(faceRes);

        // Create user
        createUserWithEmailAndPassword(auth, data.email, data.password)
          .then((userRes) => {
            console.log("User: ", userRes);
            console.log("Signed Up");

            // Add user data
            doc(usersRef, auth.currentUser.uid, {
              email: auth.currentUser.email,
              facialId: faceRes.facialId,
              gender: faceRes.details.gender,
              age: faceRes.details.age,
              blood: data.blood,
              address: data.address,
              phone: data.phone,
            })
              .then((res) => {
                alert("Couldn't create doc");
              })
              .catch((err) => {
                console.error("Failed to add user doc: ", err);
              });
          })
          .catch((err) => {
            console.error("Failed to create user", err);
            alert(err.message);
          });
      })
      .catch((err) => {
        console.error("Failed to authenticate face: ", err);
      });
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1">Welcome.</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={handleSignUpSubmit(onSignUpSubmit)}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="name"
                      >
                        Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your name"
                        required
                        {...signUpRegister("name")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Email <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your email address"
                        required
                        {...signUpRegister("email")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="password"
                      >
                        Password <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your password"
                        required
                        {...signUpRegister("password")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="age"
                      >
                        Age <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="age"
                        type="number"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your age"
                        required
                        {...signUpRegister("age")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="blood"
                      >
                        Blood Group <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="blood"
                        type="text"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your blood group"
                        required
                        {...signUpRegister("blood")}
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="address"
                      >
                        Address <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="address"
                        type="text"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your address"
                        required
                        {...signUpRegister("address")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="phone"
                      >
                        Phone <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="phone"
                        type="phone"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your phone"
                        required
                        {...signUpRegister("phone")}
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
                        Sign up
                      </button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 text-center mt-3">
                    By creating an account, you agree to the{" "}
                    <a className="underline" href="#0">
                      terms & conditions
                    </a>
                    , and our{" "}
                    <a className="underline" href="#0">
                      privacy policy
                    </a>
                    .
                  </div>
                </form>
                <div className="flex items-center my-6">
                  <div
                    className="border-t border-gray-300 flex-grow mr-3"
                    aria-hidden="true"
                  ></div>
                  <div className="text-gray-600 italic">Or</div>
                  <div
                    className="border-t border-gray-300 flex-grow ml-3"
                    aria-hidden="true"
                  ></div>
                </div>
                <form>
                  <div className="flex flex-wrap -mx-3 mb-3">
                    <div className="w-full px-3">
                      <button className="btn px-0 text-white bg-gray-900 hover:bg-gray-800 w-full relative flex items-center">
                        <svg
                          className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7.95 0C3.578 0 0 3.578 0 7.95c0 3.479 2.286 6.46 5.466 7.553.397.1.497-.199.497-.397v-1.392c-2.187.497-2.683-.993-2.683-.993-.398-.895-.895-1.193-.895-1.193-.696-.497.1-.497.1-.497.795.1 1.192.795 1.192.795.696 1.292 1.888.895 2.286.696.1-.497.298-.895.497-1.093-1.79-.2-3.578-.895-3.578-3.975 0-.895.298-1.59.795-2.087-.1-.2-.397-.994.1-2.087 0 0 .695-.2 2.186.795a6.408 6.408 0 011.987-.299c.696 0 1.392.1 1.988.299 1.49-.994 2.186-.795 2.186-.795.398 1.093.199 1.888.1 2.087.496.596.795 1.291.795 2.087 0 3.08-1.889 3.677-3.677 3.875.298.398.596.895.596 1.59v2.187c0 .198.1.497.596.397C13.714 14.41 16 11.43 16 7.95 15.9 3.578 12.323 0 7.95 0z" />
                        </svg>
                        <span className="flex-auto pl-16 pr-8 -ml-16">
                          Continue with GitHub
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3">
                    <div className="w-full px-3">
                      <button className="btn px-0 text-white bg-red-600 hover:bg-red-700 w-full relative flex items-center">
                        <svg
                          className="w-4 h-4 fill-current text-white opacity-75 flex-shrink-0 mx-4"
                          viewBox="0 0 16 16"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M7.9 7v2.4H12c-.2 1-1.2 3-4 3-2.4 0-4.3-2-4.3-4.4 0-2.4 2-4.4 4.3-4.4 1.4 0 2.3.6 2.8 1.1l1.9-1.8C11.5 1.7 9.9 1 8 1 4.1 1 1 4.1 1 8s3.1 7 7 7c4 0 6.7-2.8 6.7-6.8 0-.5 0-.8-.1-1.2H7.9z" />
                        </svg>
                        <span className="flex-auto pl-16 pr-8 -ml-16">
                          Continue with Google
                        </span>
                      </button>
                    </div>
                  </div>
                </form>
                <div className="text-gray-600 text-center mt-6">
                  Already using Simple?{" "}
                  <Link
                    to="/signin"
                    className="text-blue-600 hover:underline transition duration-150 ease-in-out"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Banner />
    </div>
  );
}
