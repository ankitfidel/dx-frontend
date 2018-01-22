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

function Menus({
  siderFold,
  darkTheme,
  theme,
  location,
  isNavbar,
  handleClickNavMenu,
  navOpenKeys,
  changeSignUp,
  changeOpenKeys
}) {
  // const menuItems = getMenus(menu, siderFold)
  // const onOpenChange = (openKeys) => {
  //   const latestOpenKey = find(openKeys,key => !(navOpenKeys.indexOf(key) > -1))
  //   const latestCloseKey = find(navOpenKeys,key => !(openKeys.indexOf(key) > -1))
  //   let nextOpenKeys = []
  //   if (latestOpenKey) {
  //     nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey)
  //   }
  //   if (latestCloseKey) {
  //     nextOpenKeys = getAncestorKeys(latestCloseKey)
  //   }
  //   changeOpenKeys(nextOpenKeys)
  // }
  // const getAncestorKeys = (key) => {
  //   const map = {
  //     navigation2: ['navigation']
  //   }
  //   return map[key] || []
  // }
  // // When the menu bar is stuck, the open keys can not be manipulated
  // let menuProps = !siderFold
  //   ? {
  //     onOpenChange,
  //     openKeys: navOpenKeys
  //   }
  //   : {}
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

  // <Menu.Item key="items" className="menulink" style={{'overflow': 'hidden'}}>
  //    <Link activeClassName="selected"  to="/items">  <Icon type="cloud-o" /> items</Link>
  // </Menu.Item>
  //
  // <Menu.Item key="users" className="menulink" style={{'overflow': 'hidden'}}>
  //    <Link activeClassName="selected"  to="/">  <Icon type="cloud-o" /> Item History List</Link>
  // </Menu.Item>
var sidebarcolor = cookie.load('sidebarcolor');
var headercolor = cookie.load('headercolor');
var content1 = cookie.load('content1');
var content2 = cookie.load('content2');

  return (
     <div>

    <Menu style={{'backgroundColor': sidebarcolor}}
       onClick={handleClickNavMenu}


      defaultOpenKeys={['sub1']}
      mode="inline">

      <Menu.Item key="dashboard" className="menulink" style={{'overflow': 'hidden'}}>
         <Link to="/dashboard" activeClassName="selected"> <Icon type="rocket" /> Dashboard</Link>
      </Menu.Item>
    <Menu.Item key="deviceslist">
     <Link activeClassName="selected"  to="/devices">  <Icon type="cloud-o" /> Devices</Link>
   </Menu.Item>






      <Menu.Item key="Events" className="menulink" style={{'overflow': 'hidden'}}>
         <Link activeClassName="selected"  to="/events">  <Icon type="notification" /> Events</Link>
      </Menu.Item>





    </Menu>
    </div>
  )
}

export default Menus
