import React from 'react'
import {Menu, Icon, Popover, Badge,Breadcrumb, M,Avatar,Row, Col, Button,Card,Spin, Table, Modal,Select,Pagination,  Switch, Radio, Form, DatePicker,Tabs } from 'antd'
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const FormItem = Form.Item;
import {LineChart, Line, AreaChart, Area, Brush, XAxis,Label, YAxis,ResponsiveContainer, CartesianGrid, Tooltip} from 'recharts';
const TabPane = Tabs.TabPane;
import reqwest from 'reqwest';
import cookie from 'react-cookies'
const axios = require('axios');
const Option = Select.Option;
import styles from './common.less';
import { browserHistory, hashHistory } from 'dva/router';

import Style from 'style-it';
const {  RangePicker } = DatePicker;

var sidebarcolor = cookie.load('sidebarcolor');
var headercolor = cookie.load('headercolor');
var content1 = cookie.load('content1');
var content2 = cookie.load('content2');
function error(msg) {
  const modal = Modal.warning({
    content: msg
  });
}

function formattedDate(currentDate){
  var year = currentDate.getFullYear();
    var month = currentDate.getMonth();//start from 0
    var date = currentDate.getDate();
    var hours = currentDate.getHours();
    var mins = currentDate.getMinutes();//start from 0
    var secs = currentDate.getSeconds();


   if(month=='0'){
     month='01';
   }
   else if(month=='1'){
     month='02';
   }
   else if(month=='2'){
     month='03';
   }
   else if(month=='3'){
     month='04';
   }
   else if(month=='4'){
     month='05';
   }
   else if(month=='5'){
     month='06';
   }
   else if(month=='6'){
     month='07';
   }
   else if(month=='7'){
     month='08';
   }
   else if(month=='8'){
     month='09';
   }
   else if(month=='9'){
     month='10';
   }
   else if(month=='10'){
     month='11';
   }
   else if(month=='11'){
     month='12';
   }
   var newDate = year + "-"+month+"-"+date+" "+hours+":"+mins+":"+secs;

   return newDate;
}

class Environmental extends React.Component {

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
  status: '',
  device_name:'',
  group_name:'',
  background_image_url:'',
  device_ip:'',
  device_port:'',
  chartgraph:[],
  bordered: true,
  pagination: {},
  size: 'default',
  expandedRowRender:true,
  title:true,
  showHeader:true,
  noData:'',
  footer:true,
  rowSelection: true,
  scroll: true,
  graphloadingss:false,
  envData:[],
  selectedRowKeys: [],
  hostss:[],
  loading: false,
  graphloading:false
}

   }

     onSelectChange = (selectedRowKeys) => {
       console.log('selectedRowKeys changed: ', selectedRowKeys);
       this.setState({ selectedRowKeys });
     }

     handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
          pagination: pager,
          key:i,
        });
        this.fetch({
          results: pagination.pageSize,
          page: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        });
      }
      graphclose = (e) => {
      console.log(e);
      this.setState({
      graph: false,
      });
      }

     componentDidMount() {
       var docTitle = "Environmental";
       document.title = docTitle;
       var cookies = cookie.load('sessionid');
       axios.get(axios.defaults.baseURL + '/api/environment/data/' + cookies,{
         responseType: 'json'
       }).then(response => {

         var chartgraphvalues = [];
         var env_values = response.data.result;
            for(let i=0;i<env_values.length;i++){
              chartgraphvalues.push({
                'timestamp' : env_values[i].timestamp,
                'pressure' : env_values[i].pressure,
                'humidity' : env_values[i].humidity,
                'temperature' : env_values[i].temperature,
              });
            }

            this.setState({
          envData: chartgraphvalues,graphloading:false
            });
})
       .catch(function (error) {
         console.log(error);
       });

    //
    //
    //
    //
    // axios.get(axios.defaults.baseURL + '/api/front/device/' + cookies + '/'+ device_id,{
    //   responseType: 'json'
    // }).then(response => {
    //   console.log("hasgf " + JSON.stringify(response.data))
    //   var result = response.data.result;
    //     this.setState({status: response.status,background_image_url:result.background_image_url, device_name: result.device_name, group_name:result.group_name,device_ip:result.device_ip,device_port:result.device_port, loading:false});
    //
    //   })
    // .catch(function (error) {
    //   console.log(error);
    // });


     }




// componentWillMount(){
//   alert(this.state.device_name);
//     var dd = this.state.device_name;
//
// }



render(){

  // const envData = [
  //       {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
  //       {name: 'Page B', uv: 3000, pv: 1398, amt: 2210},
  //       {name: 'Page C', uv: 2000, pv: 9800, amt: 2290},
  //       {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
  //       {name: 'Page E', uv: 1890, pv: 4800, amt: 2181},
  //       {name: 'Page F', uv: 2390, pv: 3800, amt: 2500},
  //       {name: 'Page G', uv: 3490, pv: 4300, amt: 2100}
  //       // {name: 'Page A', uv: 4000, pv: 2400},
  //       // {name: 'Page B', uv: 3000, pv: 1398},
  //       // {name: 'Page C', uv: 2000, pv: 9800},
  //       // {name: 'Page D', uv: 2780, pv: 3908}
  //
  // ];

//  alert("device_name: "+dd);
  //

  const {status,device_name, group_name,device_ip,device_port,background_image_url,triggerlist,noData,graphloadingss, chartgraph} = this.state;
  var styles = {
      textAlign: {
          textAlign: 'right'
      }
    }
      var stylebg = {
        height: '100%', width:'100%',
        right: 0,
        position: 'absolute',
        opacity: 0.095,
        left: 0,
        margin:' 0 auto'
      };
      var user_role = cookie.load('user_role');
      let adminmenu = null;
      if(user_role === "dashboard_admin"){
      adminmenu = <Breadcrumb.Item href='#/admindashboard'><Icon type="home" /><span> Dashboard</span></Breadcrumb.Item>
      }else{
      adminmenu = <Breadcrumb.Item href='#/dashboard'><Icon type="home" /><span> Dashboard</span></Breadcrumb.Item>
      }

     return (
       <div>
       <Style>{`
.icongreen{color:` + headercolor + `}

`}
       </Style>
       <Breadcrumb>
          {adminmenu}
          <Breadcrumb.Item>Environmental</Breadcrumb.Item>

        </Breadcrumb>
        <br />



       <div style={{'minHeight': '100vh'}}>
       <Spin size="default" spinning={this.state.graphloading}>

<Card noHovering="true">
<Row>
<Col span={24}>
<p>Last Record:</p>
<ResponsiveContainer width={'100%'} height={350}>
 <LineChart width={600} height={200} data={this.state.envData} syncId="anyId"
         margin={{top: 10, right: 30, left: 0, bottom: 0}}>
         <XAxis dataKey="timestamp"/>
            <YAxis/>
     <CartesianGrid strokeDasharray="3 3 3"/>
     <Tooltip/>
     <Line type="monotone" dataKey="pressure" stroke="#8884d8" activeDot={{r: 8}}/>
        <Line type="monotone" dataKey="temperature" stroke="#82ca9d" />
        <Line type="monotone" dataKey="humidity" stroke="RED" />

     <Brush />
   </LineChart>
</ResponsiveContainer>
</Col>

</Row>
</Card>
         </Spin>
       </div>
       </div>
     );

}
}



export default Environmental;
