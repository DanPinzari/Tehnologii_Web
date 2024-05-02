import React, { useState, useEffect } from 'react';
import './index.css';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    DeleteOutlined,
    EditOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu, Card, Input, Button, theme, Typography, message } from 'antd';
import { CredCard } from './AppLab4';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'; // Importul pentru rutare

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

interface MenuItem {
    key: string;
    label: string;
    icon?: React.ReactNode;
    children?: MenuItem[];
}

const Option1Page: React.FC = () => {
    const [cardData, setCardData] = useState<CredCard>({
        title: 'Card 1',
        number: '',
        cvc: '',
        cardholderName: '',
        expirationDate: ''
    });
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('loggedIn');
        if (isLoggedIn) {
            setLoggedIn(true);
        }
    }, []);

    const handleSubmit = () => {
        console.log('Submitted Card Data:', cardData);
        alert('Card data submitted! Check the console for details.');
        const submittedData = JSON.parse(localStorage.getItem('submittedData') || '[]');
        const updatedSubmittedData = [...submittedData, { ...cardData }];
        localStorage.setItem('submittedData', JSON.stringify(updatedSubmittedData));
        setCardData({
            title: '',
            number: '',
            cvc: '',
            cardholderName: '',
            expirationDate: ''
        });
    };

    return (
        <div>
            {loggedIn && (
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
        </div>
    );
};

const Option2Page: React.FC = () => {
    const [submittedData, setSubmittedData] = useState<CredCard[]>([]);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [editedCard, setEditedCard] = useState<CredCard>({
        title: '',
        number: '',
        cvc: '',
        cardholderName: '',
        expirationDate: ''
    });
    const [deleteLoading, setDeleteLoading] = useState<boolean[]>(Array(submittedData.length).fill(false));

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('loggedIn');
        if (isLoggedIn) {
            const storedSubmittedData = localStorage.getItem('submittedData');
            if (storedSubmittedData) {
                setSubmittedData(JSON.parse(storedSubmittedData));
            }
        }
    }, []);

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
        }, 2000);
    };

    const handleEditCard = (index: number) => {
        setEditingIndex(index);
        const cardToEdit = submittedData[index];
        setEditedCard(cardToEdit);
    };

    const handleSaveEdit = () => {
        if (editingIndex !== null) {
            const updatedSubmittedData = [...submittedData];
            updatedSubmittedData[editingIndex] = { ...editedCard };
            setSubmittedData(updatedSubmittedData);
            localStorage.setItem('submittedData', JSON.stringify(updatedSubmittedData));
            setEditingIndex(null);
            setEditedCard({
                title: '',
                number: '',
                cvc: '',
                cardholderName: '',
                expirationDate: ''
            });
        }
    };

    return (
        <div>
            {submittedData.map((submittedCard, index) => (
                <Card key={index} title={`Submitted Card ${index + 1}`}>
                    {editingIndex === index ? (
                        <div>
                            <Input
                                placeholder="Card Number"
                                value={editedCard.number}
                                onChange={(e) => setEditedCard({...editedCard, number: e.target.value })}
                            />
                            <Input
                                placeholder="CVC"
                                value={editedCard.cvc}
                                onChange={(e) => setEditedCard({...editedCard, cvc: e.target.value })}
                            />
                            <Input
                                placeholder="Cardholder Name"
                                value={editedCard.cardholderName}
                                onChange={(e) => setEditedCard({...editedCard, cardholderName: e.target.value })}
                            />
                            <Input
                                placeholder="Expiration Date"
                                value={editedCard.expirationDate}
                                onChange={(e) => setEditedCard({...editedCard, expirationDate: e.target.value })}
                            />
                            <Button
                                type="primary"
                                onClick={handleSaveEdit}
                                style={{ marginTop: 16 }}
                            >
                                Save
                            </Button>
                        </div>
                    ) : (
                        <div>
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
                        </div>
                    )}
                </Card>
            ))}
        </div>
    );
};

const LoginPage: React.FC = () => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = () => {
        if (username === 'Bill' && password === '1111') {
            setLoggedIn(true);
            localStorage.setItem('loggedIn', 'true');
        } else {
            message.error('Invalid username or password');
        }
    };

    const handleLogout = () => {
        setLoggedIn(false);
        setUsername('');
        setPassword('');
        localStorage.removeItem('loggedIn');
    };

    useEffect(() => {
        const isLoggedIn = localStorage.getItem('loggedIn');
        if (isLoggedIn) {
            setLoggedIn(true);
        }
    }, []);

    return (
        <div>
            {loggedIn ? (
                <div>
                    <Button type="text" icon={<LogoutOutlined />} onClick={handleLogout}>Log Out</Button>
                </div>
            ) : (
                <div>
                    <Input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <Input.Password placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <Button type="primary" onClick={handleLogin} style={{ marginTop: '16px' }}>Login</Button>
                </div>
            )}
        </div>
    );
};

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);

    const { token: { colorBgContainer } } = theme.useToken();

    const items: MenuItem[] = [
        { key: '1', label: 'Option 1', icon: <PieChartOutlined /> },
        { key: '2', label: 'Option 2', icon: <DesktopOutlined /> },
        { key: '9', label: 'Login', icon: <FileOutlined /> }
    ];

    return (
        <BrowserRouter>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={['1']}
                        mode="inline"
                    >
                        <Menu.Item key="1">
                            <Link to="/Option1">Option 1</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to="/Option2">Option 2</Link>
                        </Menu.Item>
                        <Menu.Item key="9">
                            <Link to="/Login">Login</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ padding: 0, background: colorBgContainer }} />

                    <Content style={{ margin: '0 16px' }}>
                        <Routes>
                                <Route path="/Option1" element={<Option1Page />} />
                                <Route path="/Option2" element={<Option2Page />} />
                                <Route path="/Login" element={<LoginPage />} />
                        </Routes>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Dan {new Date().getFullYear()} CR-221
                    </Footer>
                </Layout>
            </Layout>
        </BrowserRouter>
    );
};

export default App;
