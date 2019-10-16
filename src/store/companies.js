
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
import { resolve } from 'url';
// eslint-disable-next-line no-unused-vars
import { reject } from 'q';

export default{
    state : {},
    getters : {},
    muttations : {},
    actions : {
      
        // eslint-disable-next-line no-empty-pattern
        GET_COMPANIES :({}, payload) => {
            // REGISTER :({commit}, payload) => {
             return new Promise((resolve,reject) => {
                 axios.get('api/getcompanies',payload)
                 .then(({data}) => {
                     resolve(data);
                 })
                 .catch(error=>{
                     reject(error);
                 })
             })
         }
           
        
    }
}