import axios from 'axios';
import TablesBasicPage from '@/pages/Tables/Basic';
import { async } from 'q';

const ar = [];


    let res =  axios.get('http://localhost:8000/api/getcompanies?menu=true');
    //console.log(res);
    console.log({
        path: 'tables',
        name: 'TablesBasicPage',
        component: TablesBasicPage,
      })
      var obj = JSON.parse('{ "name":"John", "age":30, "city":"New York"}'); 
     // console.log(obj)
     res.then((result) => {
        // console.log(1);
             window.localStorage.setItem('menus',JSON.stringify(result.data.data));
      })
      
        // console.log(window.localStorage.getItem('menus'));
        // console.log(JSON.parse(window.localStorage.getItem('menus')));
        var ea = ar.push(JSON.parse(window.localStorage.getItem('menus')));
        console.log(ea);
        // ea.forEach(element => {
        //     console.log(element);
        // });
export default [
    // window.localStorage.getItem('menus')
  ]