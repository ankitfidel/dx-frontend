import React from 'react'
import {Menu, Icon, Popover,Layout, Badge, M,Avatar,Row, Col,Tag, Button,Card, Table, Modal, Form, Input, Popconfirm} from 'antd'
import {ComposedChart, CartesianGrid, LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis,Legend, Bar, Tooltip, ResponsiveContainer} from 'recharts';
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const FormItem = Form.Item;
const {Header, Content, Footer, Sider} = Layout;
const axios = require('axios');
import cookie from 'react-cookies'
import { browserHistory, hashHistory } from 'dva/router';
import styles from './common.less';
import { axiosrequest } from './axiosrequest';
// <Button type="danger"   onClick={this.start}
//         disabled={!hasSelected}>Delete Company</Button>
//         <span style={{ marginLeft: 8 }}>
//         {hasSelected ? `Selected ${selectedRowKeys.length} Companies` : ''}
//       </span>

const data = []

const EditableCell = ({ editable, value, onChange }) => (
<div>
  {editable
    ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
    : value
  }
</div>
);
function error(msg) {
  const modal = Modal.error({
    content: msg
  });
}
class Devices extends React.Component {

  constructor(props) {
      super(props);

      this.state = { data,
        devicelist: [{
          device_id:'',
          device_name:'',
          device_port:'',
          device_key:'',
          device_ip:'',
          group_name:'',
          connected:'',
          is_connected:''
        }],
        loading:true,
        visible:false,
        connected:'',
        editDevice:false,
              };
      this.cacheData = data.map(item => ({ ...item }));
      this.addDevicesssave = this.addDevicesssave.bind(this);
      this.onTodoChange_device_name = this.onTodoChange_device_name.bind(this)
      this.onTodoChange_device_port = this.onTodoChange_device_port.bind(this)
      this.onTodoChange_device_ip = this.onTodoChange_device_ip.bind(this)
      this.onTodoChange_group_id = this.onTodoChange_group_id.bind(this)

 }


 renderColumns(text, record, column) {
   return (
     <EditableCell
       editable={record.editable}
       value={text}
       onChange={value => this.handleChange(value, record.key, column)}
     />
   );
 }
 onSelectChange = (selectedRowKeys) => {
   console.log('selectedRowKeys changed: ', selectedRowKeys);
   this.setState({ selectedRowKeys });
 }



