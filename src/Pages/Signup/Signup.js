import "./signup.css";
import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const { signUp } = useContext(UserContext);

  const navigate = useNavigate();

  const [validation, setValidation] = useState("");

  const inputs = useRef([]);

  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };
  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();

    if (
      (inputs.current[1].value.length || inputs.current[2].value.length) < 6
    ) {
      setValidation("6 characters min");
      return;
    } else if (inputs.current[1].value !== inputs.current[2].value) {
      setValidation("Passwords do not match");
      return;
    }

    try {
      await signUp(inputs.current[0].value, inputs.current[1].value);
      // formRef.current.reset();
      setValidation("");
      // console.log(cred);
      navigate("/private/private-home");
    } catch (err) {
      if (err.code === "auth/invalid-email") {
        setValidation("Email format invalid");
      }

      if (err.code === "auth/email-already-in-use") {
        setValidation("Email already used");
      }
    }
  };

  return (
    <div className="global-container">
      <div className="card-container">
        <form onSubmit={handleForm} ref={formRef}>
          <label>Email</label>
          <input
            type="email"
            ref={addInputs}
            name="email"
            required
            id="signInEmail"
          />
          <label>Password</label>
          <input
            type="password"
            ref={addInputs}
            name="pwd"
            required
            id="signInPwd"
          />
          <label>Password Confirmation</label>
          <input
            type="password"
            ref={addInputs}
            name="confirmpwd"
            required
            id="signInConfirmPwd"
          />
          <button>Connect</button>
        </form>
        <p>{validation}</p>
        <button>Signin with google</button>
      </div>
    </div>
  );
}

export default Signup;
