import React, { useEffect, useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";
import Message from "../Message";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../actions/userAction";

function LoginScreen() {
  const dispatch = useDispatch();
   const navigate = useNavigate(); 
   
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;

  const [message, setMessage] = useState("");

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: null,
    password: null,
  });

  // ================= HANDLE INPUT CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value);
  };

  // ================= VALIDATION =================
  const validateField = (name, value) => {
    let errorMessage = null;

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        errorMessage = "Invalid email format";
      }
    }

    if (name === "password") {
      if (value.length < 6) {
        errorMessage = "Password must be at least 6 characters";
      }
    }

    setFormErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  // ================= CHECK FORM VALID =================
  const isFormValid = () => {
    return (
      Object.values(formErrors).every((error) => error === null) &&
      Object.values(formValues).every((value) => value !== "")
    );
  };

  // ================= CLEAR FORM =================
  const clearForm = () => {
    setFormValues({
      email: "",
      password: "",
    });

    setFormErrors({
      email: null,
      password: null,
    });
  };

  // ================= SUBMIT =================
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(formValues.email, formValues.password));
  };

  // ================= AFTER SUCCESSFUL LOGIN =================
  useEffect(() => {
    if (userInfo) {
      // Optional: show success message for a short time
      setMessage("Login Successful ✅");

      // Clear form
      clearForm();

      // Redirect after 1.5–2 seconds
      const timer = setTimeout(() => {
        setMessage(""); // clear message
        navigate("/"); // redirect to home page
      }, 1500);

      return () => clearTimeout(timer); // cleanup
    }
  }, [userInfo, navigate]);

  return (
    <Container>
      <Row>
        <Col md="3"></Col>

        {loading ? (
          <Loader />
        ) : (
          <Col md="6">
            <Form onSubmit={submitHandler}>
              <br />
              <h3 className="text-center">Login Here</h3>

              {message && (
                <Message variant="success">
                  {message}
                </Message>
              )}

              {error && (
                <Message variant="danger">
                  {error}
                </Message>
              )}

              <Form.Group className="mt-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  placeholder="Enter your Email"
                  isInvalid={!!formErrors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.email}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  placeholder="Enter your Password"
                  isInvalid={!!formErrors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {formErrors.password}
                </Form.Control.Feedback>
              </Form.Group>

              <Button
                className="mt-3"
                variant="success"
                type="submit"
                disabled={!isFormValid()}
              >
                Login
              </Button>
            </Form>

            <Row className="py-3">
              <Col>
                New User? <Link to="/signup">Signup</Link>
              </Col>
            </Row>
          </Col>
        )}

        <Col md="3"></Col>
      </Row>
    </Container>
  );
}

export default LoginScreen;

