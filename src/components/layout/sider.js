import React from 'react'
import {Icon, Switch, Menu, Badge} from 'antd'
import { Link } from 'dva/router'
import styles from './main.less'
import {config} from '../../utils'
import Menus from './menu'
import MenusAdmin from './adminmenu'
import {menu} from '../../utils'
const SubMenu = Menu.SubMenu;
const axios = require('axios');
import cookie from 'react-cookies'

import { browserHistory } from 'dva/router';
const MenuItemGroup = Menu.ItemGroup;

// function handleClick(){
//  console.log('click ');
//
// }
function Sider({siderFold, menuTheme,sidebarcolor, darkTheme,location, changeTheme,changeLock, navOpenKeys, changeOpenKeys}) {
  // const menusProps = {
  //   siderFold,siderFoldRight,
  //   darkTheme,
  //   location,
  //   navOpenKeys,
  //   changeOpenKeys,
  //   menuTheme

  // <Menu.Item key="Dynamicusers" className="menulink" style={{'overflow': 'hidden'}}>
  //    <Link activeClassName="selected"  to="/dynamicusers">  <Icon type="notification" /> dynamicusers</Link>
  // </Menu.Item>

  // <Menu.Item key="Profile" style={{'overflow': 'hidden'}}>
  //    <Link  activeClassName="selected"  to="/profile"> <Icon type="user" />Profile</Link>
  // </Menu.Item>
  //
  // <Menu.Item key="Users" style={{'overflow': 'hidden'}}>
  //    <Link activeClassName="selected"  to="/users"> <Icon type="star-o" /> Users</Link>
  // </Menu.Item>
  // <Menu.Item key="customers" style={{'overflow': 'hidden'}}>
  //    <Link activeClassName="selected"  to="/customers"> <Icon type="tags-o" /> customers</Link>
  // </Menu.Item>
  // <Menu.Item key="Hostsgroup" style={{'overflow': 'hidden'}}>
  //    <Link activeClassName="selected"  to="/hostsgroup">  <Icon type="database" /> Hostsgroup</Link>
  // </Menu.Item>
  // <Menu.Item key="Templates" style={{'overflow': 'hidden'}}>
  //    <Link activeClassName="selected"  to="/templates">  <Icon type="layout" /> Templates</Link>
  // </Menu.Item>

  //

  // }
      var navlinks;
      var email_id = cookie.load('email_id');
      var company_name = cookie.load('company_name');
      var username = cookie.load('username');
      var user_id = cookie.load('user_id');
  const Sider3 = React.createClass({
    getInitialState() {
      return {theme: 'dark',mode: 'inline', current: '1', cookies: cookie.loadAll(), is_retailer:'', theme:''};
    },

      changeMode : (value) => {
        this.setState({
          mode: value ? 'vertical' : 'inline',
        });
      },

    componentDidMount:function(){
      var cookies = cookie.load('sessionid');
      var sidebarcolor = cookie.load('sidebarcolor');
      var headercolor = cookie.load('headercolor');
      var content1 = cookie.load('content1');
      var content2 = cookie.load('content2');
      var username = cookie.load('username');
      var user_id = cookie.load('user_id');
//var sidebar_color_class = cookie.load('sidebar_color_class');
    },

    handleClick(e) {
      console.log('click ', e);
      this.setState({current: e.key});
    },

    render() {
      const { theme } = this.state;
      var user_role = cookie.load('user_role');
let adminmenu = null;
  // alert("user_role"+user_role)
 if(user_role === "dashboard_admin"){
   adminmenu = <MenusAdmin />
 }else{
   adminmenu = <Menus />
 }
      return (
        <div>
        {adminmenu}
        </div>
      );
    }
  });
  return (
<div  style={{'backgroundColor': sidebarcolor}}>
<div  style={{'backgroundColor': sidebarcolor}}>
<div className={styles.logo} style={{'backgroundColor': sidebarcolor}}>
<img src={config.logoSrc}/> {siderFold ? '' : <span className="logoText"></span>}
</div>
<div><h5 style={{'padding':'10px 0 10px 10px', 'color': 'white'}}>{username}</h5>
<h6 style={{'padding':'0 0 10px 10px', 'color': 'white', 'fontSize': '14px !important'}}>{email_id}</h6></div>
<Sider3 style={{'backgroundColor': sidebarcolor}} />



</div>
  </div>
  )
}

export default Sider
