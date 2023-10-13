import { FETCH_API_FAILIOR, FETCH_API_REQUEST, FETCH_API_SUCCESS } from "../ConstantType/constantType"


const initial_states = {
    loading_product:false,
    data_product:[],
    error_product:'',
}
export const reducer = (state = initial_states,action)=>{
    if(action.type==FETCH_API_REQUEST){
        return {...state,loading_product:true}
    }else if(action.type==FETCH_API_SUCCESS){
        return {...state, loading_product:false,data_product:action.payload}
    }else if(action.type==FETCH_API_FAILIOR){
        return {...state,loading_product:false,error_product:action.payload}
    }else{
        return state
    }

}