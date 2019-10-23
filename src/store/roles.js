import axios from 'axios';
import { resolve } from 'url';
import { reject } from 'q';

export default{
    state : {},
    getters : {},
    muttations : {},
    actions : {
        REGISTERROLE :({}, payload) => {
            // REGISTER :({commit}, payload) => {
             return new Promise((resolve,reject) => {
                 axios.post('api/roles/',payload)
                 .then(({data}) => {
                     resolve(data);
                 })
                 .catch(error=>{
                     reject(error);
                 })
             })
         },
         REGISTERROLEMENU :({}, payload) => {
            // REGISTER :({commit}, payload) => {
             return new Promise((resolve,reject) => {
                 axios.post('api/rolemenus/',payload)
                 .then(({data}) => {
                     resolve(data);
                 })
                 .catch(error=>{
                     reject(error);
                 })
             })
         },
         UPDATEROLE :({commit}, payload) => {
             // REGISTER :({commit}, payload) => {
              return new Promise((resolve,reject) => {
                  axios.put('api/roles/'+payload.id,payload)
                  .then(({data}) => {
                      resolve(data);
                  })
                  .catch(error=>{
                      reject(error);
                  })
              })
          },
          DELETEROLE : ({commit},payload) => {
              return new Promise((resolve,reject) => {
                 axios.delete('api/roles/'+payload.id)
                 .then(({data}) => {
                     resolve(data);
                 })
                 .catch(error=>{
                     reject(error);
                 })
              })
          },
          DELETEROLEMENU : ({commit},payload) => {
            return new Promise((resolve,reject) => {
               axios.delete('api/rolemenus/'+payload.id)
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