import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import { validateForm } from "../Validation/Validate";

const CustomerForm = () => {
  const { data } = useParams();
  console.log("useParams()", useParams());
  const location = useLocation();
  const Navigate = useNavigate();

  console.log("location", location?.state?.data);

  const [formData, setFormData] = useState({
    Fname: "",
    Lname: "",
    email: "",
    password: "",
    MobileNo: "",
    adress: "",
    file: " ",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (location?.state?.data) {
      setFormData({
        ...formData,
        Fname: location?.state?.data.Fname,
        Lname: location?.state?.data.Lname,
        email: location?.state?.data.email,
        password: location?.state?.data.password,
        MobileNo: location?.state?.data.MobileNo,
        adress: location?.state?.data.adress,
        file: location?.state?.data.file,
      });
    }
  }, []);

  // console.log('getData',getData)
  // console.log(formData);
  const handleChange = (e) => {
    if (e.target.name === "file") {
      const file = e.target.files[0];
      console.log("file", file);
      setFormData({ ...formData, [e.target.name]: file });
    } else {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmitFrom = async (e) => {
    e.preventDefault();
    // const newErrors = validateForm(formData);
    // setErrors(newErrors);

    // const isValid = Object.keys(newErrors).length === 0;
    // if (isValid) {
    //   const Data = new FormData();
    //   Data.append("Fname", formData.Fname);
    //   Data.append("Lname", formData.Lname);
    //   Data.append("email", formData.email);
    //   Data.append("password", formData.password);
    //   Data.append("MobileNo", formData.MobileNo);
    //   Data.append("adress", formData.adress);
    //   Data.append("file", formData.file);
    console.log("formData 48", formData);

    try {
      const response = await fetch(
        `http://localhost:5000/api/forms/edit-form-data/${location?.state?.data?._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("UserDAta save successfully:", data);
      } else {
        const errorData = await response.json();
        console.error("Failed to save UserDAta :", errorData);
      }
    } catch (error) {
      console.error("Error during save UserDAta:", error);
    }
    setFormData({
      Fname: "",
      Lname: "",
      email: "",
      password: "",
      MobileNo: "",
      adress: "",
      file: null,
    });

    Navigate('/employee');
    // }
  };

  return (
    <>
      <div className="main-wraper-form">
        <div className="main-form">
          <Form>
            <Row>
              <Form.Group as={Col} className="mb-3" controlId="userName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="Fname"
                  value={formData.Fname}
                  type="text"
                  placeholder="FirstName"
                />
                {/* {errors.Fname && <p style={{color:"red"}}>{errors.Fname}</p>} */}
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="LastUserName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="Lname"
                  value={formData.Lname}
                  type="text"
                  placeholder="LastName"
                />
                {/* {errors.Lname && <p style={{color:"red"}}>{errors.Lname}</p>} */}
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="email"
                  value={formData.email}
                  type="email"
                  placeholder="Enter email"
                />
                {/* {errors.email && <p style={{color:"red"}}>{errors.email}</p>} */}
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="password"
                  value={formData.password}
                  type="password"
                  placeholder="Password"
                />
                {/* {errors.password && <p style={{color:"red"}}>{errors.password}</p>} */}
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} className="mb-3" controlId="mobileNumber">
                <Form.Label>Mobile No.</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="MobileNo"
                  value={formData.MobileNo}
                  type="text"
                  placeholder="Mobile No."
                />
                {/* {errors.MobileNo && <p style={{color:"red"}}>{errors.MobileNo}</p>} */}
              </Form.Group>
              <Form.Group
                as={Col}
                className="mb-3"
                controlId="formGridAddress1"
              >
                <Form.Label>Address</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="adress"
                  value={formData.adress}
                  type="text"
                  placeholder="Address"
                />
                {/* {errors.adress && <p style={{color:"red"}}>{errors.adress}</p>} */}
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="formFileLg" className="mb-3">
                <Form.Label> Choose CV</Form.Label>
                <Form.Control
                  onChange={handleChange}
                  name="file"
                  type="file"
                  size="lg"
                />
                {/* {errors.file && <p className="style01">{errors.file}</p>} */}
              </Form.Group>
            </Row>

            <div className="submitBtn">             
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleSubmitFrom}
                >
                  Submit
                </Button>             
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CustomerForm;
