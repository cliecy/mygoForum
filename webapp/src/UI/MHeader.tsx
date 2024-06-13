import {useState, useEffect} from "react";
import {HomeOutlined, LinkOutlined, LoginOutlined} from "@ant-design/icons";
import {Breadcrumb, Layout, Menu, theme, Row, Col, Button} from "antd";
import {NavLink, Outlet, useLocation} from "react-router-dom";
import storageUtils from "../Lib/storageUtils";
import {Logout} from "../Lib/lib";
import {MenuDataItem} from "@ant-design/pro-components";
const {Header, Content} = Layout;


const Whetherlogin = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    if (storageUtils.getUser())
        return <Button onClick={Logout}>LOGOUT</Button>
    else {
        return <></>
    }
}

const MHeader = () => {
    let menuItems:MenuDataItem;
    if (storageUtils.getUser()) {
        menuItems = [
            {
                label: "Home",
                key: "/",
                icon: <HomeOutlined/>,
                disabled: true,
            },
        ];
    } else {
        menuItems = [{
            label: "Home",
            key: "/",
            icon: <HomeOutlined/>,
        }, {
            label: "Register",
            key: "/Register",
            icon: <LinkOutlined/>,
        },
            {
                label: "Login",
                key: "/Login",
                icon: <LoginOutlined/>,
            },]
    }

    const {
        token: {borderRadiusLG, colorBgElevated},
    } = theme.useToken();
    const [currentMenu, setCurrentMenu] = useState({
        label: undefined
    });
    // 定义selectedKeys，来控制菜单选中状态和切换页面
    const [selectedKeys, setSelectedKeys] = useState([""]);
    // useLocation react-router自带hook，能获取到当前路由信息
    const location = useLocation();
    // 每次切换路由，获取当前最新的pathname,并赋给menu组件
    useEffect(() => {
        // location.pathname对应路由数据中的path属性
        setSelectedKeys([location.pathname]);
        // store current menu
        setCurrentMenu(menuItems.find((item: { key: string; }) => item.key === location.pathname));
    }, [location]);
    return (
        <>
            <Header style={{alignItems: "center"}}>
                <Row>
                    <Col>
                        <Whetherlogin></Whetherlogin>
                    </Col>
                    <Col flex="auto">
                        <Menu
                            theme="dark"
                            mode="horizontal"
                            selectedKeys={selectedKeys}
                            items={menuItems.map((item:MenuDataItem) => {
                              if(item.key !=null)
                                return {
                                    key: item.key,
                                    label: <NavLink to={item.key}>{item.label}</NavLink>,
                                    disabled: item.disabled,
                                    icon: item.icon,
                                };
                            })}
                        />
                    </Col>
                </Row>
            </Header>
            <Content style={{padding: "0 48px", background: colorBgElevated}}>
                {location.pathname !== "/" && location.pathname !== "/Home" && (
                    <Breadcrumb
                        items={[
                            {
                                href: "/",
                                title: <HomeOutlined/>,
                            },
                            {
                                title: currentMenu?.label,
                            },
                        ]}
                    />
                )}

                <div
                    style={{
                        background: colorBgElevated,
                        minHeight: 280,
                        padding: 24,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet/>
                </div>
            </Content>
        </>
    );
};

export default MHeader;
