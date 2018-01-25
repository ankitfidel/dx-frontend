import React from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar} from 'antd'
import styles from './main.less'
import Menus from './menu'
import MenusAdmin from './adminmenu'
import { Layout,Button } from 'antd';
import BadgeBox from './badgeBox';
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup;
const { Sider } = Layout;
import cookie from 'react-cookies'



const style={
  avatarBadge:{
      marginTop:10,
      padding:0,
      backgroundColor:'black'
  }
}
class Header extends React.Component {


  constructor(props) {
      super(props);

      this.state = {
         headerColor: localStorage.getItem('berrAdminHeaderColor') ,
         headerBackColor: localStorage.getItem('berrAdminHeaderBackColor')
      }
   }



  handleClickMenu = e => e.key === 'logout'


render(){
  var sidebarcolor = cookie.load('sidebarcolor');
  var headercolor = cookie.load('headercolor');
  var content1 = cookie.load('content1');
  var content2 = cookie.load('content2');
///    let styleclass = {}
  var user_role = cookie.load('user_role');

let adminmenu = null;
// alert("user_role"+user_role)
if(user_role === "dashboard_admin"){
adminmenu = <MenusAdmin  location={this.props.location}  navOpenKeys={this.props.navOpenKeys} changeOpenKeys={this.props.changeOpenKeys}   />
}else{
adminmenu = <Menus location={this.props.location}  navOpenKeys={this.props.navOpenKeys} changeOpenKeys={this.props.changeOpenKeys}   />
}
  return (
    <div style={{'backgroundColor': headercolor}}   >

    {this.props.isNavbar
      ? <Popover
          placement='bottomLeft'
          onVisibleChange={this.props.switchMenuPopover}
          visible={this.props.menuPopoverVisible}
          overlayClassName={styles.popovermenu + " menu_"+ this.props.menuTheme }
          trigger='hover'
          content={adminmenu}>
          <div className={styles.siderbutton} style={{'width':'50px', 'float':'left', 'padding':'14px 20px', 'color': '#fff'}}>
            <Icon type='bars' className="fa-1x"/>
          </div>
        </Popover>
      : null}

      <Menu style={{'backgroundColor': headercolor}} mode='horizontal'  onClick={this.props.handleClickMenu}>

        <BadgeBox pr={this.props}  style={{'float':'right'}}  />


      </Menu>




    </div>
  )
}
}



export default Header
