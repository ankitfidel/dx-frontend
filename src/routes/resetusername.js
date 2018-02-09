import React from 'react'
import {Menu, Icon,Form, Popover,Input, Badge,message, M,Avatar,Row, Col, Button,Card,notification, Table, Modal} from 'antd'
import {ComposedChart, CartesianGrid, LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis,Legend, Bar, Tooltip, ResponsiveContainer} from 'recharts';
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
import { config } from '../utils'
import styles from './login.less'
import cookie from 'react-cookies'
const axios = require('axios');
import { browserHistory, hashHistory } from 'dva/router';
import { axiosrequest } from './axiosrequest';

const FormItem = Form.Item;



class Resetpassword extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
         background: '#fff',
         errormsg:''

   }
   this.resetpass = this.resetpass.bind(this);

 }



   setModal1Visible(modal1Visible) {
     this.setState({modal1Visible})
   };
   login(){
     hashHistory.push("/login")
   }
   resetpass() {
     const username = document.getElementById('username').value;
     const username1 = document.getElementById('username1').value;
     const token = document.getElementById('token').value;

     if(username  === username1){
      axios.post(axios.defaults.baseURL + '/api/reset_username/', {
       token:token,
       username:username,
      })
      .then(response => {
      this.setState({errormsg:response.data.result})
      })
      .catch(function (error) {
        console.log(error);
      });
    }else{
    this.setState({errormsg:"Confirm username not match with username. Please try again"})
    }
   }

render(){
const {errormsg} = this.state;
//alert("render tken")
  return (
    <div className={styles.bg}>

    <div className={styles.form}>
      <div className={styles.logo}>
        <img src="assets/login-logo.png" />
      </div>
      <form>
      <FormItem hasFeedback label="Token:">
        <Input size='large' onPressEnter={this.handleOk} id="token" placeholder='Enter token..' />
      </FormItem>
      <FormItem label="Username:">
              <Input placeholder="Enter new username" id="username"/>
       </FormItem>
       <FormItem label="Confirm Username:">
               <Input placeholder="Enter confirm username" id="username1" />
        </FormItem>

        <Row>
          <Button type='primary' size='large' onClick={this.resetpass}>
            Submit
          </Button>
          <a href="#/login" style={{'margin':'10px', 'display':'block', 'textAlign':'center'}}>Login</a>
 <span style={{'textAlign': 'center','marginTop': '10px', 'textTransform' : 'capitalize','display': 'block','marginBottom': '20px', 'color': 'red','fontSize': '12px'}}> { this.state.errormsg } </span>
        </Row>
      </form>
    </div>
    </div>
  )
}

}



export default Resetpassword
