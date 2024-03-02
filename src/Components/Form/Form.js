import React, { useEffect, useState } from "react";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { validateForm } from "../Validation/Validate";

const CustomerForm = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    Fname: "",
    Lname: "",
    email: "",
    password: "",
    MobileNo: "",
    adress: "",
    file: ""
  });
  
  const [errors, setErrors] = useState({});  
  
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
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0;
    if (isValid) {
      // Create a new FormData object
  const formDatas = new FormData();

  // Append form fields to the FormData object
  formDatas.append('Fname', formData.Fname);
  formDatas.append('Lname', formData.Lname);
  formDatas.append('email', formData.email);
  formDatas.append('password', formData.password);
  formDatas.append('MobileNo', formData.MobileNo);
  formDatas.append('adress', formData.adress);
  // Append the file to the FormData object
  formDatas.append('file', formData.file);


    console.log("formData 48", formData.Fname);
    console.log("formData 48", formData.file);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/forms/submit-form",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set content type to multipart/form-data for file uploads
          },
        }
      );

      console.log('response', response.data); 

      if (response.status === 200) {
            alert("Uploaded Successfully!!!");
            // getPdf();
          }
          navigate('/employee')
     
    } catch (error) {
      alert(error.response.data.error)
      console.error("Error during save UserDAta:", error.response.data.error);
    }

  
    setFormData({
      Fname: "",
      Lname: "",
      email: "",
      password: "",
      MobileNo: "",
      adress: "",
      file: "",
    });
    }
  };



  return (
    <>
    <div className="addEmploye">
        <Link to={"/employee"}><button className='btn01'>View Employee</button></Link>
    </div>
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
                {errors.Fname && <p style={{color:"red"}}>{errors.Fname}</p>}
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
                {errors.Lname && <p style={{color:"red"}}>{errors.Lname}</p>}
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
                {errors.email && <p style={{color:"red"}}>{errors.email}</p>}
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
                {errors.password && <p style={{color:"red"}}>{errors.password}</p>}
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
                {errors.MobileNo && <p style={{color:"red"}}>{errors.MobileNo}</p>}
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
                {errors.adress && <p style={{color:"red"}}>{errors.adress}</p>}
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
                  accept="application/pdf"
                  required
                />
                {errors.file && <p className="style01">{errors.file}</p>}
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
