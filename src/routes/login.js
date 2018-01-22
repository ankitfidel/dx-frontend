import React, {PropTypes} from 'react'
import { Button,message, Row, Form, Input } from 'antd'
import { config } from '../utils'
import styles from './login.less'
import cookie from 'react-cookies'
const axios = require('axios');
const FormItem = Form.Item
import { browserHistory } from 'dva/router';
import { axiosrequest } from './axiosrequest';

const login = ({
  loginButtonLoading,
  onOk,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll
  }
}) => {
  const info = () => {
    message.info('This is a normal message');
  };

  function handleOk () {
//alert(JSON.stringify(axiosrequest))
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    var myDate = new Date();
          var timezone = myDate.getTimezoneOffset();
        //   alert(axios.defaults.baseURL);
        axios.post(axios.defaults.baseURL + '/dataexchange/api/authenticate', {
          credentials: 'credentials',
          username:username,
      	  password:password,
          timezoneOffset:timezone
      })
      .then(function (response) {
        const sessionid = response.data.result.session_id;
        const company_id = response.data.result.company_id;
        const user_role = response.data.result.user_role;
      //   const sidebarcolor = response.data.result.theme.sidebar_color_class;
      // const headercolor =  response.data.result.theme.header_color_class;
      //   const content1 =  response.data.result.theme.content_1;
      //   const content2 =  response.data.result.theme.content_2;

        if(response.data.status == false){
          alert(response.data.result)
        info()
        }else{
          if (response.data.result.user_role=="dashboard_admin"){
              // alert("userRole is dashboard admin");
               cookie.save('sessionid', sessionid, { path: '/' })
               cookie.save('company_id', company_id, { path: '/' })
               cookie.save('user_role', user_role, { path: '/' })
            //   cookie.save('theme', theme, { path: '/' })
               cookie.save('sidebarcolor', response.data.result.theme.sidebar_color_class, { path: '/' })
               cookie.save('headercolor', response.data.result.theme.header_color_class, { path: '/' })
               cookie.save('content1', response.data.result.theme.content_1, { path: '/' })
               cookie.save('content2', response.data.result.theme.content_2, { path: '/' })
               window.location.href= "/admindashboard"
           }else if (response.data.result.user_role=="dashboard_user"){
            //   alert("userRole is dashboard");
               cookie.save('sessionid', sessionid, { path: '/' })
               cookie.save('company_id', company_id, { path: '/' })
               cookie.save('user_role', user_role, { path: '/' })

              // cookie.save('theme', theme, { path: '/' })

               cookie.save('sidebarcolor', response.data.result.theme.sidebar_color_class, { path: '/' })
               cookie.save('headercolor', response.data.result.theme.header_color_class, { path: '/' })
               cookie.save('content1', response.data.result.theme.content_1, { path: '/' })
               cookie.save('content2', response.data.result.theme.content_2, { path: '/' })
               browserHistory.push("/dashboard");
           }
        }


      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className={styles.bg}>

    <div className={styles.form}>
      <div className={styles.logo}>
        <img src={config.logoSrc} />
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Please Enter Your User Name'
              }
            ]
          })(<Input size='large' id='username' onPressEnter={handleOk} placeholder='Username' />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please Enter Your Password'
              }
            ]
          })(<Input size='large' id='password'  type='password' onPressEnter={handleOk} placeholder='Password' />)}
        </FormItem>
        <Row>
          <Button type='primary' size='large' onClick={handleOk} loading={loginButtonLoading}>
            Login
          </Button>
          <br />
          <a href="/forget-password"> Forgot password</a>
        </Row>
      </form>
    </div>
    </div>
  )
}

login.propTypes = {
  form: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
  onOk: PropTypes.func
}

export default Form.create()(login)
