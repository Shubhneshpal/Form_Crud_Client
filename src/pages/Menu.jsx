import React, { useEffect } from 'react'
import Layout from '../Components/Layout';
// import { MenuList } from '../Data/data';
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";

import {useDispatch, useSelector} from "react-redux"
import { fetch_api_call } from '../redux/Actions/Actons';


const Manu = () => {

  var loading = useSelector((state)=>state.loading_product);
  var arr_product = useSelector((state)=>state.data_product);
  var erro = useSelector((state)=>state.error_product);

  var dispatch = useDispatch();

  console.log(arr_product)
  useEffect(()=>{
    if(arr_product==0){
      dispatch(fetch_api_call())
    }
  },[])

  if(loading==true){
    return (
      
        <h2>Product loading....</h2>
      
    )
  }else if(arr_product.length !=0){
    return (
      <Layout>
      <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center",marginTop:'1.5rem' }}>
        {arr_product.products.map((menu,index) => (
          <Card sx={{ maxWidth: "390px", display: "flex", m: 2 }}>
            <CardActionArea>
              <CardMedia
                key={index}
                sx={{ minHeight: "400px", height:'400px', objectFit:'cover' }}
                component={"img"}
                src={menu.thumbnail}
                alt={menu.title}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom component={"div"}>
                  {menu.title}
                </Typography>
                <Typography variant="body2">{menu.description}</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Layout>
    )
  }else{
    return(
      <>
        <h2> Error in a Products loading....</h2>
      </>
    )
  }
 
}

export default Manu
