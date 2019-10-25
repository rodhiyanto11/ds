
import axios from 'axios';
import { resolve } from 'url';
import { reject } from 'q';

export default{
    state : {},
    getters : {},
    muttations : {},
    actions : {
        LOGIN : ({}, payload) => {
            //LOGIN : ({commit}, payload) => {
            return new Promise((resolve,reject) => {
                axios.post('api/login',payload)
                .then(({data,status}) => {
                    if(status === 201 || status === 200){
                        localStorage.setItem('token',data.token);
                        
                        window.localStorage.setItem('authenticated',1);
                        localStorage.setItem('division_id',data.data.division_id);
                        localStorage.setItem('fullname',data.data.name);
                        //localStorage.setItem('commit',commit);
                        //console.log(localStorage.getItem('fullname'));
                        axios.defaults.headers.common['Authorization'] = 'Bearer '+data.token;
                        
                        resolve(data);
                    }
                })
                .catch(error => {
                    reject(error);
                })
            })
        },
        REFRESH_TOKEN : ()=> {
            return new Promise((resolve,reject) => {
                axios.post('api/refresh')
                .then(({data})=>{
                    localStorage.setItem('token',data.refresh_token);
                    axios.defaults.headers.common['Authorization'] = 'Bearer '+data.refresh_token;
                    resolve(data.refresh_token);
                })
                .catch(error=>{
                    reject(error);
                }) 
            })
        },
        REGISTER :({}, payload) => {
           // REGISTER :({commit}, payload) => {
            return new Promise((resolve,reject) => {
                axios.post('api/users/',payload)
                .then(({data}) => {
                    resolve(data);
                })
                .catch(error=>{
                    reject(error);
                })
            })
        }, REGISTERUSERROLE :({}, payload) => {
            // REGISTER :({commit}, payload) => {
             return new Promise((resolve,reject) => {
                 axios.post('api/userroles/',payload)
                 .then(({data}) => {
                     resolve(data);
                 })
                 .catch(error=>{
                     reject(error);
                 })
             })
         },
        UPDATEUSER :({commit}, payload) => {
            // REGISTER :({commit}, payload) => {
             return new Promise((resolve,reject) => {
                 axios.put('api/users/'+payload.id,payload)
                 .then(({data}) => {
                     resolve(data);
                 })
                 .catch(error=>{
                     reject(error);
                 })
             })
         },
         DELETEUSER : ({commit},payload) => {
             return new Promise((resolve,reject) => {
                axios.delete('api/userroles/'+payload.id)
                .then(({data}) => {
                    resolve(data);
                })
                .catch(error=>{
                    reject(error);
                })
             })
         },
         DELETEUSERROLE : ({commit},payload) => {
            return new Promise((resolve,reject) => {
               axios.delete('api/userroles/'+payload.id)
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