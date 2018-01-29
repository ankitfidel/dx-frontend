import React from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar,Row, Col, Button,Card, Table, Modal, Switch, Radio, Form, Input, Pagination } from 'antd'
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const FormItem = Form.Item;
import reqwest from 'reqwest';
import styles from './common.less'
const axios = require('axios');
import cookie from 'react-cookies'
import { browserHistory, hashHistory } from 'dva/router';
import { axiosrequest } from './axiosrequest';


const data =[]
function error(msg) {
  const modal = Modal.error({
    content: msg
  });
}

class Users extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        userData: [{
          user_id:'',
          username:'',
          first_name:'',
          last_name:'',
          company_name:'',
          email_id:''
               }],
           pagination: {},
           data:[],
           result:[],
           loading: false,
           visible: false,
           updateUser:false,
           pagination: {},
           size: 'default',
           selectedRowKeys: [],
           cookies: cookie.loadAll()
      };
       this.adduserssave = this.adduserssave.bind(this);
       this.onTodoChange_username = this.onTodoChange_username.bind(this)
       this.onTodoChange_password = this.onTodoChange_password.bind(this)
       this.onTodoChange_first_name = this.onTodoChange_first_name.bind(this)
       this.onTodoChange_last_name = this.onTodoChange_last_name.bind(this)
       this.onTodoChange_email_id = this.onTodoChange_email_id.bind(this)
       this.start = this.start.bind(this)
   }



     onSelectChange = (selectedRowKeys) => {
       console.log('selectedRowKeys changed: ', selectedRowKeys);
       this.setState({ selectedRowKeys });
     }


      fetch = (params = {}) => {

                  // console.log('params:', params);
                  //  this.setState({ loading: true });
                    var cookies = cookie.load('sessionid');
                    var company_id = cookie.load('company_id');
                    axios.get(axios.defaults.baseURL + '/api/front/user/' + cookies + '/company_id/'+ company_id,{
                      responseType: 'json'
                    }).then(response => {
                          this.setState({ userData: response.data.result});
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
        this.fetch({
          result: pagination.pageSize,
          page: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        });
      }

      componentDidMount() {
       this.fetch();
         // console.log('params:', params);
         //  this.setState({ loading: true });
           var cookies = cookie.load('sessionid');
           axios.get(axios.defaults.baseURL + '/api/front/company/' + cookies,{
             responseType: 'json'
           }) .then(response => {
              let comapnyrole = response.data.result.map((pic,i) => {
                return(
           <option id="companyId" key={i.toString()} value={pic.company_id}>{pic.name}</option>
                )
              })
                this.setState({comapnyrole:comapnyrole});
                console.log("state:", this.state.comapnyrole)
            })
           .catch(function (error) {
             console.log(error);
           })

  }

  usereditData(user_id){
   // console.log("user_id:" + user_id)
    cookie.save('user_id', user_id);
    console.log("from cookies user_id:" + cookie.load('user_id'))
  //  browserHistory.push("/viewusers")
  this.setState({
  updateUser: true,
});
var cookies = cookie.load('sessionid');
var user_id = cookie.load('user_id');
//alert(user_id);
axios.get(axios.defaults.baseURL + '/api/front/user/'+ cookies + '/user_id/' + user_id,{
  responseType: 'json'
}).then(response => {
  var userdata = response.data.result;
  console.log( userdata.username)
      this.setState({username: userdata.username, email_id:userdata.email_id, password:userdata.password,first_name:userdata.first_name, last_name:userdata.last_name});
  })
.catch(function (error) {
  console.log(error);
});
  }

  updateUsersData(){
  //  alert("hii")

    var cookies = cookie.load('sessionid');
    const user_id = cookie.load('user_id');
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const last_name = document.getElementById('last_name').value;
    const first_name = document.getElementById('first_name').value;
    const email_id = document.getElementById('email_id').value;

    axios.put(axios.defaults.baseURL + '/api/front/user/'+user_id, {
     session_id:cookies,
     username:username,
     password:password,
     last_name:last_name,
     first_name:first_name,
     email_id:email_id,
    })
    .then(function (response) {
       if(response.data.status == false){
       //  alert()
       error(response.data.result)
         }else{
        //   console.log(JSON.stringify(response.data.result));
          // browserHistory.push("/users");
        window.location.reload();
         }
    })
    .catch(function (error) {
      console.log(error);
    });

  }

      start(user_id) {
   this.setState({ loading: true });
   // ajax request after empty completing
   var cookies = cookie.load('sessionid');
   axios.delete(axios.defaults.baseURL + '/api/front/user/'+ cookies +'/'+user_id, {
     user_id:user_id
   })
   .then(function (response) {
      if(response.data.status == false){
      //  alert()
      error(response.data.result)
        }else{
        //  alert(user_id)
       //   console.log(JSON.stringify(response.data.result));
         // browserHistory.push("/users");
       window.location.reload();
        }
   })
   .catch(function (error) {
     console.log(error);
   });
   setTimeout(() => {
     this.setState({
       selectedRowKeys: [],
       loading: false,
     });
   }, 1000);
 }
      onSelectChange = (selectedRowKeys) => {
          console.log('selectedRowKeys changed: ', selectedRowKeys);
          this.setState({ selectedRowKeys });
    //  alert();
        }
        addusers = () => {
          this.setState({
          visible: true,
        });
        // browserHistory.push("/addusers");
        }
        adduserssave = (e) => {
          const cookies = cookie.load('sessionid');
          const username = document.getElementById('username').value;
          const password = document.getElementById('password').value;
          const firstName = document.getElementById('firstName').value;
          const lastName = document.getElementById('lastName').value;
          const emailId = document.getElementById('emailId').value;
          const userRoleId = document.getElementById('userRoleId').value;
         const companyId = document.getElementById('companyId').value;

         // const isRetailer = document.getElementById('isRetailer').checked = true;
          axios.post(axios.defaults.baseURL + '/api/front/user', {
           session_id:cookies,
           username:username,
           password:password,
           first_name:firstName,
           last_name:lastName,
           email_id:emailId,
           user_role_id:userRoleId,
           company_id:companyId
         //  isRetailer:isRetailer
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
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  updateUserclose = (e) => {
    console.log(e);
    this.setState({
      updateUser: false,
    });
  }
  onTodoChange_username(value){
          this.setState({username: value});
      }

  onTodoChange_password(value){
    this.setState({password: value});
  }
    onTodoChange_first_name(value){
        this.setState({first_name: value });
    }
    onTodoChange_last_name(value){
      this.setState({ last_name: value });
      }
    onTodoChange_email_id(value){
        this.setState({email_id: value});
    }
render(){

  const { selectedRowKeys, userData, username,loading, password, first_name, last_name, email_id, updateUser } = this.state;
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
         title="Add Users"
         visible={this.state.visible}
         onOk={this.adduserssave}
         onCancel={this.handleCancel}
         footer={[
           <Button key="back" onClick={this.handleCancel}> Close</Button>,
           <Button key="submit" type="primary" loading={loading} onClick={this.adduserssave}>
             Add User
           </Button>,
         ]}
       >
       <FormItem label="Username:">
           <Input placeholder="Enter Username" defaultValue="" id="username"/>
       </FormItem>
       <FormItem label="Password:">
           <Input placeholder="Enter Password" defaultValue="" id="password"/>
       </FormItem>
       <FormItem label="First Name:">
           <Input placeholder="Enter First Name" defaultValue="" id="firstName"/>
       </FormItem>
       <FormItem label="Last Name:">
           <Input placeholder="Enter Last Name" defaultValue="" id="lastName"/>
       </FormItem>
       <FormItem label="Email Id:">
           <Input placeholder="Enter Email Id" defaultValue="" id="emailId"/>
       </FormItem>
       <FormItem label="User Role:">
       <select style={{ width: 200  }} className={styles.selectopt} id="userRoleId">
      <option  className={styles.optioncus} value="2">dashboard user</option>
      <option className={styles.optioncus} value="3">dashboard admin</option>
     </select>
       </FormItem>

          <FormItem label="Company Id:">
          <select className={styles.selectopt} style= {{ width :200}}>
       { this.state.comapnyrole }
         </select>
          </FormItem>


       </Modal>
       <Modal
         title="Edit users"
         visible={this.state.updateUser}
         onOk={this.updateUsersData}
         onCancel={this.updateUserclose}
         footer={[
           <Button key="back" onClick={this.updateUserclose}> Close</Button>,
           <Button key="submit" type="primary" loading={loading} onClick={this.updateUsersData}>
             Save User
           </Button>,
         ]}
       >
       <FormItem label="username:">
               <Input placeholder="username" value={username} id="username" onChange={e => this.onTodoChange_username(e.target.value)}/>
        </FormItem>
        <FormItem label="password:">
            <Input placeholder="password" value={this.state.password} id="password" onChange={e => this.onTodoChange_password(e.target.value)}/>
        </FormItem>
        <FormItem label="first_name:">
            <Input placeholder="first_name" value={this.state.first_name} id="first_name" onChange={e => this.onTodoChange_first_name(e.target.value)}/>
        </FormItem>
        <FormItem label="last_name:">
            <Input placeholder="last_name"value={this.state.last_name} id="last_name" onChange={e => this.onTodoChange_last_name(e.target.value)}/>
        </FormItem>
        <FormItem label="email_id:">
            <Input placeholder="email_id" value={this.state.email_id} id="email_id" onChange={e => this.onTodoChange_email_id(e.target.value)}/>
        </FormItem>



       </Modal>
<Card noHovering="false"> &nbsp; &nbsp;
 <Button type="primary" onClick={this.addusers}>Add Users</Button> &nbsp;
 <br /><br />
 <Table pagination={{ pageSize: 10,  showSizeChanger:true}} scroll={{ x: 900}} rowKey="user_id" rowSelection={rowSelection} columns={[

{
   title: 'Username',
   dataIndex: 'username',
 }, {
   title: 'First Name',
   dataIndex: 'first_name',
 }, {
   title: 'Last Name',
   dataIndex: 'last_name',
 },
 {
  title: 'Company Name',
  dataIndex: 'company_name'
},
{
 title: 'Email Id',
 dataIndex: 'email_id'
},
{
 title: 'Action',
 dataIndex: 'user_id',
 render: user_id =><div> <a href="javascript:void(0)" onClick={() => this.start(user_id)}> <Icon title="Delete User" type="delete" /> </a>&nbsp;&nbsp; |&nbsp;&nbsp; <a href="javascript:void(0)"  onClick={() => this.usereditData(user_id)}><Icon title="Edit User" type="edit" /></a></div>
}


]} dataSource={userData}  />
         </Card>
       </div>
     );

}
}

export default Users
