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
import { Breadcrumb, Layout, Menu, Card, Input, Button, theme, Typography } from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

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
    const [submittedData, setSubmittedData] = useState<CreditCard | null>(null);
    const [selectedMenuItem, setSelectedMenuItem] = useState<string>('1');

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

        // Set submitted data for rendering only on Option 1
        if (selectedMenuItem === '1') {
            setSubmittedData({ ...cardData });
        } else {
            setSubmittedData(null);
        }
    };

    const handleMenuSelect = ({ key }: { key: React.Key }) => {
        setSelectedMenuItem(key.toString());
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={items as any}
                    onSelect={handleMenuSelect}
                />
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
                        {selectedMenuItem === '1' ? (
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
                                {/* Add the submit button */}
                                <Button
                                    type="primary"
                                    onClick={handleSubmit}
                                    style={{ marginTop: 16 }}
                                >
                                    Submit
                                </Button>
                            </Card>
                        ) : (
                            <Text strong>{`Pinzari Dan. CR-221`}</Text>
                        )}

                        {/* Display submitted data only on Option 1 */}
                        {selectedMenuItem === '1' && submittedData && (
                            <div style={{ marginTop: 20 }}>
                                <Text strong>Submitted Data:</Text>
                                <div>
                                    <Text>Card Number: {submittedData.number}</Text>
                                </div>
                                <div>
                                    <Text>CVC: {submittedData.cvc}</Text>
                                </div>
                                <div>
                                    <Text>Cardholder Name: {submittedData.cardholderName}</Text>
                                </div>
                            </div>
                        )}
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
