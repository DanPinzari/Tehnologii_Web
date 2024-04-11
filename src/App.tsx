import React, { useState, useEffect } from 'react';
import './index.css';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Card, Input, Button, theme, Typography } from 'antd';
import { CredCard } from './AppLab4';

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

interface MenuItem {
    key: string;
    label: string;
    icon?: React.ReactNode;
    children?: MenuItem[];
}

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [cardData, setCardData] = useState<CredCard>({
        title: 'Card 1',
        number: '',
        cvc: '',
        cardholderName: '',
        expirationDate: ''
    });
    const [submittedData, setSubmittedData] = useState<CredCard[]>([]);
    const [selectedMenuItem, setSelectedMenuItem] = useState<string>('1');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [deleteLoading, setDeleteLoading] = useState<boolean[]>(Array(submittedData.length).fill(false));

    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

    const handleSubmit = () => {
        console.log('Submitted Card Data:', cardData);
        alert('Card data submitted! Check the console for details.');
        const updatedSubmittedData = [...submittedData, { ...cardData }];
        setSubmittedData(updatedSubmittedData);
        localStorage.setItem('submittedData', JSON.stringify(updatedSubmittedData));
        setCardData({
            title: '',
            number: '',
            cvc: '',
            cardholderName: '',
            expirationDate: ''
        });
    };

    const handleDeleteCard = (index: number) => {
        const updatedDeleteLoading = [...deleteLoading];
        updatedDeleteLoading[index] = true;
        setDeleteLoading(updatedDeleteLoading);

        setTimeout(() => {
            const updatedSubmittedData = submittedData.filter((_, i) => i !== index);
            setSubmittedData(updatedSubmittedData);
            localStorage.setItem('submittedData', JSON.stringify(updatedSubmittedData));
            const updatedDeleteLoading = [...deleteLoading];
            updatedDeleteLoading[index] = false;
            setDeleteLoading(updatedDeleteLoading);
        }, 2000); // Timeout de 2 secunde
    };

    const handleEditCard = (index: number) => {
        setEditingIndex(index);
        const cardToEdit = submittedData[index];
        setCardData(cardToEdit);
    };

    const handleSaveEdit = () => {
        if (editingIndex !== null) {
            const updatedSubmittedData = [...submittedData];
            updatedSubmittedData[editingIndex] = { ...cardData };
            setSubmittedData(updatedSubmittedData);
            localStorage.setItem('submittedData', JSON.stringify(updatedSubmittedData));
            setEditingIndex(null);
            setCardData({
                title: '',
                number: '',
                cvc: '',
                cardholderName: '',
                expirationDate: ''
            });
        }
    };

    const handleMenuSelect = ({ key }: { key: React.Key }) => {
        setSelectedMenuItem(key.toString());
    };

    useEffect(() => {
        const storedSubmittedData = localStorage.getItem('submittedData');

        if (storedSubmittedData) {
            setSubmittedData(JSON.parse(storedSubmittedData));
        }
    }, []);

    const items: MenuItem[] = [
        { key: '1', label: 'Option 1', icon: <PieChartOutlined /> },
        { key: '2', label: 'Option 2', icon: <DesktopOutlined /> },
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
                        {selectedMenuItem === '1' && (
                            <Card title={cardData.title}>
                                <Input
                                    placeholder="Card Number"
                                    value={cardData.number}
                                    onChange={(e) => setCardData({...cardData, number: e.target.value })}
                                />
                                <Input
                                    placeholder="CVC"
                                    value={cardData.cvc}
                                    onChange={(e) => setCardData({...cardData, cvc: e.target.value })}
                                />
                                <Input
                                    placeholder="Cardholder Name"
                                    value={cardData.cardholderName}
                                    onChange={(e) => setCardData({...cardData, cardholderName: e.target.value })}
                                />
                                <Input
                                    placeholder="Expiration Date"
                                    value={cardData.expirationDate}
                                    onChange={(e) => setCardData({...cardData, expirationDate: e.target.value })}
                                />
                                <Button
                                    type="primary"
                                    onClick={handleSubmit}
                                    style={{ marginTop: 16 }}
                                >
                                    Submit
                                </Button>
                            </Card>
                        )}
                        {selectedMenuItem === '2' && (
                            <div>
                                {submittedData.map((submittedCard, index) => (
                                    <Card key={index} title={`Submitted Card ${index + 1}`}>
                                        <div>
                                            <Text>Card Number: {submittedCard.number}</Text>
                                        </div>
                                        <div>
                                            <Text>CVC: {submittedCard.cvc}</Text>
                                        </div>
                                        <div>
                                            <Text>Cardholder Name: {submittedCard.cardholderName}</Text>
                                        </div>
                                        <div>
                                            <Text>Expiration Date: {submittedCard.expirationDate}</Text>
                                        </div>
                                        <Button
                                            type="default"
                                            icon={<EditOutlined />}
                                            onClick={() => handleEditCard(index)}
                                            style={{ marginTop: 16, marginRight: 8 }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            danger
                                            icon={<DeleteOutlined />}
                                            onClick={() => handleDeleteCard(index)}
                                            loading={deleteLoading[index]}
                                            style={{ marginTop: 16 }}
                                        >
                                            Delete
                                        </Button>
                                    </Card>
                                ))}
                                {editingIndex !== null && (
                                    <Card title="Edit Card">
                                        <Input
                                            placeholder="Card Number"
                                            value={cardData.number}
                                            onChange={(e) => setCardData({...cardData, number: e.target.value })}
                                        />
                                        <Input
                                            placeholder="CVC"
                                            value={cardData.cvc}
                                            onChange={(e) => setCardData({...cardData, cvc: e.target.value })}
                                        />
                                        <Input
                                            placeholder="Cardholder Name"
                                            value={cardData.cardholderName}
                                            onChange={(e) => setCardData({...cardData, cardholderName: e.target.value })}
                                        />
                                        <Input
                                            placeholder="Expiration Date"
                                            value={cardData.expirationDate}
                                            onChange={(e) => setCardData({...cardData, expirationDate: e.target.value })}
                                        />
                                        <Button
                                            type="primary"
                                            onClick={handleSaveEdit}
                                            style={{ marginTop: 16 }}
                                        >
                                            Save
                                        </Button>
                                    </Card>
                                )}
                            </div>
                        )}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Dan {new Date().getFullYear()} CR-221
                </Footer>
            </Layout>
        </Layout>
    );
};

export default App;
