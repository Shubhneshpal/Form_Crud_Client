import React, { useState } from 'react'
import Layout from '../Components/Layout'
import "../style/Contact.css"  
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const Contact = () => {
  const [adds, setAdds] = useState([]);
  const [data, setData] = useState({
    ID:"",
    Name:"",
    Adress:"",
    MobileNo:""
  })

  console.log(parseInt(data.ID))


function InputValue(e){
  const {name,value} = e.target;
  setData({...data,[name]:value}) 
}

function Add(){
  setAdds((listdata)=>{
    const update = [...listdata,data]
    return update;
  })
}

function Search(e){  
  var sr = search_Click(data.ID)   
  if(sr){
    setData({...data,Name:sr.Name,Adress:sr.Adress,MobileNo:sr.MobileNo})    
  }else{
    alert("ID is not find")
  }   
}

function search_Click(id){  
  var src = adds.find(e=>e.ID==id);
  return src;  
}

function Modify(){
  // var mod = modify_Click(data.ID);
  // if(mod){
  //   setAdds({...adds,Name:mod.Name,Adress:mod.Adress,MobileNo:mod.MobileNo})

  // }
}

// function modify_Click(m){  
//   var srkp = adds.find(e=>e.ID==m);
//   return srkp;  
// }

function Delete(i){
  // alert('click success')
  var del = delete_Click(data.ID);
  alert(del)
  setAdds(...adds)
  
}
console.log(adds.length)

function delete_Click(s){
  for(let i= 0; i<adds.length; i++){
    if(adds[i].ID==s){
      adds.splice(i,1)
      return "customer deleted successfuly";
    }
  }
  return "id not found"  
}




  return (
    <Layout>
    <Box sx={{ my: 5, ml: 10, "& h4": { fontWeight: "bold", mb: 2 } }}>
      <Typography variant="h4">Contact My Resturant</Typography>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem odio
        beatae ducimus magni nobis culpa praesentium velit expedita quae,
        corrupti, pariatur inventore laboriosam consectetur modi impedit
        error, repudiandae obcaecati doloribus.
      </p>
    </Box>
    <Box
      sx={{
        m: 3,
        width: "600px",
        ml: 10,
        "@media (max-width:600px)": {
          width: "300px",
        },
      }}
    >
      <TableContainer component={Paper}>
        <Table aria-label="contact table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ bgcolor: "black", color: "white" }}
                align="center"
              >
                Contact Details
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <SupportAgentIcon sx={{ color: "red", pt: 1 }} /> 1800-00-0000
                (tollfree)
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <MailIcon sx={{ color: "skyblue", pt: 1 }} /> help@myrest.com
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <CallIcon sx={{ color: "green", pt: 1 }} /> 1234567890
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>

    <Box>
      <div className="main">
        <div className="input-element">
          <label htmlFor="">ID:</label>
          <input name='ID' value={data.ID} type="text" onChange={InputValue} />
          <label htmlFor="">Name:</label>
          <input name='Name' value={data.Name} type="text" onChange={InputValue} />
          <label  htmlFor="">Adress:</label>
          <textarea name='Adress' value={data.Adress} cols="30" rows="10" onChange={InputValue}></textarea>
          <label htmlFor="">MobileNo:</label>
          <input name='MobileNo' value={data.MobileNo} type="text" onChange={InputValue} />
        </div>
        <div className="input-btn">
          <button onClick={Add}>Add</button>
          <button onClick={Search}>Searh</button>
          <button onClick={Modify}>Modify</button>
          <button onClick={Delete}>Delete</button>
        </div>
        <div className="input-btn">
          <button>First</button>
          <button>Previous</button>
          <button>Next</button>
          <button>Last</button>
        </div>
        <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Adress</th>
              <th>MobileNo</th>
            </tr>
          </thead>
        </table>
          {
            adds.map((item,ind)=>{
              return (
                <table>
                  <tr key={ind}>
                    <td>{item.ID}</td>
                    <td>{item.Name}</td>
                    <td>{item.Adress}</td>
                    <td>{item.MobileNo}</td>
                  </tr>
                </table>
              )
            })
          }
        </div>
      </div>
    </Box>
  </Layout>
  )
}

export default Contact
