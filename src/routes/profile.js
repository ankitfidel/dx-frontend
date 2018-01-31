import React from 'react'
import {Menu, Icon, Popover,Layout, Badge, M,Avatar,Row, Col, Button,Card, Table, Modal} from 'antd'
import {ComposedChart, CartesianGrid, LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis,Legend, Bar, Tooltip, ResponsiveContainer} from 'recharts';
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const {Header, Content, Footer, Sider} = Layout;
import colors from '../utils/theme'
import './pages/profile.less'
import RightSider from '../components/layout/rightSider';

import cookie from 'react-cookies'
const style={
    profileHeader:{
         background: 'url(./assets/2.jpg) no-repeat',

        width: '100%',
        backgroundSize: 'cover',
        height: '250px',
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

  return (
<div>
<div className="profile-page">
    <Row gutter={24}>
        <Col xs={24} md={6} lg={6} className="infoCol">
            <div className="profile">
                <div className="profile-header" style={style.profileHeader}>
                    <img src="./assets/3.jpg"/>
                </div>
                <div className="profileInfo">
                    <h1 style={{'fontSize': '1.5em'}}>{email_id}</h1>
                    <p>{company_name}</p>

                    <h1 className="profileIntro">INTRO</h1>
                    <p className="profileAbout">User experinces become more inportant than products;
                        companies now have to consider how products and services enhance specific
                        lifestyles and workflows</p>
                    <h1 className="profilePhotoHeader">PHOTOS</h1>
                    <div className="profilePhotos">
                        <img src="./assets/people/3.jpg"/>
                        <img src="./assets/people/10.jpg"/>
                        <Badge count={100}>
                            <a href="#" className="head-example"/>
                        </Badge>
                    </div>
                    <h1 className="profilefirendHeader">FRIENDS</h1>
                    <div className="profilePhotos">
                        <img src="./assets/people/1.jpg"/>
                        <img src="./assets/people/2.jpg"/>
                        <img src="./assets/people/7.jpg"/>
                        <img src="./assets/people/12.jpg"/>

                        <Badge count={100}>
                            <a href="#" className="head-example"/>
                        </Badge>
                    </div>
                </div>
            </div>
        </Col>
        <Col xs={24} md={12} lg={12}>
            <Card bordered={false}>
            <div className="postInput">
             <img src="./assets/3.jpg"/>
              <b>Whats on your mind?</b>
              <Button type="primary" icon="rocket">POST</Button>
            </div>
            </Card>
            <Card bordered={false}>
            <div className="postContent">
            <img className="contentImage" src="./assets/3.jpg"/><p> Samantha Grey <small>with</small> Thomas Wood <br/>January 18, 2017 . Italy</p>
               <img className="postImage" src="./assets/4.jpg"/>
            </div></Card>
            <Card bordered={false}>...</Card>

        </Col>
        <Col xs={24} md={6} lg={6}>
            <div className="messenger">
                <ul className="userList">
                    <li><img src="./assets/people/1.jpg"/>
                        <b>Thomas Wood</b>
                    </li>
                    <li><img src="./assets/people/2.jpg"/>
                        <b>Valentine Basser</b>
                    </li>
                    <li><img src="./assets/people/3.jpg"/>
                        <b>Thomas Ronne</b>
                    </li>
                    <li><img src="./assets/people/4.jpg"/>
                        <b>Patricia Dedd</b>
                    </li>
                    <li><img src="./assets/people/5.jpg"/>
                        <b>Ousamma Ammar</b>
                    </li>
                    <li><img src="./assets/people/6.jpg"/>
                        <b>Vincent Naigard</b>
                    </li>
                    <li><img src="./assets/people/7.jpg"/>
                        <b>Theo Walcott</b>
                    </li>
                    <li><img src="./assets/people/8.jpg"/>
                        <b>Adrien Dode</b>
                    </li>
                    <li><img src="./assets/people/9.jpg"/>
                        <b>Audry Hepn</b>
                    </li>

                </ul>
            </div>
        </Col>
    </Row>
</div></div>
  )
}

}



export default Profile
