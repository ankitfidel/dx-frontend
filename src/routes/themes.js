import React from 'react'
import {Menu, Icon, Popover,Layout, Badge, M,Avatar,Row, Col, Button,Card, Table, Modal} from 'antd'
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

  return (
<div>
<Card bordered={false} title="Navbar Colors" className="rightSidebarCard">
<Col span={12}>
<ul className="menuColorList">
  <p>Header Colors</p>
<li>
    <a style={{ background: "#222"}} onClick={(themess) => this.headerTheme("#222222")} ></a>
  </li>
   <li>
    <a style={{ background: colors.color.sugar_plum }} onClick={(themess) => this.headerTheme("#8E5572")}></a>
  </li>
  <li>
    <a style={{ background: colors.color.midnight_green }} onClick={(themess) => this.headerTheme("#114B5F")}></a>
  </li>
  <li>
    <a style={{ background: colors.color.arsenic }} onClick={(themess) => this.headerTheme( "#403F4C")}></a>
  </li>
  <li>
  <a style={{   background: colors.color.brillant_azure}}  onClick={(themess) => this.headerTheme( "#3185FC")}></a>
    </li>
    <li>
    <a style={{ background: colors.color.portland_orange}} onClick={(themess) =>this.headerTheme( "#F46036")}></a>
    </li>
    <li>
    <a style={{ background: colors.color.jungle_green}} onClick={(themess) => this.headerTheme( "#1B998B")}></a>
    </li>
    <li>
    <a style={{background: colors.color.desire}} onClick={(themess) => this.headerTheme( "#E84855")}></a>
    </li>
    <li>
    <a style={{background: colors.color.stil_de_gran_yellow}} onClick={(themess) => this.headerTheme( "#F9DC5C")}></a>
    </li>
    <li>
    <a style={{background: colors.color.purple}} onClick={(themess) => this.headerTheme( "#d897eb")}></a>
    </li>
    </ul>
</Col>
    <ul className="menuColorList">
    <p>Sidebar Colors</p>
    <li>
        <a style={{ background: "#222"}} onClick={(sidethemeColor) => this.sidebarTheme("#222222")} ></a>
      </li>
       <li>
        <a style={{ background: colors.color.sugar_plum }} onClick={(sidethemeColor) => this.sidebarTheme("#8E5572")}></a>
      </li>
      <li>
        <a style={{ background: colors.color.midnight_green }} onClick={(sidethemeColor) => this.sidebarTheme("#114B5F")}></a>
      </li>
      <li>
        <a style={{ background: colors.color.arsenic }} onClick={(sidethemeColor) => this.sidebarTheme( "#403F4C")}></a>
      </li>
      <li>
      <a style={{   background: colors.color.brillant_azure}}  onClick={(sidethemeColor) => this.sidebarTheme( "#3185FC")}></a>
        </li>
        <li>
        <a style={{ background: colors.color.portland_orange}} onClick={(sidethemeColor) =>this.sidebarTheme( "#F46036")}></a>
        </li>
        <li>
        <a style={{ background: colors.color.jungle_green}} onClick={(sidethemeColor) => this.sidebarTheme( "#1B998B")}></a>
        </li>
        <li>
        <a style={{background: colors.color.desire}} onClick={(sidethemeColor) => this.sidebarTheme( "#E84855")}></a>
        </li>
        <li>
        <a style={{background: colors.color.stil_de_gran_yellow}} onClick={(sidethemeColor) => this.sidebarTheme( "#F9DC5C")}></a>
        </li>
        <li>
        <a style={{background: colors.color.purple}} onClick={(sidethemeColor) => this.sidebarTheme( "#d897eb")}></a>
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
