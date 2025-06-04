import React, { useState } from 'react';
import { Clock, Package, Home, BarChart2, Settings, ClipboardCheck, User, LogOut, AlertTriangle, ClockArrowUp, Radar } from 'lucide-react';

// Define primary colors to reference in style props when needed
const COLORS = {
    primaryRed: '#b22234',
    primaryBlue: '#0b3b60'
};

interface LayoutProps {
    children: React.ReactNode;
    currentPage: string;
    onNavigate: (page: string) => void;
    movementResetTrigger?: number; // Add this prop
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate, movementResetTrigger }) => {
    const handleMoveProductClick = () => {
        onNavigate('movement-tiles');
    };

    return (
        <div className="flex flex-col h-screen bg-gray-50">
            {/* Header - PCI Pharma Branding */}
            <header style={{ background: `linear-gradient(to right, ${COLORS.primaryRed}, ${COLORS.primaryBlue})` }} className="text-white p-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <div className="font-bold text-xl">pci</div>
                        <div className="flex items-center text-lg font-semibold text-white">
                            Cold Chain Tracking
                            <div className="w-2 h-2 rounded-full bg-green-500 ml-2"></div>
                        </div>
                    </div>

                    <div className="flex items-center bg-white/10 px-4 py-2 rounded-md">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">0</div>
                            <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">1</div>
                            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">2</div>
                        </div>
                    </div>

                    <div className="flex items-center">
                        <div className="flex items-center bg-white/10 px-4 py-1 rounded-full mr-2">
                            <User size={18} className="stroke-white mr-2" />
                            <span>ACALITO | WHS | Rockford</span>
                        </div>

                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer">
                            <LogOut size={16} className="stroke-white" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-3 pb-24">
                {children}
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 py-1 z-20">
                <div className="flex justify-around items-center">
                    <div
                        className={`flex flex-col items-center cursor-pointer ${currentPage === 'home' ? 'text-red-600' : 'text-gray-600'}`}
                        onClick={() => onNavigate('home')}
                        style={currentPage === 'home' ? { color: COLORS.primaryRed } : {}}
                    >
                        <Home size={20} />
                        <span className="text-xs">Dashboard</span>
                    </div>

                    <div
                        className={`flex flex-col items-center cursor-pointer ${currentPage === 'movement-tiles' || currentPage === 'movements' ? 'text-red-600' : 'text-gray-600'}`}
                        onClick={handleMoveProductClick}
                        style={(currentPage === 'movement-tiles' || currentPage === 'movements') ? { color: COLORS.primaryRed } : {}}
                    >
                        <Package size={20} />
                        <span className="text-xs">Move Product</span>
                    </div>

                    <div className="flex flex-col items-center text-gray-600 cursor-pointer">
                        <Radar size={20} />
                        <span className="text-xs">Active Products</span>
                    </div>

                    <div
                        className={`flex flex-col items-center cursor-pointer ${currentPage === 'tor-extension' ? 'text-red-600' : 'text-gray-600'}`}
                        onClick={() => onNavigate('tor-extension')} // Add this click handler
                        style={currentPage === 'tor-extension' ? { color: COLORS.primaryRed } : {}}
                    >
                        <ClockArrowUp size={20} />
                        <span className="text-xs">TOR Extension</span>
                    </div>

                    <div
                        className={`flex flex-col items-center cursor-pointer ${currentPage === 'reports' ? 'text-red-600' : 'text-gray-600'}`}
                        onClick={() => onNavigate('reports')}
                        style={currentPage === 'reports' ? { color: COLORS.primaryRed } : {}}
                    >
                        <BarChart2 size={20} />
                        <span className="text-xs">Reports</span>
                    </div>

                    <div className="flex flex-col items-center text-gray-600 cursor-pointer">
                        <Settings size={20} />
                        <span className="text-xs">Settings</span>
                    </div>
                </div>
            </nav>

            {/* Footer - Acsis Branding - positioned under nav bar */}
            <footer style={{ background: `linear-gradient(to right, ${COLORS.primaryRed}, ${COLORS.primaryBlue})` }} className="fixed bottom-0 w-full text-white text-xs p-1 text-center z-10">
                <p>TOR Cold Chain Tracker v1.0 | © 2025 Acsis, Inc. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;