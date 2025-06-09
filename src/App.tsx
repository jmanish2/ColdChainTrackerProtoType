import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import MovementTiles from './components/MovementTiles';
import Movements from './components/Movements';
import TORExtension from './components/TORExtension';
import ActiveProducts from './components/ActiveProducts';
import './App.css';

function App() {
    const [currentPage, setCurrentPage] = useState('home');
    const [movementResetTrigger, setMovementResetTrigger] = useState(0);

    const handleNavigate = (page: string) => {
        // If navigating to movement-tiles, increment the reset trigger
        if (page === 'movement-tiles') {
            setMovementResetTrigger(prev => prev + 1);
        }
        setCurrentPage(page);
    };

    const renderCurrentPage = () => {
        switch (currentPage) {
            case 'home':
                return <Home />;
            case 'movement-tiles':
                return <MovementTiles resetTrigger={movementResetTrigger} />;
            case 'movements':
                return <Movements />;
            case 'reports':
                return (
                    <div className="flex flex-col items-center justify-center h-64">
                        <h1 className="text-xl font-bold text-gray-800 mb-2">Reports</h1>
                        <p className="text-gray-600">Not implemented yet</p>
                    </div>
                );
            case 'settings':
                return (
                    <div className="flex flex-col items-center justify-center h-64">
                        <h1 className="text-xl font-bold text-gray-800 mb-2">Settings</h1>
                        <p className="text-gray-600">Not implemented yet</p>
                    </div>
                );
            case 'tor-extension':
                return <TORExtension onBack={() => setCurrentPage('home')} />;
            case 'active-products':
                return <ActiveProducts onBack={() => setCurrentPage('home')} />;
            default:
                return <Home />;
        }
    };

    return (
        <Layout currentPage={currentPage} onNavigate={handleNavigate} movementResetTrigger={movementResetTrigger}>
            {renderCurrentPage()}
        </Layout>
    );
}

export default App;