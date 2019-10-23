import axios from 'axios';
import { resolve } from 'url';
import { reject } from 'q';

export default{
    state : {},
    getters : {},
    muttations : {},
    actions : {
        REGISTERMENU :({}, payload) => {
            // REGISTER :({commit}, payload) => {
             return new Promise((resolve,reject) => {
                 axios.post('api/menus/',payload)
                 .then(({data}) => {
                     resolve(data);
                 })
                 .catch(error=>{
                     reject(error);
                 })
             })
         },
         UPDATEMENU :({commit}, payload) => {
             // REGISTER :({commit}, payload) => {
              return new Promise((resolve,reject) => {
                  axios.put('api/menus/'+payload.id,payload)
                  .then(({data}) => {
                      resolve(data);
                  })
                  .catch(error=>{
                      reject(error);
                  })
              })
          },
          DELETEMENU : ({commit},payload) => {
              return new Promise((resolve,reject) => {
                 axios.delete('api/menus/'+payload.id)
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