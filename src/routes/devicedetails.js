import React from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar,Row, Col, Button,Card, Table, Modal, Switch, Radio, Form, Tabs } from 'antd'
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import reqwest from 'reqwest';
import cookie from 'react-cookies'
const axios = require('axios');
import styles from './common.less';
import { browserHistory, hashHistory } from 'dva/router';
import Style from 'style-it';

var sidebarcolor = cookie.load('sidebarcolor');
var headercolor = cookie.load('headercolor');
var content1 = cookie.load('content1');
var content2 = cookie.load('content2');
class Devicedetails extends React.Component {

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
  bordered: true,
  pagination: true,
  size: 'default',
  expandedRowRender:true,
  title:true,
  showHeader:true,
  footer:true,
  rowSelection: true,
  scroll: true,
  selectedRowKeys: [],
  hostss:[],
  loading: false,

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

     componentDidMount() {
this.application();
    this.activetriggerslist()
    var device_id = cookie.load("device_id");
  //  alert(device_id)
    var cookies = cookie.load('sessionid');
    var company_id = cookie.load('company_id');
    axios.get(axios.defaults.baseURL + '/api/front/device/' + cookies + '/'+ device_id,{
      responseType: 'json'
    }).then(response => {
      console.log("hasgf " + JSON.stringify(response.data))
      var result = response.data.result;
        this.setState({status: response.status,background_image_url:result.background_image_url, device_name: result.device_name, group_name:result.group_name,device_ip:result.device_ip,device_port:result.device_port, loading:false});

      })
    .catch(function (error) {
      console.log(error);
    });


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

application(){
  var cookies = cookie.load('sessionid');
  var device_id = cookie.load("device_id");
  axios.get(axios.defaults.baseURL + '/api/front/application/' + cookies + '/device/' + device_id ,{
    responseType: 'json'
  }).then(response => {
  //  alert(" ::"+ JSON.stringify(response.data.result[0].items))
    let hostss = response.data.result.map((pic,i,demo) => {
       const hostsdetailstables = [
         {
           title: 'Item Name',
           dataIndex: 'item_name',
              className: styles.textleft
         },
        {
         title: 'Item Unit',
         dataIndex: 'item_unit',
            className: styles.textleft
       },
       {
        title: 'Item Key',
        dataIndex: 'item_key',
           className: styles.textleft
      },
      {
       title: 'Item Oid',
       dataIndex: 'item_oid',
          className: styles.textleft
     },
       {
         title: 'Interval Time',
         dataIndex: 'interval_time',
            className: styles.textleft,
            props: {
            style: { background: headercolor },
          },
       }];
         return(
         <TabPane tab={<span><Icon type="clock-circle" /> {pic.application_name}</span>} key={i}>
         <Card noHovering="false" bodyStyle={{ padding: 0 }}>
         <Table columns={hostsdetailstables}
        rowKey="application_id"
        dataSource={pic.items}
        />
                  </Card>
         </TabPane>
         )
       });

         this.setState({hostss:hostss});
         console.log("state:", this.state.hostss)
     })
  .catch(function (error) {
    console.log(error);
  });
}






render(){
  //
  const {status,device_name, group_name,device_ip,device_port,background_image_url,triggerlist} = this.state;
  var styles = {
      textAlign: {
          textAlign: 'right'
      }
    }
      var stylebg = {
        width: '80%',
        right: 0,
        position: 'absolute',
        opacity: 0.2,
        left: 0,
        margin:' 0 auto'
      };


     return (
       <div>
        <Style>
        {` .ant-pagination-item-active:focus, .ant-pagination-item-active:hover{ background: ` + sidebarcolor + `}
        .ant-pagination-item-active{background: ` + sidebarcolor + `}
             .intro {
               background: ` + headercolor + `
             }
          `}
      </Style>

       <div style={{'minHeight': '100vh'}}>
       <img src={this.state.background_image_url} style={stylebg} />
       <Row  gutter={24} justify="space-around" align="middle">
       <Col lg={8} md={8}>
       <Card style={{ padding: '0' }}>
         <Col span={12}>Status</Col>
          <Col style={styles.textAlign} span={12}><span>{this.state.status = true ? "Active" : "Inactive"}</span>
        </Col>
       </Card>
       </Col>

       <Col lg={8} md={8}>
       <Card style={{ padding: '0' }}>
         <Col span={12}>Group Name</Col>
          <Col style={styles.textAlign} span={12}><span>{this.state.group_name}</span>
        </Col>
       </Card>
       </Col>
       <Col lg={8} md={8}>
       <Card style={{ padding: '0' }}>
         <Col span={12}>IP</Col>
          <Col style={styles.textAlign} span={12}><span>{this.state.device_ip} : {this.state.device_port}</span>
        </Col>
       </Card>
       </Col>
       </Row>
       <Row><Card bodyStyle={{ padding: 0 }}>
       <Table  rowKey="id" scroll={{ x: 900}}  columns={[
         {
         title: 'Active Time',
         dataIndex: 'active_time',
         },
      {
       title: 'Name',
       dataIndex: 'name'
      },  {
       title: 'Item Name',
       dataIndex: 'item_name',
      },
      {
        title:'Description',
        dataIndex:'description'
      },
      {
        title:'Severity Name',
        dataIndex:'severity_name'
      },
      ]} pagination={{ pageSize: 6 }} dataSource={triggerlist} /></Card>
       </Row>
       <Row>
       <Card>
       <Tabs defaultActiveKey="1+1" style={{ height: "100%" }} >
{this.state.hostss}
</Tabs>
</Card>
         </Row>
       </div>
       </div>
     );

}
}



export default Devicedetails;
