import React, { useState } from 'react';
import './index.css';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Card, Input, Button, theme } from 'antd';

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

interface CreditCard {
    title: string;
    number: string;
    cvc: string;
    cardholderName: string;
}

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [getItem('Team 1', '6'), getItem('Team 2', '8')]),
    getItem('Files', '9', <FileOutlined />),
];

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [cardData, setCardData] = useState<CreditCard>({
        title: 'Card 1',
        number: '',
        cvc: '',
        cardholderName: '',
    });

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const handleCardNumberChange = (value: string) => {
        // Allow only numbers and limit to 12 characters
        const sanitizedValue = value.replace(/[^0-9]/g, '').slice(0, 12);
        setCardData((prevCardData) => ({ ...prevCardData, number: sanitizedValue }));
    };

    const handleCVCChange = (value: string) => {
        // Allow only numbers and limit to 12 characters
        const sanitizedValue = value.replace(/[^0-9]/g, '').slice(0, 12);
        setCardData((prevCardData) => ({ ...prevCardData, cvc: sanitizedValue }));
    };

    const handleCardholderNameChange = (value: string) => {
        // Allow only letters
        const sanitizedValue = value.replace(/[^a-zA-Z\s]/g, '');
        setCardData((prevCardData) => ({ ...prevCardData, cardholderName: sanitizedValue }));
    };

    const handleSubmit = () => {
        // Log the cardData to the console
        console.log('Submitted Card Data:', cardData);

        // Display an alert
        alert('Card data submitted! Check the console for details.');
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items as any} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '0 16px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Card title={cardData.title}>
                            <Input
                                placeholder="Card Number"
                                value={cardData.number}
                                onChange={(e) => handleCardNumberChange(e.target.value)}
                            />
                            <Input
                                placeholder="CVC"
                                value={cardData.cvc}
                                onChange={(e) => handleCVCChange(e.target.value)}
                            />
                            <Input
                                placeholder="Cardholder Name"
                                value={cardData.cardholderName}
                                onChange={(e) => handleCardholderNameChange(e.target.value)}
                            />
                        </Card>
                        {/* Add the submit button */}
                        <Button
                            type="primary"
                            onClick={handleSubmit}
                            style={{ position: 'absolute', bottom: 75, right: 625 }}
                        >
                            Submit
                        </Button>
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default App;
