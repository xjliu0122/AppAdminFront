import * as Constants from '../constant/Constant'
import axios from 'axios'

export const getServerUrl = () => {
    return Constants.serverUrl;
}
export const http = ((service) => {
    return axios.create({
      baseURL: getServerUrl() ,
      timeout: 10000,
      headers: {'x-uid': '12312'}
    });    
})
