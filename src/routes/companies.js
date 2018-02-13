import React from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar,Row, Col,Breadcrumb, Button,Card, Table, Modal, Switch, Radio, Form, Pagination } from 'antd'
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const FormItem = Form.Item;
import reqwest from 'reqwest';
import styles from './common.less'
const axios = require('axios');
import cookie from 'react-cookies'
import { browserHistory } from 'dva/router';
import colors from '../utils/theme'

import { axiosrequest } from './axiosrequest';
const data =[]


class Companies extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        tableData: [{
          name:'',
          logo:'',
          domain:'',
          website_url:'',
          support_email_id:'',
          company_id:'',
          is_retailer:'',
               }],
           pagination: {},
           data:[],
           result:[],
           loading: false,

           pagination: {},
           size: 'default',
           selectedRowKeys: [],
           cookies: cookie.loadAll()
      };
   }



     onSelectChange = (selectedRowKeys) => {
       console.log('selectedRowKeys changed: ', selectedRowKeys);
       this.setState({ selectedRowKeys });
     }


     gotoco(company_id){
      // alert();
       console.log("uder function"+ company_id);
       browserHistory.push("/devices");
     }
      fetch = (params = {}) => {
        // console.log('params:', params);
        //  this.setState({ loading: true });
          var cookies = cookie.load('sessionid');
          var headersapi = {username:'admin',password:'admin123pass456'};
          var header = axios.defaults.headers.Authorization ;
//alert(header)

console.log(header),
      axios.get(axios.defaults.baseURL + '/api/front/company/' + cookies,{
header,
            responseType: 'json'
          }).then(response => {

                this.setState({ tableData: response.data.result});
                //  alert(response.data.result[0].logo)
                const company_id = response.data.result[0].company_id;
            //    alert(JSON.stringify(response.data.result[0].company_id))
              //   console.log(company_id)
                 cookie.save('company_id', company_id, { path: '/' });
                // console.log(cookie.save('company_id', company_id, { path: '/' }));
            })
          .catch(function (error) {
            console.log(error);
          });

  //         axios.get(
  //   "http://localhost:8080/dataexchange/api/front/company/"+ cookies,
  //   {headers: {
  //       'usename' : 'admin',
  //       'password': 'admin123pass456'
  //
  //     }
  //   }
  // )
  // .then((response) => {
  //     var response = response.data;
  //   },
  //   (error) => {
  //     var status = error.response.status
  //   }
  // );


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
  }
      addcompany(company_id) {
      //  alert()

      }


      start = () => {
   this.setState({ loading: true });
   // ajax request after empty completing
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

render(){
  document.title = "Companies";
  var textLeft = {
    textAlign: 'left',
  };
  const { selectedRowKeys, tableData } = this.state;
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
adminmenu = <Breadcrumb.Item href='#/admindashboard'><Icon type="home" /><span> Dashboard</span></Breadcrumb.Item>
}else{
adminmenu = <Breadcrumb.Item href='#/dashboard'><Icon type="home" /><span> Dashboard</span></Breadcrumb.Item>
}
     return (
       <div>
       <Breadcrumb>
          {adminmenu}
<Breadcrumb.Item><span>Companies</span></Breadcrumb.Item>
        </Breadcrumb><br />
<Card noHovering="false" bordered={false}>


 <Table pagination={{ pageSize: 10,  showSizeChanger:true}} scroll={{ x: 1000}} rowKey="company_id"  columns={[
   {
     title: 'Logo',
     dataIndex: 'logo',
     className: styles.logo,
     render: logo => <img src={logo} />,


   },{
   title: 'Name',
   dataIndex: 'name',
    className: styles.textleft
 }, {
   title: 'Domain',
   dataIndex: 'domain',
    className: styles.textleft
 }, {
   title: 'Website Url',
   dataIndex: 'website_url',
    className: styles.textleft
 },
 {
  title: 'Support Email Id',
  dataIndex: 'support_email_id',
   className: styles.textleft
},
{
 title: 'Is Retailer',
 dataIndex: 'is_retailer',
  className: styles.textleft,
  render: is_retailer => <p>{is_retailer === true ? "Yes" :"No"}</p>
}


]} dataSource={tableData}  />
         </Card>
       </div>
     );

}
}

export default Companies
