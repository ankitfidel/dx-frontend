import React, { PropTypes } from 'react'
import { connect } from 'dva'
import Loginpage from './loginpage'
import Adminlogin from './adminlogin'
import Header from '../components/layout/header'
import LockPage from '../routes/pages/lockscreen'
import Bread from '../components/layout/bread'
import Footer from '../components/layout/footer'
import CustomSider from '../components/layout/sider'
import styles from '../components/layout/main.less'
import { Spin, LocaleProvider, Switch } from 'antd'
import { classnames, config } from '../utils'
import '../components/layout/common.less'
import enUS from 'antd/lib/locale-provider/en_US';
import RightSider from '../components/layout/rightSider';
import { Layout } from 'antd';
import cookie from 'react-cookies'
const axios = require('axios');
import { hashHistory, browserHistory } from 'dva/router';
import { BackTop } from 'antd';

const { Sider, Content } = Layout;


var cookies = cookie.load('sessionid');
var user_role = cookie.load('user_role');
var sidebarcolor = cookie.load('sidebarcolor');
var headercolor = cookie.load('headercolor');
var content1 = cookie.load('content1');
var content2 = cookie.load('content2');
  //alert("cookies:"+cookies);

  if(cookies==null || cookies == undefined || cookies == ''){
    hashHistory.push("/login");
  }else{
    if(user_role=='dashboard_user'){
    //  hashHistory.push("/dashboard");
    var url=window.location.href;
    var count =0;
    count =(url.match(/\//g) || []).length;
    console.log(count)
    if(url.includes("dashboard") || count==3 ){
       hashHistory.push("/dashboard");
    }
    }else if(user_role=='dashboard_admin'){
      var url=window.location.href;
      var count =0;
      count =(url.match(/\//g) || []).length;
      console.log(count)
      if(url.includes("admindashboard") || count==3 ){
         hashHistory.push("/admindashboard");
      }

    }
  }

function App({ children, location, dispatch, app }) {





  const {
    login,
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
    menuTheme,
    headerTheme
  } = app
  const loginProps = {
    loading,
    loginButtonLoading,
    onOk(data) {
      dispatch({ type: 'app/login', payload: data })
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
    menuTheme
  }

  const siderProps = {
    siderFold,
    location,
    navOpenKeys,
    menuTheme,
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
        <LockPage />
      </div>
    )

  } else if (config.needLogin) {
    if (!login) {
      return (
        <div>

          <div className={styles.spin}>
            <Loginpage {...loginProps} />
          </div>

        </div>
      )
    }
  }

  if ((login || !config.needLogin)) {
    return (
      <LocaleProvider locale={enUS}>
      <div
        className={classnames(styles.layout, { [styles.fold]: isNavbar ? true : siderFold  }, {  [styles.withnavbar]: isNavbar  })}>
        {!isNavbar  ? <aside
            className={classnames(styles.sider )} style={{'backgroundColor': sidebarcolor}}>
<CustomSider {...siderProps}  style={{'backgroundColor': headercolor}} />

          </aside>
          : ''}
        <div id="main_content" className={classnames(styles.main)}>
          <div className={styles.spin} >
            <Spin tip='Loading...' spinning={loading} size='large'>
              <Header {...headerProps} style={{'backgroundColor': 'brown'}} />
 <Bread location={location} />
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
