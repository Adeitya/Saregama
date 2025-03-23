import React, { useRef, useState, useEffect } from "react";
import { emailRegex, nameRegex, passwordRegex } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, signInWithGoogle } from "../utils/firebase";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addUserDetails } from "../store/slices/userSlice";
import { LOGO_URL } from "../utils/constants";
import { onAuthStateChanged } from "firebase/auth";
import { setShowLoaderFlag } from "../store/slices/configSlice";
import Loader from "./Loader";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [inputErrorState, setInputErrorState] = useState({
    name: "",
    email: "",
    password: "",
    apiErrorMsg: "",
  });

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setInputErrorState({
      name: "",
      email: "",
      password: "",
      apiErrorMsg: "",
    });
  };

  const showLoaderFlag = useSelector((store) => store.config.showLoaderFlag);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setShowLoaderFlag(false));
        navigate("/browse");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleContinueGoogle = async () => {
    const loggedInUser = await signInWithGoogle();
    if (loggedInUser) {
      dispatch(
        addUserDetails({
          uId: loggedInUser.uid,
          email: loggedInUser.email,
          displayName: name.current.value,
        })
      );
    }
  };

  const handleButtonClick = async () => {
    if (
      !inputErrorState.email &&
      !inputErrorState.password &&
      email.current.value &&
      password.current.value
    ) {
      dispatch(setShowLoaderFlag(true));
      if (isSignInForm) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
          );
          dispatch(
            addUserDetails({
              uId: userCredential.user.uid,
              email: userCredential.user.email,
              displayName: name.current.value,
            })
          );
        } catch {
          dispatch(setShowLoaderFlag(false));
          setInputErrorState({
            ...inputErrorState,
            apiErrorMsg: "User Not Found (Invalid Credential).",
          });
        }
      } else {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
          );
          dispatch(
            addUserDetails({
              uId: userCredential.user.uid,
              email: userCredential.user.email,
              displayName: name.current.value,
            })
          );
        } catch {
          dispatch(setShowLoaderFlag(false));
          setInputErrorState({
            ...inputErrorState,
            apiErrorMsg: "Email already in use.",
          });
        }
      }
    } else {
      setInputErrorState({
        ...inputErrorState,
        email:
          email.current.value && emailRegex.test(email.current.value)
            ? ""
            : "Please enter a valid email address.",
        password:
          password.current.value && passwordRegex.test(password.current.value)
            ? ""
            : "Password must be at least 8 characters long, with an uppercase letter, a number, and a special character.",
      });
    }
  };
  return (
    <div className="bg-gradient-to-t from-black h-screen w-full overflow-y-scroll">
      <div className="flex justify-center h-screen bg-gradient-to-b from-black">
        <div className="my-8 py-8 md:w-1/2 w-full bg-gradient-to-b from-black rounded-lg flex flex-col items-center md:px-20 px-8">
          <img src={LOGO_URL} alt="logo" className="h-10" />
          <p className="text-white md:text-4xl text-xl font-bold mt-2">
            {isSignInForm ? "Log In" : "Sign up"} to Saregama
          </p>
          <div
            className="flex flex-row gap-6 border border-solid border-gray-400 rounded-full py-2 px-8 my-8 cursor-pointer hover:border-white"
            onClick={handleContinueGoogle}
          >
            <img
              src="https://static.vecteezy.com/system/resources/previews/022/613/027/non_2x/google-icon-logo-symbol-free-png.png"
              alt="g-icon bg-black"
              className="md:h-8 h-6"
            />
            <p className="text-white md:text-lg text-sm font-bold">
              {isSignInForm ? "Continue" : "Sign up"} with Google
            </p>
          </div>
          <div className="border border-solid border-gray-600 w-full" />
          <div className="w-full mt-8 md:px-32 px-8">
            <form onSubmit={(e) => e.preventDefault()} className=" text-white">
              {!isSignInForm && (
                <input
                  type="text"
                  ref={name}
                  placeholder="Name"
                  className={`p-4 mb-4 w-full bg-transparent hover:border-white border rounded-md ${
                    inputErrorState.name
                      ? "focus:outline-none border-red-600"
                      : "focus:outline-white border-gray-400"
                  }`}
                  onBlur={() =>
                    !nameRegex.test(name.current.value)
                      ? setInputErrorState({
                          ...inputErrorState,
                          name: "Please enter a valid name.",
                        })
                      : setInputErrorState({
                          ...inputErrorState,
                          name: "",
                        })
                  }
                  onFocus={() =>
                    setInputErrorState({
                      ...inputErrorState,
                      name: "",
                    })
                  }
                />
              )}
              {inputErrorState.name && (
                <p className="text-red-600 -mt-2 mb-4 text-xs">
                  ❗️{inputErrorState.name}
                </p>
              )}
              <input
                type="text"
                ref={email}
                placeholder="Email Address"
                className={`p-4 mb-4 w-full bg-transparent border rounded-md hover:border-white ${
                  inputErrorState.email
                    ? "focus:outline-none border-red-600"
                    : "focus:outline-white border-gray-400"
                }`}
                onBlur={() =>
                  !emailRegex.test(email.current.value)
                    ? setInputErrorState({
                        ...inputErrorState,
                        email: "Please enter a valid email address.",
                      })
                    : setInputErrorState({
                        ...inputErrorState,
                        email: "",
                      })
                }
                onFocus={() =>
                  setInputErrorState({
                    ...inputErrorState,
                    email: "",
                    apiErrorMsg: "",
                  })
                }
              />
              {inputErrorState.email && (
                <p className="text-red-600 -mt-2 mb-4 text-xs">
                  ❗️{inputErrorState.email}
                </p>
              )}
              <input
                type="text"
                ref={password}
                placeholder="Password"
                className={`p-4 mb-4 w-full bg-transparent rounded-md border hover:border-white ${
                  inputErrorState.password
                    ? "border-red-600 focus:outline-none"
                    : "border-gray-400  focus:outline-white"
                }`}
                onBlur={() =>
                  !passwordRegex.test(password.current.value)
                    ? setInputErrorState({
                        ...inputErrorState,
                        password:
                          "Password must be at least 8 characters long, with an uppercase letter, a number, and a special character.",
                      })
                    : setInputErrorState({
                        ...inputErrorState,
                        password: "",
                      })
                }
                onFocus={() =>
                  setInputErrorState({
                    ...inputErrorState,
                    password: "",
                    apiErrorMsg: "",
                  })
                }
              />
              {inputErrorState.password && (
                <p className="text-red-600 -mt-2 mb-4 text-xs">
                  ❗️{inputErrorState.password}
                </p>
              )}
              {showLoaderFlag ? (
                <Loader />
              ) : (
                inputErrorState.apiErrorMsg && (
                  <p className="text-red-600 -mt-2 mb-4 text-xs">
                    ❗️{inputErrorState.apiErrorMsg}
                  </p>
                )
              )}
              <button
                className="bg-green-500 py-3 w-full rounded-full text-black font-bold cursor-pointer hover:bg-green-400 hover:text-lg"
                onClick={handleButtonClick}
              >
                {isSignInForm ? "Log In" : "Sign Up"}
              </button>
              <p className="mt-4 text-gray-400">
                {isSignInForm ? "New to Saregama?" : "Already a User?"}{" "}
                <span
                  className="text-white cursor-pointer underline hover:text-green-500"
                  onClick={toggleSignInForm}
                >
                  {isSignInForm ? "Sign up now." : "Log in now."}
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
