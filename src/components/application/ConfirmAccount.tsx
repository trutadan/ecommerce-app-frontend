import { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/images/logo.png";
import { BACKEND_API_URL } from "../../constants";

const ConfirmRegisterPage = () => {
  const navigate = useNavigate();

  const [confirmationCode, setConfirmationCode] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const handleCodeChange = (index: number, value: string) => {
    const newCode = [...confirmationCode];
    newCode[index] = value;
    setConfirmationCode(newCode);

    if (value.length === 1 && index < confirmationCode.length - 1) {
      const nextInput = document.getElementById(
        `confirmation-code-${index + 1}`
      );
      nextInput?.focus();
    }
  };

  const handleCodeKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === "Backspace" && !confirmationCode[index]) {
      const previousInput = document.getElementById(
        `confirmation-code-${index - 1}`
      );
      previousInput?.focus();
    }
    if (event.key === "ArrowLeft" && index > 0) {
      const previousInput = document.getElementById(
        `confirmation-code-${index - 1}`
      );
      previousInput?.focus();
    }
    if (event.key === "ArrowRight" && index < confirmationCode.length - 1) {
      const nextInput = document.getElementById(
        `confirmation-code-${index + 1}`
      );
      nextInput?.focus();
    }
  };

  const handleConfirmClick = async () => {
    const code = confirmationCode.join("");
    try {
      const response = await axios.get(
        `${BACKEND_API_URL}/register/confirm/${code}`,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      navigate("/");
    } catch (error: unknown) {
      const errorMessage = (error as Error).message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  const handleResendClick = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_API_URL}/register/resend-confirmation/`,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
    } catch (error: unknown) {
      const errorMessage = (error as Error).message || "An error occurred";
      toast.error(errorMessage);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ToastContainer></ToastContainer>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          backgroundColor: "white",
          padding: "16px",
          boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.2)",
          marginBottom: 5,
        }}
      >
        <Link to="/" style={{ marginRight: "auto" }}>
          <img src={logo} alt="Logo" height="40" />
        </Link>
      </Box>
      <h1>Confirm your account</h1>
      <p>Enter the 6-digit code we sent to your email address:</p>
      <div style={{ display: "flex", alignItems: "center" }}>
        {confirmationCode.map((value, index) => (
          <TextField
            key={index}
            id={`confirmation-code-${index}`}
            value={value}
            onChange={(event) => handleCodeChange(index, event.target.value)}
            onKeyDown={(event) => handleCodeKeyDown(index, event)}
            variant="outlined"
            size="small"
            style={{ margin: "0 4px" }}
            inputProps={{
              maxLength: 1,
              style: {
                textAlign: "center",
                fontSize: 24,
                width: "40px",
                height: "48px",
              },
            }}
          />
        ))}
      </div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleConfirmClick}
        style={{ marginTop: 16 }}
      >
        Confirm
      </Button>
      <p>
        Didn't receive the code?{" "}
        <a href="#" onClick={handleResendClick}>
          Resend now
        </a>
      </p>
    </div>
  );
};

export default ConfirmRegisterPage;
