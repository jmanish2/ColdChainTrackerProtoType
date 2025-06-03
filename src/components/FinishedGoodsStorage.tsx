import React, { useState } from 'react';
import { ArrowLeft, Forklift, AlertTriangle } from 'lucide-react';

// Define primary colors to reference in style props when needed
const COLORS = {
    primaryRed: '#b22234',
    primaryBlue: '#0b3b60'
};

interface FinishedGoodsStorageProps {
    onBack: () => void;
}

const FinishedGoodsStorage: React.FC<FinishedGoodsStorageProps> = ({ onBack }) => {
    const [currentLocation, setCurrentLocation] = useState('');
    const [workOrder, setWorkOrder] = useState('');
    const [lotNumber, setLotNumber] = useState('');
    const [material, setMaterial] = useState('');
    const [description, setDescription] = useState('');
    const [uom, setUom] = useState('');
    const [qtyPerPallet, setQtyPerPallet] = useState('');
    const [labelsPerPallet, setLabelsPerPallet] = useState('1');
    const [destinationLocation, setDestinationLocation] = useState('');
    const [labelPrinted, setLabelPrinted] = useState(false);

    // TOR inheritance data - populated when label is printed
    const [torInheritanceData, setTorInheritanceData] = useState<Array<{
        palletNumber: string;
        material: string;
        qty: string;
        torTime: string;
    }>>([]);

    const productionLineLocations = [
        'Production Line 1',
        'Production Line 2',
        'Production Line 3',
        'Production Line 4'
    ];

    const coldStorageLocations = [
        'Cold Storage Room A-1',
        'Cold Storage Room B-2',
        'Cold Storage Room C-3',
        'Cold Storage Room D-4'
    ];

    const handleCurrentLocationChange = (location: string) => {
        setCurrentLocation(location);
        if (location) {
            // Auto-populate product details when location is selected
            setWorkOrder('WO-11525');
            setLotNumber('LOT-FG-001');
            setMaterial('FG-VAC-FINAL');
            setDescription('Finished Vaccine Product - Ready for Cold Storage');
            setUom('Units');
            // Don't reset labelPrinted here - only reset when form is cleared
        } else {
            // Clear fields if no location selected
            setWorkOrder('');
            setLotNumber('');
            setMaterial('');
            setDescription('');
            setUom('');
            setLabelPrinted(false);
        }
    };

    const handlePrintLabel = () => {
        setLabelPrinted(true);
        // Populate TOR inheritance data when label is printed
        setTorInheritanceData([
            {
                palletNumber: 'PAL-001234',
                material: 'MAT-VAC-001',
                qty: '50',
                torTime: '2:15:30' // This is the oldest pallet - TOR time to inherit
            }
        ]);
    };

    const handleMoveProduct = () => {
        // Reset form after successful move - clear everything including TOR data
        setCurrentLocation('');
        setWorkOrder('');
        setLotNumber('');
        setMaterial('');
        setDescription('');
        setUom('');
        setQtyPerPallet('');
        setLabelsPerPallet('1');
        setDestinationLocation('');
        setLabelPrinted(false);
        setTorInheritanceData([]); // Clear TOR inheritance data
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
                        <Forklift size={18} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">Finished Goods Storage</h1>
                        <p className="text-sm text-gray-600">Transfer finished goods to refrigerated storage before shipping</p>
                    </div>
                </div>
            </div>

            {/* Warning Banner */}
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

            {/* Current Location Row */}
            <div className="flex items-center mb-3">
                <label className="text-sm text-gray-700 w-40 flex-shrink-0">Current Location Type*:</label>
                <select className="flex-1 text-sm rounded border border-gray-300 p-2 bg-gray-100 mr-4" disabled>
                    <option>Production Line</option>
                </select>
                <label className="text-sm text-gray-700 w-32 flex-shrink-0">Current Location*:</label>
                <select
                    className="flex-1 text-sm rounded border border-gray-300 p-2"
                    value={currentLocation}
                    onChange={(e) => handleCurrentLocationChange(e.target.value)}
                >
                    <option value="">Select current location</option>
                    {productionLineLocations.map((location) => (
                        <option key={location} value={location}>
                            {location}
                        </option>
                    ))}
                </select>
            </div>

            {/* Auto-populated Product Details - Row 1 */}
            <div className="flex items-center mb-2">
                <label className="text-sm text-gray-700 w-32 flex-shrink-0">Work Order:</label>
                <input
                    type="text"
                    className="flex-1 text-sm rounded border border-gray-200 bg-gray-100 p-2 mr-4"
                    value={workOrder}
                    readOnly
                />
                <label className="text-sm text-gray-700 w-24 flex-shrink-0">Lot Number:</label>
                <input
                    type="text"
                    className="flex-1 text-sm rounded border border-gray-200 bg-gray-100 p-2"
                    value={lotNumber}
                    readOnly
                />
            </div>

            {/* Auto-populated Product Details - Row 2 */}
            <div className="flex items-center mb-3">
                <label className="text-sm text-gray-700 w-32 flex-shrink-0">Material:</label>
                <input
                    type="text"
                    className="flex-1 text-sm rounded border border-gray-200 bg-gray-100 p-2 mr-4"
                    value={material}
                    readOnly
                />
                <label className="text-sm text-gray-700 w-24 flex-shrink-0">Description:</label>
                <input
                    type="text"
                    className="flex-1 text-sm rounded border border-gray-200 bg-gray-100 p-2"
                    value={description}
                    readOnly
                />
            </div>

            {/* Pallet Configuration Row */}
            <div className="flex items-center mb-3">
                <label className="text-sm text-gray-700 w-32 flex-shrink-0">Type*:</label>
                <select className="flex-1 text-sm rounded border border-gray-300 p-2 bg-gray-100 mr-2" disabled>
                    <option>Pallet</option>
                </select>
                <label className="text-sm text-gray-700 w-24 flex-shrink-0">Qty Per Pallet*:</label>
                <input
                    type="number"
                    className="flex-1 text-sm rounded border border-gray-300 p-2 mr-2"
                    placeholder="Enter quantity"
                    min="1"
                    value={qtyPerPallet}
                    onChange={(e) => setQtyPerPallet(e.target.value)}
                />
                <label className="text-sm text-gray-700 w-16 flex-shrink-0">UOM:</label>
                <input
                    type="text"
                    className="flex-1 text-sm rounded border border-gray-200 bg-gray-100 p-2"
                    value={uom}
                    readOnly
                />
            </div>

            {/* Labels Per Pallet, Printer & Print Label Row */}
            <div className="flex items-center mb-3">
                <label className="text-sm text-gray-700 w-32 flex-shrink-0">Labels Per Pallet:</label>
                <input
                    type="number"
                    className="flex-1 text-sm rounded border border-gray-300 p-2 mr-4"
                    min="1"
                    value={labelsPerPallet}
                    onChange={(e) => setLabelsPerPallet(e.target.value)}
                />
                <label className="text-sm text-gray-700 w-16 flex-shrink-0">Printer:</label>
                <select className="flex-1 text-sm rounded border border-gray-300 p-2 mr-4">
                    <option>Printer 1</option>
                    <option>Printer 2</option>
                    <option>Printer 3</option>
                </select>
                <button
                    style={{ backgroundColor: COLORS.primaryRed }}
                    className="text-white rounded-full py-2 px-4 text-sm font-semibold"
                    onClick={handlePrintLabel}
                    disabled={!currentLocation || !qtyPerPallet}
                >
                    Print Label
                </button>
            </div>

            {/* TOR Time Inheritance Table */}
            <div className="mb-3">
                <h3 className="text-sm font-bold text-gray-800 mb-1">TOR Time Inheritance</h3>
                <div className="bg-gray-50 border border-gray-200 rounded p-2">
                    <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-gray-700 mb-1 pb-1 border-b border-gray-300">
                        <div>Pallet#</div>
                        <div>Material</div>
                        <div>Qty</div>
                        <div>TOR Time</div>
                    </div>
                    {torInheritanceData.length > 0 ? (
                        torInheritanceData.map((item, index) => (
                            <div key={index} className="grid grid-cols-4 gap-2 text-sm">
                                <div>{item.palletNumber}</div>
                                <div>{item.material}</div>
                                <div>{item.qty}</div>
                                <div className="font-semibold text-blue-600">{item.torTime}</div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 text-sm py-2 italic">
                            TOR inheritance data will appear after printing label
                        </div>
                    )}
                    {torInheritanceData.length > 0 && (
                        <div className="text-xs text-blue-600 italic mt-1">
                            * TOR time from oldest pallet will be inherited by finished goods
                        </div>
                    )}
                </div>
            </div>

            {/* Destination Row */}
            <div className="flex items-center mb-4">
                <label className="text-sm text-gray-700 w-32 flex-shrink-0">Destination Type*:</label>
                <select className="flex-1 text-sm rounded border border-gray-300 p-2 bg-gray-100 mr-4" disabled>
                    <option>Cold Storage</option>
                </select>
                <label className="text-sm text-gray-700 w-32 flex-shrink-0">Destination Location*:</label>
                <select
                    className="flex-1 text-sm rounded border border-gray-300 p-2"
                    value={destinationLocation}
                    onChange={(e) => setDestinationLocation(e.target.value)}
                >
                    <option value="">Select destination location</option>
                    {coldStorageLocations.map((location) => (
                        <option key={location} value={location}>
                            {location}
                        </option>
                    ))}
                </select>
            </div>

            {/* Move Product Button */}
            <div className="flex justify-end">
                <button
                    style={{
                        backgroundColor: (labelPrinted && destinationLocation)
                            ? COLORS.primaryBlue
                            : '#9ca3af'
                    }}
                    className="text-white rounded-full py-2 px-4 text-sm font-semibold"
                    disabled={!labelPrinted || !destinationLocation}
                    onClick={handleMoveProduct}
                >
                    Move Product
                </button>
            </div>

            {(!labelPrinted || !destinationLocation) && (
                <p className="text-xs text-gray-500 text-right mt-2">
                    * Print label and select destination to enable Move Product
                </p>
            )}
        </>
    );
};

export default FinishedGoodsStorage;