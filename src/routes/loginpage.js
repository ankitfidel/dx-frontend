import React from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar,Row, Col, Button,Card, Table, Modal,Select, Switch, Radio, Form, Input, Checkbox } from 'antd'
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
import reqwest from 'reqwest';
import styles from './login.less'
const axios = require('axios');
import cookie from 'react-cookies'
import { axiosrequest } from './axiosrequest';
import { config } from '../utils'
import { browserHistory, hashHistory } from 'dva/router';
const data = [];


function checkbox(e) {
  console.log(`checked = ${e.target.checked}`);
}
function handleChange(value) {
  console.log(`selected ${value}`);
}
// function error(msg) {
//   const modal = Modal.error({
//     content: msg
//   });
// }

class Loginpage extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        errormsg :'',
          bordered: true,
          loading: true,
          pagination: true,
          size: 'default',
          expandedRowRender:true,
          title:true,
          showHeader:true,
          footer:true,
          rowSelection: true,
          scroll: true,
          selectedRowKeys: [],
          cookies: cookie.loadAll()
        }
        this.handleOk = this.handleOk.bind(this)
   }

   handleOk () {
     const username = document.getElementById('username').value;
     const password = document.getElementById('password').value;
     var myDate = new Date();
           var timezone = myDate.getTimezoneOffset();
         //   alert(axios.defaults.baseURL);

         axios.post(axios.defaults.baseURL + '/api/authenticate', {

           username:username,
           password:password,
           timezoneOffset:timezone
       })
       .then(response => {
         const sessionid = response.data.result.session_id;
         const company_id = response.data.result.company_id;
         const user_role = response.data.result.user_role;
         const company_name = response.data.result.company_name;
         const email_id = response.data.result.email_id;
         const username = response.data.result.username;
         const user_id = response.data.result.user_id;
         const first_name=response.data.result.first_name;
         const last_name=response.data.result.last_name;
       // const headercolor =  response.data.result.theme.header_color_class;
       //   const content1 =  response.data.result.theme.content_1;
       //   const content2 =  response.data.result.theme.content_2;


         if(response.data.status == false){
           this.setState({errormsg:response.data.result})
         }else{


           // var cookies = cookie.load('sessionid');
           // var user_id = cookie.load('user_id');
           console.log(JSON.stringify(response.data.result));
          // alert(response.data.result);

           if (response.data.result.user_role=="dashboard_admin"){
               // alert("userRole is dashboard admin");
                cookie.save('sessionid', sessionid)
                cookie.save('company_id', company_id, { path: '/' })
                cookie.save('user_role', user_role, { path: '/' })
                cookie.save('company_name', company_name, { path: '/' })
                cookie.save('email_id', email_id, { path: '/' })
                cookie.save('logo', response.data.result.logo, { path: '/' })

             //   cookie.save('theme', theme, { path: '/' })
                cookie.save('sidebarcolor', response.data.result.theme.sidebar_color_class, { path: '/' })
                cookie.save('headercolor', response.data.result.theme.header_color_class, { path: '/' })
                cookie.save('content1', response.data.result.theme.content_1, { path: '/' })
                cookie.save('content2', response.data.result.theme.content_2, { path: '/' })
                cookie.save('username', response.data.result.username, { path: '/' })
                cookie.save('user_id', response.data.result.user_id, { path: '/' })
                cookie.save('first_name', response.data.result.first_name, { path: '/' })
                cookie.save('last_name', response.data.result.last_name, { path: '/' })
                hashHistory.push("/admindashboard");
                axios.get(axios.defaults.baseURL + '/api/token/refresh',{
                  responseType: 'json'
                }).then(response => {
                  var userdata = response.data.result;

                //  alert(response.data.token);
                    cookie.save('powerbiaccesstoken', response.data.token);
                //  console.log( userdata.username)
                   window.location.reload()
                   //   this.setState({username: userdata.username, email_id:userdata.email_id, password:userdata.password,first_name:userdata.first_name, last_name:userdata.last_name});
                  })
                .catch(function (error) {
                  console.log(error);
                });

            }else if (response.data.result.user_role=="dashboard_user"){
             //   alert("userRole is dashboard");
                cookie.save('sessionid', sessionid)
                cookie.save('company_id', company_id, { path: '/' })
                cookie.save('user_role', user_role, { path: '/' })
                cookie.save('company_name', company_name, { path: '/' })
                cookie.save('email_id', email_id, { path: '/' })
                cookie.save('logo', response.data.result.logo, { path: '/' })
                cookie.save('first_name', response.data.result.first_name, { path: '/' })
                cookie.save('last_name', response.data.result.last_name, { path: '/' })

               // cookie.save('theme', theme, { path: '/' })
               cookie.save('username', response.data.result.username, { path: '/' })
               cookie.save('user_id', response.data.result.user_id, { path: '/' })
                cookie.save('sidebarcolor', response.data.result.theme.sidebar_color_class, { path: '/' })
                cookie.save('headercolor', response.data.result.theme.header_color_class, { path: '/' })
                cookie.save('content1', response.data.result.theme.content_1, { path: '/' })
                cookie.save('content2', response.data.result.theme.content_2, { path: '/' })
                hashHistory.push("/dashboard");
                window.location.reload()
            }
         }


       })
       .catch(function (error) {
         console.log(error);
       });
   }




render(){
  const { selectedRowKeys,companyId, errormsg  } = this.state;
document.title = "Login";

     return (
       <div className={styles.bg}>
       <div className={styles.form}>
         <div className={styles.logo}>
           <img src="assets/login-logo.png" />
         </div>
         <form>

           <FormItem required label="Username:" style={{'color':'white'}}>
             <Input size='large' onPressEnter={this.handleOk} id="username" placeholder='Enter Username..' />
           </FormItem>
           <FormItem required label="Password:" style={{'color':'white'}}>
            <Input size='large' type='password' id="password" onPressEnter={this.handleOk} placeholder='Enter Password..' />
           </FormItem>
           <Row>
             <Button type='primary' size='large' onClick={this.handleOk}>
               Login
             </Button>
           </Row>
           <p><a href="#/forgetpass">Forget Password</a>&nbsp; <a href="#/forgetusername">Forget Username</a></p>
 <span style={{'textAlign': 'center','marginTop': '10px', 'textTransform' : 'capitalize','display': 'block','marginBottom': '20px', 'color': 'red','fontSize': '12px'}}> { this.state.errormsg } </span>
         </form>
       </div>
        </div>
     );

}
}



export default Loginpage
