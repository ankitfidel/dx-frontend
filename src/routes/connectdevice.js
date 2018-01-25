import React from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar,Row, Col, Button,Card, Table, Modal,Switch, Radio, Form,DatePicker, Select} from 'antd'
import {ComposedChart, CartesianGrid, LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis,Legend, Bar, Tooltip, ResponsiveContainer} from 'recharts';
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
import events from './events.less'
const { RangePicker } = DatePicker;
const Option = Select.Option;
const FormItem = Form.Item;
import styles from './common.less'
const axios = require('axios');
import cookie from 'react-cookies'
import { axiosrequest } from './axiosrequest';

function handleChange(device_id) {
  //console.log(`selected );
//  alert("device_id" + device_id)
}
//
// const columns = [{
//   title: 'Date',
//   dataIndex: 'date',
//   className:styless.textleft,
//   key: 'date',
// }, {
//   title: 'host',
//   dataIndex: 'host',
//   className:styless.textleft,
//   key: 'host',
// }, {
//   title: 'severity',
//   dataIndex: 'severity',
//   className:styless.textleft,
//   key: 'severity',
// },   {
//   title: 'Description',
//   dataIndex: 'description',
//   className:styless.textleft,
//   key: 'description'
// },
// {
//   title: 'duration',
//   dataIndex: 'duration',
//   className:styless.textleft,
//   key: 'duration'
// } ,{
//   title: 'ack',
//   dataIndex: 'ack',
//   className:styless.textleft,
//   key: 'ack',
// },];
//
// const data = [];
// for (let i = 1; i <= 10; i++) {
//   data.push({
//     key: i,
//     date: '08/11/17 05:40	',
//     host: <a href="#">UPSA1.p1.dcl.sensorandwireless.com</a>,
//     severity: `192.168.${i}2.${i}1`,
//     description: `Response time is too high on UPSA1.p1.dcl.sensorandwireless.com	`,
//     duration: `-`,
//     ack: `No`,
//   });
// }


class Connectdevice extends React.Component {
// <Table rowSelection={rowSelection} scroll={{ x: 1000}} columns={columns} dataSource={data} />
  constructor(props) {
      super(props);
this.connectdevice = this.connectdevice.bind(this);
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
       selectedRowKeys: []
     }

     listdevice = (params = {}) => {
       // console.log('params:', params);
       //  this.setState({ loading: true });
         var cookies = cookie.load('sessionid');
         var company_id = cookie.load('company_id');
         axios.get(axios.defaults.baseURL + '/api/front/device/' + cookies + '/company/' + company_id + '/connect/' + false,{
           responseType: 'json'
         }) .then(response => {

            let comapnyrole = response.data.result.map((pic,i) => {
              return(
         <option key={i.toString()} value={pic.device_id}>{pic.device_name}</option>
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


       componentDidMount() {
        this.listdevice();

     }
     connectdevice(){
       var selectDeviceId = document.getElementById('selectedCompanyId').value;
         console.log("device id = "+ selectDeviceId);
              var cookies = cookie.load('sessionid');
            //var device_id = cookie.load('device_id');
          //  console.log("device id = "+ device_id);
              axios.get(axios.defaults.baseURL + '/api/front/device/connect/' + cookies + '/' + selectDeviceId,{
                responseType: 'json'
              }).then(response => {
               // alert("response"+response)
              // alert()
               console.log(JSON.stringify(response.data.result))
                  //var company_id = cookie.load('company_id');

                })
              .catch(function (error) {
                console.log(error);
              });

     }
render(){
  const { selectedRowKeys, size, device_id } = this.state;
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
     return (
       <div>
       <div>

<Card noHovering="false">
<Row gutter={16}>

<Col className="gutter-row" xs={24} sm={12} md={12} lg={6}>
<div><label>Select Device:</label></div>
<select className={styles.selectopt} style={{ width: '100%'   }} id="selectedCompanyId" placeholder="Select a Device"
 onChange={handleChange}
>
{ this.state.comapnyrole }
</select>
</Col>
<Col className="gutter-row" xs={24} sm={12} md={12} lg={6}>
<div><label className={events.clearhidden}>clear:</label></div>
 <Button type="primary" onClick={() => this.connectdevice(device_id)}>Connect device</Button>
</Col>

</Row>

         </Card>
       </div>

       </div>
     );

}
}



export default Connectdevice
