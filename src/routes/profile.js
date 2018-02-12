import React from 'react'
import {Menu, Icon, Popover,Layout, Badge, Breadcrumb, M,Avatar,Row, Col, Button,Card, Table, Modal} from 'antd'
import {ComposedChart, CartesianGrid, LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis,Legend, Bar, Tooltip, ResponsiveContainer} from 'recharts';
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const {Header, Content, Footer, Sider} = Layout;
import colors from '../utils/theme'
import './pages/profile.less'
import RightSider from '../components/layout/rightSider';

import cookie from 'react-cookies'
const style={
    profileHeader:{
      //   background: 'url(./assets/2.jpg) no-repeat',

        // width: '100%',
        // backgroundSize: 'cover',
        // height: '250px',
    }
}
class Profile extends React.Component {

    onClick(event) {
      localStorage.clear();
      location.reload();
   }
  constructor(props) {
      super(props);

      this.state = {
         background: '#fff',
         profile:[]

   }
 }

   setModal1Visible(modal1Visible) {
     this.setState({modal1Visible})
   };


   componentDidMount() {
  //   this.UserList();


   }
render(){
  var email_id = cookie.load('email_id');
  var company_name = cookie.load('company_name');
  var sidebarcolor = cookie.load('sidebarcolor');
  var headercolor = cookie.load('headercolor');
  var content1 = cookie.load('content1');
  var content2 = cookie.load('content2');
var username = cookie.load('username');
var user_id = cookie.load('user_id');
var logo = cookie.load('logo');

var user_role = cookie.load('user_role');
let adminmenu = null;
if(user_role === "dashboard_admin"){
adminmenu = <Breadcrumb.Item href='#/admindashboard'><Icon type='home' /><span>Dashboard</span></Breadcrumb.Item>
}else{
adminmenu = <Breadcrumb.Item href='#/dashboard'><Icon type='home' /><span>Dashboard</span></Breadcrumb.Item>
}
  return (
<div>
<Breadcrumb>
   {adminmenu}
<Breadcrumb.Item><span>Profile</span></Breadcrumb.Item>
 </Breadcrumb><br />
<div className="profile-page">

    <Row gutter={24}>
        <Col xs={{span: 12, offset: 6}} md={{span: 12, offset: 6}} lg={{span: 8, offset: 8}} className="infoCol">
            <div className="profile">

                <div className="profile-header" style={style.profileHeader}>
        <img src={logo} />
                </div>
                <div className="profileInfo">
                    <h1 style={{'fontSize': '1.5em', 'textTransform':'capitalize'}}>{username}</h1>
                    <p style={{'textTransform':'none'}}>{email_id}</p>
                      <p style={{'textTransform':'none'}}>{company_name}</p>


                </div>
            </div>
        </Col>

    </Row>
</div>
</div>
  )
}

}



export default Profile
