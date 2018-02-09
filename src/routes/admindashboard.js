import React, {PropTypes} from 'react'
import {
  Row,
  Col,
  Card,
  Carousel,
  Switch,
  Icon,
  Menu, Dropdown,
  Button, Table
} from 'antd'
import { Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea, ResponsiveContainer } from 'recharts';
import {color} from '../utils'
import './dashboard.less'
import cookie from 'react-cookies'

const axios = require('axios');
import { axiosrequest } from './axiosrequest';
const styles = {
    textAlign: {
        textAlign: 'right'
    },

}
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];
const datadata = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}, {
  key: '4',
  name: 'Disabled User',
  age: 99,
  address: 'Sidney No. 1 Lake Park',
}];
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
  }),
};
const cardStyle = {

  bodyStyle: {
    height: 150,
    color: '#fff',

    padding: 0
  }
}
const cardStyle_2 = {
  bodyStyle: {
    height: 480,
    color: '#fff'
  }
}
const cardStyle_3 = {
  bodyStyle: {
    minHeight: 510,
    color: '#fff'
  }
}
const semanticCardStyle = {
  minHeight: 548,
  color: '#fff',

  padding: 10
}

const yearMenu = (
  <Menu>
    <Menu.Item key="0">
      <a  rel="noopener noreferrer" href="#">2016</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a  rel="noopener noreferrer" href="3">2017</a>
    </Menu.Item>

  </Menu>
);

const monthMenu = (
  <Menu>
    <Menu.Item key="0">
      <a  rel="noopener noreferrer" href="#">3 Month</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a  rel="noopener noreferrer" href="#">6 Month</a>
    </Menu.Item>
    <Menu.Item key="3">
    <a  rel="noopener noreferrer" href="#">12 Month</a>
  </Menu.Item>
  </Menu>
);


const data = [
  { name: 1, cost: 4.11, impression: 100 },
  { name: 2, cost: 2.39, impression: 120 },
  { name: 3, cost: 1.37, impression: 150 },
  { name: 4, cost: 1.16, impression: 180 },
  { name: 5, cost: 2.29, impression: 200 },
  { name: 6, cost: 3, impression: 499 },
  { name: 7, cost: 0.53, impression: 50 },
  { name: 8, cost: 2.52, impression: 100 },
  { name: 9, cost: 1.79, impression: 200 },
  { name: 10, cost: 2.94, impression: 222},
  { name: 11, cost: 4.3, impression: 210 },
  { name: 12, cost: 4.41, impression: 300 },
  { name: 13, cost: 2.1, impression: 50 },
  { name: 14, cost: 8, impression: 190 },
  { name: 15, cost: 0, impression: 300 },
  { name: 16, cost: 9, impression: 400 },
  { name: 17, cost: 3, impression: 200 },
  { name: 18, cost: 2, impression: 50 },
  { name: 19, cost: 3, impression: 100 },
  { name: 20, cost: 7, impression: 100 }
];

const getAxisYDomain = (from, to, ref, offset) => {
	const refData = data.slice(from-1, to);
  let [ bottom, top ] = [ refData[0][ref], refData[0][ref] ];
  refData.forEach( d => {
  	if ( d[ref] > top ) top = d[ref];
    if ( d[ref] < bottom ) bottom = d[ref];
  });

  return [ (bottom|0) - offset, (top|0) + offset ]
};

const initialState = {
  data,
  left : 'dataMin',
  right : 'dataMax',
  refAreaLeft : '',
  refAreaRight : '',
  top : 'dataMax+1',
  bottom : 'dataMin-1',
  top2 : 'dataMax+20',
  bottom2 : 'dataMin-20',
  animation : true
};
var sessionIds = cookie.loadAll();
class Admin_dashboard extends React.Component {

	constructor(props) {
    super(props);
    this.state = initialState,{
      devicelist:'',
      itemslist:'',
      userslist:''

    };
  }

  zoom(){
  	let { refAreaLeft, refAreaRight, data } = this.state;

		if ( refAreaLeft === refAreaRight || refAreaRight === '' ) {
    	this.setState( () => ({
      	refAreaLeft : '',
        refAreaRight : ''
      }) );
    	return;
    }

		// xAxis domain
	  if ( refAreaLeft > refAreaRight )
    		[ refAreaLeft, refAreaRight ] = [ refAreaRight, refAreaLeft ];

		// yAxis domain
    const [ bottom, top ] = getAxisYDomain( refAreaLeft, refAreaRight, 'cost', 1 );
    const [ bottom2, top2 ] = getAxisYDomain( refAreaLeft, refAreaRight, 'impression', 50 );

    this.setState( () => ({
      refAreaLeft : '',
      refAreaRight : '',
    	data : data.slice(),
      left : refAreaLeft,
      right : refAreaRight,
      bottom, top, bottom2, top2
    } ) );
  };

