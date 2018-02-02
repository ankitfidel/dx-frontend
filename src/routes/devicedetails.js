import React from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar,Row, Col, Button,Card, Table, Modal, Switch, Radio, Form, Tabs } from 'antd'
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import reqwest from 'reqwest';
import cookie from 'react-cookies'
import { browserHistory, hashHistory } from 'dva/router';

const triggersdata = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}];
const triggerscolumns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];
class Devicedetails extends React.Component {

  constructor(props) {
      super(props);

   }
   state = {
       bordered: true,
       pagination: true,
       size: 'default',
       expandedRowRender:true,
       title:true,
       showHeader:true,
       footer:true,
       rowSelection: true,
       scroll: true,
       selectedRowKeys: [],
       hostss:[],
       loading: false,
     }

     onSelectChange = (selectedRowKeys) => {
       console.log('selectedRowKeys changed: ', selectedRowKeys);
       this.setState({ selectedRowKeys });
     }

     handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
          pagination: pager,
          key:i,
        });
        this.fetch({
          results: pagination.pageSize,
          page: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        });
      }
componentWillMount(){




}
     componentDidMount() {
    //
    var device_id = cookie.load("device_id");
    alert(device_id)

  

     }

render(){
  //
  const styles = {
      textAlign: {
          textAlign: 'right'
      },

  }
     return (
       <div>
       <Row  gutter={24} justify="space-around" align="middle">
       <Col lg={6} md={6}>
       <Card style={{ padding: '0' }}>
         <Col span={12}>Status</Col>
          <Col style={styles.textAlign} span={12}><span>Monitored</span>
        </Col>
       </Card>
       </Col>
       <Col lg={6} md={6}>
       <Card style={{ padding: '0' }}>
         <Col span={12}>Status</Col>
          <Col style={styles.textAlign} span={12}><span>Monitored</span>
        </Col>
       </Card>
       </Col>
       <Col lg={6} md={6}>
       <Card style={{ padding: '0' }}>
         <Col span={12}>Status</Col>
          <Col style={styles.textAlign} span={12}><span>Monitored</span>
        </Col>
       </Card>
       </Col>
       <Col lg={6} md={6}>
       <Card style={{ padding: '0' }}>
         <Col span={12}>Status</Col>
          <Col style={styles.textAlign} span={12}><span>Monitored</span>
        </Col>
       </Card>
       </Col>
       </Row>
       <Row><Card bodyStyle={{ padding: 0 }}>
 <Table columns={triggerscolumns} dataSource={triggersdata} size="middle" /></Card>
       </Row>
       <Row>
       <Card>
<Tabs defaultActiveKey="1+1" style={{ height: "100%" }} >
{this.state.hostss}
</Tabs>
</Card>
         </Row>
       </div>
     );

}
}



export default Devicedetails;
