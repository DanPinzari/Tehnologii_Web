// src/App.tsx
import React from 'react';
import './App.css'; // Import the CSS file for styling

const App: React.FC = () => {
    const firstName = 'Pinzari';
    const lastName = 'Dan';
    const groupData = 'Cr-221';

    return (
        <div className="app-container">
            <div className="content">
                <h1>Hello, {firstName} {lastName}</h1>
                <p>Data about the group: {groupData}</p>
            </div>
        </div>
    );
};

export default App;
