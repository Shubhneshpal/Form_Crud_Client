import { FETCH_API_FAILIOR, FETCH_API_REQUEST, FETCH_API_SUCCESS } from "../ConstantType/constantType";
import axios from "axios";

const fetch_api_request = ()=>{
    return {type:FETCH_API_REQUEST}
}
const fetch_api_success = (data)=>{
    return {type:FETCH_API_SUCCESS,payload:data}
}
const fetch_api_failior = (error)=>{
    return {type:FETCH_API_FAILIOR,payload:error}
}

export const fetch_api_call = ()=>{
    return (dispatch)=>{
        dispatch(fetch_api_request)
        var api = axios.get('https://dummyjson.com/products')
        api.then((response)=>{
            var data = response.data
            // console.log(data)
            dispatch(fetch_api_success(data))
        },(error)=>{
            var err = error.massage
            dispatch(fetch_api_failior(err))
        })
    }
}

// https://food-g-app.web.app/shop/best-foods