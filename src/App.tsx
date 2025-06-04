import React, { useState } from 'react';
import Layout from './components/Layout';
import Home from './components/Home';
import MovementTiles from './components/MovementTiles';
import Movements from './components/Movements';
import TORExtension from './components/TORExtension';
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
                return <Movements />;
            case 'tor-extension':
                return <TORExtension onBack={() => setCurrentPage('home')} />;
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