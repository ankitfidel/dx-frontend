import React from 'react'
import {Menu, Icon,Form, Popover,Input, Badge, M,Avatar,Row, Col, Button,Card, Table, Modal} from 'antd'
import {ComposedChart, CartesianGrid, LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis,Legend, Bar, Tooltip, ResponsiveContainer} from 'recharts';
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
import { config } from '../utils'
import styles from './login.less'
import cookie from 'react-cookies'
const axios = require('axios');
import { browserHistory } from 'dva/router';
import { axiosrequest } from './axiosrequest';

const FormItem = Form.Item

class Header extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
         background: '#fff',

   }
 }
   setModal1Visible(modal1Visible) {
     this.setState({modal1Visible})
   };
   login(){
     browserHistory.push("/login")
   }
   forgetpassord () {

     const email_id = document.getElementById('email_id').value;
         axios.post(axios.defaults.baseURL + '/dataexchange/api/forget_password', {
           email_id:email_id
       })
       .then(function (response) {

       //  const theme = response.data.result.theme.sidebar_color_class;


         if(response.data.status == false){
           alert(response.data.result)
         info()
         }else{
alert("please check mail")
         }


       })
       .catch(function (error) {
         console.log(error);
       });
   }

render(){

  return (
    <div className={styles.bg}>

    <div className={styles.form}>
      <div className={styles.logo}>
        <img src={config.logoSrc} />
      </div>
      <form>
        <FormItem hasFeedback>
        <Input size='large' id='email_id' onPressEnter={this.handleOk} placeholder='email_id' />
        </FormItem>

        <Row>
          <Button type='primary' size='large' onClick={this.forgetpassord} >
            Submit
          </Button><br /><br />
          <Button type='primary' size='large' onClick={this.login} >
            Login
          </Button>
        </Row>
      </form>
    </div>
    </div>
  )
}

}



export default Header
