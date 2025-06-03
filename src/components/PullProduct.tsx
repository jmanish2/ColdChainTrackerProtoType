import React, { useState } from 'react';
import { ArrowLeft, Thermometer, AlertTriangle, Camera, Printer, Package } from 'lucide-react';

// Define primary colors to reference in style props when needed
const COLORS = {
    primaryRed: '#b22234',
    primaryBlue: '#0b3b60'
};

interface PullProductProps {
    onBack: () => void;
}

const PullProduct: React.FC<PullProductProps> = ({ onBack }) => {
    const [workOrderNumber, setWorkOrderNumber] = useState('');
    const [lotNumber, setLotNumber] = useState('');
    const [material, setMaterial] = useState('');
    const [description, setDescription] = useState('');
    const [palletNumber, setPalletNumber] = useState('');
    const [palletQty, setPalletQty] = useState('');
    const [currentLocationType, setCurrentLocationType] = useState('');
    const [currentLocation, setCurrentLocation] = useState('');
    const [uom, setUom] = useState('');
    const [removalType, setRemovalType] = useState('full'); // 'full' or 'partial'
    const [qtyToRemove, setQtyToRemove] = useState('');
    const [partialType, setPartialType] = useState('Case');
    const [destinationType, setDestinationType] = useState('');
    const [destinationLocation, setDestinationLocation] = useState('');
    const [labelPrinted, setLabelPrinted] = useState(false);

    const handleScanWorkOrder = () => {
        setWorkOrderNumber('WO-11520');
    };

    const handleScanLot = () => {
        setLotNumber('LOT-PZFAE23');
    };

    const handleScanMaterial = () => {
        setMaterial('MAT-VAC-001');
        setDescription('Temperature Sensitive Vaccine - Storage Req: 2-8°C');
    };

    const handleScanPallet = () => {
        setPalletNumber('PAL-001234');
        // Show current location details after pallet scan
        setPalletQty('100');
        setCurrentLocationType('Cold Storage');
        setCurrentLocation('Cold Storage Room A-1');
        setUom('Units');
    };

    const getDestinationOptions = () => {
        switch (destinationType) {
            case 'Cold Storage':
                return ['Cold Storage Room A-1', 'Cold Storage Room B-2', 'Cold Storage Room C-3', 'Cold Storage Room D-4'];
            case 'Production Prep':
                return ['Production Prep Area 1', 'Production Prep Area 2', 'Production Prep Area 3'];
            case 'Production Line':
                return ['Production Line 1', 'Production Line 2', 'Production Line 3'];
            case 'Finished Goods':
                return ['Finished Goods Storage A', 'Finished Goods Storage B', 'Finished Goods Storage C'];
            default:
                return [];
        }
    };

    const handlePrintLabel = () => {
        setLabelPrinted(true);
    };

    const handleMoveProduct = () => {
        // Reset form after successful move
        setWorkOrderNumber('');
        setLotNumber('');
        setMaterial('');
        setDescription('');
        setPalletNumber('');
        setPalletQty('');
        setCurrentLocationType('');
        setCurrentLocation('');
        setUom('');
        setRemovalType('full');
        setQtyToRemove('');
        setPartialType('Case');
        setDestinationType('');
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
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                        <Thermometer size={18} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">Pull Product</h1>
                        <p className="text-sm text-gray-600">Pull temperature-sensitive product from refrigerated storage</p>
                    </div>
                </div>
            </div>

            {/* Warning Banner */}
            <div className="bg-yellow-50 border-2 border-yellow-500 rounded p-3 mb-4 flex items-center">
                <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white mr-3">
                    <AlertTriangle size={18} />
                </div>
                <div className="flex-1">
                    <h3 className="font-bold text-yellow-800">WARNING: Approaching Exposure Limit</h3>
                    <p className="text-yellow-800 italic font-semibold animate-pulse">Case #C002 has 30 minutes remaining before exposure time limit.</p>
                </div>
                <button className="px-3 py-1 bg-yellow-800 text-white rounded-full text-sm">View Details</button>
            </div>

            {/* Work Order and Lot Number Row */}
            <div className="flex items-center mb-3">
                <label className="text-sm text-gray-700 w-32 flex-shrink-0">Work Order Number*:</label>
                <input
                    type="text"
                    className="flex-1 text-sm rounded border border-gray-300 p-2 mr-2"
                    placeholder="Enter work order"
                    value={workOrderNumber}
                    onChange={(e) => setWorkOrderNumber(e.target.value)}
                />
                <button
                    style={{ backgroundColor: COLORS.primaryRed }}
                    className="text-white rounded-full py-2 px-3 text-xs whitespace-nowrap mr-4"
                    onClick={handleScanWorkOrder}
                >
                    Scan WO
                </button>
                <label className="text-sm text-gray-700 w-24 flex-shrink-0">Lot Number*:</label>
                <input
                    type="text"
                    className="flex-1 text-sm rounded border border-gray-300 p-2 mr-2"
                    placeholder="Enter lot number"
                    value={lotNumber}
                    onChange={(e) => setLotNumber(e.target.value)}
                />
                <button
                    style={{ backgroundColor: COLORS.primaryRed }}
                    className="text-white rounded-full py-2 px-3 text-xs whitespace-nowrap"
                    onClick={handleScanLot}
                >
                    Scan Lot
                </button>
            </div>

            {/* Material and Description Row */}
            <div className="flex items-center mb-3">
                <label className="text-sm text-gray-700 w-32 flex-shrink-0">Material*:</label>
                <input
                    type="text"
                    className="flex-1 text-sm rounded border border-gray-300 p-2 mr-2"
                    placeholder="Enter material"
                    value={material}
                    onChange={(e) => {
                        setMaterial(e.target.value);
                        setDescription(e.target.value ? "Temperature Sensitive Vaccine - Storage Req: 2-8°C" : "");
                    }}
                />
                <button
                    style={{ backgroundColor: COLORS.primaryRed }}
                    className="text-white rounded-full py-2 px-3 text-xs whitespace-nowrap mr-4"
                    onClick={handleScanMaterial}
                >
                    Scan Material
                </button>
                <label className="text-sm text-gray-700 w-24 flex-shrink-0">Description:</label>
                <input
                    type="text"
                    className="flex-1 text-sm rounded border border-gray-200 bg-gray-100 p-2"
                    value={description}
                    readOnly
                />
            </div>

            {/* Pallet Number and Pallet Qty Row */}
            <div className="flex items-center mb-4">
                <label className="text-sm text-gray-700 w-32 flex-shrink-0">Pallet Number*:</label>
                <input
                    type="text"
                    className="flex-1 text-sm rounded border border-gray-300 p-2 mr-2"
                    placeholder="Enter pallet number"
                    value={palletNumber}
                    onChange={(e) => setPalletNumber(e.target.value)}
                />
                <button
                    style={{ backgroundColor: COLORS.primaryRed }}
                    className="text-white rounded-full py-2 px-3 text-xs whitespace-nowrap mr-4"
                    onClick={handleScanPallet}
                >
                    Scan Pallet
                </button>
                <label className="text-sm text-gray-700 w-24 flex-shrink-0">Pallet Qty:</label>
                <input
                    type="text"
                    className="flex-1 text-sm rounded border border-gray-200 bg-gray-100 p-2"
                    value={palletQty}
                    readOnly
                />
            </div>

            {/* Current Location Details - Only show after pallet is scanned */}
            {palletNumber && (
                <div className="mb-4">
                    <div className="flex items-center mb-2">
                        <label className="text-sm text-gray-700 w-32 flex-shrink-0">Current Location Type:</label>
                        <input
                            type="text"
                            className="flex-1 text-sm rounded border border-gray-200 bg-gray-100 p-2 mr-4"
                            value={currentLocationType}
                            readOnly
                        />
                        <label className="text-sm text-gray-700 w-32 flex-shrink-0">Current Location:</label>
                        <input
                            type="text"
                            className="flex-1 text-sm rounded border border-gray-200 bg-gray-100 p-2"
                            value={currentLocation}
                            readOnly
                        />
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="text-sm text-gray-700 w-32 flex-shrink-0">UOM:</label>
                        <input
                            type="text"
                            className="flex-1 text-sm rounded border border-gray-200 bg-gray-100 p-2 mr-4"
                            value={uom}
                            readOnly
                        />
                        <div className="w-32 flex-shrink-0"></div>
                        <div className="flex-1"></div>
                    </div>
                </div>
            )}

            {/* Removal Type Radio Buttons */}
            <div className="mb-4">
                <div className="flex gap-6 mb-3">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="removalType"
                            value="full"
                            checked={removalType === 'full'}
                            onChange={(e) => {
                                setRemovalType(e.target.value);
                                setLabelPrinted(false);
                            }}
                            className="mr-2"
                        />
                        <span className="text-sm text-gray-700">Full Pallet</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="removalType"
                            value="partial"
                            checked={removalType === 'partial'}
                            onChange={(e) => {
                                setRemovalType(e.target.value);
                                setLabelPrinted(false);
                            }}
                            className="mr-2"
                        />
                        <span className="text-sm text-gray-700">Partial Pallet</span>
                    </label>
                </div>

                {/* Partial Pallet Fields - Inline */}
                {removalType === 'partial' && (
                    <div className="bg-gray-50 border border-gray-200 rounded p-3 ml-6">
                        <div className="flex items-center mb-3">
                            <label className="text-sm text-gray-700 w-32 flex-shrink-0">Qty to Remove*:</label>
                            <input
                                type="number"
                                className="flex-1 text-sm rounded border border-gray-300 p-2 mr-4"
                                placeholder="Enter quantity"
                                value={qtyToRemove}
                                onChange={(e) => setQtyToRemove(e.target.value)}
                                min="1"
                            />
                            <label className="text-sm text-gray-700 w-24 flex-shrink-0">Type*:</label>
                            <select
                                className="flex-1 text-sm rounded border border-gray-300 p-2"
                                value={partialType}
                                onChange={(e) => setPartialType(e.target.value)}
                            >
                                <option>Case</option>
                                <option>Tray</option>
                            </select>
                        </div>

                        <div className="flex items-center">
                            <label className="text-sm text-gray-700 w-32 flex-shrink-0">Printer:</label>
                            <select className="flex-1 text-sm rounded border border-gray-300 p-2 mr-4">
                                <option>Printer 1</option>
                                <option>Printer 2</option>
                                <option>Printer 3</option>
                            </select>
                            <div className="w-24 flex-shrink-0"></div>
                            <button
                                style={{ backgroundColor: COLORS.primaryRed }}
                                className="text-white rounded-full py-2 px-4 text-sm font-semibold"
                                onClick={handlePrintLabel}
                            >
                                Print Label
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Destination Fields */}
            {(removalType === 'full' || (removalType === 'partial' && labelPrinted)) && (
                <div className="mb-4">
                    <div className="flex items-center">
                        <label className="text-sm text-gray-700 w-32 flex-shrink-0">Destination Type*:</label>
                        <select
                            className="flex-1 text-sm rounded border border-gray-300 p-2 mr-4"
                            value={destinationType}
                            onChange={(e) => {
                                setDestinationType(e.target.value);
                                setDestinationLocation('');
                            }}
                        >
                            <option value="">Select destination type</option>
                            <option>Cold Storage</option>
                            <option>Production Prep</option>
                            <option>Production Line</option>
                            <option>Finished Goods</option>
                        </select>
                        <label className="text-sm text-gray-700 w-32 flex-shrink-0">Destination Location*:</label>
                        <select
                            className="flex-1 text-sm rounded border border-gray-300 p-2"
                            value={destinationLocation}
                            onChange={(e) => setDestinationLocation(e.target.value)}
                            disabled={!destinationType}
                        >
                            <option value="">Select destination location</option>
                            {getDestinationOptions().map((location) => (
                                <option key={location} value={location}>
                                    {location}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            {/* Move Product Button */}
            <div className="flex justify-end mt-6">
                <button
                    style={{
                        backgroundColor: (
                            workOrderNumber &&
                            lotNumber &&
                            material &&
                            palletNumber &&
                            destinationType &&
                            destinationLocation &&
                            !(removalType === 'partial' && (!labelPrinted || !qtyToRemove))
                        ) ? COLORS.primaryBlue : '#9ca3af'
                    }}
                    className="text-white rounded-full py-2 px-4 text-sm font-semibold"
                    onClick={handleMoveProduct}
                    disabled={
                        !workOrderNumber ||
                        !lotNumber ||
                        !material ||
                        !palletNumber ||
                        !destinationType ||
                        !destinationLocation ||
                        (removalType === 'partial' && (!labelPrinted || !qtyToRemove))
                    }
                >
                    <Package size={12} className="mr-1 inline" />
                    Move Product
                </button>
            </div>
        </>
    );
};

export default PullProduct;