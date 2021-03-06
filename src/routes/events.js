import React from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar,Row, Col, Button,Card, Table, Modal, Switch,Input, Radio, Form,DatePicker, Pagination } from 'antd'
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const FormItem = Form.Item;
const {  RangePicker } = DatePicker;
import reqwest from 'reqwest';
import styles from './common.less'
const axios = require('axios');
import cookie from 'react-cookies'
import { browserHistory } from 'dva/router';
import { axiosrequest } from './axiosrequest';



function error(msg) {
  const modal = Modal.error({
    content: msg
  });
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
          active_time:'',
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
    axios.get(axios.defaults.baseURL + '/dataexchange/api/front/trigger/history/' + cookies + '/severity/'+ 0 +'/start_date/'+dateFrom+'/end_date/' + dateTo +'?page=1&per_page=100',{
      responseType: 'json'
    }).then(response => {
    //  alert("go api")
    //  var item_values = response.data.result.item_values;
    //  alert(item_values.length);
    //  console.log(response.data.result);
        this.setState({ triggerHistoryData: response.data.result, loading:false});

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
         axios.get(axios.defaults.baseURL + '/dataexchange/api/front/trigger/history/' + cookies + '/severity/'+ 0 + '/start_date/' + '2018-01-01 12:12:12' + '/end_date/' + '2018-01-20 20:20:20' + '?page=1&per_page=100',{
           responseType: 'json'
         }).then(response => {
           //alert(JSON.stringify(response.data.result))
          // console.log(response.data.result.items[0]);
      //     var items = response.data.result.items;
      //alert(JSON.stringify(response.data.result))
               this.setState({ triggerHistoryData: response.data.result, loading:false});
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
        this.fetchItem();
  }
  fetchSeverity = (params = {}) => {
    // console.log('params:', params);
    //  this.setState({ loading: true });
      var cookies = cookie.load('sessionid');
      axios.get(axios.defaults.baseURL + '/dataexchange/api/front/severity/' + cookies,{
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
      axios.get(axios.defaults.baseURL + '/dataexchange/api/front/expression/' + cookies,{
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
  fetchItem = (params = {}) => {
      var cookies = cookie.load('sessionid');
      var device_id = cookie.load('device_id');
      axios.get(axios.defaults.baseURL + '/dataexchange/api/front/item/' + cookies + '/device/' + device_id,{
        responseType: 'json'
      }) .then(response => {
        var items = response.data.result.items;
         let itemoption = items.map((item,i) => {
           return(
      <option key={i.toString()} value={item.id}>{item.item_name}</option>
           )
         })
           this.setState({itemoption:itemoption});
       })
      .catch(function (error) {
        console.log(error);
      })
  }

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
     return (
       <div>

<Card noHovering="false">

 <FormItem label="Filters by date:">
 <RangePicker size="large" style={{'width':'350px'}}
 format="YYYY-MM-DD HH:mm:ss"
 placeholder={['Start Time', 'End Time']}
 onChange={this.changeHistoryData}
 />
 </FormItem> <br /><br />
 <Table pagination={{ pageSize: 10,  showSizeChanger:true}} scroll={{ x: 1200}} rowKey="id" loading={loading} rowSelection={rowSelection} columns={[

{
   title: 'Name',
   dataIndex: 'name',
   className: styles.textleft,
   render: name => <span>{name === null ? "Data is null" : name}</span>
 }, {
   title: 'Description',
   dataIndex: 'description',
   className: styles.textleft,
  render: description => <span>{description === null ? "Data is null" : description}</span>
 },
 {
  title: 'active_time',
  dataIndex: 'active_time',
  className: styles.textleft,
 render: active_time => <span>{active_time === null ? "Data is null" : active_time}</span>
},
{
 title: 'type',
 dataIndex: 'type',
 className: styles.textleft,
  render: type => <span>{type === null ? "Data is null" : type}</span>
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
