import React, {PropTypes} from 'react'
import {
  Row,
  Col,
  Card,
  Carousel,
  Switch,Spin,Breadcrumb,
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


class Alerts extends React.Component {

	constructor(props) {
    super(props);
    this.state = initialState,{
      devicelist:'',
      itemslist:'',
      userslist:'',
      dashboardspin:true

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
    this.countlist()
    this.setState({
      dashboardspin:false
    })
  }
  render() {
    document.title = "Alert";
    const { data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom, top2,userslist,devicelist,itemslist, bottom2 } = this.state;
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
      <Breadcrumb.Item><span>Alerts</span></Breadcrumb.Item>
       </Breadcrumb><br />
      <div className="dashboard-3">

<Spin size="default"  spinning={this.state.dashboardspin}>
        <Row gutter={24}>
        <iframe src="https://app.powerbi.com/view?r=eyJrIjoiNzI0MTA3MzAtNDRlYi00NDIyLTk0YmEtNDc1Y2M1OTEwMmNkIiwidCI6ImExOGFkY2Y4LTViMGQtNGRiMS1iZDY3LTgyNDc2MjQ5N2M0YiIsImMiOjZ9" width="100%" height="580" frameBorder="0" allowFullScreen="allowFullScreen"></iframe>


        </Row>
</Spin>

      </div>
        </div>
    );
  }
}


export default Alerts
