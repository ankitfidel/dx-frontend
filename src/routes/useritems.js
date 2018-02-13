import React from 'react'
import {Menu, Icon, Popover,Popconfirm,message,Breadcrumb, Badge,Spin, M,Avatar,Row, Col, Button,Card, Table, Modal, Switch,Input, Select, Radio, Form, Pagination,DatePicker } from 'antd'
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const Option = Select.Option;
const FormItem = Form.Item;
import {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis,ResponsiveContainer, CartesianGrid, Tooltip} from 'recharts';
import reqwest from 'reqwest';
import styles from './common.less'
const axios = require('axios');
import cookie from 'react-cookies'
import { browserHistory, hashHistory } from 'dva/router';
import { axiosrequest } from './axiosrequest';

const {  RangePicker } = DatePicker;

//
// <FormItem label="item_key:">
//     <Input placeholder="item_key" defaultValue="" id="item_key"/>
// </FormItem>

function cancel(e) {
  console.log(e);
  message.info('Item not deleted');
}


function handleChange(device_id) {
  //console.log(`selected );
//  alert("device_id" + device_id)
}

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
// function graphsave(date, dateString) {
//   // console.log('onOk: ', + dateString);
//   // alert("value::::: " + date)
//   //console.log(Date.now);
// }
class Item extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        itemsData: [{
          item_name:'',
          item_unit:'',
          item_oid:'',
          application_ids:'',
          application_name:'',
          id:'',
          item_values:'',
          interval_time:'',
               }],
               graph: false,
           pagination: {},
           data:[],
           chartgraph:[],
           result:[],
           item_name:'',
           item_unit:'',
           device_name:'',
           item_oid:'',
           loading: true,
           graphloading:false,
           visible: false,
           editItem:false,
           noData:false,
           pagination: {},
           addDeviceloading:false,
           size: 'default',
           selectedRowKeys: [],
           cookies: cookie.loadAll()
      };
       this.addItemssave = this.addItemssave.bind(this);
       this.onTodoChange_item_name = this.onTodoChange_item_name.bind(this);
       this.onTodoChange_item_unit = this.onTodoChange_item_unit.bind(this);
       this.changeGraph = this.changeGraph.bind(this);
       this.onTodoChange_intervalTime = this.onTodoChange_intervalTime.bind(this);
      this.filterselectDate = this.filterselectDate.bind(this);
   }


   changeGraph(date, dateString){
    console.log(date);
    console.log(dateString[0]+" "+dateString[1]);
    var cookies = cookie.load('sessionid');
    var itemid = cookie.load('itemid');
    console.log(cookies+' '+itemid+'/start_date/'+dateString[0]+'/end_date/' +dateString[1]);
    // alert(dateString[0])
    var dateFrom=dateString[0];
    var dateTo=dateString[1];
    this.setState({
       graphloadingsitem:true,chartgraph:[]
    });
  //  {sessionId}/{itemId}/start_date/{startDate}/end_date/{endDate}/page={page}/per_page={per_page}
    axios.get(axios.defaults.baseURL + '/api/front/item/values/' + cookies+'/'+itemid+'/start_date/'+dateFrom+'/end_date/' +dateTo ,{
      responseType: 'json'
    }).then(response => {
      var item_values = response.data.result.item_values;
   //   alert(item_values.length);
   this.setState({
      graphloadingsitem:false,
   });
   if(response.data.status==false){
     this.setState({
        graphloading: false,graph: true,   noData: "No data Found",graphloadingsitem:false,
     });
   }
   if(item_values == ""){
   //  alert("No data")
   this.setState({
      noData: "No data Found",graphloadingsitem:false,graphloading:false
   });
 }else{
      console.log(item_values);
      var chartgraphvalues = [];
         for(let i=0;i<item_values.length;i++){
           chartgraphvalues.push({
             'timestamp' : item_values[i].timestamp,
             'value' : item_values[i].value
           });
         }


         this.setState({
           chartgraph:chartgraphvalues,noData:""
         });
       }



       //  alert("DONE");

      })

    .catch(function (error) {
      console.log(error);
    });
  }

     onSelectChange = (selectedRowKeys) => {
       console.log('selectedRowKeys changed: ', selectedRowKeys);
       this.setState({ selectedRowKeys });
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
     chartgraph: [],graphloadingsitem:true
  });
  var cookies = cookie.load('sessionid');
  var id = cookie.load('itemid');
  axios.get(axios.defaults.baseURL + '/api/front/item/values/' + cookies+'/'+id+'/start_date/'+fromDate+'/end_date/' +todate ,{
    responseType: 'json'
  }).then(response => {
    var item_values = response.data.result.item_values;
  //  alert(item_values.length);
    console.log(item_values);
    var chartgraphvalues = [];
    this.setState({
       graphloadingsitem:false,
    });
    if(response.data.status==false){

      this.setState({
         graphloading: false,graph: true,   noData: "No data Found",graphloadingsitem:false,
      });
    }

       if(item_values == ""){
       this.setState({
          noData: "No data Found",graphloadingsitem:false,graphloading:false
       });
     }else{


       for(let i=0;i<item_values.length;i++){

         //console.log('item_values[i].value = '+item_values[i].value);
         chartgraphvalues.push({
           'timestamp' : item_values[i].timestamp,
           'value' : item_values[i].value
         });
       }


       this.setState({
          graph: true,chartgraph: chartgraphvalues,noData:""
       });


     }
//alert("DONE");





    })

  .catch(function (error) {
    console.log(error);
  });
}
deleteItem(id){
  var cookies = cookie.load('sessionid');
  this.setState({
    graphloading:true
  })
  //alert(device_id)
  axios.delete(axios.defaults.baseURL + '/api/front/item/'+ cookies +'/'+id, {
  id:id
  })
  .then(function (response) {
      //alert(device_id)
  if(response.data.status == false){
  //  alert("eerrre:   "+device_id)
  error(response.data.result)
    }else{
    //  alert(id)
   window.location.reload();
    }
  })
  .catch(function (error) {
  console.log(error);
  });
}
showGraph = (id) => {

  this.setState({
     graphloading:true
  });

     cookie.save('itemid',id);
     var cookies = cookie.load('sessionid');
     var itemid = cookie.load('itemid');


     var dateTo = new Date();
     var time_fromDate = new Date();
     time_fromDate.setMinutes(time_fromDate.getMinutes() - 720);
       var dateFrom = time_fromDate;
      dateFrom = formattedDate(dateFrom);
      dateTo = formattedDate(dateTo);
     //  alert("dateTo:"+dateTo);
     //  alert("dateFrom:"+dateFrom);

     // var dateFrom="2018-01-09 12:00:00";
     // var dateTo="2018-01-09 24:00:00";

     this.setState({
        graphloadingsitem:true,chartgraph:[]
     });
   //  {sessionId}/{itemId}/start_date/{startDate}/end_date/{endDate}/page={page}/per_page={per_page}
     axios.get(axios.defaults.baseURL + '/api/front/item/values/' + cookies+'/'+id+'/start_date/'+dateFrom+'/end_date/' +dateTo ,{
       responseType: 'json'
     }).then(response => {
       var item_values = response.data.result.item_values;
   //    alert(item_values.length);

 //  alert(JSON.stringify(response.data))
if(response.data.status==false){
this.setState({
graphloading: false,graph: true,   noData: "No data Found",graphloadingsitem:false,
});
}
     if(item_values == [] || item_values == ""){
   //  alert("No data")
   this.setState({
      noData: "No data Found",graphloadingsitem:false,graphloading:false
   });
 }else{
       console.log(item_values);

       var chartgraphvalues = [];
          for(let i=0;i<item_values.length;i++){

            //console.log('item_values[i].value = '+item_values[i].value);
            chartgraphvalues.push({
              'timestamp' : item_values[i].timestamp,
              'value' : item_values[i].value
            });
          }

//alert("DONE");
          this.setState({
             graph: true,chartgraph: chartgraphvalues,graphloading:false,noData:"", graphloading:false,graphloadingsitem:false
          });
}



       })

     .catch(function (error) {
       console.log(error);
     });

     var device_id = cookie.load('device_id');
   //  const cookies = cookie.load('sessionid');

     axios.get(axios.defaults.baseURL + '/api/front/item/' + cookies +'/'+ id,{
       responseType: 'json'
     }).then(response => {
       //alert(JSON.stringify(response.data.result))
      // console.log(response.data.result.items[0]);
       var item_name = response.data.result.item_name;
       console.log(item_name);
           this.setState({ item_name: item_name,  loading:false});
       })
     .catch(function (error) {
       console.log(error);
     });
     }

       graphclose = (e) => {
       console.log(e);
       this.setState({
       graph: false,graphloading:false
       });
       }
     itemslist = (params = {}) => {
         var cookies = cookie.load('sessionid');
         var device_id = cookie.load('device_id');
         //alert(device_id)
         axios.get(axios.defaults.baseURL + '/api/front/item/' + cookies + '/device/'+ device_id,{
           responseType: 'json'
         }).then(response => {
           //alert(JSON.stringify(response.data.result))
          // console.log(response.data.result.items[0]);
           var items = response.data.result.items[0];
        //   var applicationResponses = response.data.result.items[0];
               this.setState({ itemsData: response.data.result.items, device_name:response.data.result.device_name,  loading:false});
           })
         .catch(function (error) {
           console.log(error);
         });
    }
    listapps = (params = {}) => {
      // console.log('params:', params);
      //  this.setState({ loading: true });
        var cookies = cookie.load('sessionid');
        var company_id = cookie.load('company_id');
        axios.get(axios.defaults.baseURL + '/api/front/application/' + cookies + '/company/' + company_id ,{
          responseType: 'json'
        }) .then(response => {

           let comapnyrole = response.data.result.map((pic,i) => {
             return(
        <option key={i.toString()} value={pic.application_id}>{pic.application_name}</option>
             )
           })
             this.setState({comapnyrole:comapnyrole});
             //console.log("state:"+ JSON.stringify(response.data.result[0].device_id))
         //  cookie.save('device_id', this.state.device_id, { path: '/' });
         })
        .catch(function (error) {
          console.log(error);
        })
    }
    handleTableChange = (pagination, filters, sorter) => {
       const pager = { ...this.state.pagination };
       pager.current = pagination.current;
       this.setState({
         pagination: pager,
       });
       this.itemslist({
         result: pagination.pageSize,
         page: pagination.current,
         sortField: sorter.field,
         sortOrder: sorter.order,
         ...filters,
       });
     }
      componentDidMount() {
this.listapps();
         this.itemslist();
  }

  addItems = () => {
    this.setState({
    visible: true,
  });
  // browserHistory.push("/addusers");
  }
  addItemssave = (e) => {
    const cookies = cookie.load('sessionid');
    const device_id = cookie.load('device_id');
    const item_name = document.getElementById('item_name').value;
    const item_unit = document.getElementById('item_unit').value;
    const item_oid = document.getElementById('item_oid').value;
    const intervalTime = document.getElementById('intervalTime').value;
    const application_ids = document.getElementById('application_ids').value;

    this.setState({
      addDeviceloading:true
    })
    axios.post(axios.defaults.baseURL + '/api/front/item', {
     session_id:cookies,
     item_name:item_name,
     item_unit:item_unit,
     item_oid:item_oid,
     device_id:device_id,
     interval_time:intervalTime,
     application_ids:[application_ids]
   //  isRetailer:isRetailer
    })
    .then(response => {

      if(response.data.status == false){

     error(response.data.result);
     this.setState({
       addDeviceloading:false
     })
        }else{
        window.location.reload();
     }

    })
    .catch(function (error) {
      console.log(error);
    });

}
handleCancel = (e) => {
console.log(e);
this.setState({
visible: false,
});
}
editCancel = (e) => {
console.log(e);
this.setState({
editItem: false,
});
}

