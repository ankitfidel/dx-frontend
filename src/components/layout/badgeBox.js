import React from 'react'
import { Icon, Badge,Avatar, Menu,Modal,Form,Input,notification  } from 'antd'
import { Link } from 'dva/router'
import styles from './BadgeBox.less'
import screenfull from 'screenfull';
const axios = require('axios');
import { axiosrequest } from '../../routes/axiosrequest';
import { hashHistory, browserHistory } from 'dva/router';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import cookie from 'react-cookies'
const FormItem = Form.Item;

var username = cookie.load('username');
var company_name = cookie.load('company_name');
var sidebarcolor = cookie.load('sidebarcolor');
var headercolor = cookie.load('headercolor');
var content1 = cookie.load('content1');
var content2 = cookie.load('content2');


function openNotification() {
  notification.open({
     message: 'Password Change Successfully !',
     icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
     duration:3,
    // onClose: closefun()
  });

};

function handleChange(){
    window.location.reload()
}
function closefun(){
  window.location.reload()
}

class BadgeBox extends React.Component {

   constructor(props) {
      super(props);
       this.loggout = this.loggout.bind(this);
       this.handleCancel = this.handleCancel.bind(this);

       this.state= {
        changepassModal: false,
      //  handleCancelw:false
       }

    //   this.onTodoChange_password = this.onTodoChange_password.bind(this)
   }

   // onTodoChange_username(value){
   //         this.setState({username: value});
   //     }

  fullScreen(){
   if(screenfull.isFullscreen){
     screenfull.exit();
   }else{
     screenfull.request();
   }
 }
 loggout(){

   var cookies = cookie.load('sessionid');
   // const username = document.getElementById('username').value;
   // const password = document.getElementById('password').value;
 axios.post(axios.defaults.baseURL + '/api/logout', {
      session_id:cookies,
  })
  .then(function (response) {
  // cookie.remove('');
   cookie.remove('sessionid', { path: '/' })
//  hashHistory.push('/login');
  var url ="/login";
  window.location.href = ("#/login");
  // window.
  //window.location.reload();
//  alert(cookies)
  })
  .catch(function (error) {
    console.log(error);
  });

}
profile(){
  hashHistory.push("/profile");
}


handleOk = () => {
  var cookies = cookie.load('sessionid');
  const user_id = cookie.load('user_id');
  const password = document.getElementById('password').value;
  const password1 = document.getElementById('password1').value;
 if(password  === password1){
  axios.put(axios.defaults.baseURL + '/api/front/user/'+user_id, {
   session_id:cookies,
   password:password,
  })
  .then(response => {
    openNotification()

      handleChange()

  //  handleCancel()
//  window.location.reload()
//  alert("password changed")
  })
  .catch(function (error) {
    console.log(error);
  });
}else{
  alert("confirm pass fst")
}
}
changepassword = () =>{
  this.setState({
        changepassModal: true,
      });

}
handleCancel = (e) => {
    console.log(e);
    this.setState({
      changepassModal: false,
    });

  }
render(){
  const {changepassModal,handleCancelw} = this.state;
  return (

 <div className={styles.badgeBox} style={{'float':'right'}}>
 <Modal
          title="Change Password"
          visible={this.state.changepassModal}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <FormItem label="Password:">
                <Input placeholder="Enter new password" id="password"/>
         </FormItem>
         <FormItem label="Confirm Password:">
                 <Input placeholder="Enter confirm password" id="password1" />
          </FormItem>


        </Modal>

 <Menu mode="horizontal" style={{'backgroundColor': headercolor, 'zIndex': 999}}>

         <Menu.Item onClick={this.fullScreen}  className={styles.badge}><Icon style={{ 'color':'white'}} type="arrows-alt" title="Full Screen" className={styles.size}/></Menu.Item>

        <SubMenu  title={<p style={{'textTransform': 'none','color':'white'}}><Icon type="user" /><span style={{'textOverflow':'ellipsis'}}>{username} </span><Icon style={{'float': 'right','margin':'15px 20px 0 10px'}} type="down" /></p>}>
          <Menu.Item><a onClick={this.profile} className={styles.logoutbtn}>Profile</a></Menu.Item>
            <Menu.Item><a className={styles.logoutbtn} onClick={this.changepassword}>Change password</a></Menu.Item>
            <Menu.Item><a onClick={this.loggout} className={styles.logoutbtn}>Logout</a></Menu.Item>

        </SubMenu>
        </Menu>

    </div>


  )
}
}



export default BadgeBox
