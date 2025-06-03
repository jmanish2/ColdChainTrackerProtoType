import React from 'react';
import { Camera, ChevronDown, Clock, Package, FileText, Home, RotateCw, BarChart2, Settings, AlertTriangle, Info, HelpCircle, Printer, Plus, ClipboardCheck, User, LogOut } from 'lucide-react';

// Define primary colors to reference in style props when needed
const COLORS = {
    primaryRed: '#b22234',
    primaryBlue: '#0b3b60'
};

const Movements = () => {
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
                {/* Title */}
                <div className="mb-3">
                    <h1 className="text-xl font-bold text-gray-800">Movements - Cold Chain Product</h1>
                    <p className="text-sm text-gray-600">Move Products between Refrigerated and non-Refrigerated locations</p>
                </div>

                {/* Warning Banner - Following exact guidelines structure */}
                <div className="bg-yellow-50 border-2 border-yellow-500 rounded p-3 mb-3 flex items-center">
                    <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white mr-3">
                        <AlertTriangle size={18} />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-yellow-800">WARNING: Approaching Exposure Limit</h3>
                        <p className="text-yellow-800 italic font-semibold animate-pulse">Case #C002 has 30 minutes remaining before exposure time limit.</p>
                    </div>
                    <button className="px-3 py-1 bg-yellow-800 text-white rounded-full text-sm">View Details</button>
                </div>

                {/* Recent Work Orders Dropdown - Compact */}
                <div className="mb-3">
                    <div className="flex items-center">
                        <label className="text-sm text-gray-700 w-48">Recent Work Orders:</label>
                        <select className="flex-1 text-sm rounded border border-gray-300 p-2 mr-2">
                            <option>Select a recent work order</option>
                            <option>WO #11520 - Production 3 (Batch A)</option>
                            <option>WO #11521 - Production 4 (Batch B)</option>
                        </select>
                        <button className="text-xs text-blue-600">
                            <Plus size={16} />
                        </button>
                    </div>
                </div>

                {/* Work Order Entry Section */}
                <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                        <h2 className="text-sm font-bold text-gray-800">1. Enter Work Order Information</h2>
                        <button className="bg-orange-500 text-white rounded-full py-2 px-4 text-sm font-semibold">
                            Clear
                        </button>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded p-3">
                        {/* Work Order Number and Scan button on same row */}
                        <div className="grid grid-cols-3 gap-2 mb-2">
                            <div className="col-span-2">
                                <label className="block text-xs text-gray-700 mb-1">Work Order Number*</label>
                                <div className="relative">
                                    <input type="text" className="w-full text-sm rounded border border-green-500 p-2 pr-6" defaultValue="11520" />
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                        <div className="h-4 w-4 rounded-full bg-green-100 flex items-center justify-center">
                                            <span className="text-green-600 text-xs">✓</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col justify-end">
                                <button style={{ backgroundColor: COLORS.primaryRed }} className="text-white rounded-full py-2 px-3 flex items-center justify-center text-sm h-10">
                                    <Camera size={12} className="mr-1" />
                                    Scan Work Order
                                </button>
                            </div>
                        </div>

                        {/* Production Line and Lot Number on same row */}
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="block text-xs text-gray-700 mb-1">Production Line*</label>
                                <select className="w-full text-sm rounded border border-gray-300 p-2">
                                    <option>Production 3</option>
                                    <option>Production 1</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs text-gray-700 mb-1">Lot Number*</label>
                                <input type="text" className="w-full text-sm rounded border border-gray-300 p-2" defaultValue="PZFAE23" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Product Information Form */}
                <div className="mb-3">
                    <div className="flex justify-between items-center mb-1">
                        <h2 className="text-sm font-bold text-gray-800">2. Enter Product Details</h2>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded p-3">
                        {/* Product ID and Scan button on same row */}
                        <div className="grid grid-cols-3 gap-2 mb-2">
                            <div className="col-span-2">
                                <label className="block text-xs text-gray-700 mb-1">Product ID*</label>
                                <input type="text" className="w-full text-sm rounded border border-gray-300 p-2" defaultValue="P001" />
                            </div>

                            <div className="flex flex-col justify-end">
                                <button style={{ backgroundColor: COLORS.primaryRed }} className="text-white rounded-full py-2 px-3 flex items-center justify-center text-sm h-10">
                                    <Camera size={12} className="mr-1" />
                                    Scan Product
                                </button>
                            </div>
                        </div>

                        {/* Product Description */}
                        <div className="mb-2">
                            <label className="block text-xs text-gray-700 mb-1">Product Description</label>
                            <input type="text" className="w-full text-sm rounded border border-gray-200 bg-gray-100 p-2" readOnly />
                        </div>

                        {/* Type and Quantity on same row */}
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <div>
                                <label className="block text-xs text-gray-700 mb-1">Type*</label>
                                <select className="w-full text-sm rounded border border-gray-300 p-2">
                                    <option>Pallet</option>
                                    <option>Case</option>
                                    <option>Tray</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs text-gray-700 mb-1">Quantity*</label>
                                <input type="number" className="w-full text-sm rounded border border-gray-300 p-2" defaultValue="4" />
                            </div>
                        </div>

                        {/* Time Information */}
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <div>
                                <div className="flex items-center mb-1">
                                    <label className="text-xs text-gray-700">Exposure Time Allowed*</label>
                                    <HelpCircle size={12} className="text-gray-500 ml-1" />
                                </div>
                                <div className="flex">
                                    <input type="text" className="flex-1 text-sm rounded-l border border-green-200 bg-green-50 p-2" defaultValue="14:00:00 (HH:MM:SS)" />
                                    <button style={{ backgroundColor: COLORS.primaryBlue }} className="text-white text-sm py-2 px-3 rounded-r flex items-center">
                                        <Clock size={12} className="mr-1" />
                                        Calculate
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs text-gray-700 mb-1">Return Deadline</label>
                                <div className="bg-yellow-50 border border-yellow-200 rounded p-2 text-xs text-yellow-800">
                                    Apr 29, 2025 - 23:30 (Calculated)
                                </div>
                            </div>
                        </div>

                        {/* Destination Location */}
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <div>
                                <label className="block text-xs text-gray-700 mb-1">Destination Location Type*</label>
                                <select className="w-full text-sm rounded border border-gray-300 p-2">
                                    <option>Production Area</option>
                                    <option>Packaging Line</option>
                                    <option>Quality Control</option>
                                    <option>Staging Area</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs text-gray-700 mb-1">Destination Location*</label>
                                <select className="w-full text-sm rounded border border-gray-300 p-2">
                                    <option>Production Line 3</option>
                                    <option>Production Line 1</option>
                                    <option>Packaging Station 2</option>
                                    <option>QC Lab 1</option>
                                </select>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center justify-end gap-2 mt-4">
                            <select className="text-xs border rounded p-1">
                                <option>Printer1</option>
                                <option>Printer2</option>
                                <option>Printer3</option>
                            </select>
                            <button style={{ backgroundColor: COLORS.primaryRed }} className="text-white rounded-full py-2 px-3 flex items-center justify-center text-sm">
                                <Printer size={12} className="mr-1" />
                                Print Label
                            </button>
                            <button style={{ backgroundColor: COLORS.primaryBlue }} className="text-white rounded-full py-2 px-3 flex items-center justify-center text-sm">
                                <Package size={12} className="mr-1" />
                                Move Product
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 py-1 z-20">
                <div className="flex justify-around items-center">
                    <div className="flex flex-col items-center text-gray-600">
                        <Home size={20} />
                        <span className="text-xs">Dashboard</span>
                    </div>

                    <div className="flex flex-col items-center" style={{ color: COLORS.primaryRed }}>
                        <Package size={20} />
                        <span className="text-xs">Move Product</span>
                    </div>

                    <div className="flex flex-col items-center text-gray-600">
                        <Clock size={20} />
                        <span className="text-xs">Active Products</span>
                    </div>

                    <div className="flex flex-col items-center text-gray-600">
                        <ClipboardCheck size={20} />
                        <span className="text-xs">Quality</span>
                    </div>

                    <div className="flex flex-col items-center text-gray-600">
                        <BarChart2 size={20} />
                        <span className="text-xs">Reports</span>
                    </div>

                    <div className="flex flex-col items-center text-gray-600">
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

export default Movements;