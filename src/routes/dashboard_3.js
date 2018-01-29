import React, {PropTypes} from 'react'
import {
  Row,
  Col,
  Card,
  Carousel,
  Switch,
  Icon,Spin,
  Menu, Dropdown,
  Button, Table
} from 'antd'
import { Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea, ResponsiveContainer } from 'recharts';
import {color} from '../utils'
import './dashboard.less'

const axios = require('axios');
import cookie from 'react-cookies'
import { axiosrequest } from './axiosrequest';

const styles = {
    textAlign: {
        textAlign: 'right'
    },

}

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
  //  console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
  }),
};



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

};

class Dashboard_3 extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
      triggerlist: [{
        description:'',
        id:'',
        severity_name:'',
        active_time:'',
        item_name:'',
        name:'',
        connected:''
      }],
      disaster:'',
      countlist:'',
      informational:'',
      warnings:'',
      devicelist:'',
      triggerslist:'',
      itemslist:'',
      userslist:'',
      loading:true,
      data,
      left : 'dataMin',
      right : 'dataMax',
      refAreaLeft : '',
      refAreaRight : '',
      top : 'dataMax+1',
      bottom : 'dataMin-1',
      top2 : 'dataMax+20',
      bottom2 : 'dataMin-20',
      animation : true};
  }
  activetriggerslist = (params = {}) => {
      var cookies = cookie.load('sessionid');
      var company_id = cookie.load('company_id');
      axios.get(axios.defaults.baseURL + '/api/front/trigger/' + cookies + '/severity/' + 0 + '/active/' + 1 ,{
        responseType: 'json'
      }).then(response => {
            this.setState({triggerlist: response.data.result, loading:false});
        })
      .catch(function (error) {
        console.log(error);
      });
  }
  countlist = (params = {}) => {
      var cookies = cookie.load('sessionid');
      var company_id = cookie.load('company_id');
      axios.get(axios.defaults.baseURL + '/api/front/dashboard/count/' + cookies + '/company/' + company_id ,{
        responseType: 'json'
      }).then(response => {
      //  alert( response.data.result)
      var counts = response.data.result;
            this.setState({devicelist: counts.devices,triggerslist: counts.triggers,itemslist: counts.items,userslist: counts.users,  loading:false});
        })
      .catch(function (error) {
        console.log(error);
      });
  }

  Disasterslist = (params = {}) => {
      var cookies = cookie.load('sessionid');
      var company_id = cookie.load('company_id');
      axios.get(axios.defaults.baseURL + '/api/front/trigger/' + cookies + '/severity/' + 9 + '/active/' + 1 ,{
        responseType: 'json'
      }).then(response => {
            this.setState({disaster: response.data.result.length, loading:false});
        })
      .catch(function (error) {
        console.log(error);
      });
  }
  Warningslist = (params = {}) => {
      var cookies = cookie.load('sessionid');
      var company_id = cookie.load('company_id');
      axios.get(axios.defaults.baseURL + '/api/front/trigger/' + cookies + '/severity/' + 6 + '/active/' + 1 ,{
        responseType: 'json'
      }).then(response => {
            this.setState({warnings: response.data.result.length, loading:false});
        })
      .catch(function (error) {
        console.log(error);
      });
  }
  Informationallist = (params = {}) => {
      var cookies = cookie.load('sessionid');
      var company_id = cookie.load('company_id');
      axios.get(axios.defaults.baseURL + '/api/front/trigger/' + cookies + '/severity/' + 5 + '/active/' + 1 ,{
        responseType: 'json'
      }).then(response => {
            this.setState({informational: response.data.result.length, loading:false});
        })
      .catch(function (error) {
        console.log(error);
      });
  }
  componentWillMount(){

  }
  componentDidMount() {
    this.Informationallist();
    this.Warningslist();
    this.Disasterslist();

   this.activetriggerslist();

   this.countlist();
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

  render() {
    const { data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom, top2, triggerlist,informational,warnings,loading,countlist, disaster,bottom2,devicelist,triggerslist,itemslist,userslist } = this.state;
    var sidebarcolor = cookie.load('sidebarcolor');
    var headercolor = cookie.load('headercolor');
    var content1 = cookie.load('content1');
    var content2 = cookie.load('content2');

    return (
      <div className="dashboard-3">

        <Row gutter={24}>
          <Col xs={24} sm={24} md={24} lg={24}>

          <h3>Statistics</h3>
            <div>
            <Button
            className="primary update"
            onClick={this.zoomOut.bind( this )}
          >
            Zoom Out
          </Button>
          <Card noHovering="true" style={{'padding':40}}>
             <ResponsiveContainer width={'100%'} height={350}>
            <LineChart
                     width={800}
                     data={data}
                     onMouseDown = { (e) => this.setState({refAreaLeft:e.activeLabel}) }
                     onMouseMove = { (e) => this.state.refAreaLeft && this.setState({refAreaRight:e.activeLabel}) }
                     onMouseUp = { this.zoom.bind( this ) }
                   >
                     <CartesianGrid strokeDasharray="3 3"/>
                     <XAxis
                       allowDataOverflow={true}
                       dataKey="name"
                       domain={[left, right]}
                       type="number"
                     />
                     <YAxis
                       allowDataOverflow={true}
                       domain={[bottom, top]}
                       type="number"
                       yAxisId="1"
                      />
                     <YAxis
                       orientation="right"
                       allowDataOverflow={true}
                       domain={[bottom2, top2]}
                       type="number"
                       yAxisId="2"
                      />
                     <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#fff' }}/>
                     <Line yAxisId="1" type='natural' dataKey='cost' stroke='#8884d8' animationDuration={300}/>
                     <Line yAxisId="2" type='natural' dataKey='impression' stroke='#82ca9d' animationDuration={300}/>

                     {
                      (refAreaLeft && refAreaRight) ? (
                       <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight}  strokeOpacity={0.3} /> ) : null

                     }

                   </LineChart>
                   </ResponsiveContainer>
                   </Card>
            </div>
  </Col>
          <Col  xs={24} sm={24} md={24} lg={24}>
          <Row  gutter={32} justify="space-around" align="middle">
          <Col lg={6} md={6}>
          <Card className="bleedblue" style={{ padding: '30px','backgroundColor':content1,'borderRadius':'4px', 'border': '2px solid '+ sidebarcolor}}>
            <Col span={12}>
            <i className="fa fa-code-fork fa-5x text-primary"></i></Col>
     <Col style={styles.textAlign} span={12}><span className="text-primary" style={{ fontSize: 32 }}>{this.state.devicelist}</span><br />
     <span className="text-primary" style={{ fontSize: 20 }}>Devices </span>
     </Col>
          </Card>
          </Col>
          <Col lg={6} md={6}>
          <Card className="bleedblue" style={{ padding: '30px','backgroundColor':content1,'borderRadius':'4px', 'border': '2px solid '+ sidebarcolor }}>
            <Col span={12}><i className="fa fa-bell-o fa-5x text-primary"></i></Col>
     <Col style={styles.textAlign} span={12}><span className="text-primary" style={{ fontSize: 32 }}>{this.state.triggerslist}</span><br />
     <span style={{ fontSize: 20 }} className="text-primary">Triggers </span></Col>
          </Card>
          </Col>
          <Col lg={6} md={6}>
          <Card className="bleedblue" style={{ padding: '30px','backgroundColor':content1,'borderRadius':'4px', 'border': '2px solid '+ sidebarcolor }}>
            <Col span={12}><i className="fa fa-users fa-5x text-primary"></i></Col>
     <Col style={styles.textAlign} span={12}><span className="text-primary" style={{ fontSize: 32 }}>{this.state.userslist}</span><br />
     <span style={{ fontSize: 20 }} className="text-primary">Users </span></Col>
          </Card>
          </Col>
          <Col lg={6} md={6}>
          <Card className="bleedblue" style={{ padding: '30px','backgroundColor':content1,'borderRadius':'4px', 'border': '2px solid '+ sidebarcolor }}>
            <Col span={12}><i className="fa fa-cubes fa-5x text-primary"></i></Col>
     <Col style={styles.textAlign} span={12}><span className="text-primary" style={{ fontSize: 32 }}>{this.state.itemslist}</span><br />
     <span style={{ fontSize: 20 }} className="text-primary">Items </span></Col>
          </Card>
          </Col>
          </Row>
          </Col>
        </Row>
        <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={8}>

          <Card style={{ padding: '30px' }}>
            <Col span={12}><Icon type="exclamation-circle" style={{ fontSize: 40, color: '#EF5350', margin: 20 }} /></Col>
     <Col style={styles.textAlign} span={12}><span style={{ fontSize: 32, color: '#EF5350' }}>{this.state.disaster}</span><br />
     <span style={{ fontSize: 20, color: '#EF5350' }}>Disasters </span></Col>
          </Card>

        </Col>
        <Col xs={24} sm={24} md={24} lg={8}>
        <Card style={{ padding: '30px' }}>
          <Col span={12}><Icon type="exclamation-circle" style={{ fontSize: 40, color: '#ff902b', margin: 20 }} /></Col>
   <Col style={styles.textAlign} span={12}><span style={{ fontSize: 32, color: '#ff902b' }}>{this.state.warnings}</span><br />
   <span style={{ fontSize: 20, color: '#ff902b' }}>Warnings </span></Col>
        </Card>
        </Col>
        <Col xs={24} sm={24} md={24} lg={8}>
        <Card style={{ padding: '30px' }}>
          <Col span={12}><Icon type="exclamation-circle" style={{ fontSize: 40, color: '#66BB6A', margin: 20 }} /></Col>
   <Col style={styles.textAlign} span={12}><span style={{ fontSize: 32, color: '#66BB6A' }}>{this.state.informational}</span><br />
   <span style={{ fontSize: 20, color: '#66BB6A' }}>Informational </span></Col>
        </Card>
        </Col>
        </Row>
        <Row gutter={24}>
        <Card style={{ padding: 0}}>
          <Col lg={24} md={24}>
           <Table rowSelection={rowSelection} rowKey="id" scroll={{ x: 900}} columns={[
             {
             title: 'active_time',
             dataIndex: 'active_time',
             },
          {
           title: 'name',
           dataIndex: 'name'
          },  {
           title: 'item_name',
           dataIndex: 'item_name',
          },
          {
            title:'description',
            dataIndex:'description'
          },
          {
            title:'severity_name',
            dataIndex:'severity_name'
          },



        ]} pagination={{ pageSize: 6 }} dataSource={triggerlist} />
          </Col>
          </Card>
        </Row>
      </div>
    );
  }
}


export default Dashboard_3
