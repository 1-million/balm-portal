import {axios} from "@/axios/axiosConfig";
const GET_FOCUS_LIST_URL = "getFocusList";
const GET_FOCUS_LIST_API = axios.get(GET_FOCUS_LIST_URL);
export{
    GET_FOCUS_LIST_URL,
    GET_FOCUS_LIST_API
}