  devicelistparam = (params = {}) => {
      var cookies = cookie.load('sessionid');
      var company_id = cookie.load('company_id');
      axios.get(axios.defaults.baseURL + '/api/front/device/' + cookies + '/company/'+ company_id,{
        responseType: 'json'
      }).then(response => {
            this.setState({devicelist: response.data.result, connected:response.data.result.is_connected, loading:false});
        })
      .catch(function (error) {
        console.log(error);
      });
 }
 adddevices = () => {
   this.setState({
   visible: true,
 });
 // browserHistory.push("/addusers");
 }
 editDevicesssave(){
   const cookies = cookie.load('sessionid');
   var device_id = cookie.load('deviceid');
   const devicename = document.getElementById('devicename').value;
   const port = document.getElementById('port').value;
   const ip = document.getElementById('ip').value;
   const groupid = document.getElementById('selectedGroupId').value;
  // const isRetailer = document.getElementById('isRetailer').checked = true;
   axios.put(axios.defaults.baseURL + '/api/front/device/'+ device_id, {
    session_id:cookies,
    device_name:devicename,
    device_port:port,
    is_connected:false,
    group_id:groupid,
    device_ip:ip,
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
 addDevicesssave = (e) => {
   const cookies = cookie.load('sessionid');
   const devicename = document.getElementById('devicename').value;
   const port = document.getElementById('port').value;
   const ip = document.getElementById('ip').value;
   const groupid = document.getElementById('selectedGroupId').value;
  // const isRetailer = document.getElementById('isRetailer').checked = true;
   axios.post(axios.defaults.baseURL + '/api/front/device', {
    session_id:cookies,
    device_name:devicename,
    device_port:port,
    is_connected:false,
    group_id:groupid,
    device_ip:ip,
 //   company_id:companyId
  //  isRetailer:isRetailer
   })
   // .then(function (response) {
   //  alert(JSON.stringify(response));
   //   if(response.data.result.status == false){
   //   //  alert("error");
   //  error()
   //     }else{
   //   //    console.log(JSON. stringify(response.data.result));
   //       alert("device added")
   //     //  console.log(JSON.stringify(response.data.result));
   //     //  console.log(cookies);
   //   browserHistory.push("/devices");
   //  }
   //
   // })
   .then(function (response) {
      if(response.data.status == false){
        //alert()
      error(response.data.result)
    }
    if(response.data.status == true){
          console.log(JSON.stringify(response.data.result));
        //  hashHistory.push("/devices");
        window.location.reload()
        }
   })
   .catch(function (error) {
     console.log(error);
   });

}
  componentDidMount() {
   this.devicelistparam();
   var cookies = cookie.load('sessionid');
   var company_id = cookie.load('company_id');
   axios.get(axios.defaults.baseURL + '/api/front/group/' + cookies + '/company/' + company_id,{
     responseType: 'json'
   }) .then(response => {
      let grouplist = response.data.result.map((group,i) => {
        return(
   <option key={i.toString()} value={group.id}>{group.name}</option>
        )
      })
        this.setState({grouplist:grouplist});
      //  console.log("state:", this.state.grouplist[4].props.children)
    })
   .catch(function (error) {
     console.log(error);
   })



}
// (){
//     hashHistory.push("/adddevices");
// }
editdevice(device_id){
  console.log("company_id:" + device_id)
  cookie.save('deviceid', device_id);
  console.log("from cookies company_id:" + cookie.load('deviceid'))
//  hashHistory.push("/viewdevices")
var cookies = cookie.load('sessionid');
var device_id = cookie.load('deviceid');
//  alert("device_id"+device_id)
axios.get(axios.defaults.baseURL + '/api/front/device/' + cookies +'/'+ device_id,{
  responseType: 'json'
}).then(response => {
  var companydata = response.data.result;
  console.log( "device edit"+ JSON.stringify(response.data.result))
      this.setState({device_name: companydata.device_name, device_ip:companydata.device_ip, device_port:companydata.device_port});
  })
.catch(function (error) {
  console.log(error);
});
this.setState({
editDevice: true,
});
}
deletedevice(device_id){
  var cookies = cookie.load('sessionid');
  //alert(device_id)
  axios.delete(axios.defaults.baseURL + '/api/front/device/'+ cookies +'/'+device_id, {
  device_id:device_id
  })
  .then(function (response) {
      //alert(device_id)
  if(response.data.status == false){
  //  alert("eerrre:   "+device_id)
  error(response.data.result)
    }else{
    //  alert(device_id)
   window.location.reload();
    }
  })
  .catch(function (error) {
  console.log(error);
  });
}

  itemlist(device_id){
    console.log("device id"+ device_id);
      cookie.save('device_id', device_id, { path: '/' });
    hashHistory.push("/items");
  }
  triggerslist(device_id){
    console.log("device id"+ device_id);
      cookie.save('device_id', device_id, { path: '/' });
    hashHistory.push("/triggers");
  }

 handleChange(value, key, column) {
   const newData = [...this.state.data];
   const target = newData.filter(item => key === item.key)[0];
   if (target) {
     target[column] = value;
     this.setState({ data: newData });
   }
 }
 edit(key) {
   const newData = [...this.state.data];
   const target = newData.filter(item => key === item.key)[0];
   if (target) {
     target.editable = true;
     this.setState({ data: newData });
   }
 }
 save(key) {
   const newData = [...this.state.data];
   const target = newData.filter(item => key === item.key)[0];
   if (target) {
     delete target.editable;
     this.setState({ data: newData });
     this.cacheData = newData.map(item => ({ ...item }));
   }
 }
 cancel(key) {
   const newData = [...this.state.data];
   const target = newData.filter(item => key === item.key)[0];
   if (target) {
     Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
     delete target.editable;
     this.setState({ data: newData });
   }
 }
 onTodoChange_device_name(value){
   this.setState({device_name: value});
 }
 onTodoChange_device_port(value){
   this.setState({device_port: value});
 }
 onTodoChange_device_ip(value){
   this.setState({device_ip: value});
 }
 onTodoChange_group_id(value){
   this.setState({group_id: value});
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
 editDevice: false,
 });
 }
 connected(device_key){
   alert(JSON.stringify(device_key));
   var cookies = cookie.load('sessionid');
   axios.get(axios.defaults.baseURL + '/api/front/device/connect/' + cookies + '/' + device_key,{
     responseType: 'json'
   }).then(response => {
    // alert("response"+response)
    alert(response.data.result)
  //  console.log(JSON.stringify(response.data.result))
       //var company_id = cookie.load('company_id');
       hashHistory.push("/devices")
     })
   .catch(function (error) {
     console.log(error);
   });
  // alert("device_key " + JSON.stringify(device_key))
//  console.log(" :::" + JSON.stringify(device_key));
 }
render(){
  var user_role = cookie.load('user_role');
let addDevices = null;
// alert("user_role"+user_role)
if(user_role === "dashboard_admin"){
addDevices =  <Button type="primary" onClick={this.adddevices}>Add Device</Button>
}else{
addDevices = null
}
  // let buttondisabled = null;
  const { selectedRowKeys, devicelist,loading, companyId,device_ip, device_name, device_port } = this.state;
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
//const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
    <Modal
      visible={this.state.editDevice}
      onOk={this.editDevicesssave}
      onCancel={this.editCancel}
      footer={[
        <Button key="back" onClick={this.editCancel}>Cancel & Close</Button>,
        <Button key="submit" type="primary" loading={loading} onClick={this.editDevicesssave}>
          Save Item
        </Button>,
      ]}
    >

<Card noHovering="false">
<h2 style={{textAlign: 'center'}}>View Device</h2>

       <FormItem label="Device Name:">
           <Input placeholder="Enter device Name.." value={this.state.device_name} id="devicename" onChange={e => this.onTodoChange_device_name(e.target.value)}/>
       </FormItem>
       <FormItem label="Port:">
           <Input placeholder="Enter Port.."  value={this.state.device_port} id="port"  onChange={e => this.onTodoChange_device_port(e.target.value)}/>
       </FormItem>
       <FormItem label="IP:">
           <Input placeholder="ip"  value={this.state.device_ip} id="ip" onChange={e => this.onTodoChange_device_ip(e.target.value)}/>
       </FormItem>
       <FormItem label="Select Groups:">
       <select id= "selectedGroupId" className={styles.selectopt} style= {{ width :200}}  onChange={e => this.onTodoChange_group_id(e.target.value)}>
    { this.state.grouplist }
      </select>
       </FormItem>





 </Card>
    </Modal>
    <Modal
      visible={this.state.visible}
      onOk={this.addDevicesssave}
      onCancel={this.handleCancel}
      footer={[
        <Button key="back" onClick={this.handleCancel}>Cancel & Close</Button>,
        <Button key="submit" type="primary" loading={loading} onClick={this.addDevicesssave}>
          Save Item
        </Button>,
      ]}
    >
    <Card noHovering="false">
    <h2 style={{textAlign: 'center'}}>Add Devices</h2>

           <FormItem label="Device Name:">
               <Input placeholder="Enter device Name.." defaultValue="" id="devicename"/>
           </FormItem>
           <FormItem label="Port:">
               <Input placeholder="Enter Port.." defaultValue="" id="port"/>
           </FormItem>
           <FormItem label="IP:">
               <Input placeholder="ip" defaultValue="" id="ip"/>
           </FormItem>
           <FormItem label="Select Groups:">
           <select id= "selectedGroupId" className={styles.selectopt} style= {{ width :200}}>
        { this.state.grouplist }
          </select>
           </FormItem>



     </Card>
    </Modal>
 <Card noHovering="false">

{addDevices}&nbsp;<br /><br />
 <Table pagination={{ pageSize: 10,  showSizeChanger:true }} scroll={{ x: 900}} rowKey="device_id" loading={loading} rowSelection={rowSelection} columns={[
   {
   title: 'Name',
   dataIndex: 'device_name',
   width:300,
    className: styles.textleft
   },
{
 title: 'IP',
 dataIndex: 'device_ip',
  className: styles.textleft
},  {
 title: 'Port',
 dataIndex: 'device_port',
  className: styles.textleft
},
{
title: 'Name',
dataIndex: 'group_name',
 className: styles.textleft
},
{
title: 'Status',
dataIndex: 'is_connected',
render: is_connected => <p>{is_connected == true ? <Tag color="#01910d">Connected</Tag> : <Tag color="#d30a0a ">Not connected</Tag>}</p>,
 className: styles.textleft
},
{
title: 'Status',
dataIndex: 'device_key',
render: device_key => <p><Tag color="blue" onClick={() => this.connected(device_key)}>Connect device</Tag></p>,
 className: styles.textleft
},

{
title: '',
dataIndex:'device_id',
 render: device_id  => <div><Tag color="blue" onClick={() => this.editdevice(device_id)}>Edit</Tag>| &nbsp; <Tag color="#d30a0a"  onClick={() => this.deletedevice(device_id)}>Delete</Tag>| &nbsp; <Tag color="blue"  onClick={() => this.itemlist(device_id)}>Items</Tag> | &nbsp;<Tag color="blue"  onClick={() => this.triggerslist(device_id)}>Triggers</Tag></div>
},

 ]} dataSource={devicelist}  />
      </Card>
    </div>
  )
}

}


export default Devices