edititem(id){

cookie.save('id', id);
console.log("from cookies company_id:" + cookie.load('id'))

this.setState({
editItem: true,
});

var cookies = cookie.load('sessionid');
  var id = cookie.load('id');
var device_id = cookie.load('device_id');
  axios.get(axios.defaults.baseURL + '/api/front/item/' +cookies+"/"+ id,{
  responseType: 'json'
}).then(response => {
  //alert(JSON.stringify(response.data.result))
 // console.log(response.data.result.items[0]);
  //var items = response.data.result.items[0];
      this.setState({ item_name: response.data.result.item_name, item_unit:response.data.result.item_unit, item_oid:response.data.result.item_oid, interval_time:response.data.result.interval_time,  loading:false});
  })
.catch(function (error) {
  console.log(error);
});
}
editItemssave(){
  const cookies = cookie.load('sessionid');
  var id = cookie.load('id');
  const item_name = document.getElementById('item_name').value;
  const item_unit = document.getElementById('item_unit').value;
  const item_oid = document.getElementById('item_oid').value;
    const intervalTime = document.getElementById('intervalTime').value;
    const application_ids = document.getElementById('application_ids').value;
 // const isRetailer = document.getElementById('isRetailer').checked = true;
  axios.put(axios.defaults.baseURL + '/api/front/item/'+ id, {
   session_id:cookies,
   item_id:id,
   item_name:item_name,
   item_unit:item_unit,
   item_oid:item_oid,
   interval_time:intervalTime,
   application_ids:[application_ids]
//   company_id:companyId
 //  isRetailer:isRetailer
  })
  .then(function (response) {
     if(response.data.status == false){
       //alert()
     error(response.data.result)
   }
   if(response.data.status == true){
         console.log(JSON.stringify(response.data.result));
         window.location.reload()
       }
  })
  .catch(function (error) {
    console.log(error);
  });
}

      onSelectChange = (selectedRowKeys) => {
          console.log('selectedRowKeys changed: ', selectedRowKeys);
          this.setState({ selectedRowKeys });
    //  alert();
        }
        onTodoChange_item_name(value){
            this.setState({item_name: value});
        }
        onTodoChange_item_unit(value){
            this.setState({item_unit: value});
        }
        onTodoChange_intervalTime(value){
          this.setState({interval_time: value});
        }
