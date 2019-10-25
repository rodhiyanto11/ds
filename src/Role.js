import axios from 'axios';
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.baseURL = window.localStorage.getItem('base_url');
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
axios.defaults.withCredentials = true;
const setmenus = [];

 let res = axios.get('http://127.0.0.1:8000/api/getcompanies?menu=true');

res.then((result) => {
    window.localStorage.setItem('menus', JSON.stringify(result.data.data));
})


if(window.localStorage.getItem('menus') !== null){
    var ea = JSON.parse(window.localStorage.getItem('menus'));
    //console.log(ea);
    for (var i = 0; i < ea.length; i++) {
    
        let componentname               = require(`@/pages/${ea[i].menu_component}.vue`).default;
       
        if(ea[i].menu_target == 1){
            let componentchildform      = require(`@/pages/${ea[i].menu_name}/Form.vue`).default;
            let componentchilddashboard = require(`@/pages/${ea[i].menu_name}/Dashboard.vue`).default;
            setmenus.push(
                {
                    path: ea[i].menu_path, 
                    component : componentname ,
                    name : ea[i].menu_name,
                    redirect: '/app/'+ea[i].menu_path+'/dashboard',
                    children: [
                        {
                          path: 'action/:mode/:id',
                          name: ea[i].menu_name+'From',
                          component:  componentchildform,
                        },
                        {   
                          path: 'dashboard',
                          name: ea[i].menu_name+'Dashboard',
                          component: componentchilddashboard,
                        }
                      ]
    
                }
            )
        }else if(ea[i].menu_target == 2){
            setmenus.push(
                {
                    path: ea[i].menu_path, 
                    component : componentname ,
                    name : ea[i].menu_name
                }
            )
        }else{
            setmenus.push(
                {
                    path: ea[i].menu_path, 
                    component : componentname ,
                    name : ea[i].menu_name
                }
            )
        }
        
    }
   // export default window.localStorage.getItem('authenticated') === '1' ?  setmenus : '';
}else{
    
}
export default setmenus;
// if(window.localStorage.getItem('menus') == null){
//     location.reload();
// }
// eslint-disable-next-line no-console
// console.log(setmenus);
// //console.log(setmenus);
// console.log(window.localStorage.getItem('authenticated'));
// console.log(window.localStorage.getItem('authenticated') === '1' ?  setmenus : '');
