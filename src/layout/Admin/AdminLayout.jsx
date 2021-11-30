import React from 'react';
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { UserOutlined, CalendarOutlined } from "@ant-design/icons";
import "./AdminLayout.scss";
import withLayout from "HOCs/withLayout";
import { useDispatch, useSelector } from 'react-redux';

const { Content, Sider } = Layout;
const { SubMenu } = Menu;



const AdminLayout = (props) => {
  const dispatch = useDispatch()
  const addUserModal = useSelector(state => state.modalReducer)    

  // logoutUser() {
  //   this.props.children.props.history.push("/");
  //   localStorage.setItem(USER_BOOKING_TICKET_LOGIN, null);
  // }
  // const userName = JSON.parse(
  //   localStorage.getItem(USER_BOOKING_TICKET_LOGIN)
  // ).taiKhoan;
  const openModal = (name) => {
    dispatch({ type: "CHANGE_STATUS_MODAL", payload: { name: name, status: true } })
  }
  return (
    <div>
      <nav
        className="navbar navbar-expand justify-content-between"
        style={{
          backgroundColor: "#001529",
          color: "rgba(255, 255, 255, 0.65)",
        }}
      >
        <div className="navbar-brand text-center">
          <Link className="navbar-brand" to="/">
            <img src="../logo192.png" alt="logo" />
          </Link>
        </div>
        <div className="navbar-collapse flex-grow-0 ">
          <span className="navbar-text">Chào, userName!</span>
          <ul className="navbar-nav ">
            <li className="nav-item dropdown">
              <div>
                <div
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-toggle="dropdown"
                ></div>
                <div className="dropdown-menu" style={{ left: -140 }}>
                  {/* <Link
                    // to={`/admin/users/edit-user/${userName}`}
                    className="dropdown-item"
                  >
                    Thông tin cá nhân
                  </Link> */}
                  <div
                    className="dropdown-item"
                    // onClick={() => this.logoutUser()}
                    style={{ cursor: "pointer" }}
                  >
                    Logout
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </nav>

      <Layout className="sidebar" breakpoint="lg">
        <Sider
          className="site-layout-background"
          breakpoint="lg"
          collapsedWidth="0"
          style={{
            // height: "100vh",
          }}
        >
          <Menu theme="dark" defaultOpenKeys={["sub1", "sub2"]} mode="inline">
            <SubMenu key="sub1" icon={<UserOutlined />} title="User">
              <Menu.Item key="1">
                <Link to="/admin/user">Quản lí người dùng</Link>
              </Menu.Item>
              {/* <Menu.Item key="2">
                <div onClick={() => openModal("addUserModal")}>Thêm người dùng</div>
              </Menu.Item> */}
            </SubMenu>
            <SubMenu key="sub2" icon={<CalendarOutlined />} title="Location">
              <Menu.Item key="3">
                <Link to="/admin/location">Location</Link>
              </Menu.Item>
              {/* <Menu.Item key="4">
                <Link to="/admin/movies/add-movie">Thêm Location</Link>
              </Menu.Item> */}
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content style={{ margin: "0 16px" }}>
            <div
              className="site-layout-background"
            >
              {props.children}
            </div>
          </Content>
        </Layout>
      </Layout>

    </div>
  );
}

export default withLayout(AdminLayout);
