import React, { useState } from 'react';
import { ArrowLeft, ClipboardCheck, AlertTriangle } from 'lucide-react';

// Define primary colors to reference in style props when needed
const COLORS = {
    primaryRed: '#b22234',
    primaryBlue: '#0b3b60'
};

interface LineAccountabilityProps {
    onBack: () => void;
}

interface PalletData {
    palletNumber: string;
    qty: string;
    uom: string;
    status: 'not-selected' | 'fully-consumed' | 'partially-consumed';
    remainingQty?: string;
}

const LineAccountability: React.FC<LineAccountabilityProps> = ({ onBack }) => {
    const [currentLocation, setCurrentLocation] = useState('');
    const [workOrder, setWorkOrder] = useState('');
    const [lotNumber, setLotNumber] = useState('');
    const [material, setMaterial] = useState('');
    const [description, setDescription] = useState('');
    const [selectedOption, setSelectedOption] = useState<'consumption' | 'recovery'>('consumption');

    // Recovery section states
    const [rawMaterial, setRawMaterial] = useState('');
    const [recoveryDescription, setRecoveryDescription] = useState('');
    const [recoveryUom, setRecoveryUom] = useState('');
    const [qtyPerPallet, setQtyPerPallet] = useState('');
    const [labelsPerPallet, setLabelsPerPallet] = useState('1');
    const [printer, setPrinter] = useState('Printer 1');
    const [destinationLocation, setDestinationLocation] = useState('');
    const [labelsPrinted, setLabelsPrinted] = useState(false);
    const [torTime, setTorTime] = useState('');

    // Sample pallet data
    const [pallets, setPallets] = useState<PalletData[]>([
        { palletNumber: 'PAL-001234', qty: '100', uom: 'Units', status: 'not-selected' },
        { palletNumber: 'PAL-001235', qty: '100', uom: 'Units', status: 'not-selected' },
        { palletNumber: 'PAL-001236', qty: '100', uom: 'Units', status: 'not-selected' },
        { palletNumber: 'PAL-001237', qty: '100', uom: 'Units', status: 'not-selected' }
    ]);

    // Sample TOR times for each pallet
    const palletTorTimes: { [key: string]: string } = {
        'PAL-001234': '2:15:30',
        'PAL-001235': '1:45:20',
        'PAL-001236': '3:20:15',
        'PAL-001237': '0:55:45'
    };

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
            // Auto-populate data when location is selected
            setWorkOrder('WO-11525');
            setLotNumber('LOT-VAC-001');
            setMaterial('MAT-VAC-001');
            setDescription('Temperature Sensitive Vaccine - Storage Req: 2-8°C');

            // For recovery section
            setRawMaterial('MAT-VAC-001');
            setRecoveryDescription('Temperature Sensitive Vaccine - Storage Req: 2-8°C');
            setRecoveryUom('Units');
            setTorTime('2:15:30'); // TOR time from first pallet (PAL-001234)
        } else {
            // Clear fields if no location selected
            setWorkOrder('');
            setLotNumber('');
            setMaterial('');
            setDescription('');
            setRawMaterial('');
            setRecoveryDescription('');
            setRecoveryUom('');
            setTorTime('');
        }
    };

    const togglePalletStatus = (index: number, newStatus: 'fully-consumed' | 'partially-consumed') => {
        setPallets(prev => prev.map((pallet, i) => {
            if (i === index) {
                if (pallet.status === newStatus) {
                    // If clicking the same status, deselect it
                    return { ...pallet, status: 'not-selected', remainingQty: undefined };
                } else {
                    // Set new status
                    return { ...pallet, status: newStatus, remainingQty: newStatus === 'partially-consumed' ? '' : undefined };
                }
            }
            return pallet;
        }));
    };

    const updateRemainingQty = (index: number, remainingQty: string) => {
        setPallets(prev => prev.map((pallet, i) =>
            i === index ? { ...pallet, remainingQty } : pallet
        ));
    };

    const markAllFullyConsumed = () => {
        setPallets(prev => prev.map(pallet => ({
            ...pallet,
            status: 'fully-consumed',
            remainingQty: undefined
        })));
    };

    const clearAllSelections = () => {
        setPallets(prev => prev.map(pallet => ({
            ...pallet,
            status: 'not-selected',
            remainingQty: undefined
        })));
    };

    const handleReportConsumption = () => {
        // Reset consumption data
        setPallets(prev => prev.map(pallet => ({
            ...pallet,
            status: 'not-selected',
            remainingQty: undefined
        })));
    };

    const handlePrintLabel = () => {
        setLabelsPrinted(true);
        // Clear qty per pallet to allow multiple label printing
        setQtyPerPallet('');
    };

    const handleMoveProduct = () => {
        // Reset recovery form
        setQtyPerPallet('');
        setLabelsPerPallet('1');
        setPrinter('Printer 1');
        setDestinationLocation('');
        setLabelsPrinted(false);
    };

    const handleFormReset = () => {
        // Reset entire form
        setCurrentLocation('');
        setWorkOrder('');
        setLotNumber('');
        setMaterial('');
        setDescription('');
        setSelectedOption('consumption');
        setRawMaterial('');
        setRecoveryDescription('');
        setRecoveryUom('');
        setQtyPerPallet('');
        setLabelsPerPallet('1');
        setPrinter('Printer 1');
        setDestinationLocation('');
        setLabelsPrinted(false);
        setTorTime('');
        setPallets(prev => prev.map(pallet => ({
            ...pallet,
            status: 'not-selected',
            remainingQty: undefined
        })));
    };

    const getPillStyle = (status: string) => {
        switch (status) {
            case 'fully-consumed':
                return { backgroundColor: COLORS.primaryBlue, color: 'white' };
            case 'partially-consumed':
                return { backgroundColor: '#f59e0b', color: 'white' };
            default:
                return { backgroundColor: '#e5e7eb', color: '#6b7280' };
        }
    };

    const hasSelectedPallets = pallets.some(p => p.status !== 'not-selected');
    const isPartialConsumptionValid = pallets.every(p =>
        p.status !== 'partially-consumed' || (p.remainingQty && p.remainingQty.trim() !== '')
    );

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
                        <ClipboardCheck size={18} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">Line Accountability</h1>
                        <p className="text-sm text-gray-600">Clear production line and report remaining materials for proper storage</p>
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

            {/* Auto-populated Work Order Details */}
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

            <div className="flex items-center mb-4">
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

            {/* Option Selection */}
            {currentLocation && (
                <div className="mb-4">
                    <div className="flex gap-6 mb-3">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="accountabilityOption"
                                value="consumption"
                                checked={selectedOption === 'consumption'}
                                onChange={(e) => setSelectedOption(e.target.value as 'consumption')}
                                className="mr-2"
                            />
                            <span className="text-sm text-gray-700">Report Consumption</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="accountabilityOption"
                                value="recovery"
                                checked={selectedOption === 'recovery'}
                                onChange={(e) => setSelectedOption(e.target.value as 'recovery')}
                                className="mr-2"
                            />
                            <span className="text-sm text-gray-700">Recovery</span>
                        </label>
                    </div>

                    {/* Report Consumptions Section */}
                    {selectedOption === 'consumption' && (
                        <div className="bg-gray-50 border border-gray-200 rounded p-3">
                            <h3 className="text-sm font-bold text-gray-800 mb-2">Report Consumption</h3>

                            {/* Material Info */}
                            <div className="grid grid-cols-2 gap-4 mb-3">
                                <div>
                                    <label className="text-xs text-gray-600">Material:</label>
                                    <div className="text-sm font-medium">{material}</div>
                                </div>
                                <div>
                                    <label className="text-xs text-gray-600">Description:</label>
                                    <div className="text-sm font-medium">{description}</div>
                                </div>
                            </div>

                            {/* Bulk Action Buttons */}
                            <div className="flex gap-2 mb-3">
                                <button
                                    onClick={markAllFullyConsumed}
                                    className="px-3 py-1 text-xs rounded-full border border-blue-300 text-blue-700 hover:bg-blue-50"
                                >
                                    Mark All Fully Consumed
                                </button>
                                <button
                                    onClick={clearAllSelections}
                                    className="px-3 py-1 text-xs rounded-full border border-gray-300 text-gray-700 hover:bg-gray-50"
                                >
                                    Clear All Selections
                                </button>
                            </div>

                            {/* Pallets Table */}
                            <div className="bg-white border border-gray-200 rounded">
                                <div className="grid grid-cols-7 gap-2 text-xs font-semibold text-gray-700 p-2 border-b border-gray-200">
                                    <div>Pallet#</div>
                                    <div>Qty</div>
                                    <div>UOM</div>
                                    <div>TOR Time</div>
                                    <div>Fully Consumed</div>
                                    <div>Partially Consumed</div>
                                    <div>Remaining Qty</div>
                                </div>

                                {pallets.map((pallet, index) => (
                                    <div key={pallet.palletNumber}>
                                        <div className="grid grid-cols-7 gap-2 text-sm p-2 border-b border-gray-100">
                                            <div>{pallet.palletNumber}</div>
                                            <div>{pallet.qty}</div>
                                            <div>{pallet.uom}</div>
                                            <div className="text-blue-600 font-medium">{palletTorTimes[pallet.palletNumber]}</div>
                                            <div>
                                                <button
                                                    onClick={() => togglePalletStatus(index, 'fully-consumed')}
                                                    className="px-2 py-1 rounded-full text-xs font-medium"
                                                    style={getPillStyle(pallet.status === 'fully-consumed' ? 'fully-consumed' : 'not-selected')}
                                                >
                                                    {pallet.status === 'fully-consumed' ? 'Fully Consumed' : 'Not Selected'}
                                                </button>
                                            </div>
                                            <div>
                                                <button
                                                    onClick={() => togglePalletStatus(index, 'partially-consumed')}
                                                    className="px-2 py-1 rounded-full text-xs font-medium"
                                                    style={getPillStyle(pallet.status === 'partially-consumed' ? 'partially-consumed' : 'not-selected')}
                                                >
                                                    {pallet.status === 'partially-consumed' ? 'Partially Consumed' : 'Not Selected'}
                                                </button>
                                            </div>
                                            <div>
                                                {pallet.status === 'partially-consumed' && (
                                                    <input
                                                        type="number"
                                                        className="w-full text-xs rounded border border-gray-300 p-1"
                                                        placeholder="Remaining qty"
                                                        value={pallet.remainingQty || ''}
                                                        onChange={(e) => updateRemainingQty(index, e.target.value)}
                                                        min="0"
                                                    />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Report Consumption Button */}
                            <div className="flex justify-end mt-3">
                                <button
                                    style={{
                                        backgroundColor: (hasSelectedPallets && isPartialConsumptionValid)
                                            ? COLORS.primaryBlue
                                            : '#9ca3af'
                                    }}
                                    className="text-white rounded-full py-2 px-4 text-sm font-semibold"
                                    disabled={!hasSelectedPallets || !isPartialConsumptionValid}
                                    onClick={handleReportConsumption}
                                >
                                    Report Consumption
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Recovery Section */}
                    {selectedOption === 'recovery' && (
                        <div className="bg-gray-50 border border-gray-200 rounded p-3">
                            <h3 className="text-sm font-bold text-gray-800 mb-3">Recovery</h3>

                            {/* TOR Time Inheritance */}
                            <div className="mb-3">
                                <h4 className="text-xs font-bold text-gray-800 mb-1">TOR Time Inheritance</h4>
                                <div className="bg-white border border-gray-200 rounded p-2">
                                    <div className="text-xs text-gray-600 mb-1">Inherited from first consumed pallet:</div>
                                    <div className="text-sm font-semibold text-blue-600">{torTime}</div>
                                </div>
                            </div>

                            {/* Raw Material Details - Row 1 */}
                            <div className="flex items-center mb-2">
                                <label className="text-sm text-gray-700 w-32 flex-shrink-0">Raw Material:</label>
                                <input
                                    type="text"
                                    className="flex-1 text-sm rounded border border-gray-200 bg-gray-100 p-2 mr-4"
                                    value={rawMaterial}
                                    readOnly
                                />
                                <label className="text-sm text-gray-700 w-24 flex-shrink-0">Description:</label>
                                <input
                                    type="text"
                                    className="flex-1 text-sm rounded border border-gray-200 bg-gray-100 p-2"
                                    value={recoveryDescription}
                                    readOnly
                                />
                            </div>

                            {/* Type and UOM - Row 2 */}
                            <div className="flex items-center mb-3">
                                <label className="text-sm text-gray-700 w-32 flex-shrink-0">Type:</label>
                                <select className="flex-1 text-sm rounded border border-gray-300 p-2 bg-gray-100 mr-4" disabled>
                                    <option>Pallet</option>
                                </select>
                                <label className="text-sm text-gray-700 w-24 flex-shrink-0">UOM:</label>
                                <input
                                    type="text"
                                    className="flex-1 text-sm rounded border border-gray-200 bg-gray-100 p-2"
                                    value={recoveryUom}
                                    readOnly
                                />
                            </div>

                            {/* Qty Per Pallet, Labels, Printer, Print Label - Row 3 */}
                            <div className="flex items-center mb-4">
                                <label className="text-sm text-gray-700 w-32 flex-shrink-0">Qty Per Pallet*:</label>
                                <input
                                    type="number"
                                    className="flex-1 text-sm rounded border border-gray-300 p-2 mr-2"
                                    placeholder="Enter quantity"
                                    min="1"
                                    value={qtyPerPallet}
                                    onChange={(e) => setQtyPerPallet(e.target.value)}
                                />
                                <label className="text-sm text-gray-700 w-20 flex-shrink-0">Labels:</label>
                                <input
                                    type="number"
                                    className="w-16 text-sm rounded border border-gray-300 p-2 mr-2"
                                    min="1"
                                    value={labelsPerPallet}
                                    onChange={(e) => setLabelsPerPallet(e.target.value)}
                                />
                                <label className="text-sm text-gray-700 w-16 flex-shrink-0">Printer:</label>
                                <select
                                    className="w-24 text-sm rounded border border-gray-300 p-2 mr-2"
                                    value={printer}
                                    onChange={(e) => setPrinter(e.target.value)}
                                >
                                    <option>Printer 1</option>
                                    <option>Printer 2</option>
                                    <option>Printer 3</option>
                                </select>
                                <button
                                    style={{ backgroundColor: COLORS.primaryRed }}
                                    className="text-white rounded-full py-2 px-3 text-sm font-semibold"
                                    onClick={handlePrintLabel}
                                    disabled={!qtyPerPallet}
                                >
                                    Print Label
                                </button>
                            </div>

                            {/* Destination - Only show after label printed */}
                            {labelsPrinted && (
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
                            )}

                            {/* Move Product Button */}
                            {labelsPrinted && (
                                <div className="flex justify-end">
                                    <button
                                        style={{
                                            backgroundColor: destinationLocation
                                                ? COLORS.primaryBlue
                                                : '#9ca3af'
                                        }}
                                        className="text-white rounded-full py-2 px-4 text-sm font-semibold"
                                        disabled={!destinationLocation}
                                        onClick={handleMoveProduct}
                                    >
                                        Move Product
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}


        </>
    );
};

export default LineAccountability;