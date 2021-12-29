import "./signin.css";
import { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

const Signin = () => {
  const [validation, setValidation] = useState("");
  const navigate = useNavigate();
  const { signInGoogle, signIn } = useContext(UserContext);

  const inputs = useRef([]);

  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };
  const formRef = useRef();

  const handleForm = async (e) => {
    e.preventDefault();
    console.log(inputs);
    try {
      await signIn(inputs.current[0].value, inputs.current[1].value);
      // à tester
      // formRef.current.reset();
      setValidation("");
      navigate("/private/private-dashboard");
    } catch {
      setValidation("Wopsy, email and/or password incorrect");
    }
  };

  const handleSignin = async () => {
    try {
      await signInGoogle().then((response) => {
        navigate("/private/dashboard");
      });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="global-container flex-container">
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
          <button>Connect</button>
        </form>
        <p>{validation}</p>
        <button onClick={handleSignin}>Signin with google</button>
      </div>
    </div>
  );
};

export default Signin;