render(){
  document.title = "Items";
  var user_role = cookie.load('user_role');
let addItems = null;
// alert("user_role"+user_role)
if(user_role === "dashboard_admin"){
addItems = <Button type="primary" onClick={this.addItems}>Add Items</Button>
}else{
addItems = null
}
  var {chartgraph, selectedRowKeys, itemsData,item_unit,item_oid, device_name,graphloading, application_id, noData,interval_time,item_name, loading } = this.state;
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
var device_name = cookie.load('device_name');
     return (
       <div>
       <Modal
         title={this.state.item_name}
         visible={this.state.graph} width={'80%'} closable={false}
         //onOk={this.handleCancel}
         footer={[
            <Button key="close" type="primary" loading={loading} onClick={this.graphclose}>
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
   <Select className={styles.selectopt} onSelect={(value, event) => this.filterselectDate(value, event)}  id="gettime" defaultValue="last 12 hours" style={{'margin':'5px 20px', 'width':'300px'}}>
    <Option value="last 5 mins">last 5 mins</Option>
    <Option value="last 15 mins">last 15 mins</Option>
    <Option value="last 30 mins">last 30 mins</Option>
    <Option value="last 1 hours">last 1 hours</Option>
    <Option value="last 3 hours">last 3 hours</Option>
    <Option value="last 6 hours">last 6 hours</Option>
    <Option value="last 12 hours">last 12 hours</Option>
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
<Spin size="default" spinning={this.state.graphloadingsitem}>
        <ResponsiveContainer width={'100%'} height={350}>
        <LineChart width={600} height={200} data={chartgraph} syncId="anyId"
                margin={{top: 10, right: 30, left: 0, bottom: 0}}>
            <XAxis dataKey="timestamp"/>
            <YAxis dataKey="value"/>
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
       <Modal
         visible={this.state.visible}
         onOk={this.addItemssave}
         onCancel={this.handleCancel}
         footer={[
           <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
           <Button key="submit" type="primary" loading={loading} onClick={this.addItemssave}>
             Add Item
           </Button>,
         ]}
       >
       <Spin size="default"  spinning={this.state.addDeviceloading}>
       <div style={{'padding':'20px'}}>
       <h2 style={{textAlign: 'center'}}>Add Item</h2>

       <FormItem label="Item Name:" required>
           <Input placeholder="Enter Item Name" defaultValue="" id="item_name"/>
       </FormItem>
       <FormItem label="Item Unit:" required>
           <Input placeholder="Enter Item Unit" defaultValue="" id="item_unit"/>
       </FormItem>
       <FormItem label="Item Oid:" required>
           <Input placeholder="Enter Item Oid" defaultValue="" id="item_oid"/>
       </FormItem>
       <FormItem label="Set Interval Time (in seconds):" required>
           <select className={styles.selectopt} id="intervalTime">
            <option value="30">30</option>
            <option value="120">120</option>
            <option value="600">600</option>
            <option value="3600">3600</option>
           </select>
       </FormItem>
       <FormItem label="Select Applications:" required>
       <select className={styles.selectopt} style={{ width: '100%'   }} id="application_ids" placeholder="Select Applications"
        onChange={handleChange}
       >
       { this.state.comapnyrole }
       </select>
       </FormItem>


        </div>
        </Spin>
       </Modal>
       <Modal
         visible={this.state.editItem}
         onOk={this.editItemssave}
         onCancel={this.editCancel}
         footer={[
           <Button key="back" onClick={this.editCancel}>Cancel</Button>,
           <Button key="submit" type="primary" loading={loading} onClick={this.editItemssave}>
             Update Item
           </Button>,
         ]}
       >
      <div style={{'padding':'20px'}}>
       <h2 style={{textAlign: 'center'}}>Edit Item</h2>

       <FormItem label="Item Name:" required>
           <Input placeholder="Enter Item Name" value={this.state.item_name} onChange={e => this.onTodoChange_item_name(e.target.value)} id="item_name"/>
       </FormItem>
       <FormItem label="Item Unit:" required>
           <Input placeholder="Enter Item Unit" value={this.state.item_unit} onChange={e => this.onTodoChange_item_unit(e.target.value)} id="item_unit"/>
       </FormItem>
       <FormItem label="Item Oid:" required>
           <Input placeholder="Enter Item Oid" value={this.state.item_oid} id="item_oid"/>
       </FormItem>
       <FormItem label="Set Interval Time (in seconds):" required>
           <select className={styles.selectopt} value={this.state.interval_time} onChange={e => this.onTodoChange_intervalTime(e.target.value)} id="intervalTime">
            <option value="30">30</option>
            <option value="120">120</option>
            <option value="600">600</option>
            <option value="3600">3600</option>
           </select>
       </FormItem>
       <FormItem label="Select Application:" required>
       <select className={styles.selectopt} style={{ width: '100%'   }} id="application_ids" placeholder="Select an application"
        onChange={handleChange}
       >
       { this.state.comapnyrole }
       </select>
       </FormItem>
        </div>
       </Modal>
       <Breadcrumb>
          {adminmenu}
          <Breadcrumb.Item><a href="#/device">Devices</a></Breadcrumb.Item>
            <Breadcrumb.Item>  {device_name}</Breadcrumb.Item>
  <Breadcrumb.Item>Items</Breadcrumb.Item>
        </Breadcrumb>
        <br />
<Card noHovering="false">

<Spin size="normal" spinning={this.state.graphloading}>
 <Table pagination={{ pageSize: 10,  showSizeChanger:true}} scroll={{ x: 1000}} loading={loading} rowKey="id"  columns={[

{
   title: 'Application Name',
   dataIndex: 'applicationResponses[0].application_name',
   width:200,
    className: styles.textleft
 },
{
   title: 'Item Name',
   dataIndex: 'item_name',
    className: styles.textleft
 }, {
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
 title: 'Interval Time (in seconds)',
 dataIndex: 'interval_time',
  className: styles.textleft
},

{
 title: 'Action',
 dataIndex: 'id',
   className: styles.textleft,
 render: (id) => <div style={{'textAlign':'left'}}>

 <a href="javascript:void(0)" onClick={() => this.showGraph(id)}><Icon type="area-chart" /> &nbsp;Graph</a>&nbsp;</div>
}


]} dataSource={itemsData}  />
</Spin>
         </Card>
       </div>
     );

}
}

export default Item
