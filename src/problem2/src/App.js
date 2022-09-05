import "./index.css";
import { useState } from "react";
import { ethers } from "ethers";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [formValue, setFormValue] = useState({
    address: "",
    number: "",
    OTP: "",
  });
  const [validAddress, setValidAddress] = useState(false);
  const [addressMessage, setAddressMessage] = useState("");
  const [addressShake, setAddressShake] = useState(false);
  const [validNumber, setValidNumber] = useState(false);
  const [numberMessage, setNumberMessage] = useState(false);
  const [numberShake, setNumberShake] = useState(false);
  const [validOTP, setValidOTP] = useState(false);
  const [OTPMessage, setOTPMessage] = useState("");
  const [OTPShake, setOTPShake] = useState(false);

  const handleChange = (e) => {
    setFormValue((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });

    if (e.target.name === "address") {
      if (e.target.value.length === 0) {
        setValidAddress(false);
        setAddressMessage("Please key in address");
        return;
      }

      if (!ethers.utils.isAddress(e.target.value)) {
        setValidAddress(false);
        setAddressMessage("Invalid Address");
        return;
      }

      setValidAddress(true);
      setAddressMessage("Valid Address");
      setAddressShake(false);
    }

    if (e.target.name === "number") {
      const re = /^([0-9]+\.?[0-9]*|\.[0-9]+)$/;
      if (Number(e.target.value) === 0) {
        setValidNumber(false);
        setNumberMessage("Please key in number");
        return;
      }
      if (!re.test(e.target.value)) {
        setValidNumber(false);
        setNumberMessage("Please key in valid number");
        return;
      }

      setValidNumber(true);
      setNumberMessage("Valid");
      setNumberShake(false);
    }

    if (e.target.name === "OTP") {
      const re = /^[0-9]+$/;

      if (e.target.value.length === 0) {
        setValidOTP(false);
        setOTPMessage("Please key in OTP");
        return;
      }

      if (!re.test(e.target.value)) {
        setValidOTP(false);
        setOTPMessage("OTP only contains digits");
        return;
      }

      if (e.target.value.length !== 6) {
        setValidOTP(false);
        setOTPMessage("OTP contains 6 digits");
        return;
      }

      setValidOTP(true);
      setOTPMessage("Success");
      setOTPShake(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validAddress) {
      setAddressShake(true);
    }
    if (!validNumber) {
      setNumberShake(true);
    }
    if (!validOTP) {
      setOTPShake(true);
    }
    if (validAddress && validNumber && validOTP) {
      toast.success("Successfully sent!");
      setFormValue({
        address: "",
        number: "",
        OTP: "",
      });
      setAddressMessage("");
      setNumberMessage("");
      setOTPMessage("");
    }
  };

  // useEffect(() => {
  //   setAddressShake(false);
  //   setNumberShake(false);
  //   setOTPShake(false);
  // }, [OTPShake, addressShake, numberShake]);

  return (
    <div className="container">
      <form noValidate onSubmit={(e) => e.preventDefault()}>
        <div className="item">
          <input
            id="input-address"
            required
            onChange={handleChange}
            name="address"
            value={formValue.address}
            className={addressShake ? "shake" : ""}
          />
          <label htmlFor="input-address">ETH ADDRESS</label>
          {validAddress ? (
            <span className="success">{addressMessage}</span>
          ) : (
            <span className="error">{addressMessage}</span>
          )}
        </div>
        <div className="item">
          <input
            id="input-amount"
            required
            onChange={handleChange}
            name="number"
            value={formValue.number}
            className={numberShake ? "shake" : ""}
          />
          <label htmlFor="input-amount">AMOUNT TO SEND</label>
          {validNumber ? (
            <span className="success">{numberMessage}</span>
          ) : (
            <span className="error">{numberMessage}</span>
          )}
        </div>
        <div className="item">
          <input
            type="text"
            id="input-otp"
            required
            onChange={handleChange}
            name="OTP"
            value={formValue.OTP}
            className={OTPShake ? "shake" : ""}
          />
          <label htmlFor="input-otp">OTP AUTHENTICATION</label>
          {validOTP ? (
            <span className="success">{OTPMessage}</span>
          ) : (
            <span className="error">{OTPMessage}</span>
          )}
        </div>

        <button type="submit" onClick={handleSubmit}>
          SEND TOKENS
        </button>
      </form>
      <Toaster />
    </div>
  );
}

export default App;
