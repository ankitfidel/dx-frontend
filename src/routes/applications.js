import React from 'react'
import {Menu, Icon, Popover, Badge, Popconfirm,M,Avatar,Row,Breadcrumb, Col, Button,Card, Table, Modal, Switch,Input, Radio, Form, Pagination } from 'antd'
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const FormItem = Form.Item;
import {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis,ResponsiveContainer, CartesianGrid, Tooltip} from 'recharts';
import reqwest from 'reqwest';
import styles from './common.less'
const axios = require('axios');
import cookie from 'react-cookies'
import { browserHistory } from 'dva/router';
import { axiosrequest } from './axiosrequest';

//
// <FormItem label="item_key:">
//     <Input placeholder="item_key" defaultValue="" id="item_key"/>
// </FormItem>


function error(msg) {
  const modal = Modal.warning({
    content: msg
  });
}



class Groups extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        applicationsData: [{

          application_id:'',
          application_name:''
               }],
           pagination: {},

           data:[],
           result:[],
           loading: true,
           visible: false,
           canceleditgroup:false,
           handleChange:false,
           editapplication: false,
           pagination: {},
           size: 'default',
           selectedRowKeys: [],
           cookies: cookie.loadAll()
      };
       this.addapplicationsave = this.addapplicationsave.bind(this);
       this.onTodoChange_applicationname = this.onTodoChange_applicationname.bind(this);

   }

     onSelectChange = (selectedRowKeys) => {
       console.log('selectedRowKeys changed: ', selectedRowKeys);
       this.setState({ selectedRowKeys });
     }
     applicationslist = (params = {}) => {
         var cookies = cookie.load('sessionid');
         var company_id = cookie.load('company_id');
         axios.get(axios.defaults.baseURL + '/api/front/application/' + cookies + '/company/'+ company_id,{
           responseType: 'json'
         }).then(response => {
               this.setState({ applicationsData: response.data.result,  loading:false});
           })
         .catch(function (error) {
           console.log(error);
         });
    }

      componentDidMount() {
         this.applicationslist();
  }
  addapplication = () => {
    this.setState({
    visible: true,
  });
  }
  applicationeditData(application_id){
  //  alert(application_id);
    cookie.save('application_id', application_id);
    this.setState({
    editapplication: true,
  });
  var cookies = cookie.load('sessionid');
//  var user_id = cookie.load('user_id');
  //var company_id = cookie.load('company_id');
  //alert(user_id);
  axios.get(axios.defaults.baseURL + '/api/front/application/'+ cookies + '/' + application_id,{
    responseType: 'json'
  }).then(response => {
    var userdata = response.data.result;
        this.setState({application_name: userdata.application_name});
    })
  .catch(function (error) {
    console.log(error);
  });
  }
  applicationData(application_id){
    var cookies = cookie.load('sessionid');
  //  var application_id = cookie.load('application_id');

    //alert(device_id)
    axios.delete(axios.defaults.baseURL + '/api/front/application/'+ cookies +'/'+application_id, {
    application_id:application_id
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
  editapplicationsave(){
    const cookies = cookie.load('sessionid');
    var application_id = cookie.load('application_id');
    var application_name = document.getElementById('application_name').value;
    axios.put(axios.defaults.baseURL + '/api/front/application/'+ application_id , {
      session_id:cookies,
      application_name:application_name,
    }).then(function (response) {
      if(response.data.status == false){
          error(response.data.result)
        }else{
        window.location.reload();
     }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  addapplicationsave = (e) => {
    const cookies = cookie.load('sessionid');
    var company_id = cookie.load('company_id');
    var application_name = document.getElementById('application_name').value;
    axios.post(axios.defaults.baseURL + '/api/front/application', {
     session_id:cookies,
     application_name:application_name,
     company_id:company_id,
    })
    .then(function (response) {
      if(response.data.status == false){
     error(response.data.result)
        }else{
        window.location.reload();
     }
    })
    .catch(function (error) {
      console.log(error);
    });

}
handleCancels = (e) => {
console.log(e);
this.setState({
editapplication: false,
});
}
canceleditgroup = (e) => {
console.log(e);
this.setState({
visible: false,
});
}


      onSelectChange = (selectedRowKeys) => {
          console.log('selectedRowKeys changed: ', selectedRowKeys);
          this.setState({ selectedRowKeys });
    //  alert();
        }
        onTodoChange_applicationname(value){
            this.setState({application_name: value});
        }
render(){
  // var cookies = cookie.load('sessionid');
  // alert("cookies: "+cookies)
  // if(cookies==null || cookies == undefined || cookies == ''){
  //   alert("hi");
  //   browserHistory.push("/login");
  // }
  var user_role = cookie.load('user_role');
let addapplication = null;
// alert("user_role"+user_role)
if(user_role === "dashboard_admin"){
addapplication = <Button type="primary" onClick={this.addapplication}>Add Application</Button>
}else{
addapplication = null
}
var user_role = cookie.load('user_role');
let adminmenu = null;
if(user_role === "dashboard_admin"){
adminmenu = <Breadcrumb.Item href='#/admindashboard'><Icon type='home' /><span>Dashboard</span></Breadcrumb.Item>
}else{
adminmenu = <Breadcrumb.Item href='#/dashboard'><Icon type='home' /><span>Dashboard</span></Breadcrumb.Item>
}
  const { selectedRowKeys, applicationsData, loading,application_name,name, company_id } = this.state;
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
       <Breadcrumb>
    {adminmenu}
    <Breadcrumb.Item><span>Applications</span></Breadcrumb.Item>
      </Breadcrumb> <br />
       <Modal
         visible={this.state.visible}
         onOk={this.addapplicationsave}
         onCancel={this.canceleditgroup}
         footer={[<div>
            <Button key="canceleditgroup" type="default" loading={loading} onClick={this.canceleditgroup}>
              Close
            </Button>
            <Button key="addapplicationsave" type="primary" loading={loading} onClick={this.addapplicationsave}>
              Add Application
            </Button></div>]}
       >
       <div style={{'backgroundColor': 'transparent !important'}} >
       <h2 style={{textAlign: 'center'}}>Add Application</h2>

       <FormItem label="Application Name:" required>
           <Input placeholder="Enter application Name" defaultValue="" id="application_name"/>
       </FormItem>

        </div>
       </Modal>
       <Modal
         visible={this.state.editapplication}
         onOk={this.editapplicationsave}
         onCancel={this.handleCancels}
         footer={[<div>
            <Button key="handleCancels" type="default" loading={loading} onClick={this.handleCancels}>
              Close
            </Button>
            <Button key="editapplicationsave" type="primary" loading={loading} onClick={this.editapplicationsave}>
              Save Application
            </Button></div>
          ]}
       >
       <div style={{'backgroundColor': 'transparent !important'}} >
       <h2 style={{textAlign: 'center'}}>Edit Application</h2>

       <FormItem label="Application Name:" required>
           <Input placeholder="Enter application Name"value={application_name} id="application_name" onChange={e => this.onTodoChange_applicationname(e.target.value)}/>
       </FormItem>

        </div>
       </Modal>
<Card noHovering="false" bordered={false}>

{addapplication} <br /><br />

 <Table pagination={{ pageSize: 10,  showSizeChanger:true}} loading={loading} rowKey="application_id" columns={[

{
   title: 'Application Name',
   dataIndex: 'application_name',
    className: styles.textleft
 },

  {
     title: 'Action',
     dataIndex: 'application_id',
      className: styles.textleft,
     render: application_id => <div> <a href="javascript:void(0)" onClick={() => this.applicationeditData(application_id)}><Icon type="edit" /> Edit</a> &nbsp; | &nbsp;

     <Popconfirm title="Are you sure delete this Application?" onConfirm={() => this.applicationData(application_id)} okText="Yes" cancelText="No">
       <a href="#"><Icon type="delete" />&nbsp;Delete </a>
     </Popconfirm>
     </div>
   },

]} dataSource={applicationsData}  />
         </Card>
       </div>
     );

}
}

export default Groups
