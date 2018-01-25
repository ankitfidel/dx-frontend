import React from 'react'
import { Icon, Badge,Avatar  } from 'antd'
import { Link } from 'dva/router'
import styles from './BadgeBox.less'
import screenfull from 'screenfull';
const axios = require('axios');
import { axiosrequest } from '../../routes/axiosrequest';
import { hashHistory, browserHistory } from 'dva/router';

import cookie from 'react-cookies'
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
render(){
  return (
 <div className={styles.badgeBox} style={{ float: 'right','marginLeft':'10px'  }}>



     <Link onClick={this.fullScreen} className={styles.badge}>
          <Icon type="arrows-alt" title="Full Screen" className={styles.size}/>
      </Link>
      <Link onClick={this.loggout} className={styles.badge}>
        <Icon type="logout" title="Logout" className={styles.size}/>
       </Link>

    </div>

  )
}
}



export default BadgeBox
