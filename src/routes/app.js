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
import Style from 'style-it';

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
  function LightenDarkenColor(col, amt) {

    var usePound = false;
  //  alert(col.charAt(0))

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col,16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if  (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if  (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

  var colorcode =   (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
//  alert(colorcode);
return colorcode;
}


function App({ children, location, dispatch, app }) {


var NewColor = LightenDarkenColor(headercolor, 90);
var darkColor = LightenDarkenColor(headercolor, 50);
var lightestColor = LightenDarkenColor(headercolor, 90);

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
      <div>
      <Style>
      {`
        .ant-card:hover{overflow:hidden}
        .ant-table-placeholder{background-color: ` + lightestColor + `08 !important}
        .ant-card{background-color: ` + lightestColor + `08 !important}
        .ant-modal-mask{background-color: rgba(0, 0, 0, 0.6)}
        .explorationContainer .exploreCanvas{backgroundColor:#fff !important}
        #dashboardContainer iframe{border:0 none;}
  .dashboardViewSlider .dashboard{background:#fff !important;}
        }
        a {color: ` + NewColor + ` !important}
        a:hover{color:`+darkColor+` !important}
    .ant-btn-primary{background-color:  ` + headercolor + `;border-color:  ` + darkColor + `;}
    .ant-btn-primary:active, .ant-btn-primary.active,.ant-btn-primary:hover, .ant-btn-primary:focus{background-color:  ` + darkColor + `;border-color:  ` + darkColor + `;}
    .ant-btn:active,.ant-btn:hover, .ant-btn:focus, .ant-btn.active{;border-color:  ` + darkColor + `;}
    .ant-input:focus, .ant-input:hover{border-color:  ` + darkColor + `;}
    .ant-btn:active, .ant-btn.active{color:  ` + headercolor + `}
    .ant-pagination-item-active:focus, .ant-pagination-item-active:hover{ background: ` + headercolor + `}
    .ant-pagination-item-active{background: ` + headercolor + `}
    .ant-tabs-ink-bar{background:` + headercolor + `}

    .ant-tabs-nav .ant-tabs-tab-active{color: ` + headercolor + `}
    .ant-tabs-nav .ant-tabs-tab:hover{color: ` + darkColor + `}
         .ant-pagination-item-active:focus, .ant-pagination-item-active:hover{ background: ` + headercolor + `}
         .ant-select-dropdown-menu-item:hover{ background: ` + headercolor + `; color:#fff}
        .ant-table-thead > tr > th{background:` + lightestColor + `21; font-weight:bold}
      .ant-pagination-item-active{background: ` + headercolor + `}
           .intro {
             background: ` + headercolor + `
           }
           .ant-card{background: rgba(255,255,255,0.4);}
        `}
      </Style>
      <LocaleProvider locale={enUS}>

      <div
        className={classnames(styles.layout, { [styles.fold]: isNavbar ? true : siderFold  }, {  [styles.withnavbar]: isNavbar  })}>
        {!isNavbar  ? <aside
            className={classnames(styles.sider )} style={{'backgroundColor': sidebarcolor}}>
<CustomSider {...siderProps}  style={{'backgroundColor': headercolor}} />

          </aside>
          : ''}
        <div id="main_content" className={styles.main}>
          <div className={styles.spin} >
            <Spin tip='Loading...' spinning={loading} size='large'>
              <Header {...headerProps} style={{'backgroundColor': 'brown'}} />

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
      </div>
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
