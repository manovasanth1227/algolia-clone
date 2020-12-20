import React, { useState } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import bcrypt from "bcryptjs";
function Login({ history }) {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [dataBreach, setDataBreach] = useState(false);
  const submitHandler = async (e) => {
    e.preventDefault();
    localStorage.setItem("email", email);
    localStorage.setItem("name", name);
    if (localStorage.getItem("password") === null) {
      history.push("/home");
      const newPassword = await bcrypt.hash(password, 10);
      localStorage.setItem("password", newPassword);
    } else if (localStorage.getItem("password") !== null) {
      const temp = await bcrypt.compare(
        password,
        localStorage.getItem("password")
      );
      if (temp) {
        history.push("/home");
      } else {
        setDataBreach(true);
      }
    }
  };

  return (
    <Container style={{ height: "100vh" }}>
      <Row className="justify-content-md-center" style={{ height: "100vh" }}>
        <Col xs={12} md={6} className=" mt-5">
          {localStorage.getItem("password") === null ||
          localStorage.getItem("email") === null ? (
            <div
              className="text-center "
              style={{ color: "#ff742b", fontSize: "20px" }}
            >
              Register Now
            </div>
          ) : (
            <div
              className="text-center "
              style={{ color: "#ff742b", fontSize: "20px" }}
            >
              Login
            </div>
          )}
          <Form className="mt-4 " onSubmit={submitHandler}>
            {localStorage.getItem("password") === null ||
            localStorage.getItem("email") === null ? (
              <Form.Group controlId="name">
                <Form.Label style={{ color: "#ff742b" }}>
                  <strong>UserName</strong>
                </Form.Label>
                <Form.Control
                  style={{ color: "#828282" }}
                  type="name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter UserName"
                ></Form.Control>
              </Form.Group>
            ) : (
              ""
            )}
            <Form.Group controlId="email">
              <Form.Label style={{ color: "#ff742b" }}>
                <strong>Email Address</strong>
              </Form.Label>
              <Form.Control
                style={{ color: "#828282" }}
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label
                style={dataBreach ? { color: "red" } : { color: "#ff742b" }}
              >
                <strong>{dataBreach ? "Wrong password" : "Password"}</strong>
              </Form.Label>
              <Form.Control
                type="password"
                required
                style={{ color: "#828282" }}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <button className="my-2 px-5 btn btn-warning " type="submit">
              Sign In
            </button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
