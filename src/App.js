import "./styles.css";
import React from "react";

export default function App() {
  const [inputs, setInput] = React.useState({
    userName: "",
    pass: ""
  });
  //  const [msgs, setMessages] = React.useState({});
  const [error, setError] = React.useState({});
  const [successMsg, setSuccessMsg] = React.useState("");
  let emailRef = React.useRef();
  let passRef = React.useRef();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((inputs) => ({
      ...inputs,
      [name]: value
    }));
    name === "userName" ? emailRef.current.focus() : passRef.current.focus();
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setError({});
      // alert("Form is submitted successfully");
      setSuccessMsg("Logged In Successfully");
    }
  };
  const validateForm = () => {
    let inputFields = inputs;
    let error = {};
    let isValid = true;
    let emailreg = new RegExp(
      "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
    );
    if (!emailreg.test(inputFields.userName)) {
      // if (inputFields.userName.indexOf("@") === -1) {
      isValid = false;
      error["userName"] = "UserName is not valid";
    }
    if (inputFields.pass.length < 6 || inputFields.pass.length > 15) {
      isValid = false;
      error["pass"] = "Password is not valid";
    }
    if (!isValid) setError(error);
    return isValid;
  };
  return (
    <div className="App">
      <h3>Login Form</h3>
      <Modal showMsg={successMsg} closeModal={() => setSuccessMsg("")} />
      <label>UserName : </label>
      <input
        type="text"
        name="userName"
        onChange={handleChange}
        value={inputs.userName}
        className="username"
        ref={emailRef}
        required
        // onBlur={() => validateForm("userName")}
      />
      <br />
      {error.userName != "" && <p>{error.userName}</p>}
      <label>Password : </label>
      <input
        type="password"
        name="pass"
        onChange={handleChange}
        value={inputs.pass}
        ref={passRef}
        required
      />
      <br />
      {error.pass != "" && <p>{error.pass}</p>}
      <input
        type="button"
        value="Submit"
        className="btn"
        onClick={handleClick}
      />
    </div>
  );
}

const Modal = (props) => {
  return props.showMsg !== "" ? (
    <div className="modal" onClick={props.closeModal}>
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Login Success</h4>
        </div>
        <div className="modal-body">{props.showMsg}</div>
        <div className="modal-footer">
          <button className="btn" onClick={props.closeModal}>
            Close
          </button>
        </div>
      </div>
    </div>
  ) : null;
};
