import React from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar,Row, Col, Button,Card, Table, Modal, Switch,Input, Radio, Form, Pagination } from 'antd'
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
  const modal = Modal.error({
    title: 'This is a Error message',
    content: msg
  });
}



class Groups extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        groupData: [{
          name:'',
          templates:'',
          id:'',
          group_name:''
               }],
           pagination: {},

           data:[],
           result:[],
           loading: true,
           visible: false,
           canceleditgroup:false,
           handleChange:false,
           editgroups: false,
           pagination: {},
           size: 'default',
           selectedRowKeys: [],
           cookies: cookie.loadAll()
      };
       this.addgroupsave = this.addgroupsave.bind(this);
       this.onTodoChange_groupname = this.onTodoChange_groupname.bind(this);

   }

     onSelectChange = (selectedRowKeys) => {
       console.log('selectedRowKeys changed: ', selectedRowKeys);
       this.setState({ selectedRowKeys });
     }
     grouplist = (params = {}) => {
         var cookies = cookie.load('sessionid');
         var company_id = cookie.load('company_id');
         axios.get(axios.defaults.baseURL + '/api/front/group/' + cookies + '/company/'+ company_id,{
           responseType: 'json'
         }).then(response => {
               this.setState({ groupData: response.data.result,  loading:false});
           })
         .catch(function (error) {
           console.log(error);
         });
    }

      componentDidMount() {
         this.grouplist();
  }
  addgroup = () => {
    this.setState({
    visible: true,
  });
  }
  groupeditData(id){
    cookie.save('id', id);
    this.setState({
    editgroups: true,
  });
  var cookies = cookie.load('sessionid');
  var user_id = cookie.load('user_id');
  var company_id = cookie.load('company_id');
  //alert(user_id);
  axios.get(axios.defaults.baseURL + '/api/front/group/'+ cookies + '/company/' + company_id,{
    responseType: 'json'
  }).then(response => {
    var userdata = response.data.result[0];
        this.setState({group_name: userdata.name});
    })
  .catch(function (error) {
    console.log(error);
  });
  }
  editgroupsave(){
    const cookies = cookie.load('sessionid');
    var id = cookie.load('id');
var group_name = document.getElementById('group_name').value;
    axios.put(axios.defaults.baseURL + '/api/front/group/'+ id , {
      session_id:cookies,
      group_name:group_name,
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
  addgroupsave = (e) => {
    const cookies = cookie.load('sessionid');
    var company_id = cookie.load('company_id');
    var group_name = document.getElementById('group_name').value;
    axios.post(axios.defaults.baseURL + '/api/front/group', {
     session_id:cookies,
     group_name:group_name,
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
editgroups: false,
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
        onTodoChange_groupname(value){
            this.setState({group_name: value});
        }
render(){
  // var cookies = cookie.load('sessionid');
  // alert("cookies: "+cookies)
  // if(cookies==null || cookies == undefined || cookies == ''){
  //   alert("hi");
  //   browserHistory.push("/login");
  // }
  var user_role = cookie.load('user_role');
let addgroup = null;
// alert("user_role"+user_role)
if(user_role === "dashboard_admin"){
addgroup = <Button type="primary" onClick={this.addgroup}>Add Group</Button>
}else{
addgroup = null
}
  const { selectedRowKeys, groupData, loading,group_name,name, company_id } = this.state;
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

       <Modal
         visible={this.state.visible}
         onOk={this.addgroupsave}
         onCancel={this.canceleditgroup}
       >
       <Card noHovering="false" bordered={false}>
       <h2 style={{textAlign: 'center'}}>Add Group</h2>

       <FormItem label="Group Name:">
           <Input placeholder="Enter Group Name" defaultValue="" id="group_name"/>
       </FormItem>

        </Card>
       </Modal>
       <Modal
         visible={this.state.editgroups}
         onOk={this.editgroupsave}
         onCancel={this.handleCancels}
       >
       <Card noHovering="false" bordered={false}>
       <h2 style={{textAlign: 'center'}}>Edit Groups</h2>

       <FormItem label="Group Name:">
           <Input placeholder="Enter Group Name"value={group_name} id="group_name" onChange={e => this.onTodoChange_groupname(e.target.value)}/>
       </FormItem>

        </Card>
       </Modal>
<Card noHovering="false">

{addgroup} <br /><br />

 <Table pagination={{ pageSize: 10,  showSizeChanger:true}} loading={loading} rowKey="id" rowSelection={rowSelection} columns={[

{
   title: 'Name',
   dataIndex: 'name',
 },
 {
    title: 'Template',
    dataIndex: 'templates',
  },
  {
     title: 'Action',
     dataIndex: 'id',
     render: id => <Button size="small" type="primary" onClick={() => this.groupeditData(id)}>edit</Button>
   },


]} dataSource={groupData}  />
         </Card>
       </div>
     );

}
}

export default Groups
