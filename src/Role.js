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

var ea = JSON.parse(window.localStorage.getItem('menus'));

for (var i = 0; i < ea.length; i++) {
    
    let componentname               = require(`@/pages/${ea[i].menu_component}.vue`).default;
   
    if(ea[i].menu_app == 1){
        let componentchildform      = require(`@/pages/${ea[i].menu_name}/Form.vue`).default;
        let componentchilddashboard = require(`@/pages/${ea[i].menu_name}/Dashboard.vue`).default;
        setmenus.push(
            {
                path: ea[i].menu_controller, 
                component : componentname ,
                name : ea[i].menu_name,
                redirect: '/app/'+ea[i].menu_controller+'/dashboard',
                children: [
                    {
                      path: 'form/:mode/:id',
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
    }else if(ea[i].menu_app == 2){
        setmenus.push(
            {
                path: ea[i].menu_controller+'-:analyticsid', 
                component : componentname ,
                name : ea[i].menu_name
            }
        )
    }else{
        setmenus.push(
            {
                path: ea[i].menu_controller, 
                component : componentname ,
                name : ea[i].menu_name
            }
        )
    }
    
}
// eslint-disable-next-line no-console
console.log(setmenus);

export default setmenus;