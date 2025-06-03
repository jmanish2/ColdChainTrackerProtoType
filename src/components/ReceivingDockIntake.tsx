import React, { useState } from 'react';
import { ArrowLeft, Truck, AlertTriangle } from 'lucide-react';

// Define primary colors to reference in style props when needed
const COLORS = {
    primaryRed: '#b22234',
    primaryBlue: '#0b3b60'
};

interface ReceivingDockIntakeProps {
    onBack: () => void;
}

const ReceivingDockIntake: React.FC<ReceivingDockIntakeProps> = ({ onBack }) => {
    const [productDescription, setProductDescription] = useState('');
    const [labelPrinted, setLabelPrinted] = useState(false);
    const [productValue, setProductValue] = useState('');
    const [vendorItemNumber, setVendorItemNumber] = useState('');
    const [vendorLotNumber, setVendorLotNumber] = useState('');
    const [palletCount, setPalletCount] = useState('');
    const [qtyPerPallet, setQtyPerPallet] = useState('');
    const [unitOfMeasure, setUnitOfMeasure] = useState('');
    const [labelsPerPallet, setLabelsPerPallet] = useState('1');
    const [destinationLocation, setDestinationLocation] = useState('');

    const handleMoveProduct = () => {
        // Reset all form fields to initial state
        setProductValue('');
        setProductDescription('');
        setVendorItemNumber('');
        setVendorLotNumber('');
        setPalletCount('');
        setQtyPerPallet('');
        setUnitOfMeasure('');
        setLabelsPerPallet('1');
        setDestinationLocation('');
        setLabelPrinted(false);
    };

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
                    <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center mr-3">
                        <Truck size={18} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">Receiving Dock Intake</h1>
                        <p className="text-sm text-gray-600">Process incoming shipments from suppliers into cold chain storage</p>
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

            {/* Product Entry with Scan Button */}
            <div className="flex items-center mb-2">
                <label className="text-sm text-gray-700 w-40 flex-shrink-0">Product*:</label>
                <input
                    type="text"
                    className="flex-1 text-sm rounded border border-gray-300 p-2 mr-2"
                    placeholder="Enter or scan product"
                    value={productValue}
                    onChange={(e) => {
                        setProductValue(e.target.value);
                        setProductDescription(e.target.value ? "Temperature Sensitive Vaccine - Storage Req: 2-8°C" : "");
                    }}
                />
                <button
                    style={{ backgroundColor: COLORS.primaryRed }}
                    className="text-white rounded-full py-2 px-3 text-sm whitespace-nowrap"
                >
                    Scan Product
                </button>
            </div>

            {/* Product Description */}
            <div className="flex items-center mb-2">
                <label className="text-sm text-gray-700 w-40 flex-shrink-0">Description:</label>
                <input
                    type="text"
                    className="flex-1 text-sm rounded border border-gray-200 bg-gray-100 p-2"
                    value={productDescription}
                    readOnly
                />
            </div>

            {/* Vendor Item */}
            <div className="flex items-center mb-2">
                <label className="text-sm text-gray-700 w-40 flex-shrink-0">Vendor Item:</label>
                <input
                    type="text"
                    className="flex-1 text-sm rounded border border-gray-300 p-2"
                    placeholder="Enter vendor item number"
                    value={vendorItemNumber}
                    onChange={(e) => setVendorItemNumber(e.target.value)}
                />
            </div>

            {/* Vendor Lot */}
            <div className="flex items-center mb-4">
                <label className="text-sm text-gray-700 w-40 flex-shrink-0">Vendor Lot:</label>
                <input
                    type="text"
                    className="flex-1 text-sm rounded border border-gray-300 p-2"
                    placeholder="Enter vendor lot number"
                    value={vendorLotNumber}
                    onChange={(e) => setVendorLotNumber(e.target.value)}
                />
            </div>

            {/* Type (Disabled) */}
            <div className="flex items-center mb-2">
                <label className="text-sm text-gray-700 w-40 flex-shrink-0">Type*:</label>
                <select className="flex-1 text-sm rounded border border-gray-300 p-2 bg-gray-100" disabled>
                    <option>Pallet</option>
                    <option>Case</option>
                    <option>Tray</option>
                </select>
            </div>

            {/* Number of Pallets */}
            <div className="flex items-center mb-2">
                <label className="text-sm text-gray-700 w-40 flex-shrink-0">No. of Pallets*:</label>
                <input
                    type="number"
                    className="flex-1 text-sm rounded border border-gray-300 p-2"
                    placeholder="Enter number of pallets"
                    min="1"
                    value={palletCount}
                    onChange={(e) => setPalletCount(e.target.value)}
                />
            </div>

            {/* Quantity per Pallet */}
            <div className="flex items-center mb-2">
                <label className="text-sm text-gray-700 w-40 flex-shrink-0">Qty per Pallet*:</label>
                <input
                    type="number"
                    className="flex-1 text-sm rounded border border-gray-300 p-2"
                    placeholder="Enter quantity per pallet"
                    min="1"
                    value={qtyPerPallet}
                    onChange={(e) => setQtyPerPallet(e.target.value)}
                />
            </div>

            {/* Unit of Measure */}
            <div className="flex items-center mb-2">
                <label className="text-sm text-gray-700 w-40 flex-shrink-0">Unit of Measure:</label>
                <input
                    type="text"
                    className="flex-1 text-sm rounded border border-gray-300 p-2"
                    placeholder="Enter unit of measure"
                    value={unitOfMeasure}
                    onChange={(e) => setUnitOfMeasure(e.target.value)}
                />
            </div>

            {/* Labels per Pallet */}
            <div className="flex items-center mb-4">
                <label className="text-sm text-gray-700 w-40 flex-shrink-0">Labels per Pallet:</label>
                <input
                    type="number"
                    className="flex-1 text-sm rounded border border-gray-300 p-2"
                    min="1"
                    value={labelsPerPallet}
                    onChange={(e) => setLabelsPerPallet(e.target.value)}
                />
            </div>

            {/* Destination Location Type */}
            <div className="flex items-center mb-2">
                <label className="text-sm text-gray-700 w-40 flex-shrink-0">Destination Type*:</label>
                <select className="flex-1 text-sm rounded border border-gray-300 p-2 bg-gray-100" disabled>
                    <option>Cold Storage</option>
                    <option>Production Prep</option>
                    <option>Production Line</option>
                    <option>Finished Goods</option>
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
                    <option>Cold Storage Room A-1</option>
                    <option>Cold Storage Room B-2</option>
                    <option>Cold Storage Room C-3</option>
                    <option>Cold Storage Room D-4</option>
                </select>
            </div>

            {/* Printer Selection */}
            <div className="flex items-center mb-4">
                <label className="text-sm text-gray-700 w-40 flex-shrink-0">Printer:</label>
                <select className="flex-1 text-sm rounded border border-gray-300 p-2">
                    <option>Printer 1</option>
                    <option>Printer 2</option>
                    <option>Printer 3</option>
                </select>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 mt-6">
                <button
                    style={{ backgroundColor: COLORS.primaryRed }}
                    className="text-white rounded-full py-2 px-4 text-sm font-semibold"
                    onClick={() => setLabelPrinted(true)}
                >
                    Print Label
                </button>
                <button
                    style={{ backgroundColor: labelPrinted ? COLORS.primaryBlue : '#9ca3af' }}
                    className="text-white rounded-full py-2 px-4 text-sm font-semibold cursor-not-allowed"
                    disabled={!labelPrinted}
                    onClick={handleMoveProduct}
                >
                    Move Product
                </button>
            </div>

            {!labelPrinted && (
                <p className="text-xs text-gray-500 text-right mt-2">
                    * Print label first to enable Move Product
                </p>
            )}
        </>
    );
};

export default ReceivingDockIntake;