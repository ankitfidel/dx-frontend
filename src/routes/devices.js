import React from 'react'
import {Menu, Icon, Popover,Layout, Badge,Breadcrumb, M,Avatar,Row,Spin,InputNumber, Col,Tag, Button,Card,message, Table, Modal,notification, Form, Input, Popconfirm} from 'antd'
import {ComposedChart, CartesianGrid, LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis,Legend, Bar, Tooltip, ResponsiveContainer} from 'recharts';
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const FormItem = Form.Item;
const {Header, Content, Footer, Sider} = Layout;
const axios = require('axios');
import cookie from 'react-cookies'
import { browserHistory, hashHistory } from 'dva/router';
import styles from './common.less';
import Style from 'style-it';
import { axiosrequest } from './axiosrequest';
// <Button type="danger"   onClick={this.start}
//         disabled={!hasSelected}>Delete Company</Button>
//         <span style={{ marginLeft: 8 }}>
//         {hasSelected ? `Selected ${selectedRowKeys.length} Companies` : ''}
//       </span>

const data = []
function cancel(e) {
  console.log(e);
  message.info('Device not deleted');
}
const EditableCell = ({ editable, value, onChange }) => (
<div>
  {editable
    ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
    : value
  }
</div>
);
function error(msg) {
  const modal = Modal.warning({
    content: msg
  });
}
function errorr(msg) {
  const modal = Modal.warning({
    content: msg
  });
}

const openNotification = (msg) => {
  notification.open({
    message: msg,
    icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
    duration:2
  });
};
class Devices extends React.Component {

