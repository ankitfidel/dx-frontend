import React from 'react'
import {Menu, Icon, Popover, Badge,Breadcrumb, M,Avatar,Row, Col, Button,Card,Spin, Table, Modal,Select, Switch, Radio, Form, DatePicker,Tabs } from 'antd'
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

class Userdevicedetails extends React.Component {

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
  pagination: true,
  size: 'default',
  expandedRowRender:true,
  title:true,
  showHeader:true,
  noData:'',
  footer:true,
  rowSelection: true,
  scroll: true,
  graphloadingss:false,
  selectedRowKeys: [],
  hostss:[],
  loading: true,
  graphloading:false
}

this.filterselectDate = this.filterselectDate.bind(this);
 this.changeGraph = this.changeGraph.bind(this);
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
      filterselectDate(value){
      //  alert(value)
          var todate = new Date();
          var fromDate;
        if (value == 'last 5 mins') {
              var time_fromDate = new Date();
              time_fromDate.setMinutes(time_fromDate.getMinutes() - 5);
             fromDate = time_fromDate;
             fromDate = formattedDate(fromDate);
             todate = formattedDate(todate);
        }
        if (value == 'last 15 mins') {
              var time_fromDate = new Date();
              time_fromDate.setMinutes(time_fromDate.getMinutes() - 15);
              fromDate = time_fromDate;
             fromDate = formattedDate(fromDate);
             todate = formattedDate(todate);
        }
        if (value == 'last 30 mins') {
              var time_fromDate = new Date();
              time_fromDate.setMinutes(time_fromDate.getMinutes() - 30);
             fromDate = time_fromDate;
             fromDate = formattedDate(fromDate);
             todate = formattedDate(todate);
        }
        if (value == 'last 1 hours') {
             var time_fromDate = new Date();
             time_fromDate.setMinutes(time_fromDate.getMinutes() - 60);
             fromDate = time_fromDate;
             fromDate = formattedDate(fromDate);
             todate = formattedDate(todate);
        }

        if (value == 'last 3 hours') {
          var time_fromDate = new Date();
          time_fromDate.setHours(time_fromDate.getHours() - 3);
          fromDate = time_fromDate;
          fromDate = formattedDate(fromDate);
          todate = formattedDate(todate)

        }
        if (value == 'last 6 hours') {
          var time_fromDate = new Date();
          time_fromDate.setHours(time_fromDate.getHours() - 6);
          fromDate = time_fromDate;
          fromDate = formattedDate(fromDate);
          todate = formattedDate(todate);
        }
        if (value == 'last 12 hours') {
          var time_fromDate = new Date();
          time_fromDate.setHours(time_fromDate.getHours() - 12);
          fromDate = time_fromDate;
          fromDate = formattedDate(fromDate);
          todate = formattedDate(todate);
        }
        if (value == 'last 1 days') {
          var time_fromDate = new Date();
          time_fromDate.setDate(time_fromDate.getDate() - 1);
          fromDate = time_fromDate;
          fromDate = formattedDate(fromDate);
          todate = formattedDate(todate);
        }
        if (value == 'last 1 weeks') {
          var time_fromDate = new Date();
          time_fromDate.setDate(time_fromDate.getDate() - 7);
          fromDate = time_fromDate;
          fromDate = formattedDate(fromDate);
          todate = formattedDate(todate);
        }
        if (value == 'last 2 weeks') {
          var time_fromDate = new Date();
          time_fromDate.setDate(time_fromDate.getDate() - 14);
          fromDate = time_fromDate;
          fromDate = formattedDate(fromDate);
          todate = formattedDate(todate);
        }
        if (value == 'last 1 months') {
          var time_fromDate = new Date();
          time_fromDate.setMonth(time_fromDate.getMonth() - 1);
          fromDate = time_fromDate;
          fromDate = formattedDate(fromDate);
          todate = formattedDate(todate);
        }
        if (value == 'last 3 months') {
          var time_fromDate = new Date();
          time_fromDate.setMonth(time_fromDate.getMonth() - 3);
          fromDate = time_fromDate;
          fromDate = formattedDate(fromDate);
          todate = formattedDate(todate);
        }
        if (value == 'last 6 months') {
          var time_fromDate = new Date();
          time_fromDate.setMonth(time_fromDate.getMonth() - 6);
          fromDate = time_fromDate;
          fromDate = formattedDate(fromDate);
          todate = formattedDate(todate);
        }
        if (value == 'last 1 years') {
          var time_fromDate = new Date();
          time_fromDate.setFullYear(time_fromDate.getFullYear() - 1);
          fromDate = time_fromDate;
          fromDate = formattedDate(fromDate);
          todate = formattedDate(todate);
        }
        if (value == 'last 2 years') {
          var time_fromDate = new Date();
          time_fromDate.setFullYear(time_fromDate.getFullYear() - 2);
          fromDate = time_fromDate;
          fromDate = formattedDate(fromDate);
          todate = formattedDate(todate);
        }
        if (value == 'today so far') {

          var time_fromDate = new Date();
          time_fromDate.setHours(0, 0, 0, 0);
          fromDate = time_fromDate;
          fromDate = formattedDate(fromDate);
          todate = formattedDate(todate);
        }
        if (value == 'this week so far') {
          var time_fromDate = new Date();
          var day = time_fromDate.getDay(),
              diff = time_fromDate.getDate() - day + (day == 0 ? -6 : 0); // adjust when day is sunday
           time_fromDate = new Date(time_fromDate.setDate(diff));
          time_fromDate.setHours(0, 0, 0, 0);
            fromDate = time_fromDate;

          fromDate = formattedDate(fromDate);
          todate = formattedDate(todate);
        }
        if (value == 'yesterday') {
          var time_fromDate = new Date();
          time_fromDate.setDate(time_fromDate.getDate() - 1);
          fromDate = time_fromDate;
          fromDate = formattedDate(fromDate);
          todate = formattedDate(todate);

            // var time_tillDate = new Date();
            // time_tillDate.setHours(0, 0, 0, 0);
            // $rootScope.time_till_graph = time_tillDate;
            // var time_fromDate = new Date();
            // time_fromDate.setDate(time_fromDate.getDate() - 1);
            // time_fromDate.setHours(0, 0, 0, 0);
            // $rootScope.time_from_graph = time_fromDate;
        }
        if (value == 'previous week') {
            var time_tillDate = new Date();
            var day = time_tillDate.getDay(),
                diff = time_tillDate.getDate() - day + (day == 0 ? -6 : 0); // adjust when day is sunday
            var time_tillStr = new Date(time_tillDate.setDate(diff));
            time_tillStr.setHours(0, 0, 0, 0);

              todate = formattedDate(time_tillStr);
            var time_fromDate = new Date();
            var day = time_fromDate.getDay(),
                diff = time_fromDate.getDate() - day + (day == 0 ? -6 : 0); // adjust when day is sunday
            var time_fromDate = new Date(time_fromDate.setDate(diff));
            time_fromDate.setHours(0, 0, 0, 0);
            time_fromDate.setDate(time_fromDate.getDate() - 7);
            fromDate = time_fromDate;
            fromDate = formattedDate(fromDate);
        }
        if (value == 'previous month') {
          var time_fromDate = new Date();
          time_fromDate.setMonth(time_fromDate.getMonth() - 1);
          var m = time_fromDate.getMonth();
          var date = new Date(),
              y = date.getFullYear();
          var lastMonth = new Date(y, m, 1);
          fromDate = lastMonth;
          fromDate = formattedDate(fromDate);
          var date1 = new Date(),
              y1 = date1.getFullYear(),
              m1 = date1.getMonth();
          var currentMonth = new Date(y1, m1, 1);

            todate = formattedDate(currentMonth);
        }
        if (value == 'previous year') {
          var time_tillDate = new Date(new Date().getFullYear(), 0, 1);
          todate = formattedDate(time_tillDate);
          var time_fromDate = new Date();
          time_fromDate.setFullYear(time_fromDate.getFullYear() - 1, 0, 1);
          time_fromDate.setHours(0, 0, 0, 0);
          fromDate = time_fromDate;
          fromDate = formattedDate(fromDate);
        }
        //fdgdfgfd
        // alert("todate:"+todate);
        // alert("fromDate:"+fromDate);
        this.setState({
           graphloadingss: true
        });
        var cookies = cookie.load('sessionid');
        var id = cookie.load('itemid');
        console.log("fromDate: "+fromDate);
        console.log("todate: "+todate);
        axios.get(axios.defaults.baseURL + '/api/front/item/values/' + cookies+'/'+id+'/start_date/'+fromDate+'/end_date/' +todate ,{
          responseType: 'json'
        }).then(response => {
          var item_values = response.data.result.item_values;
        //  alert(item_values.length);
          console.log(item_values);
          var chartgraphvalues = [];
             for(let i=0;i<item_values.length;i++){
               this.setState({
                  graphloadingss: false
               });
               //console.log('item_values[i].value = '+item_values[i].value);
               chartgraphvalues.push({
                 'timestamp' : item_values[i].timestamp,
                 'value' : item_values[i].value
               });
             }

             if(item_values == ""){
             //  alert("No data")
             this.setState({
                noData: "No data Found",  graphloadingss: false
             });
             }else{
               this.setState({
                  noData: "",
               });
             }
      //alert("DONE");
             this.setState({
                graph: true,chartgraph: chartgraphvalues
             });




          })

        .catch(function (error) {
          console.log(error);
        });
      }

      changeGraph(date, dateString){

       console.log(date);
       console.log(dateString[0]+" "+dateString[1]);

       if(dateString[1]==null || dateString[1] == ""){
         alert()
         error("Please select date or time");

       }
       var cookies = cookie.load('sessionid');
       var itemid = cookie.load('itemid');
       console.log(cookies+' '+itemid+'/start_date/'+dateString[0]+'/end_date/' +dateString[1]);
       // alert(dateString[0])
       var dateFrom=dateString[0];
       var dateTo=dateString[1];
       this.setState({
          graphloadingss: true, chartgraph:[]
       });
     //  {sessionId}/{itemId}/start_date/{startDate}/end_date/{endDate}/page={page}/per_page={per_page}
       axios.get(axios.defaults.baseURL + '/api/front/item/values/' + cookies+'/'+itemid+'/start_date/'+dateFrom+'/end_date/' +dateTo ,{
         responseType: 'json'
       }).then(response => {
         var item_values = response.data.result.item_values;
         if(response.data.status==false){
           this.setState({
              graphloading: false,graph: true,   noData: "No data Found",graphloadingsitem:false,
           });
         }
      //   alert(item_values.length);
      this.setState({
         graphloadingss: false
      });
         console.log(item_values);
         if(item_values == ""){
         //  alert("No data")
         this.setState({
            noData: "No data Found",graphloadingss: false
         });
         }else{
         var chartgraphvalues = [];
            for(let i=0;i<item_values.length;i++){
              chartgraphvalues.push({
                'timestamp' : item_values[i].timestamp,
                'value' : item_values[i].value
              });
            }

              this.setState({
                 noData: "",chartgraph:chartgraphvalues
              });
            }

          //  alert("DONE");

         })

       .catch(function (error) {

        console.log(error);
         // this.setState({
         //    graphloading: false,graph: true,   noData: "No data Found",graphloadingsitem:false,
         // });
       });
     }
         showGraph = (id) => {

           this.setState({
             graphloading:true
           })

              cookie.save('itemid',id);
              var cookies = cookie.load('sessionid');
              var itemid = cookie.load('itemid');


              var dateTo = new Date();
              var time_fromDate = new Date();
              time_fromDate.setMinutes(time_fromDate.getMinutes() - 720);
                var dateFrom = time_fromDate;
               dateFrom = formattedDate(dateFrom);
               dateTo = formattedDate(dateTo);
               this.setState({
                  graphloadingss: true
               });
              axios.get(axios.defaults.baseURL + '/api/front/item/values/' + cookies+'/'+id+'/start_date/'+dateFrom+'/end_date/' +dateTo ,{
                responseType: 'json'
              }).then(response => {
                var item_values = response.data.result.item_values;
                this.setState({
                   graphloadingss: false
                });
                if(response.data.status==false){
                  this.setState({
                     graphloading: false,graph: true,   noData: "No data Found",graphloadingsitem:false,
                  });
                }
                console.log(item_values);
                var chartgraphvalues = [];
                   for(let i=0;i<item_values.length;i++){
                     chartgraphvalues.push({
                       'timestamp' : item_values[i].timestamp,
                       'value' : item_values[i].value
                     });
                   }
               if(item_values == ""){
               //  alert("No data")
               this.setState({
                  noData: "No data Found",graphloadingss: false
               });
               }else{
                 this.setState({
                    noData: "",
                 });
               }

                   this.setState({
                      graph: true,chartgraph: chartgraphvalues,graphloading:false
                   });




                })

              .catch(function (error) {
                console.log(error);
              });

              var device_id = cookie.load('device_id');


              axios.get(axios.defaults.baseURL + '/api/front/item/' + cookies +'/'+ id,{
                responseType: 'json'
              }).then(response => {

                var item_name = response.data.result.item_name;
                console.log(item_name);
                    this.setState({ item_name: item_name,  loading:false});
                })
              .catch(function (error) {
                console.log(error);
              });
              }

     componentDidMount() {
       var device_name = cookie.load('device_name');
    //   alert(device_name)
       var docTitle = device_name +  " | Device Details";
       document.title = docTitle;
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
       title: 'Item Oid',
       dataIndex: 'item_oid',
          className: styles.textleft
     },
  
       {
         title:'Graph',
         dataIndex:'id',
         render: id => <div> <a href="javascript:void(0)" onClick={() => this.showGraph(id)}><Icon type="area-chart" /></a></div>
       },];
         return(

         <TabPane tab={<span><Icon type="clock-circle" /> {pic.application_name}</span>} key={i}>
         <Card noHovering="true" bodyStyle={{ padding: 0 }}>
         <Table columns={hostsdetailstables}
        rowKey={pic.items.id}
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


// componentWillMount(){
//   alert(this.state.device_name);
//     var dd = this.state.device_name;
//
// }



render(){



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
          <Breadcrumb.Item><a href="#/device">Devices</a></Breadcrumb.Item>
            <Breadcrumb.Item>{this.state.device_name}</Breadcrumb.Item>
              <Breadcrumb.Item>Details</Breadcrumb.Item>

        </Breadcrumb>
        <br />
       <Modal
         title={this.state.item_name}
         visible={this.state.graph} width={'80%'} closable={false}
         //onOk={this.handleCancel}
         footer={[
            <Button key="close" type="primary" onClick={this.graphclose}>
              Close
            </Button>,
          ]}
       >
       <Form layout="inline">
 <FormItem label="Custom date filter:">
        <RangePicker
     showTime={{ format: 'hh:mm' }}
     format="YYYY-MM-DD HH:mm:ss"
     placeholder={['Start Time', 'End Time']}
     onChange={this.changeGraph}
   />
   </FormItem>
    <FormItem label="Select time:" >


<Select onSelect={(value, event) => this.filterselectDate(value, event)} style={{'margin':'5px 20px', 'width':'300px'}} className={styles.selectopt}>
    <Option value="last 5 mins" >last 5 mins</Option>
    <Option value="last 15 mins">last 15 mins</Option>
    <Option value="last 30 mins">last 30 mins</Option>
    <Option value="last 1 hours">last 1 hours</Option>
    <Option value="last 3 hours">last 3 hours</Option>
    <Option value="last 6 hours">last 6 hours</Option>
    <Option value="last 12 hours" >last 12 hours</Option>
    <Option value="last 1 days">last 1 days</Option>
    <Option value="last 1 weeks">last 1 weeks</Option>
    <Option value="last 2 weeks">last 2 weeks</Option>
    <Option value="last 1 months">last 1 months</Option>
    <Option value="last 3 months">last 3 months</Option>
    <Option value="last 6 months">last 6 months</Option>
    <Option value="last 1 years">last 1 years</Option>
    <Option value="last 2 years">last 2 years</Option>
    <Option value="today so far">today so far</Option>
    <Option value="this week so far">this week so far</Option>
    <Option value="this month so far">this month so far</Option>
    <Option value="this year so far">this year so far</Option>
    <Option value="yesterday">yesterday</Option>
    <Option value="previous week">previous week</Option>
    <Option value="previous month">previous month</Option>
    <Option value="previous year">previous year</Option>
   </Select>
    </FormItem>
    </Form>
    <Spin size="default" spinning={this.state.graphloadingss}>
    <ResponsiveContainer width={'100%'} height={350}>
     <LineChart width={600} height={200} data={chartgraph} syncId="anyId"
             margin={{top: 10, right: 30, left: 0, bottom: 0}}>
         <XAxis dataKey="timestamp"/>
         <YAxis dataKey="value"></YAxis>
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip/>
         <Line type='monotone' dataKey='value'  fill='#82ca9d' />
         <Brush />
       </LineChart>
  </ResponsiveContainer>
  </Spin>
    <h3 style={{    'position': 'absolute',
    'top': '50%',
    'margin':' 0 auto',
    'textAlign': 'center',
    'fontSize': '30px',
    'left': 0,
    'right': 0,}}>{this.state.noData} </h3>


       </Modal>


       <div style={{'minHeight': '100vh'}}>
       <Spin size="default" spinning={this.state.graphloading}>
       <img src={this.state.background_image_url} style={stylebg} />
       <Row  gutter={12} justify="space-around" align="middle">
       <Col lg={6} md={6}>
       <Card style={{ padding: '0' }}>
         <Col span={12}>Status</Col>
          <Col style={styles.textAlign} span={12}><span>{this.state.status = true ?<span> <Icon type="like" className="icongreen" />&nbsp;Active</span> : <span><Icon type="dislike" />&nbsp; Inactive </span>}</span>
        </Col>
       </Card>
       </Col>

       <Col lg={6} md={6}>
       <Card style={{ padding: '0', 'border': headercolor }}>
         <Col span={12}>Group Name</Col>
          <Col style={styles.textAlign} span={12}><span>{this.state.group_name}</span>
        </Col>
       </Card>
       </Col>
       <Col lg={6} md={6}>
       <Card style={{ padding: '0',  'border': headercolor }}>
         <Col span={12}>Device IP</Col>
          <Col style={styles.textAlign} span={12}><span>{this.state.device_ip}</span>
        </Col>
       </Card>
       </Col>
       <Col lg={6} md={6}>
       <Card style={{ padding: '0',  'border': headercolor }}>
         <Col span={12}>IP</Col>
          <Col style={styles.textAlign} span={12}><span>{this.state.device_port}</span>
        </Col>
       </Card>
       </Col>
       </Row>
       <Row><Card noHovering="false" bodyStyle={{ padding: 0 }}>
       <Table  rowKey="id" scroll={{ x: 1000}}  columns={[
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
         </Spin>
       </div>
       </div>
     );

}
}



export default Userdevicedetails;
