import React from 'react'
import { Icon, Badge,Avatar, Menu  } from 'antd'
import { Link } from 'dva/router'
import styles from './BadgeBox.less'
import screenfull from 'screenfull';
const axios = require('axios');
import { axiosrequest } from '../../routes/axiosrequest';
import { hashHistory, browserHistory } from 'dva/router';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import cookie from 'react-cookies'

var email_id = cookie.load('email_id');
var company_name = cookie.load('company_name');
var sidebarcolor = cookie.load('sidebarcolor');
var headercolor = cookie.load('headercolor');
var content1 = cookie.load('content1');
var content2 = cookie.load('content2');
class BadgeBox extends React.Component {

   constructor(props) {
      super(props);
       this.loggout = this.loggout.bind(this)
   }



  fullScreen(){
   if(screenfull.isFullscreen){
     screenfull.exit();
   }else{
     screenfull.request();
   }
 }
 loggout(){

   var cookies = cookie.remove('sessionid');
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
render(){
  return (

 <div className={styles.badgeBox} style={{'float':'right'}}>


 <Menu mode="horizontal" style={{'backgroundColor': headercolor, 'zIndex': 999}}>

         <Menu.Item onClick={this.fullScreen}  className={styles.badge}><Icon style={{ 'color':'white'}} type="arrows-alt" title="Full Screen" className={styles.size}/></Menu.Item>

        <SubMenu  title={<p style={{'textTransform': 'none','color':'white'}}>{email_id}</p>}>
          <Menu.Item><a onClick={this.profile} className={styles.logoutbtn}>Profile</a></Menu.Item>
            <Menu.Item><a  className={styles.logoutbtn}>Change password</a></Menu.Item>
            <Menu.Item><a onClick={this.logout} className={styles.logoutbtn}>Logout</a></Menu.Item>

        </SubMenu>
        </Menu>

    </div>


  )
}
}



export default BadgeBox
