import React from 'react'
import {
  Layout,
  Menu,
  Breadcrumb,
  Icon,
  Row,
  Col,
  Card,Button,
  Progress
} from 'antd';
import colors from '../../utils/theme'
const {Header, Content, Footer, Sider} = Layout;
const SubMenu = Menu.SubMenu;
import './rightSideBar.less';

class RightSider extends React.Component {

  onClick(event) {
    localStorage.clear();
    location.reload();
 }
  constructor(props) {
    super(props);

this.changeThemeHeader = this.changeThemeHeader.bind(this);
  }

  state = {
    collapsed: true,
    mode: 'vertical',background: '#fff'

  };
  onCollapse = (collapsed) => {

    this.setState({
      collapsed,
      mode: collapsed
        ? 'inline'
        : 'vertical'
    });

  }
changeThemeHeader(){
  alert("changeThemeHeader")
}
changeTheme(){
  alert("changeTheme")
}
  render() {
let { changeThemeHeader, changeTheme } = this.props;
    return (

      <Sider
      breakpoint="xs"
        className="rightSideBar"
        collapsible={true}
        collapsedWidth={0}
        reverseArrow={true}
        trigger={false}
        collapsed={this.props.siderFoldRight}
        onCollapse={this.onCollapse}>

        <Row>

          <Col>
          <Card bordered={false} title="Navbar Colors" className="rightSidebarCard">
          <ul className="menuColorList">
          <li>
              <a
                style={{
                background: colors.color.white
              }}
                onClick={() => this.changeThemeHeader.bind(this, "header_white")}></a>

            </li>
             <li>
              <a
                style={{
                background: colors.color.sugar_plum
              }}
                onClick={changeThemeHeader.bind(this, "header_sugar_plum")}></a>

            </li>
            <li>
              <a
                style={{
                background: colors.color.midnight_green
              }}
                onClick={this
              
                .changeThemeHeader
                .bind(this, "header_midnight_green")}></a>

            </li>
            <li>
              <a
                style={{
                background: colors.color.arsenic
              }}
                onClick={this
                .props
                .changeThemeHeader
                .bind(this, "header_arsenic")}></a>
            </li>
            <li>
            <a
              style={{
              background: colors.color.brillant_azure
            }}
              onClick={this
              .props
              .changeThemeHeader
              .bind(this, "header_brillant_azure")}></a>
          </li>
          <li>
          <a
            style={{
            background: colors.color.portland_orange
          }}
            onClick={this
            .props
            .changeThemeHeader
            .bind(this, "header_portland_orange")}></a>
        </li>
        <li>
        <a
          style={{
          background: colors.color.jungle_green
        }}
          onClick={this
          .props
          .changeThemeHeader
          .bind(this, "header_jungle_green")}></a>
      </li>
      <li>
      <a
        style={{
        background: colors.color.desire
      }}
        onClick={this
        .props
        .changeThemeHeader
        .bind(this, "header_desire")}></a>
    </li>
    <li>
    <a
      style={{
      background: colors.color.stil_de_gran_yellow
    }}
      onClick={this
      .props
      .changeThemeHeader
      .bind(this, "header_stil_de_gran_yellow")}></a>
  </li>
  <li>
  <a
    style={{
    background: colors.color.purple
  }}
    onClick={this
    .props
    .changeThemeHeader
    .bind(this, "header_purple")}></a>
</li>
          </ul>
        </Card>
            <Card bordered={false} title="Sidebar Colors" className="rightSidebarCard">
              <ul className="menuColorList">
              <li>
                  <a
                    style={{
                    background: colors.color.white
                  }}
                    onClick={this
                    .props
                    .changeTheme
                    .bind(this, "white")}></a>
                </li>
                <li>
                  <a
                    style={{
                    background: colors.color.sugar_plum
                  }}
                    onClick={this.props.changeTheme.bind(this, "sugar_plum")}></a>
                </li>
                <li>
                  <a
                    style={{
                    background: colors.color.midnight_green
                  }}
                    onClick={this
                    .props
                    .changeTheme
                    .bind(this, "midnight_green")}></a>
                </li>
                <li>
                  <a
                    style={{
                    background: colors.color.arsenic
                  }}
                    onClick={this
                    .props
                    .changeTheme
                    .bind(this, "arsenic")}></a>
                </li>
                <li>
                  <a
                    style={{
                    background: colors.color.brillant_azure
                  }}
                    onClick={this
                    .props
                    .changeTheme
                    .bind(this, "brillant_azure")}></a>
                </li>
                <li>
                  <a
                    style={{
                    background: colors.color.portland_orange
                  }}
                    onClick={this
                    .props
                    .changeTheme
                    .bind(this, "portland_orange")}></a>
                </li>
                <li>
                  <a
                    style={{
                    background: colors.color.jungle_green
                  }}
                    onClick={this
                    .props
                    .changeTheme
                    .bind(this, "jungle_green")}></a>
                </li>
                <li>
                  <a
                    style={{
                    background: colors.color.desire
                  }}
                    onClick={this
                    .props
                    .changeTheme
                    .bind(this, "desire")}></a>
                </li>
                <li>
                <a
                  style={{
                  background: colors.color.stil_de_gran_yellow
                }}
                  onClick={this
                  .props
                  .changeTheme
                  .bind(this, "stil_de_gran_yellow")}></a>
              </li>
              <li>
              <a
                style={{
                background: colors.color.purple
              }}
                onClick={this
                .props
                .changeTheme
                .bind(this, "purple")}></a>
            </li>
              </ul>

            </Card>

            <Card bordered={false} title="Settings" className="rightSidebarCard">
            <Button onClick={this.onClick} type='primary'> Reset Themes</Button>
          </Card>
          </Col>
        </Row>
      </Sider>
    );
  }


}

export default RightSider
