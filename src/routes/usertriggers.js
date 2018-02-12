import React from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar,Row, Col, Button,Card,Breadcrumb, Table, Modal, Switch,Input, Radio, Form, Pagination } from 'antd'
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const FormItem = Form.Item;
import reqwest from 'reqwest';
import styles from './common.less'
const axios = require('axios');
import cookie from 'react-cookies'
import { browserHistory, hashHistory } from 'dva/router';
import { axiosrequest } from './axiosrequest';



function error(msg) {
  const modal = Modal.warning({
    content: msg
  });
}

class Usertriggers extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        triggerData: [{
          name:'',
          description:'',
          trigger_value:'',
          severity_id:'',
          trigger_value:'',
          active_time:'',
          id:''
               }],
           pagination: {},
           name:'',
           data:[],
           result:[],
           device_name:'',
           loading: false,
visible: false,
editTrigger:false,
           pagination: {},
           size: 'default',
           selectedRowKeys: [],
           cookies: cookie.loadAll()
      };
       this.addTriggersave = this.addTriggersave.bind(this);
       this.onTodoChange_name = this.onTodoChange_name.bind(this);
       this.onTodoChange_description = this.onTodoChange_description.bind(this);
       this.onTodoChange_trigger_value = this.onTodoChange_trigger_value.bind(this);
       this.onTodoChange_severity_id = this.onTodoChange_severity_id.bind(this);
       this.onTodoChange_expression_id = this.onTodoChange_expression_id.bind(this);

   }




     onSelectChange = (selectedRowKeys) => {
       console.log('selectedRowKeys changed: ', selectedRowKeys);
       this.setState({ selectedRowKeys });
     }


     triggerlist = (params = {}) => {
         var cookies = cookie.load('sessionid');
         var device_id = cookie.load('device_id');
         //get device data by device Id
         axios.get(axios.defaults.baseURL + '/api/front/device/' + cookies + '/'+ device_id ,{
           responseType: 'json'
         }).then(response => {
           //alert(JSON.stringify(response.data.result))

               this.setState({device_name:response.data.result.device_name});

           })
         .catch(function (error) {
           console.log(error);
         });

         axios.get(axios.defaults.baseURL + '/api/front/trigger/' + cookies + '/device/'+ device_id + '?sort=DESC',{
           responseType: 'json'
         }).then(response => {
          // alert(JSON.stringify(response.data.result))
          // console.log(response.data.result.items[0]);
      //     var items = response.data.result.items;
      //alert(JSON.stringify(response.data.result)
               this.setState({ triggerData: response.data.result});
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
  fetchItem = (params = {}) => {
      var cookies = cookie.load('sessionid');
      var device_id = cookie.load('device_id');
      axios.get(axios.defaults.baseURL + '/api/front/item/' + cookies + '/device/' + device_id,{
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

  editTrigger(id){
  //  alert(id)
    this.setState({
    editTrigger: true,
  });

  var cookies = cookie.load('sessionid');
  cookie.save('id', id);
  var device_id = cookie.load('device_id');
     axios.get(axios.defaults.baseURL + '/api/front/trigger/' + cookies + '/'+ id ,{
    responseType: 'json'
  }).then(response => {
    //alert(JSON.stringify(response.data.result))
   // console.log(response.data.result.items[0]);
    //var items = response.data.result.items[0];
    //alert(response.data.result.name)
       this.setState({ name: response.data.result.name, description: response.data.result.description, trigger_value: response.data.result.trigger_value, severity_id: response.data.result.severity_id, expression_id: response.data.result.expression_id});
    })
  .catch(function (error) {
    console.log(error);
  });
  }

  editItemssave(){
    const cookies = cookie.load('sessionid');
    var id = cookie.load('id');
    const name = document.getElementById('name').value;
     const description = document.getElementById('description').value;
     const trigger_value = document.getElementById('trigger_value').value;
     const expressId = document.getElementById('expressId').value;
     const severityId = document.getElementById('severityId').value;
   // const isRetailer = document.getElementById('isRetailer').checked = true;
    axios.put(axios.defaults.baseURL + '/api/front/trigger/'+ id, {
      session_id:cookies,
         name:name,
         description:description,
         trigger_value:trigger_value,
         severity_id:severityId,
         expression_id:expressId
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
  addTriggersave = (e) => {

    const cookies = cookie.load('sessionid');
    const trigger_value = document.getElementById('trigger_value').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const itemId = document.getElementById('itemId').value;
    const expressId = document.getElementById('expressId').value;
    const severityId = document.getElementById('severityId').value;
console.log(cookies, trigger_value, name, description, itemId, expressId, severityId);

    axios.post(axios.defaults.baseURL + '/api/front/trigger', {
     session_id:cookies,
     name:name,
     description:description,
     trigger_value:trigger_value,
     item_id:itemId,
     severity_id:severityId,
     expression_id:expressId
    })
    .then(function (response) {
      if(response.data.status == false){
      //  alert("error");
     error(response.data.result)
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
editTriggerCancel = (e) => {
console.log(e);
this.setState({
editTrigger: false,
});
}

      onSelectChange = (selectedRowKeys) => {
          console.log('selectedRowKeys changed: ', selectedRowKeys);
          this.setState({ selectedRowKeys });
    //  alert();
        }
        onTodoChange_name(value){
          this.setState({name: value});
        }
        onTodoChange_description(value){
          this.setState({description: value});
        }
        onTodoChange_trigger_value(value){
          this.setState({trigger_value: value});
        }
        onTodoChange_severity_id(value){
          this.setState({severity_id: value});
        }
        onTodoChange_expression_id(value){
          this.setState({expression_id: value});
        }
        // this.onTodoChange_name = this.onTodoChange_name.bind(this);
        // this.onTodoChange_description = this.onTodoChange_description.bind(this);
        // this.onTodoChange_trigger_value = this.onTodoChange_trigger_value.bind(this);
        // this.onTodoChange_severity_id = this.onTodoChange_severity_id.bind(this);
        // this.onTodoChange_expression_id = this.onTodoChange_expression_id.bind(this);
render(){
document.title = "Triggers";
  const { selectedRowKeys, triggerData,device_name, name } = this.state;
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
adminmenu = <Breadcrumb.Item href='#/admindashboard'><Icon type='home' /><span>Dashboard</span></Breadcrumb.Item>
}else{
adminmenu = <Breadcrumb.Item href='#/dashboard'><Icon type='home' /><span>Dashboard</span></Breadcrumb.Item>
}
     return (
       <div>
       <Breadcrumb>
          {adminmenu}
          <Breadcrumb.Item><a href="#/devices">Devices</a></Breadcrumb.Item>
          <Breadcrumb.Item>{this.state.device_name}</Breadcrumb.Item>
            <Breadcrumb.Item>Triggers</Breadcrumb.Item>
        </Breadcrumb>
        <br />
       <Modal
         visible={this.state.visible}
         onOk={this.addTriggersave}
         onCancel={this.handleCancel}
       >
       <Card noHovering="false" style={{'backgroundColor': 'transparent !important'}} bordered={false}>
       <h2 style={{textAlign: 'center'}}>Add Trigger</h2>
       <FormItem label="Name:" required>
           <Input placeholder="Enter Name" defaultValue="" id="name"/>
       </FormItem>
       <FormItem label="Description:" required>
           <Input placeholder="Enter Description" defaultValue="" id="description"/>
       </FormItem>
       <FormItem label="Trigger Value:" required>
           <Input placeholder="Enter Trigger Value" defaultValue="" id="trigger_value"/>
       </FormItem>
       <FormItem label="Severity:" required>
       <select id= "severityId" className={styles.selectopt} style= {{ width :200}}>
    { this.state.severityoption }
      </select>
       </FormItem>
       <FormItem label="Expression:" required>
       <select id= "expressId" className={styles.selectopt} style= {{ width :200}}>
    { this.state.expressoption }
      </select>
       </FormItem>
       <FormItem label="Items:" required>
       <select id= "itemId" className={styles.selectopt} style= {{ width :200}}>
    { this.state.itemoption }
      </select>
       </FormItem>

        </Card>
       </Modal>
       <Modal
         visible={this.state.editTrigger}
         onOk={this.editItemssave}
         onCancel={this.editTriggerCancel}
         footer={[
           <Button key="back" onClick={this.editTriggerCancel}>Cancel & Close</Button>,
           <Button key="submit" type="primary"  onClick={this.editItemssave}>
             Save Item
           </Button>,
         ]}
       >
       <Card noHovering="false" style={{'backgroundColor': 'transparent !important'}} bordered={false}>
       <h2 style={{textAlign: 'center'}}>edit items</h2>

          <FormItem label="Name:" required>
              <Input placeholder="Enter Name" value={this.state.name} onChange={e => this.onTodoChange_name(e.target.value)} id="name"/>
          </FormItem>
          <FormItem label="Description:" required>
              <Input placeholder="Enter Description" value={this.state.description} onChange={e => this.onTodoChange_description(e.target.value)} id="description"/>
          </FormItem>
          <FormItem label="Trigger Value:" required>
              <Input placeholder="Enter Trigger Value" value={this.state.trigger_value} onChange={e => this.onTodoChange_trigger_value(e.target.value)} id="trigger_value"/>
          </FormItem>
          <FormItem label="Severity:" required>
          <select id= "severityId" value={this.state.severity_id} onChange={e => this.onTodoChange_severity_id(e.target.value)} className={styles.selectopt} style= {{ width :200}}>
       { this.state.severityoption }
         </select>
          </FormItem>
          <FormItem label="Expression:" required>
          <select id= "expressId" value={this.state.expression_id} onChange={e => this.onTodoChange_expression_id(e.target.value)} className={styles.selectopt} style= {{ width :200}}>
       { this.state.expressoption }
         </select>
          </FormItem>
          <FormItem label="Items:" required>
               <select id= "itemId" value={this.state.name} onChange={e => this.onTodoChange_name(e.target.value)} className={styles.selectopt} style= {{ width :200}}>
            { this.state.itemoption }
              </select>
               </FormItem>
        </Card>
       </Modal>

<Card noHovering="false">

 <Table pagination={{ pageSize: 10,  showSizeChanger:true}} scroll={{ x: 1000}} rowKey="id" columns={[

{
   title: 'Name',
   dataIndex: 'name',
   className: styles.textleft,
 }, {
   title: 'Description',
   dataIndex: 'description',
   className: styles.textleft
 }, {
   title: 'Trigger Value',
   dataIndex: 'trigger_value',
   className: styles.textleft
 },
 {
   title: 'Item Name',
   dataIndex: 'item_name',
   className: styles.textleft
 },
 {
  title: 'Severity Name',
  dataIndex: 'severity_name',
  className: styles.textleft
},
{
 title: 'Expression',
 dataIndex: 'expression',
 className: styles.textleft
},
{
 title: 'Active',
 dataIndex: 'active',
 render: active => <p>{active === true ? "True" :"False"}</p>
},
{
 title: 'Active Time',
 dataIndex: 'active_time'
},


]} dataSource={triggerData}  />
         </Card>
       </div>
     );

}
}

export default Usertriggers
