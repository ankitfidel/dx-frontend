import React from 'react'
import {Menu, Icon, Popover,Layout, Badge, M,Avatar,Row, Col, Button,Card, Table, Modal, Input, Popconfirm} from 'antd'
import {ComposedChart, CartesianGrid, LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis,Legend, Bar, Tooltip, ResponsiveContainer} from 'recharts';
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
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
class Devices extends React.Component {

  constructor(props) {
      super(props);

      this.state = { data,
        devicelist: [{
          device_id:'',
          device_name:'',
          device_port:'',
          device_ip:'',
          group_name:'',
          connected:'',
          is_connected:''
        }],
        loading:true
              };
      this.cacheData = data.map(item => ({ ...item }));
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

  componentDidMount() {
   this.devicelistparam();

}
adddevices(){
    hashHistory.push("/adddevices");
}
editdevice(device_id){
  console.log("company_id:" + device_id)
  cookie.save('deviceid', device_id);
  console.log("from cookies company_id:" + cookie.load('deviceid'))
  hashHistory.push("/viewdevices")
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
  const { selectedRowKeys, devicelist,loading, companyId } = this.state;
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
 <Card noHovering="false">

{addDevices}&nbsp;<br /><br />
 <Table pagination={{ pageSize: 10,  showSizeChanger:true }} scroll={{ x: 900}} rowKey="device_id" loading={loading} rowSelection={rowSelection} columns={[
   {
   title: 'Device Name',
   dataIndex: 'device_name',
   width:300,
    className: styles.textleft
   },
{
 title: 'Device IP',
 dataIndex: 'device_ip',
  className: styles.textleft
},  {
 title: 'Device Port',
 dataIndex: 'device_port',
  className: styles.textleft
},
{
title: 'Group Name',
dataIndex: 'group_name',
 className: styles.textleft
},
{
title: 'Connected Device',
dataIndex: 'is_connected',
render: is_connected => <p>{is_connected == true ? "True" : "False"}</p>,
 className: styles.textleft
},

{
title: 'Action',
dataIndex: 'device_id',
 render: device_id  => <div><a href="javascript:void(0)" onClick={() => this.editdevice(device_id)}><Icon title="Edit Device" type="edit" /></a> &nbsp; | &nbsp; <a href="javascript:void(0)" onClick={() => this.deletedevice(device_id)}><Icon title="Delete Device" type="delete" /></a>&nbsp; | &nbsp;  <a href="javascript:void(0)" onClick={() => this.itemlist(device_id)}><Icon type="pushpin-o" title="Items" /></a>&nbsp; | &nbsp; <a href="javascript:void(0)" onClick={() => this.triggerslist(device_id)}><Icon type="notification" title="Triggers" /></a></div>
},

 ]} dataSource={devicelist}  />
      </Card>
    </div>
  )
}

}


export default Devices
