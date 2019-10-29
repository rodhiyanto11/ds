import axios from 'axios';
import { resolve } from 'url';
import { reject } from 'q';

export default{
    state : {},
    getters : {},
    muttations : {},
    actions : {
        REGISTERTABLEAU :({}, payload) => {
            // REGISTER :({commit}, payload) => {
             return new Promise((resolve,reject) => {
                 axios.post('api/analytics/',payload)
                 .then(({data}) => {
                     resolve(data);
                 })
                 .catch(error=>{
                     reject(error);
                 })
             })
         },
         UPDATETABLEAU :({commit}, payload) => {
             // REGISTER :({commit}, payload) => {
              return new Promise((resolve,reject) => {
                  axios.put('api/analytics/'+payload.id,payload)
                  .then(({data}) => {
                      resolve(data);
                  })
                  .catch(error=>{
                      reject(error);
                  })
              })
          },
          DELETETABLEAU : ({commit},payload) => {
              return new Promise((resolve,reject) => {
                 axios.delete('api/analytics/'+payload.id)
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