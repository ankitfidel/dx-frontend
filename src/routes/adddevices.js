import React from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar,Row, Col, Button,Card, Table, Modal,Select, Switch, Radio, Form, Input, Checkbox } from 'antd'
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
import reqwest from 'reqwest';
import styles from './common.less'
const axios = require('axios');
import cookie from 'react-cookies'
import { axiosrequest } from './axiosrequest';

import { browserHistory } from 'dva/router';
const data = [];


function checkbox(e) {
  console.log(`checked = ${e.target.checked}`);
}
function handleChange(value) {
  console.log(`selected ${value}`);
}
function error(msg) {
  const modal = Modal.error({
    content: msg
  });
}
class Adddevices extends React.Component {

  constructor(props) {
      super(props);
   }

   state = {
       bordered: true,
       loading: true,
       pagination: true,
       size: 'default',
       expandedRowRender:true,
       title:true,
       showHeader:true,
       footer:true,
       rowSelection: true,
       scroll: true,
       selectedRowKeys: [],
       cookies: cookie.loadAll()
     }


     componentDidMount() {
    //  this.fetchcompany();
    var cookies = cookie.load('sessionid');
    var company_id = cookie.load('company_id');
    axios.get(axios.defaults.baseURL + '/dataexchange/api/front/group/' + cookies + '/company/' + company_id,{
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

   // fetchcompany = (params = {}) => {
   //   // console.log('params:', params);
   //   //  this.setState({ loading: true });
   //     var cookies = cookie.load('sessionid');
   //     axios.get('http://localhost:8080/dataexchange/api/front/company/' + cookies,{
   //       responseType: 'json'
   //     }) .then(response => {
   //        let grouplist = response.data.result.map((pic,i) => {
   //          return(
   //     <option id="companyId" key={i.toString()} value={pic.company_id}>{pic.name}</option>
   //          )
   //        })
   //          this.setState({grouplist:grouplist});
   //          console.log("state:", this.state.grouplist)
   //      })
   //     .catch(function (error) {
   //       console.log(error);
   //     })
   //
   // <FormItem label="devicekey:">
    //     <Input placeholder="devicekey" defaultValue="" id="devicekey"/>
    // </FormItem>
   //
   //
   // }
   adddevices(){
        const cookies = cookie.load('sessionid');
        const devicename = document.getElementById('devicename').value;
        const port = document.getElementById('port').value;
        const ip = document.getElementById('ip').value;
        const groupid = document.getElementById('selectedGroupId').value;
       // const isRetailer = document.getElementById('isRetailer').checked = true;
        axios.post(axios.defaults.baseURL + '/dataexchange/api/front/device', {
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
               browserHistory.push("/devices");
             }
        })
        .catch(function (error) {
          console.log(error);
        });
      }

render(){
  const { selectedRowKeys,companyId  } = this.state;


     return (
       <div>

<Row>
    <Col span={12} offset={6}>
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




       <FormItem>
          <Button type="primary" onClick={this.adddevices}>Save</Button> &nbsp; &nbsp;
          <Button>Cancel</Button>
       </FormItem>

 </Card>
    </Col>
  </Row>

       </div>
     );

}
}



export default Adddevices