	zoomOut() {
  	const { data } = this.state;
  	this.setState( () => ({
      data : data.slice(),
      refAreaLeft : '',
      refAreaRight : '',
      left : 'dataMin',
      right : 'dataMax',
      top : 'dataMax+1',
      bottom : 'dataMin',
      top2 : 'dataMax+50',
      bottom: 'dataMin+50'
    }) );
  }
  countlist = (params = {}) => {
      var cookies = cookie.load('sessionid');
      var company_id = cookie.load('company_id');
      axios.get(axios.defaults.baseURL + '/api/front/dashboard/count/' + cookies + '/company/' + company_id ,{
        responseType: 'json'
      }).then(response => {
    // alert( response.data.result)
      var counts = response.data.result;
            this.setState({devicelist: counts.devices,itemslist: counts.items,userslist: counts.users,  loading:false});
        })
      .catch(function (error) {
        console.log(error);
      });
  }
  componentDidMount(){
    this.countlist();


    var accessToken = cookie.load('powerbiaccesstoken');
//alert(accessToken)
                // check if the embed url was selected
                var embedUrl = "https://app.powerbi.com/dashboardEmbed?dashboardId=0ba99506-dfba-4f60-8449-3bb9f1679111";
                if (embedUrl === "")
                    return;

                // get the access token.
                //accessToken = document.getElementById('MainContent_accessTokenTextbox').value;

                // Embed configuration used to describe the what and how to embed.
                // This object is used when calling powerbi.embed.
                // You can find more information at https://github.com/Microsoft/PowerBI-JavaScript/wiki/Embed-Configuration-Details.
                var config = {
                    type: 'dashboard',
                    accessToken: accessToken,
                    embedUrl: embedUrl
                };

                // Grab the reference to the div HTML element that will host the dashboard.
                var dashboardContainer = document.getElementById('dashboardContainer');

                // Embed the dashboard and display it within the div container.
                var dashboard = powerbi.embed(dashboardContainer, config);
console.log(dashboard)
                // dashboard.on will add an event handler which prints to Log window.
                dashboard.on("tileClicked", function (event) {
                    var logView = document.getElementById('logView');
                    logView.innerHTML = logView.innerHTML + "Tile Clicked<br/>";
                    logView.innerHTML = logView.innerHTML + JSON.stringify(event.detail, null, "  ") + "<br/>";
                    logView.innerHTML = logView.innerHTML + "---------<br/>";
                });

                // dashboard.on will add an event handler which prints to Log window.
                dashboard.on("error", function (event) {
                    var logView = document.getElementById('logView');
                    logView.innerHTML = logView.innerHTML + "Error<br/>";
                    logView.innerHTML = logView.innerHTML + JSON.stringify(event.detail, null, "  ") + "<br/>";
                    logView.innerHTML = logView.innerHTML + "---------<br/>";
                });
  }
  render() {
    // <Row gutter={32} justify="space-around" align="middle">
    // <Col lg={8} md={8}>
    //
    // <Card className="bleedblue" style={{ padding: '30px' }}>
    //
    //   <Col span={12}>
    //
    //   <i className="fa fa-code-fork fa-5x text-primary"></i></Col>
    //  <Col style={styles.textAlign} span={12}><span className="text-primary" style={{ fontSize: 32 }}>{this.state.devicelist}</span><br />
    //  <span className="text-primary" style={{ fontSize: 18 }}>No. of Devices </span>
    //
    //  </Col>
    // </Card>
    //
    // </Col>
    // <Col lg={8} md={8}>
    //
    // <Card className="bleedblue" style={{ padding: '30px' }}>
    //   <Col span={12}><i className="fa fa-cubes fa-5x text-primary"></i></Col>
    // <Col style={styles.textAlign} span={12}><span className="text-primary" style={{ fontSize: 32 }}>{this.state.itemslist}</span><br />
    // <span style={{ fontSize: 18 }} className="text-primary">No. of Items </span></Col>
    // </Card>
    // </Col>
    //
    // <Col lg={8} md={8}>
    //
    // <Card className="bleedblue" style={{ padding: '30px' }}>
    //   <Col span={12}><i className="fa fa-users fa-5x text-primary"></i></Col>
    // <Col style={styles.textAlign} span={12}><span className="text-primary" style={{ fontSize: 32 }}>{this.state.userslist}</span><br />
    // <span style={{ fontSize: 18 }} className="text-primary">No. of Users </span></Col>
    // </Card>
    // </Col>
    // </Row><br />
//     <Row gutter={24}>
//       <Col xs={24} sm={24} md={24} lg={24}>
//
//         <Card title="Sales Overview" style={{'overflow':'hidden'}}>
//         <div>
//         <Button className="primary update" onClick={this.zoomOut.bind( this )}>Zoom Out</Button>
//          <ResponsiveContainer width={'100%'} height={350}>
//         <LineChart
//                  width={800}
//                  data={data}
//                  onMouseDown = { (e) => this.setState({refAreaLeft:e.activeLabel}) }
//                  onMouseMove = { (e) => this.state.refAreaLeft && this.setState({refAreaRight:e.activeLabel}) }
//                  onMouseUp = { this.zoom.bind( this ) }
//                >
//                  <CartesianGrid strokeDasharray="3 3"/>
//                  <XAxis
//                    allowDataOverflow={true}
//                    dataKey="name"
//                    domain={[left, right]}
//                    type="number"
//                  />
//                  <YAxis
//                    allowDataOverflow={true}
//                    domain={[bottom, top]}
//                    type="number"
//                    yAxisId="1"
//                   />
//                  <YAxis
//                    orientation="right"
//                    allowDataOverflow={true}
//                    domain={[bottom2, top2]}
//                    type="number"
//                    yAxisId="2"
//                   />
//                  <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#fff' }}/>
//                  <Line yAxisId="1" type='natural' dataKey='cost' stroke='#8884d8' animationDuration={300}/>
//                  <Line yAxisId="2" type='natural' dataKey='impression' stroke='#82ca9d' animationDuration={300}/>
//
//                  {
//                   (refAreaLeft && refAreaRight) ? (
//                    <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight}  strokeOpacity={0.3} /> ) : null
//
//                  }
//
//                </LineChart>
//                </ResponsiveContainer>
//         </div>
//         </Card>
// </Col>
//
//
//     </Row>
    const { data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom, top2,userslist,devicelist,itemslist, bottom2 } = this.state;

    return (

      <div className="dashboard-3">


      <div id="dashboardContainer" style={{'height':'100vh'}}></div>





      </div>
    );
  }
}


export default Admin_dashboard
