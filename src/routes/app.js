import React, { PropTypes } from 'react'
import { connect } from 'dva'
import Login from './login'
import Adminlogin from './adminlogin'


import Header from '../components/layout/header'
import Bread from '../components/layout/bread'
import Footer from '../components/layout/footer'
import CustomSider from '../components/layout/sider'
import Menu from '../components/layout/menu'
import styles from '../components/layout/main.less'
import { Spin, LocaleProvider, Switch } from 'antd'
import { classnames, config } from '../utils'
import '../components/layout/common.less'
import enUS from 'antd/lib/locale-provider/en_US';
import RightSider from '../components/layout/rightSider';
import { Layout } from 'antd';
import { BackTop } from 'antd';
import moment from 'moment';
//import 'moment/locale/en_US';
import cookie from 'react-cookies'
const axios = require('axios');
import { browserHistory } from 'dva/router';

const { Sider, Content } = Layout;

var cookies = cookie.load('sessionid');
var user_role = cookie.load('user_role');

if(cookies==null || cookies == undefined ||cookies == ''){
  browserHistory.push("/login");
}else{
  if(user_role=='dashboard_user'){
    browserHistory.push("/dashboard");
  }else if(user_role=='dashboard_admin'){
     browserHistory.push("/admindashboard");
  }
}

//alert("userRole:::::::::"+userRole);                <Bread location={location} />

function App({ children, location, dispatch, app }) {

  var sidebarcolor = cookie.load('sidebarcolor');
  var headercolor = cookie.load('headercolor');
  var content1 = cookie.load('content1');
  var content2 = cookie.load('content2');
  const {
    login,adminlogin,
    loading,
    loginButtonLoading,
    user,
    siderFold,
    siderFoldRight,
    darkTheme,
    isNavbar,
    menuPopoverVisible,
    menuPopoverVisibleRight,
    navOpenKeys,
    lock,
    SignUp,
    headerTheme,
  } = app
  const loginProps = {
    loading,
    loginButtonLoading,
    onOk(data) {
      dispatch({ type: 'app/login', payload: data })
    }
  }
  const adminloginProps = {
    loading,
    loginButtonLoading,
    onOks(datas) {
      dispatch({ type: 'app/adminlogin', payload: datas })
    }
  }

  const headerProps = {
    user,
    siderFold,siderFoldRight,
    location,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover() {
      dispatch({ type: 'app/switchMenuPopver' })
    },
    logout() {
      dispatch({ type: 'app/logout' })
    },
    switchSider() {
      dispatch({ type: 'app/switchSider' })
    },
    switchSiderRight() {
      dispatch({ type: 'app/switchSiderRight' })
    },
    changeLock() {
      dispatch({ type: 'app/changeLock' })
    },
    changeSignUp() {
      dispatch({ type: 'app/changeSignUp' })
    },
    changeOpenKeys(openKeys) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
      dispatch({
        type: 'app/handleNavOpenKeys',
        payload: {
          navOpenKeys: openKeys
        }
      })
    },
    changeTheme(value) {
      //console.log(value)
      dispatch({ type: 'app/changeTheme' , payload: {  theme: value  }})
    },
    changeThemeHeader(value) {
      //console.log(value)
      dispatch({ type: 'app/changeThemeHeader' , payload: {  theme: value  }})
    },
    headerTheme,
    headercolor
  }

  const siderProps = {
    siderFold,
    location,sidebarcolor,
    navOpenKeys,
    changeTheme() {
      dispatch({ type: 'app/changeTheme' })
    },
    changeOpenKeys(openKeys) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
      dispatch({
        type: 'app/handleNavOpenKeys',
        payload: {
          navOpenKeys: openKeys
        }
      })
    },
    changeLock() {
      dispatch({ type: 'app/changeLock' })
    },
    changeSignUp() {
      dispatch({ type: 'app/changeSignUp' })
    },
     changeTheme(value) {
      //console.log(value)
      dispatch({ type: 'app/changeTheme' , payload: {  theme: value  }})
    },
    headerTheme,
    sidebarcolor
  }



  if (SignUp) {
    return (
      <div>
        <Spin tip='Loading...' spinning={loading} size='large'>
          Signup Page
        </Spin>
      </div>
    )
  } else if (lock) {
    return (
      <div>
        Page Not Found
      </div>
    )

  } else if (config.needLogin) {
    if (login) {
      return (
        <div>

          <div className={styles.spin}>
            <Login {...loginProps} />

          </div>

        </div>
      )
    }else if (adminlogin) {
        return (
          <div>

            <div className={styles.spin}>
              <Adminlogin {...adminloginProps} />

            </div>

          </div>
        )
      }
  }

  if (login) {

    return (
      <LocaleProvider locale={enUS}>
      <div
        className={classnames(styles.layout, { [styles.fold]: isNavbar ? true : siderFold  }, {  [styles.withnavbar]: isNavbar  })}>
        {!isNavbar  ? <aside
            className={classnames(styles.sider )} style={{'backgroundColor': sidebarcolor}}>
<CustomSider {...siderProps}  style={{'backgroundColor': sidebarcolor}} />

          </aside>
          : ''}
        <div id="main_content" className={classnames(styles.main)}>
          <div className={styles.spin} >
            <Spin tip='Loading...' spinning={loading} size='large'>
              <Header {...headerProps} style={{'backgroundColor': headercolor}} />

                <div className={styles.container}>
                  <div className={styles.content} id="spin">
                  <BackTop target={() => document.getElementById('main_content')} />
                    {children}
                  </div>
                </div>
              <Footer />
            </Spin>
          </div>

        </div>

      </div>
      </LocaleProvider>
    )
  }




}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
  login: PropTypes.bool,
  lock: PropTypes.bool,
  SignUp: PropTypes.bool,
  user: PropTypes.object,
  siderFold: PropTypes.bool,
  siderFoldRight: PropTypes.bool,
  darkTheme: PropTypes.bool,
  menuTheme : PropTypes.string
}

export default connect(({ app }) => ({ app }))(App)
