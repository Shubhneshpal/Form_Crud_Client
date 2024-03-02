import React, { useEffect, useState } from 'react'
import Table from "react-bootstrap/Table";
import "../Form/style.css";
import {Link, useNavigate } from 'react-router-dom';




const Employe = () => {
    const navigate = useNavigate()
    const [getData, setgetData] = useState([]);

    const toComponentB=(data)=>{
        navigate('/edit/form',{state:{data}});
          }
      // Get Api
  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/forms/get-form-data"
      );
      if (response.ok) {
        const jsondata = await response.json();
        setgetData(jsondata);
      } else {
        console.log("error fetching data");
      }
    } catch (error) {
      console.log("error fetching data", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

    // DELETE API
    const handleDelete = async (id) => {
      try {
        const userConfirom = window.confirm("Are you sure you want to delete?");
        if(userConfirom){     
        const response = await fetch( 
          `http://localhost:5000/api/forms/delete-form-data/${id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
  
        if (response.ok) {               
          console.log("Data deleted successfully");
          // You can update the state or refetch the data if needed
          // setGetdata((prevData) => prevData.filter(item => item._id !== id));
          fetchData();
        } else {
          console.error("Failed to delete data:", response.statusText);
        }
      }
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    };

    const showPdf = (filename) => {
      window.open(`http://localhost:5000/uploads/${filename}`, "_blank", "noreferrer");
      // setPdfFile(`http://localhost:5000/files/${pdf}`)
    };
  return (
    <>

    <div className="addEmploye">
        <Link to={"/form"}><button className='btn01'>addEmploye</button></Link>
    </div>
         <div className="getDataInTable ">
        <Table responsive>
          <thead>
            <tr>
              
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>MobileNO</th>
              <th>Adress</th>
              <th>File</th>
              <th>Action</th>
            </tr>
          </thead>
              
            {getData.map((data, index) => {
              console.log("getData",data)
              return (
                
                <tbody>
                <tr key={index}>
                  <td>{data.Fname}</td>
                  <td>{data.Lname}</td>
                  <td>{data.email}</td>
                  <td>{data.password}</td>
                  <td>{data.MobileNo}</td>
                  <td>{data.adress}</td>
                  <td >
                  {data.file.name}
                  <button className="btn01 btn00" onClick={() => showPdf(data.file.filename)}>Veiw</button>
                  </td>
                  <td className="buttons">
                    <button className="btn01 btn02" onClick={() => handleDelete(data._id)}>Delete</button>
                    
                    <button className="btn01" onClick={()=>{toComponentB(data)}}>Eddite</button>
                  </td>
                </tr>
                </tbody>
              );
            })}
         
        </Table>
      </div>
    </>
  )
}

export default Employe
