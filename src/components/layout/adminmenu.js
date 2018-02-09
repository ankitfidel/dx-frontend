import React from 'react'
import {Menu, Icon,Switch} from 'antd'
import {Link} from 'dva/router'
const { SubMenu } = Menu;
import {menu} from '../../utils'
import find from 'lodash/find';
import cookie from 'react-cookies'
// const topMenus = menu.map(item => item.key)
// const getMenus = function (menuArray, siderFold, parentPath) {
//   parentPath = parentPath || '/'
//   return menuArray.map(item => {
//     if (item.child) {
//       return (
//         <Menu.SubMenu
//           key={item.key}
//           title={<span> {
//           item.icon
//             ? <Icon type={item.icon}/>
//             : ''
//         }
//         {
//           siderFold && topMenus.indexOf(item.key) >= 0
//             ? ''
//             : item.name
//         } </span>}>
//           {getMenus(item.child, siderFold, parentPath + item.key + '/')}
//         </Menu.SubMenu>
//       )
//     } else {
//       return (
//         <Menu.Item key={item.key}>
//           <Link to={parentPath + item.key}>
//             {item.icon
//               ? <Icon type={item.icon}/>
//               : ''}
//             {siderFold && topMenus.indexOf(item.key) >= 0
//               ? ''
//               : item.name}
//           </Link>
//         </Menu.Item>
//       )
//     }
//   })
// }
function clicked(changeOpenKeys){
  //alert(!changeOpenKeys)
//  this.props.navOpenKeys = false
}
function MenusAdmin({
  siderFold,
  darkTheme,
  menuTheme,
  location,
  isNavbar,
  handleClickNavMenu,
  navOpenKeys,
  changeSignUp,
  changeOpenKeys
}) {

  // const menuItems = getMenus(menu, siderFold)

  // const getAncestorKeys = (key) => {
  //   const map = {
  //     navigation2: ['navigation']
  //   }
  //   return map[key] || []
  // }
  // // When the menu bar is stuck, the open keys can not be manipulated

  //
  // <Menu.Item key="customers" style={{'overflow': 'hidden'}}>
  //    <Link activeClassName="selected"  to="/customers"> <Icon type="tags-o" /> customers</Link>
  // </Menu.Item>
  //
  // <Menu.Item key="Hostsgroup" style={{'overflow': 'hidden'}}>
  //    <Link activeClassName="selected"  to="/hostsgroup">  <Icon type="database" /> Hostsgroup</Link>
  // </Menu.Item>
  // <Menu.Item key="Templates" style={{'overflow': 'hidden'}}>
  //    <Link activeClassName="selected"  to="/templates">  <Icon type="layout" /> Templates</Link>
  // </Menu.Item>

  // let menuProps = !siderFold
  //   ? {
  //     onOpenChange,
  //     openKeys: navOpenKeys
  //   }
  //   : {}
  // changeMode = (value) => {
  //     this.setState({
  //       mode: value ? 'vertical' : 'inline',
  //     });
  //   }



  var sidebarcolor = cookie.load('sidebarcolor');
  var headercolor = cookie.load('headercolor');
  var content1 = cookie.load('content1');
  var content2 = cookie.load('content2');
  return (
     <div>

    <Menu style={{'backgroundColor': sidebarcolor, width: '100%'}}
       onClick={handleClickNavMenu}


      defaultOpenKeys={['sub1']}
      mode="inline">

      <Menu.Item key="dashboard" className="menulink" >
         <Link to="/admindashboard" onClick={clicked(changeOpenKeys)} activeStyle={{ 'background': headercolor }} style={{'padding': '0px 20px'}}> <Icon type="rocket" /> Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="devices" className="menulink" style={{'overflow': 'hidden'}}>
         <Link to="/devices" activeClassName="selected"  activeStyle={{ background: headercolor }} style={{'padding': '0px 20px'}}> <Icon type="setting" /> Devices</Link>
      </Menu.Item>
      <Menu.Item key="users" className="menulink"  style={{'overflow': 'hidden'}}>
         <Link activeClassName="selected"  to="/users" style={{'padding': '0px 20px'}} activeStyle={{ background: headercolor }}> <Icon type="user" /> Users</Link>
      </Menu.Item>
      <Menu.Item key="groups" className="menulink" style={{'overflow': 'hidden'}}>
         <Link activeClassName="selected"  to="/groups" style={{'padding': '0px 20px'}} activeStyle={{ background: headercolor }}>  <Icon type="cloud-o" /> Groups</Link>
      </Menu.Item>
      <Menu.Item key="companies" className="menulink" style={{'overflow': 'hidden'}}>
         <Link activeClassName="selected"  to="/companies" style={{'padding': '0px 20px'}} activeStyle={{ background: headercolor }} > <Icon type="team" />Companies</Link>
      </Menu.Item>
      <Menu.Item key="themes" className="menulink" style={{'overflow': 'hidden'}}>
         <Link to="/themes" activeClassName="selected"  activeStyle={{ background: headercolor }} style={{'padding': '0px 20px'}}> <Icon type="setting" /> Theme</Link>
      </Menu.Item>
      <Menu.Item key="applications" className="menulink" style={{'overflow': 'hidden'}}>
         <Link activeClassName="selected"  to="/applications" style={{'padding': '0px 20px'}} activeStyle={{ background: headercolor }}> <Icon type="cloud-upload-o" /> Applications</Link>
      </Menu.Item>
      <Menu.Item key="alerts" className="menulink" style={{'overflow': 'hidden'}}>
         <Link activeClassName="selected"  to="/alerts" style={{'padding': '0px 20px'}} activeStyle={{ background: headercolor }}> <i className="fa fa-exclamation-triangle"></i> &nbsp;&nbsp;Alerts</Link>
      </Menu.Item>








    </Menu>
    </div>
  )
}

export default MenusAdmin
