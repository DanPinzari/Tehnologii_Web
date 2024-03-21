import React, { useState, useEffect } from 'react';
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
import { CredCard, ExtendedCreditCard } from './AppLab4';

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

// Definim interfața pentru un element de meniu
interface MenuItem {
    key: string;
    label: string;
    icon?: React.ReactNode;
    children?: MenuItem[];
}

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [cardData, setCardData] = useState<ExtendedCreditCard>({
        title: 'Card 1',
        number: 'dan',
        cvc: '',
        cardholderName: '',
        expirationDate: '',
        cardType: '',
        issuingBank: ''
    });
    const [submittedData, setSubmittedData] = useState<ExtendedCreditCard | null>(null); // Inițial, nu avem datele introduse
    const [selectedMenuItem, setSelectedMenuItem] = useState<string>('1');

    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

    // Folosim useEffect pentru a seta submittedData la încărcarea componentei
    useEffect(() => {
        setSubmittedData({
            title: cardData.title,
            number: 'sda',
            cvc: '',
            cardholderName: 'dan',
            expirationDate: '',
            cardType: '',
            issuingBank: ''
        });
    }, []);


    // Funcție pentru gestionarea evenimentului de submit
    const handleSubmit = () => {
        console.log('Submitted Card Data:', cardData);
        alert('Card data submitted! Check the console for details.');
        setSubmittedData({ ...cardData });
    };

    // Funcție pentru gestionarea selectării unui element de meniu
    const handleMenuSelect = ({ key }: { key: React.Key }) => {
        setSelectedMenuItem(key.toString());
    };

    // Definim elementele de meniu
    const items: MenuItem[] = [
        { key: '1', label: 'Option 1', icon: <PieChartOutlined /> },
        { key: '2', label: 'Option 2', icon: <DesktopOutlined /> },
        {
            key: 'sub1',
            label: 'User',
            icon: <UserOutlined />,
            children: [
                { key: '3', label: 'Tom' },
                { key: '4', label: 'Bill' },
                { key: '5', label: 'Alex' }
            ]
        },
        {
            key: 'sub2',
            label: 'Team',
            icon: <TeamOutlined />,
            children: [
                { key: '6', label: 'Team 1' },
                { key: '8', label: 'Team 2' }
            ]
        },
        { key: '9', label: 'Files', icon: <FileOutlined /> }
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={items}
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
                                    onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                                />
                                <Input
                                    placeholder="CVC"
                                    value={cardData.cvc}
                                    onChange={(e) => setCardData({ ...cardData, cvc: e.target.value })}
                                />
                                <Input
                                    placeholder="Cardholder Name"
                                    value={cardData.cardholderName}
                                    onChange={(e) => setCardData({ ...cardData, cardholderName: e.target.value })}
                                />
                                <Input
                                    placeholder="Expiration Date"
                                    value={cardData.expirationDate}
                                    onChange={(e) => setCardData({ ...cardData, expirationDate: e.target.value })}
                                />
                                <Input
                                    placeholder="Card Type"
                                    value={cardData.cardType}
                                    onChange={(e) => setCardData({ ...cardData, cardType: e.target.value })}
                                />
                                <Input
                                    placeholder="Issuing Bank"
                                    value={cardData.issuingBank}
                                    onChange={(e) => setCardData({ ...cardData, issuingBank: e.target.value })}
                                />
                                {/* Adăugăm butonul de submit */}
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

                        {/* Afișăm datele introduse doar pe Option 1 */}
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
                                <div>
                                    <Text>Expiration Date: {submittedData.expirationDate}</Text>
                                </div>
                                <div>
                                    <Text>Card Type: {submittedData.cardType}</Text>
                                </div>
                                <div>
                                    <Text>Issuing Bank: {submittedData.issuingBank}</Text>
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
