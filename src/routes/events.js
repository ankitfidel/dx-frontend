import React from 'react'
import {Menu, Icon, Popover, Badge,Breadcrumb, M,Avatar,Row, Col, Button,Card, Table, Modal, Switch,Input, Radio, Form,DatePicker, Pagination } from 'antd'
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const FormItem = Form.Item;
const {  RangePicker } = DatePicker;
import reqwest from 'reqwest';
import styles from './common.less'
const axios = require('axios');
import cookie from 'react-cookies'
import { browserHistory, hashHistory } from 'dva/router';
import { axiosrequest } from './axiosrequest';



function error(msg) {
  const modal = Modal.error({
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


class Events extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        triggerHistoryData: [{
          name:'',
          description:'',
          active:'',
          active_time:'',
          event_time:'',
          id:''
               }],
           pagination: {},
           data:[],
           result:[],
           loading: true,
visible: false,
           pagination: {},
           size: 'default',
           selectedRowKeys: [],
           cookies: cookie.loadAll()
      };
       this.changeHistoryData = this.changeHistoryData.bind(this);
   }



   changeHistoryData(date, dateString){
    // alert(dateString)
    console.log(date);
    console.log(dateString[0]+" "+dateString[1]);
    var cookies = cookie.load('sessionid');
    var itemid = cookie.load('itemid');
    console.log(cookies+' '+itemid+'/start_date/'+dateString[0]+'/end_date/' +dateString[1]);
    var dateFrom=dateString[0];
    var dateTo=dateString[1];
    //alert(dateString)
  //  {sessionId}/{itemId}/start_date/{startDate}/end_date/{endDate}/page={page}/per_page={per_page}
   //'/severity/'+ 0 + '/start_date/' + '2018-01-01 12:12:12' + '/end_date/' + '2018-01-20 20:20:20' + '?page=1&per_page=100',{
    axios.get(axios.defaults.baseURL + '/api/front/trigger/history/' + cookies + '/severity/'+ 0 +'/start_date/'+dateFrom+'/end_date/' + dateTo +'?page=1&per_page=100',{
      responseType: 'json'
    }).then(response => {
    //  alert("go api")
    //  var item_values = response.data.result.item_values;
    //  alert(item_values.length);
    //  console.log(response.data.result);
    //  alert(response.data)
    if(response.data.status == false){

        this.setState({
          loading:false
         })

    }else{
        this.setState({ triggerHistoryData: response.data.result, loading:false});
}
      //   alert("DONE");

      })

    .catch(function (error) {
      console.log(error);
    });
  }
     onSelectChange = (selectedRowKeys) => {
       console.log('selectedRowKeys changed: ', selectedRowKeys);
       this.setState({ selectedRowKeys });
     }

    //  changeHistoryData(date, dateString){
    //
    //   console.log(date);
    //   console.log(dateString[0]+" "+dateString[1]);
    //   var cookies = cookie.load('sessionid');
    //   var itemid = cookie.load('itemid');
    //   console.log(cookies+' '+itemid+'/start_date/'+dateString[0]+'/end_date/' +dateString[1]);
    //   var dateFrom=dateString[0];
    //   var dateTo=dateString[1];
    //   axios.get('http://localhost:8080/dataexchange/api/front/item/values/' + cookies+'/'+itemid+'/start_date/'+dateFrom+'/end_date/' +dateTo ,{
    //     responseType: 'json'
    //   }).then(response => {
    //        this.setState({ triggerHistoryData: response.data.result});
    //        alert("DONE");
    //     })
    //
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // }
     triggerlist = (params = {}) => {
         var cookies = cookie.load('sessionid');
         var device_id = cookie.load('device_id');
         //962af983-c90c-44fe-b939-a20052409b8f/severity/0/start_date/2018-01-01%2012%3A12%3A12/end_date/2018-01-20%2020%3A20%3A20?page=1&per_page=100
         var dateTo = new Date();
         var time_fromDate = new Date();
         time_fromDate.setMinutes(time_fromDate.getMinutes() - 720);
           var dateFrom = time_fromDate;
          dateFrom = formattedDate(dateFrom);
          dateTo = formattedDate(dateTo);
         axios.get(axios.defaults.baseURL + '/api/front/trigger/history/' + cookies + '/severity/'+ 0 + '/start_date/' + dateFrom + '/end_date/' + dateTo + '?page=1&per_page=100',{
           responseType: 'json'
         }).then(response => {
           //alert(JSON.stringify(response.data.result))
          // console.log(response.data.result.items[0]);
      //     var items = response.data.result.items;
      //alert(JSON.stringify(response.data.result))
      if(response.data.status == false){
var data = []
          this.setState({ triggerHistoryData: data, loading:false});
      }else{
          this.setState({ triggerHistoryData: response.data.result, loading:false});
  }
              // this.setState({ triggerHistoryData: response.data.result, loading:false});
              // alert(JSON.stringify(response.data.result))
           })
         .catch(function (error) {
           console.log(error);
         });
    }
    handleTableChange = (pagination, filters, sorter) => {
       const pager = { ...this.state.pagination };
       pager.current = pagination.current;
       this.setState({
         pagination: pager,
       });
       this.triggerlist({
         result: pagination.pageSize,
         page: pagination.current,
         sortField: sorter.field,
         sortOrder: sorter.order,
         ...filters,
       });
     }
      componentDidMount() {

         this.triggerlist();
        this.fetchSeverity();
        this.fetchExpression();
    //    this.fetchItem();
  }
  fetchSeverity = (params = {}) => {
    // console.log('params:', params);
    //  this.setState({ loading: true });
      var cookies = cookie.load('sessionid');
      axios.get(axios.defaults.baseURL + '/api/front/severity/' + cookies,{
        responseType: 'json'
      }) .then(response => {
    //    var severitymap = ;
         let severityoption = response.data.result.map((severity,i) => {
           return(
      <option key={i.toString()} value={severity.id}>{severity.name}</option>
           )
         })
           this.setState({severityoption:severityoption});
         //  console.log("state:", this.state.comapnyrole[4].props.children)
       })
      .catch(function (error) {
        console.log(error);
      })
  }
  fetchExpression = (params = {}) => {
    // console.log('params:', params);
    //  this.setState({ loading: true });
      var cookies = cookie.load('sessionid');
      axios.get(axios.defaults.baseURL + '/api/front/expression/' + cookies,{
        responseType: 'json'
      }) .then(response => {
      //  alert(response.data.result)
         let expressoption = response.data.result.map((express,i) => {
           return(
      <option key={i.toString()} value={express.id}>{express.expression}</option>
           )
         })
           this.setState({expressoption:expressoption});
       })
      .catch(function (error) {
        console.log(error);
      })
  }
  // fetchItem = (params = {}) => {
  //     var cookies = cookie.load('sessionid');
  //     var device_id = cookie.load('device_id');
  //     axios.get(axios.defaults.baseURL + '/api/front/item/' + cookies + '/device/' + device_id,{
  //       responseType: 'json'
  //     }) .then(response => {
  //       var items = response.data.result.items;
  //        let itemoption = items.map((item,i) => {
  //          return(
  //     <option key={i.toString()} value={item.id}>{item.item_name}</option>
  //          )
  //        })
  //          this.setState({itemoption:itemoption});
  //      })
  //     .catch(function (error) {
  //       console.log(error);
  //     })
  // }

  addItems = () => {
    this.setState({
    visible: true,
  });
  // browserHistory.push("/addusers");
  }



      onSelectChange = (selectedRowKeys) => {
          console.log('selectedRowKeys changed: ', selectedRowKeys);
          this.setState({ selectedRowKeys });
    //  alert();
        }

render(){
document.title = "Events";
  const { selectedRowKeys, triggerHistoryData, loading } = this.state;
  const rowSelection = {
       selectedRowKeys,
       onChange: this.onSelectChange,
       hideDefaultSelections: true,
       selections: [{
         key: 'all-data',
         text: 'Select All Data',
         onSelect: () => {
           this.setState({
             selectedRowKeys: [...Array(46).keys()], // 0...45
           });
         },
       }, {
         key: 'odd',
         text: 'Select Odd Row',
         onSelect: (changableRowKeys) => {
           let newSelectedRowKeys = [];
           newSelectedRowKeys = changableRowKeys.filter((key, index) => {
             if (index % 2 !== 0) {
               return false;
             }
             return true;
           });
           this.setState({ selectedRowKeys: newSelectedRowKeys });
         },
       }, {
         key: 'even',
         text: 'Select Even Row',
         onSelect: (changableRowKeys) => {
           let newSelectedRowKeys = [];
           newSelectedRowKeys = changableRowKeys.filter((key, index) => {
             if (index % 2 !== 0) {
               return true;
             }
             return false;
           });
           this.setState({ selectedRowKeys: newSelectedRowKeys });
         },
       }],
       onSelection: this.onSelection,
     };
const hasSelected = selectedRowKeys.length > 0;
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
<Breadcrumb.Item><span>Events</span></Breadcrumb.Item>
        </Breadcrumb><br />
<Card noHovering="false">

 <FormItem label="Filters by date:">
 <RangePicker size="large" style={{'width':'350px'}}
 format="YYYY-MM-DD HH:mm:ss"
 placeholder={['Start Time', 'End Time']}
 onChange={this.changeHistoryData}
 />
 </FormItem> <br /><br />
 <Table pagination={{ pageSize: 10,  showSizeChanger:true}} scroll={{ x: 1000}} rowKey="id" loading={loading} columns={[

{
   title: 'Name',
   dataIndex: 'name',
   width:300,
   className: styles.textleft,
   render: name => <span>{name === null ? "-" : name}</span>
 }, {
   title: 'Description',
   dataIndex: 'description',
   width:450,
   className: styles.textleft,
  render: description => <span>{description === null ? "-" : description}</span>
 },
 {
  title: 'Active Time',
  dataIndex: 'event_time',
  width:200,
  className: styles.textleft,
 render: event_time => <span>{event_time === null ? "-" : event_time}</span>
},
{
 title: 'Type',
 dataIndex: 'type',

 className: styles.textleft,
  render: type => <span>{type === null ? "-" : type}</span>
},
{
 title: 'Active',
 dataIndex: 'active',

 render: active => <p>{active === true ? "True" :"False"}</p>
},


]} dataSource={triggerHistoryData}  />
         </Card>
       </div>
     );

}
}

export default Events
