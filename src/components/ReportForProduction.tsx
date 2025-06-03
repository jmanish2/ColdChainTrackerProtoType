import React, { useState } from 'react';
import { ArrowLeft, Route, AlertTriangle } from 'lucide-react';

// Define primary colors to reference in style props when needed
const COLORS = {
    primaryRed: '#b22234',
    primaryBlue: '#0b3b60'
};

interface ReportForProductionProps {
    onBack: () => void;
}

const ReportForProduction: React.FC<ReportForProductionProps> = ({ onBack }) => {
    const [palletNumber, setPalletNumber] = useState('');
    const [material, setMaterial] = useState('');
    const [materialDescription, setMaterialDescription] = useState('');
    const [palletQty, setPalletQty] = useState('');
    const [uom, setUom] = useState('');
    const [currentLocation, setCurrentLocation] = useState('');
    const [destinationLocation, setDestinationLocation] = useState('');

    const handleScanPallet = () => {
        setPalletNumber('PAL-001234');
        setMaterial('MAT-VAC-001');
        setMaterialDescription('Temperature Sensitive Vaccine - Storage Req: 2-8°C');
        setPalletQty('100');
        setUom('Units');
    };

    const handleMoveProduct = () => {
        // Reset all form fields to initial state
        setPalletNumber('');
        setMaterial('');
        setMaterialDescription('');
        setPalletQty('');
        setUom('');
        setCurrentLocation('');
        setDestinationLocation('');
    };

    // Production Prep locations
    const productionPrepLocations = [
        'Production Prep Area 1',
        'Production Prep Area 2',
        'Production Prep Area 3',
        'Production Prep Area 4'
    ];

    // Production Line locations
    const productionLineLocations = [
        'Production Line 1',
        'Production Line 2',
        'Production Line 3',
        'Production Line 4'
    ];

    return (
        <>
            {/* Title with Back Navigation */}
            <div className="mb-3">
                <button
                    onClick={onBack}
                    className="flex items-center text-sm text-gray-600 mb-2 hover:text-gray-800"
                >
                    <ArrowLeft size={16} className="mr-1" />
                    Back to Move Product
                </button>

                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                        <Route size={18} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">Report for Production</h1>
                        <p className="text-sm text-gray-600">Report consumption of cold chain materials for finished goods manufacturing</p>
                    </div>
                </div>
            </div>

            {/* Warning Banner - Same as other pages */}
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

            {/* Current Location Type (Disabled) */}
            <div className="flex items-center mb-2">
                <label className="text-sm text-gray-700 w-40 flex-shrink-0">Current Location Type*:</label>
                <select className="flex-1 text-sm rounded border border-gray-300 p-2 bg-gray-100" disabled>
                    <option>Production Prep</option>
                </select>
            </div>

            {/* Current Location */}
            <div className="flex items-center mb-4">
                <label className="text-sm text-gray-700 w-40 flex-shrink-0">Current Location*:</label>
                <select
                    className="flex-1 text-sm rounded border border-gray-300 p-2"
                    value={currentLocation}
                    onChange={(e) => setCurrentLocation(e.target.value)}
                >
                    <option value="">Select current location</option>
                    {productionPrepLocations.map((location) => (
                        <option key={location} value={location}>
                            {location}
                        </option>
                    ))}
                </select>
            </div>

            {/* Destination Location Type (Disabled) */}
            <div className="flex items-center mb-2">
                <label className="text-sm text-gray-700 w-40 flex-shrink-0">Destination Location Type*:</label>
                <select className="flex-1 text-sm rounded border border-gray-300 p-2 bg-gray-100" disabled>
                    <option>Production Line</option>
                </select>
            </div>

            {/* Destination Location */}
            <div className="flex items-center mb-4">
                <label className="text-sm text-gray-700 w-40 flex-shrink-0">Destination Location*:</label>
                <select
                    className="flex-1 text-sm rounded border border-gray-300 p-2"
                    value={destinationLocation}
                    onChange={(e) => setDestinationLocation(e.target.value)}
                >
                    <option value="">Select destination location</option>
                    {productionLineLocations.map((location) => (
                        <option key={location} value={location}>
                            {location}
                        </option>
                    ))}
                </select>
            </div>

            {/* Pallet Entry with Scan Button */}
            <div className="flex items-center mb-4">
                <label className="text-sm text-gray-700 w-40 flex-shrink-0">Pallet*:</label>
                <input
                    type="text"
                    className="flex-1 text-sm rounded border border-gray-300 p-2 mr-2"
                    placeholder="Enter or scan pallet"
                    value={palletNumber}
                    onChange={(e) => setPalletNumber(e.target.value)}
                />
                <button
                    style={{ backgroundColor: COLORS.primaryRed }}
                    className="text-white rounded-full py-2 px-3 text-sm whitespace-nowrap"
                    onClick={handleScanPallet}
                >
                    Scan Pallet
                </button>
            </div>

            {/* Material */}
            <div className="flex items-center mb-2">
                <label className="text-sm text-gray-700 w-40 flex-shrink-0">Material:</label>
                <input
                    type="text"
                    className="flex-1 text-sm rounded border border-gray-200 bg-gray-100 p-2"
                    value={material}
                    readOnly
                />
            </div>

            {/* Material Description */}
            <div className="flex items-center mb-4">
                <label className="text-sm text-gray-700 w-40 flex-shrink-0">Material Description:</label>
                <input
                    type="text"
                    className="flex-1 text-sm rounded border border-gray-200 bg-gray-100 p-2"
                    value={materialDescription}
                    readOnly
                />
            </div>

            {/* Pallet Qty and UOM */}
            <div className="flex items-center mb-2">
                <label className="text-sm text-gray-700 w-40 flex-shrink-0">Pallet Qty:</label>
                <input
                    type="text"
                    className="flex-1 text-sm rounded border border-gray-200 bg-gray-100 p-2 mr-2"
                    value={palletQty}
                    readOnly
                />
                <label className="text-sm text-gray-700 w-20 flex-shrink-0">UOM:</label>
                <input
                    type="text"
                    className="flex-1 text-sm rounded border border-gray-200 bg-gray-100 p-2"
                    value={uom}
                    readOnly
                />
            </div>

            {/* Action Button */}
            <div className="flex items-center justify-end gap-3 mt-6">
                <button
                    style={{ 
                        backgroundColor: (currentLocation && destinationLocation && palletNumber) 
                            ? COLORS.primaryBlue 
                            : '#9ca3af' 
                    }}
                    className="text-white rounded-full py-2 px-4 text-sm font-semibold"
                    disabled={!currentLocation || !destinationLocation || !palletNumber}
                    onClick={handleMoveProduct}
                >
                    Move Product
                </button>
            </div>

            {(!currentLocation || !destinationLocation || !palletNumber) && (
                <p className="text-xs text-gray-500 text-right mt-2">
                    * Complete all required fields to enable Move Product
                </p>
            )}
        </>
    );
};

export default ReportForProduction;