  constructor(props) {
      super(props);

      this.state = { data,
        devicelist: [{
          device_id:'',
          background_image_url:'',
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
         graphloading:false,
         addDeviceloading:false
              };
      this.cacheData = data.map(item => ({ ...item }));
      this.addDevicesssave = this.addDevicesssave.bind(this);
      this.onTodoChange_device_name = this.onTodoChange_device_name.bind(this)
      this.onTodoChange_device_port = this.onTodoChange_device_port.bind(this)
      this.onTodoChange_device_ip = this.onTodoChange_device_ip.bind(this)
      this.onTodoChange_group_id = this.onTodoChange_group_id.bind(this)
      this.onTodoChange_background_image_url = this.onTodoChange_background_image_url.bind(this)

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
      var deviceStatus = cookie.load('device_is_connected');
    //  alert("deviceStatus:"+deviceStatus);
      axios.get(axios.defaults.baseURL + '/api/front/device/' + cookies + '/company/'+ company_id,{
        responseType: 'json'
      }).then(response => {
          //alert(response.data.result[0].device_id)
            this.setState({devicelist: response.data.result, connected:response.data.result.is_connected, loading:false});

            var deviceKey = cookie.load('deviceKey');
            var deviceMsg = null;
            for (var i = 0; i < response.data.result.length; i++) {
              if(response.data.result[i].device_key==deviceKey){




                if(response.data.result[i].is_connected==false){

                  if(deviceStatus===false){
                      deviceMsg = response.data.result[i].device_name +" Device connection failed. Check device details and try connecting again";
                  }else{
                    deviceMsg = response.data.result[i].device_name +" is disconnected";
                  }
                }else{
                    deviceMsg = response.data.result[i].device_name +" is connected";
                }
              }
            }
            if(deviceKey == null){
              return false;
            }
              openNotification(deviceMsg);
              cookie.remove('deviceKey');

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
   const background_image_url = document.getElementById('background_image_url').value;

   const port = document.getElementById('port').value;
   const ip = document.getElementById('ip').value;
   const groupid = document.getElementById('selectedGroupId').value;
  // const isRetailer = document.getElementById('isRetailer').checked = true;
   axios.put(axios.defaults.baseURL + '/api/front/device/'+ device_id, {
    session_id:cookies,
    device_name:devicename,
    background_image_url:background_image_url,
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
   const background_image_url = document.getElementById('background_image_url').value;
   const port = document.getElementById('port').value;
   const ip = document.getElementById('ip').value;
   const groupid = document.getElementById('selectedGroupId').value;
  // const isRetailer = document.getElementById('isRetailer').checked = true;
  this.setState({
    addDeviceloading:true
  })
   axios.post(axios.defaults.baseURL + '/api/front/device', {
    session_id:cookies,
    device_name:devicename,
    background_image_url:background_image_url,
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
   .then(response => {
      if(response.data.status == false){
        //alert()
      error(response.data.result)
      this.setState({
        addDeviceloading:false
      })
    }
    if(response.data.status == true){
          console.log(JSON.stringify(response.data.result));
        //  hashHistory.push("/devices");
        this.setState({
          visible:false
        })
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
      this.setState({device_name: companydata.device_name, device_ip:companydata.device_ip, background_image_url:companydata.background_image_url,  device_port:companydata.device_port});
  })
.catch(function (error) {
  console.log(error);
});
this.setState({
editDevice: true,
});
}
deletedevice(device_id){
  this.setState({
    graphloading:true
  })
  var cookies = cookie.load('sessionid');
  //alert(device_id)
  axios.delete(axios.defaults.baseURL + '/api/front/device/'+ cookies +'/'+device_id, {
  device_id:device_id
  })
  .then(response => {
      //alert(device_id)
  if(response.data.status == false){
  //  alert("eerrre:   "+device_id)
  error(response.data.result)
    }else{
      this.setState({
        graphloading:false
      })
    //  alert(device_id)
   window.location.reload();
    }
  })
  .catch(function (error) {
  console.log(error);
  });
}


  itemlist(device){
    var device_id = device.device_id;
    var device_name = device.device_name;
    console.log("device id"+ device_id);
  //  alert(device_name)
    cookie.save('device_id', device_id);
    cookie.save('device_name', device_name);
  //  alert(device_name)
  //  window.location.href=("#/items")
  //  hashHistory.push("/items");
  }
  triggerslist(device){
    var device_id = device.device_id;
    var device_name = device.device_name;
    console.log("device id"+ device_id);
      cookie.save('device_id', device_id);
        cookie.save('device_name', device_name);
  //      alert(device_name)
  //  hashHistory.push("/triggers");
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
 onTodoChange_background_image_url(value){
   this.setState({background_image_url: value});
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
};

 componentWillUpdate(){
//this.success()
 }

 connected(device_key,is_connected){
   this.setState({
     graphloading:true
   })

 var cookies = cookie.load('sessionid');
 cookie.save("deviceKey",device_key);
 //alert(is_connected)


axios.get(axios.defaults.baseURL + '/api/front/device/' + cookies + '/key/' + device_key,{
     responseType: 'json'
   }).then(response => {
cookie.save("device_is_connected",response.data.result.is_connected);
   if(response.data.result.is_connected == true){

      axios.get(axios.defaults.baseURL + '/api/front/device/disconnect/' + cookies + '/' + device_key,{
          responseType: 'json'
        }).then(response => {

  this.setState({
    graphloading:false
  })
    window.location.reload()

          })
        .catch(function (error) {
          console.log(error);
        });

   }else{
     axios.get(axios.defaults.baseURL + '/api/front/device/connect/' + cookies + '/' + device_key,{
      responseType: 'json'
    }).then(response => {

 window.location.reload()



        })
      .catch(function (error) {
        console.log(error);
      });
   }
     })
   .catch(function (error) {
     console.log(error);
   });


 }
 devicedetails(device){
  // alert(" ::: "+ JSON.stringify(device_id1))

   var device_id = device.device_id;
   var device_name = device.device_name;
   //alert(device_id)
   console.log(device_id);
   cookie.save("device_id", device_id);
    cookie.save("device_name", device_name);
  // hashHistory.push("/devicedetails")
 }
 error() {
   message.error('This is a message of error');
 };
success() {
message.success('Connect successfully', 10);
};

closed(){
  window.location.reload()
}
render(){
document.title = "Devices";
  var sidebarcolor = cookie.load('sidebarcolor');
  var headercolor = cookie.load('headercolor');
  var content1 = cookie.load('content1');
  var content2 = cookie.load('content2');
  var user_role = cookie.load('user_role');
  var style = {
        color: 'white',
        'background': headercolor,
        borderColor:headercolor
      };

let addDevices = null;
// alert("user_role"+user_role)
if(user_role === "dashboard_admin"){
addDevices =  <Button type="primary" style={style} onClick={this.adddevices}>Add Device</Button>
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
<Breadcrumb.Item><span>Devices</span></Breadcrumb.Item>
     </Breadcrumb><br />
    <Style>
    {`
         .intro {
           background: ` + headercolor + `
         }
      `}
  </Style>
    <Modal
      visible={this.state.editDevice}
      onOk={this.editDevicesssave}
      onCancel={this.editCancel}
      footer={[
        <Button key="back" onClick={this.editCancel}>Cancel</Button>,
        <Button key="submit" type="primary" loading={loading} onClick={this.editDevicesssave}>
          Save
        </Button>,
      ]}
    >

<div style={{'padding':'20px'}}>
<h2 style={{textAlign: 'center'}}>Edit Device</h2>

<FormItem label="Device Background URL:">
    <Input placeholder="Enter background image url" value={this.state.background_image_url} id="background_image_url" onChange={e => this.onTodoChange_background_image_url(e.target.value)}/>
</FormItem>
       <FormItem label="Device Name:" required>
           <Input placeholder="Enter device name" value={this.state.device_name} id="devicename" onChange={e => this.onTodoChange_device_name(e.target.value)}/>
       </FormItem>
       <FormItem label="Port:" required>
           <Input  placeholder="Enter port"  value={this.state.device_port} id="port"  onChange={e => this.onTodoChange_device_port(e.target.value)}/>
       </FormItem>
       <FormItem label="IP" required>
           <Input style={{'width':'100%'}} placeholder="Enter IP"  value={this.state.device_ip} id="ip" onChange={e => this.onTodoChange_device_ip(e.target.value)}/>
       </FormItem>
       <FormItem label="Select Groups:" required>
       <select id= "selectedGroupId" className={styles.selectopt} style= {{ width :200}}  onChange={e => this.onTodoChange_group_id(e.target.value)}>
    { this.state.grouplist }
      </select>
       </FormItem>




</div>
    </Modal>
    <Modal
      visible={this.state.visible}
      onOk={this.addDevicesssave}
      onCancel={this.handleCancel}
      footer={[
        <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
        <Button key="submit" type="primary" loading={loading} onClick={this.addDevicesssave}>
          Add Device
        </Button>,
      ]}
    >
    <Spin size="default"  spinning={this.state.addDeviceloading}>
<div style={{'padding':'20px'}}>
    <h2 style={{textAlign: 'center'}}>Add Device</h2>
    <FormItem label="Device Background URL:">
        <Input placeholder="Enter background image url" id="background_image_url" />
    </FormItem>
           <FormItem label="Device Name:" required>
               <Input placeholder="Enter device name" defaultValue="" id="devicename"/>
           </FormItem>
           <FormItem label="Port:" required>
               <Input type="number" placeholder="Enter port" defaultValue="" id="port"/>
           </FormItem>
           <FormItem label="IP:" required>
               <Input  placeholder="Enter IP" defaultValue="" id="ip"/>
           </FormItem>
           <FormItem label="Select Group:" required>
           <select id= "selectedGroupId" className={styles.selectopt} style= {{ width :200}}>
        { this.state.grouplist }
          </select>
           </FormItem>

</div>


     </Spin>
    </Modal>
 <Card noHovering="false" bordered={false}>
<Spin size="default" style={{zIndex: 9999}} spinning={this.state.graphloading}>
{addDevices}&nbsp;<br /><br />

 <Table pagination={{ pageSize: 10, showSizeChanger:true }} scroll={{ x: 1000}} rowKey="device_id" loading={loading} columns={[
   {
   title: 'Device Name',
   dataIndex: 'device_name',
   key:'device',
   className: styles.textleft,
   render: (device_name, device) =><div> <a href="#/devicedetails" onClick={() => this.devicedetails(device)}>{device_name}</a> </div>
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
title: 'Group',
dataIndex: 'group_name',
 className: styles.textleft
},
{
title: 'Status',
dataIndex: 'is_connected',
render: is_connected => <p>{is_connected == true ? <span style={{'color':'#01910d'}}>Connected</span> : <span style={{'color':'#d30a0a'}}>Not connected</span>}</p>,
 className: styles.textleft
},
{
title: '',
dataIndex: 'device_key',
render: (device_key,record) => <div><Tag style={{'backgroundColor':headercolor, 'color': 'white'}} onClick={() => this.connected(device_key,record.is_connected)}>   {record.is_connected == true ? <span>Disconnect Device</span> : <span> Connect Device</span>}  </Tag></div>,
 className: styles.textleft
},

{
title: 'Action',
dataIndex:'device_id',
 render: (device_id, device)  => <div>
  <a  href="#/items" onClick={() => this.itemlist(device)}>Items</a> &nbsp; | &nbsp;
  <a href="#/triggers"  onClick={() => this.triggerslist(device)}>Triggers</a>&nbsp; | &nbsp;
  <a href="javascript:void(0)" onClick={() => this.editdevice(device_id)}><Icon type="edit" /> Edit</a> &nbsp; | &nbsp;
 <Popconfirm title="Are you sure to delete this device?"onConfirm={() => this.deletedevice(device_id)}  okText="Yes" cancelText="No">
    <a href="#"><Icon type="delete" /> Delete Device</a>
  </Popconfirm></div>
},

 ]} dataSource={devicelist}  />
 </Spin>
      </Card>

    </div>
  )
}

}


export default Devices
