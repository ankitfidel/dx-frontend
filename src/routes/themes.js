import React from 'react'
import {Menu, Icon, Popover,Layout,Breadcrumb, Badge, M,Avatar,Row, Col, Button,Card, Table, Modal} from 'antd'
import {ComposedChart, CartesianGrid, LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis,Legend, Bar, Tooltip, ResponsiveContainer} from 'recharts';
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const {Header, Content, Footer, Sider} = Layout;
import colors from '../utils/theme'
import styles from './themes.less'
const axios = require('axios');
import cookie from 'react-cookies'
import RightSider from '../components/layout/rightSider';
import { axiosrequest } from './axiosrequest';
import {hashHistory, browserHistory} from 'dva/router';


class Themes extends React.Component {

    onClick(event) {
      localStorage.clear();
      location.reload();
   }
  constructor(props) {
      super(props);

      this.state = {
         background: '#fff',
         themess:'',
         sidethemeColor:''

   }
   this.headerTheme = this.headerTheme.bind(this);
   this.sidebarTheme = this.sidebarTheme.bind(this);

 }

   setModal1Visible(modal1Visible) {
     this.setState({modal1Visible})
   };

headerTheme(themess){
  var cookies = cookie.load('sessionid');
  var company_id = cookie.load('company_id');


  // var content1 = cookie.load('content1');
  // var content2 = cookie.load('content2');
  axios.put(axios.defaults.baseURL + '/api/front/theme/'+company_id, {
    session_id: cookies,
    header_color_class: themess
  })
  .then(function (response) {
  if(response.data.status == false){
    msg(response.data.result)
  }else{
  //alert("successfully done theme")
  cookie.save('sidebarcolor', response.data.result.sidebar_color_class, { path: '/' })
  cookie.save('headercolor', response.data.result.header_color_class, { path: '/' })
  cookie.save('content1', response.data.result.content_1, { path: '/' })
  cookie.save('content2', response.data.result.content_2, { path: '/' })
//  hashHistory.push("/themes")
 window.location.reload()
  }

  })
  .catch(function (error) {
  console.log(error);
//  alert("errors")
  });


this.setState({themess:themess})

}
sidebarTheme(sidethemeColor){
//alert(this.state.themess);
var cookies = cookie.load('sessionid');
var company_id = cookie.load('company_id');

// var sidebarcolor = cookie.load('sidebarcolor');
// var headercolor = cookie.load('headercolor');
// var content1 = cookie.load('content1');
// var content2 = cookie.load('content2');
axios.put(axios.defaults.baseURL + '/api/front/theme/'+company_id, {
  session_id: cookies,
  sidebar_color_class: sidethemeColor
})
.then(function (response) {
if(response.data.status == false){
  msg(response.data.result)
}else{
//alert("successfully done theme")
cookie.save('sidebarcolor', response.data.result.sidebar_color_class, { path: '/' })
cookie.save('headercolor', response.data.result.header_color_class, { path: '/' })
cookie.save('content1', response.data.result.content_1, { path: '/' })
cookie.save('content2', response.data.result.content_2, { path: '/' })
 window.location.reload()
//hashHistory.push("/themes")
}

})
.catch(function (error) {
console.log(error);
//alert("errors")
});



this.setState({sidethemeColor:sidethemeColor})

}

render(){
  document.title = "Themes";
  var sidebarcolor = cookie.load('sidebarcolor');
  var headercolor = cookie.load('headercolor');
  // console.log("gg");
  // console.log(""+window.location.href);
  // var dhatingnach = window.location.href;
  // console.log("part"+dhatingnach);
  // for(var i=0;i=dhatingnach.length;i--){
  //   var text = "";
  //
  //     console.log("under");
  //     text += dhatingnach[i];
  //     console.log("88888888888888888"+text);
  //
  //     if(dhatingnach[i]=='/')
  //     {break;}

//  }
  // let divStyle = {
  //   color: 'white',
  //   : this.state.themess
  // };



  // <div className={styles.deviceWrap, styles.ipadLandscape}>
  //    <div className={styles.device, styles.desktoplayout} style={{'backgroundImage': 'url("assets/iphone.png")', 'backgroundSize': "cover"}}>
  //
  //    <div style={{ padding: '110px 27px 0px 206px'}}>
  //    <Layout>
  //        <Sider className={this.state.sidethemeColor} style={{'backgroundColor': sidebarcolor}}
  //          breakpoint="lg">
  //          <div className="logo" />
  //          <Menu className={this.state.sidethemeColor} style={{'backgroundColor': sidebarcolor}}  defaultSelectedKeys={['4']}>
  //
  //
  //          </Menu>
  //        </Sider>
  //        <Layout>
  //          <Header className={this.state.themess} style={{'backgroundColor': headercolor}} />
  //          <Content style={{ margin: '24px 16px 0' }}>
  //            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
  //              content
  //            </div>
  //          </Content>
  //          <Footer style={{ textAlign: 'center' }}>
  //            Ant Design ©2016 Created by Ant UED
  //          </Footer>
  //        </Layout>
  //      </Layout>
  //          </div>
  //    </div>
  // </div>


  var user_role = cookie.load('user_role');
  let adminmenu = null;
  if(user_role === "dashboard_admin"){
  adminmenu = <Breadcrumb.Item href='#/admindashboard'><Icon type="home" /><span> Dashboard</span></Breadcrumb.Item>
  }else{
  adminmenu = <Breadcrumb.Item href='#/dashboard'><Icon type="home" /><span> Dashboard</span></Breadcrumb.Item>
  }
  return (
<div>
<Breadcrumb>
   {adminmenu}
<Breadcrumb.Item><span>Theme</span></Breadcrumb.Item>
 </Breadcrumb><br />
<Card bordered={false} title="Theme Colors" noHovering="true" className="rightSidebarCard">
<Col span={12}>
<ul className="menuColorList">
  <p>Header Colors</p>
<li>
    <a style={{ background: "#222"}} onClick={(themess) => this.headerTheme("#222222")} ></a>
  </li>
   <li>
    <a style={{ background: "#e00404" }} onClick={(themess) => this.headerTheme("#e00404")}></a>
  </li>
  <li>
    <a style={{ background: "#04a552" }} onClick={(themess) => this.headerTheme("#04a552")}></a>
  </li>
  <li>
    <a style={{ background: "#0361a5" }} onClick={(themess) => this.headerTheme( "#0361a5")}></a>
  </li>
  <li>
  <a style={{   background: "#2601a0"}}  onClick={(themess) => this.headerTheme( "#2601a0")}></a>
    </li>
    <li>
    <a style={{ background: "#00a08a"}} onClick={(themess) =>this.headerTheme( "#00a08a")}></a>
    </li>
    <li>
    <a style={{ background: "#af9001"}} onClick={(themess) => this.headerTheme( "#af9001")}></a>
    </li>
    <li>
    <a style={{background: "#01b2b2"}} onClick={(themess) => this.headerTheme( "#01b2b2")}></a>
    </li>

    </ul>
</Col>
    <ul className="menuColorList">
    <p>Sidebar Colors</p>
    <li>
        <a style={{ background: "#222"}} onClick={(sidethemeColor) => this.sidebarTheme("#222222")} ></a>
      </li>
       <li>
        <a style={{ background: "#300000" }} onClick={(sidethemeColor) => this.sidebarTheme("#300000")}></a>
      </li>
      <li>
        <a style={{ background: "#013d1e" }} onClick={(sidethemeColor) => this.sidebarTheme("#013d1e")}></a>
      </li>
      <li>
        <a style={{ background: "#012f3d" }} onClick={(sidethemeColor) => this.sidebarTheme( "#012f3d")}></a>
      </li>
      <li>
      <a style={{   background: "#0f013d"}}  onClick={(sidethemeColor) => this.sidebarTheme( "#0f013d")}></a>
        </li>
        <li>
        <a style={{ background: "#01443b"}} onClick={(sidethemeColor) =>this.sidebarTheme( "#01443b")}></a>
        </li>
        <li>
        <a style={{ background: "#3d3201"}} onClick={(sidethemeColor) => this.sidebarTheme( "#3d3201")}></a>
        </li>
        <li>
        <a style={{background: "#013d3d"}} onClick={(sidethemeColor) => this.sidebarTheme( "#013d3d")}></a>
        </li>

        </ul>
    </Card>
    <section id={styles.devices}>




<div style={{'overflow':'auto'}}>

     <div className={styles.deviceWrap, styles.ipadLandscape}>
        <div className={styles.device, styles.desktoplayout} style={{'backgroundImage': 'url("assets/laptop.png")', 'backgroundSize': "cover"}}>

        <div style={{ padding: '40px 130px 0px 136px'}}>
        <Layout>
            <Sider className={this.state.sidethemeColor} style={{'backgroundColor': sidebarcolor}}
              breakpoint="lg">
              <div className="logo" />
              <Menu className={this.state.sidethemeColor} style={{'backgroundColor': sidebarcolor}}  defaultSelectedKeys={['4']}>


              </Menu>
            </Sider>
            <Layout>
              <Header className={this.state.themess} style={{'backgroundColor': headercolor}} />
              <Content style={{ margin: '24px 16px 0' }}>
                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                  content
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}>
                Ant Design ©2016 Created by Ant UED
              </Footer>
            </Layout>
          </Layout>
              </div>
        </div>
     </div>




     </div>


</section>


</div>

  )
}

}



export default Themes
