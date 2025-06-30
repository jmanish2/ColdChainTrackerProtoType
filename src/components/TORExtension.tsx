import React, { useState } from 'react';
import { ArrowLeft, AlertTriangle, Camera, Upload, Clock, ClockArrowUp, List, X, ChevronUp, ChevronDown } from 'lucide-react';

// Define primary colors to reference in style props when needed
const COLORS = {
    primaryRed: '#b22234',
    primaryBlue: '#0b3b60'
};

interface TORExtensionProps {
    onBack: () => void;
}

interface ActivePallet {
    id: string;
    palletNumber: string;
    workOrder: string;
    lotNumber: string;
    material: string;
    qty: string;
    uom: string;
    currentTorTime: string;
    status: 'critical' | 'warning' | 'safe';
    locationType: string;
    location: string;
    torMinutes: number; // for sorting
}

const TORExtension: React.FC<TORExtensionProps> = ({ onBack }) => {
    const [palletNumber, setPalletNumber] = useState('');
    const [workOrder, setWorkOrder] = useState('');
    const [lotNumber, setLotNumber] = useState('');
    const [material, setMaterial] = useState('');
    const [qty, setQty] = useState('');
    const [uom, setUom] = useState('');
    const [currentTorTime, setCurrentTorTime] = useState('');
    const [refDocType, setRefDocType] = useState('');
    const [refDocumentNo, setRefDocumentNo] = useState('');
    const [comments, setComments] = useState('');
    const [attachedFile, setAttachedFile] = useState<File | null>(null);
    const [newTorTime, setNewTorTime] = useState('');
    const [showActivePalletsModal, setShowActivePalletsModal] = useState(false);

    // Filter states for the modal
    const [filterPallet, setFilterPallet] = useState('');
    const [filterWorkOrder, setFilterWorkOrder] = useState('all');
    const [filterLocationType, setFilterLocationType] = useState('all');
    const [filterLocation, setFilterLocation] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [sortField, setSortField] = useState<keyof ActivePallet>('palletNumber');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

    // Mock data for active pallets (exclude cold storage)
    const [activePallets] = useState<ActivePallet[]>([
        {
            id: '1',
            palletNumber: 'PAL-001234',
            workOrder: 'WO-11520',
            lotNumber: 'LOT-PZFAE23',
            material: 'MAT-VAC-001',
            qty: '100',
            uom: 'Units',
            currentTorTime: '0:25:30',
            status: 'critical',
            locationType: 'Production Line',
            location: 'Production Line 1',
            torMinutes: 25
        },
        {
            id: '2',
            palletNumber: 'PAL-001235',
            workOrder: 'WO-11521',
            lotNumber: 'LOT-PZFAE24',
            material: 'MAT-VAC-002',
            qty: '50',
            uom: 'Units',
            currentTorTime: '1:45:15',
            status: 'warning',
            locationType: 'Production Prep',
            location: 'Production Prep Area 2',
            torMinutes: 105
        },
        {
            id: '3',
            palletNumber: 'PAL-001236',
            workOrder: 'WO-11520',
            lotNumber: 'LOT-PZFAE23',
            material: 'MAT-VAC-001',
            qty: '75',
            uom: 'Units',
            currentTorTime: '4:30:45',
            status: 'safe',
            locationType: 'Finished Goods',
            location: 'Finished Goods Storage A',
            torMinutes: 270
        },
        {
            id: '4',
            palletNumber: 'PAL-001237',
            workOrder: 'WO-11522',
            lotNumber: 'LOT-PZFAE25',
            material: 'MAT-VAC-003',
            qty: '200',
            uom: 'Units',
            currentTorTime: '3:15:20',
            status: 'safe',
            locationType: 'Production Line',
            location: 'Production Line 3',
            torMinutes: 195
        },
        {
            id: '5',
            palletNumber: 'PAL-001238',
            workOrder: 'WO-11521',
            lotNumber: 'LOT-PZFAE24',
            material: 'MAT-VAC-002',
            qty: '150',
            uom: 'Units',
            currentTorTime: '1:10:30',
            status: 'warning',
            locationType: 'Production Prep',
            location: 'Production Prep Area 1',
            torMinutes: 70
        },
        {
            id: '6',
            palletNumber: 'PAL-001239',
            workOrder: 'WO-11523',
            lotNumber: 'LOT-PZFAE26',
            material: 'MAT-VAC-004',
            qty: '80',
            uom: 'Units',
            currentTorTime: '6:20:15',
            status: 'safe',
            locationType: 'Finished Goods',
            location: 'Finished Goods Storage B',
            torMinutes: 380
        }
    ]);

    const handleScanPallet = () => {
        setPalletNumber('PAL-001234');
        // Auto-populate product details after scan
        setWorkOrder('WO-11520');
        setLotNumber('LOT-PZFAE23');
        setMaterial('MAT-VAC-001');
        setQty('100');
        setUom('Units');
        setCurrentTorTime('05:15:30');
    };

    const handleSelectPallet = (pallet: ActivePallet) => {
        setPalletNumber(pallet.palletNumber);
        setWorkOrder(pallet.workOrder);
        setLotNumber(pallet.lotNumber);
        setMaterial(pallet.material);
        setQty(pallet.qty);
        setUom(pallet.uom);
        setCurrentTorTime(pallet.currentTorTime);
        setShowActivePalletsModal(false);
    };

    const getAvailableWorkOrders = () => {
        const workOrders = Array.from(new Set(activePallets.map(p => p.workOrder)));
        return workOrders.sort();
    };

    const getAvailableLocationTypes = () => {
        const types = Array.from(new Set(activePallets.map(p => p.locationType)));
        return types.sort();
    };

    const getAvailableLocations = () => {
        if (filterLocationType === 'all') {
            const locations = Array.from(new Set(activePallets.map(p => p.location)));
            return locations.sort();
        } else {
            const locations = Array.from(new Set(activePallets
                .filter(p => p.locationType === filterLocationType)
                .map(p => p.location)));
            return locations.sort();
        }
    };

    const getFilteredAndSortedPallets = () => {
        let filtered = activePallets.filter(pallet => {
            const matchesPallet = filterPallet === '' ||
                pallet.palletNumber.toLowerCase().includes(filterPallet.toLowerCase());
            const matchesWorkOrder = filterWorkOrder === 'all' || pallet.workOrder === filterWorkOrder;
            const matchesLocationType = filterLocationType === 'all' || pallet.locationType === filterLocationType;
            const matchesLocation = filterLocation === 'all' || pallet.location === filterLocation;
            const matchesStatus = filterStatus === 'all' || pallet.status === filterStatus;

            return matchesPallet && matchesWorkOrder && matchesLocationType && matchesLocation && matchesStatus;
        });

        // Sort the filtered results
        filtered.sort((a, b) => {
            let aValue = a[sortField];
            let bValue = b[sortField];

            // Handle numeric sorting for torMinutes
            if (sortField === 'torMinutes') {
                aValue = a.torMinutes;
                bValue = b.torMinutes;
            }

            if (typeof aValue === 'string' && typeof bValue === 'string') {
                return sortDirection === 'asc'
                    ? aValue.localeCompare(bValue)
                    : bValue.localeCompare(aValue);
            }

            if (typeof aValue === 'number' && typeof bValue === 'number') {
                return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
            }

            return 0;
        });

        return filtered;
    };

    const handleSort = (field: keyof ActivePallet) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'critical': return '#ef4444';
            case 'warning': return '#f59e0b';
            case 'safe': return '#10b981';
            default: return '#6b7280';
        }
    };

    const getStatusBackground = (status: string) => {
        switch (status) {
            case 'critical': return 'bg-red-50';
            case 'warning': return 'bg-yellow-50';
            case 'safe': return '';
            default: return '';
        }
    };

    const resetModalFilters = () => {
        setFilterPallet('');
        setFilterWorkOrder('all');
        setFilterLocationType('all');
        setFilterLocation('all');
        setFilterStatus('all');
        setSortField('palletNumber');
        setSortDirection('asc');
    };

    const handleOpenModal = () => {
        resetModalFilters();
        setShowActivePalletsModal(true);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        setAttachedFile(file);
    };

    const handleApproveExtension = () => {
        // Reset form after successful approval
        setPalletNumber('');
        setWorkOrder('');
        setLotNumber('');
        setMaterial('');
        setQty('');
        setUom('');
        setCurrentTorTime('');
        setRefDocType('');
        setRefDocumentNo('');
        setComments('');
        setAttachedFile(null);
        setNewTorTime('');

        // Clear file input
        const fileInput = document.getElementById('file-input') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };

    const isFormValid = () => {
        return palletNumber &&
            refDocType &&
            refDocumentNo &&
            comments &&
            newTorTime;
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
                    Back to Dashboard
                </button>

                <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-3">
                        <ClockArrowUp size={18} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">TOR Extension</h1>
                        <p className="text-sm text-gray-600">Request extension for Time Out of Refrigeration limits</p>
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

            {/* Row 3: Pallet Entry */}
            <div className="flex items-center mb-3">
                <label className="text-sm text-gray-700 w-32 flex-shrink-0">Pallet#*:</label>
                <input
                    type="text"
                    className="flex-1 text-sm rounded border border-gray-300 p-2 mr-2"
                    placeholder="Enter or scan pallet number"
                    value={palletNumber}
                    onChange={(e) => setPalletNumber(e.target.value)}
                />
                <button
                    style={{ backgroundColor: COLORS.primaryRed }}
                    className="text-white rounded-full py-2 px-3 text-sm whitespace-nowrap mr-2"
                    onClick={handleScanPallet}
                >
                    <Camera size={12} className="mr-1 inline" />
                    Scan Pallet
                </button>
                <button
                    style={{ backgroundColor: COLORS.primaryBlue }}
                    className="text-white rounded-full py-2 px-3 text-sm whitespace-nowrap"
                    onClick={handleOpenModal}
                >
                    <List size={12} className="mr-1 inline" />
                    View Active Pallets
                </button>
            </div>

            {/* Row 4: Work Order and Lot - Only show after pallet scan */}
            {palletNumber && (
                <>
                    <div className="flex items-center mb-2">
                        <label className="text-sm text-gray-700 w-32 flex-shrink-0">Work Order:</label>
                        <input
                            type="text"
                            className="flex-1 text-sm rounded border border-gray-200 bg-gray-100 p-2 mr-4"
                            value={workOrder}
                            readOnly
                        />
                        <label className="text-sm text-gray-700 w-24 flex-shrink-0">Lot:</label>
                        <input
                            type="text"
                            className="flex-1 text-sm rounded border border-gray-200 bg-gray-100 p-2"
                            value={lotNumber}
                            readOnly
                        />
                    </div>

                    {/* Row 5: Material, Qty, UOM */}
                    <div className="flex items-center mb-2">
                        <label className="text-sm text-gray-700 w-32 flex-shrink-0">Material:</label>
                        <input
                            type="text"
                            className="flex-1 text-sm rounded border border-gray-200 bg-gray-100 p-2 mr-2"
                            value={material}
                            readOnly
                        />
                        <label className="text-sm text-gray-700 w-16 flex-shrink-0">Qty:</label>
                        <input
                            type="text"
                            className="w-20 text-sm rounded border border-gray-200 bg-gray-100 p-2 mr-2"
                            value={qty}
                            readOnly
                        />
                        <label className="text-sm text-gray-700 w-16 flex-shrink-0">UOM:</label>
                        <input
                            type="text"
                            className="w-20 text-sm rounded border border-gray-200 bg-gray-100 p-2"
                            value={uom}
                            readOnly
                        />
                    </div>

                    {/* Row 6: TOR Time */}
                    <div className="flex items-center mb-4">
                        <label className="text-sm text-gray-700 w-32 flex-shrink-0">Current TOR Time:</label>
                        <div className="flex items-center">
                            <input
                                type="text"
                                className="text-sm rounded border border-yellow-300 bg-yellow-50 p-2 font-semibold text-yellow-800"
                                value={currentTorTime}
                                readOnly
                                style={{ width: '120px' }}
                            />
                            <Clock size={16} className="ml-2 text-yellow-600" />
                        </div>
                    </div>
                </>
            )}

            {/* Row 7: Reference Document Fields */}
            <div className="flex items-center mb-3">
                <label className="text-sm text-gray-700 w-32 flex-shrink-0">Ref Doc Type*:</label>
                <select
                    className="flex-1 text-sm rounded border border-gray-300 p-2 mr-4"
                    value={refDocType}
                    onChange={(e) => setRefDocType(e.target.value)}
                >
                    <option value="">Select document type</option>
                    <option value="TER">TER</option>
                    <option value="Customer Memo">Customer Memo</option>
                </select>
                <label className="text-sm text-gray-700 w-32 flex-shrink-0">Ref Document No*:</label>
                <input
                    type="text"
                    className="flex-1 text-sm rounded border border-gray-300 p-2"
                    placeholder="Enter reference document number"
                    value={refDocumentNo}
                    onChange={(e) => setRefDocumentNo(e.target.value)}
                />
            </div>

            {/* Row 8: Comments */}
            <div className="flex items-start mb-3">
                <label className="text-sm text-gray-700 w-32 flex-shrink-0 pt-2">Comments*:</label>
                <textarea
                    className="flex-1 text-sm rounded border border-gray-300 p-2 h-20"
                    placeholder="Enter comments explaining the reason for TOR extension request"
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                />
            </div>

            {/* Row 9: File Attachment */}
            <div className="flex items-center mb-3">
                <label className="text-sm text-gray-700 w-32 flex-shrink-0">Attach File:</label>
                <div className="flex items-center flex-1">
                    <input
                        type="file"
                        id="file-input"
                        className="hidden"
                        onChange={handleFileChange}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <button
                        className="bg-gray-100 border border-gray-300 rounded py-2 px-3 text-sm flex items-center mr-2"
                        onClick={() => document.getElementById('file-input')?.click()}
                    >
                        <Upload size={12} className="mr-1" />
                        Choose File
                    </button>
                    <span className="text-sm text-gray-600">
                        {attachedFile ? attachedFile.name : 'No file selected'}
                    </span>
                </div>
            </div>

            {/* Row 10: New TOR Time */}
            <div className="flex items-center mb-4">
                <label className="text-sm text-gray-700 w-32 flex-shrink-0">New TOR Time*:</label>
                <input
                    type="text"
                    className="text-sm rounded border border-gray-300 p-2"
                    placeholder="HH:MM:SS"
                    value={newTorTime}
                    onChange={(e) => setNewTorTime(e.target.value)}
                    style={{ width: '120px' }}
                />
                <span className="text-xs text-gray-500 ml-2">Format: HH:MM:SS</span>
            </div>

            {/* Row 11: Action Button */}
            <div className="flex justify-end mt-6">
                <button
                    style={{
                        backgroundColor: isFormValid() ? COLORS.primaryBlue : '#9ca3af'
                    }}
                    className="text-white rounded-full py-2 px-4 text-sm font-semibold"
                    disabled={!isFormValid()}
                    onClick={handleApproveExtension}
                >
                    <Clock size={12} className="mr-1 inline" />
                    Approve Extension
                </button>
            </div>

            {!isFormValid() && (
                <p className="text-xs text-gray-500 text-right mt-2">
                    * Complete all required fields to enable approval
                </p>
            )}

            {/* Active Pallets Modal */}
            {showActivePalletsModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg w-4/5 max-w-6xl max-h-4/5 overflow-hidden">
                        {/* Modal Header */}
                        <div className="flex items-center justify-between p-4 border-b border-gray-200">
                            <h2 className="text-lg font-bold text-gray-800">Select Active Pallet</h2>
                            <button
                                onClick={() => setShowActivePalletsModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Filter Controls */}
                        <div className="p-4 border-b border-gray-200 bg-gray-50">
                            <div className="grid grid-cols-5 gap-3">
                                <div>
                                    <label className="block text-xs text-gray-700 mb-1">Pallet#</label>
                                    <input
                                        type="text"
                                        className="w-full text-sm rounded border border-gray-300 p-2"
                                        placeholder="Filter by pallet number"
                                        value={filterPallet}
                                        onChange={(e) => setFilterPallet(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-700 mb-1">Work Order</label>
                                    <select
                                        className="w-full text-sm rounded border border-gray-300 p-2"
                                        value={filterWorkOrder}
                                        onChange={(e) => setFilterWorkOrder(e.target.value)}
                                    >
                                        <option value="all">All Work Orders</option>
                                        {getAvailableWorkOrders().map(wo => (
                                            <option key={wo} value={wo}>{wo}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-700 mb-1">Location Type</label>
                                    <select
                                        className="w-full text-sm rounded border border-gray-300 p-2"
                                        value={filterLocationType}
                                        onChange={(e) => {
                                            setFilterLocationType(e.target.value);
                                            setFilterLocation('all');
                                        }}
                                    >
                                        <option value="all">All Location Types</option>
                                        {getAvailableLocationTypes().map(type => (
                                            <option key={type} value={type}>{type}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-700 mb-1">Location</label>
                                    <select
                                        className="w-full text-sm rounded border border-gray-300 p-2"
                                        value={filterLocation}
                                        onChange={(e) => setFilterLocation(e.target.value)}
                                        disabled={filterLocationType === 'all'}
                                    >
                                        <option value="all">All Locations</option>
                                        {getAvailableLocations().map(location => (
                                            <option key={location} value={location}>{location}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs text-gray-700 mb-1">Status</label>
                                    <select
                                        className="w-full text-sm rounded border border-gray-300 p-2"
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                    >
                                        <option value="all">All Statuses</option>
                                        <option value="critical">Critical</option>
                                        <option value="warning">Warning</option>
                                        <option value="safe">Safe</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Pallets Table */}
                        <div className="overflow-auto max-h-96">
                            <table className="w-full">
                                <thead className="bg-gray-100 border-b border-gray-200 sticky top-0">
                                    <tr>
                                        <th
                                            className="text-left p-3 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-200"
                                            onClick={() => handleSort('palletNumber')}
                                        >
                                            <div className="flex items-center">
                                                Pallet#
                                                {sortField === 'palletNumber' && (
                                                    sortDirection === 'asc' ? <ChevronUp size={12} className="ml-1" /> : <ChevronDown size={12} className="ml-1" />
                                                )}
                                            </div>
                                        </th>
                                        <th
                                            className="text-left p-3 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-200"
                                            onClick={() => handleSort('workOrder')}
                                        >
                                            <div className="flex items-center">
                                                Work Order
                                                {sortField === 'workOrder' && (
                                                    sortDirection === 'asc' ? <ChevronUp size={12} className="ml-1" /> : <ChevronDown size={12} className="ml-1" />
                                                )}
                                            </div>
                                        </th>
                                        <th
                                            className="text-left p-3 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-200"
                                            onClick={() => handleSort('locationType')}
                                        >
                                            <div className="flex items-center">
                                                Location Type
                                                {sortField === 'locationType' && (
                                                    sortDirection === 'asc' ? <ChevronUp size={12} className="ml-1" /> : <ChevronDown size={12} className="ml-1" />
                                                )}
                                            </div>
                                        </th>
                                        <th
                                            className="text-left p-3 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-200"
                                            onClick={() => handleSort('location')}
                                        >
                                            <div className="flex items-center">
                                                Location
                                                {sortField === 'location' && (
                                                    sortDirection === 'asc' ? <ChevronUp size={12} className="ml-1" /> : <ChevronDown size={12} className="ml-1" />
                                                )}
                                            </div>
                                        </th>
                                        <th
                                            className="text-left p-3 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-200"
                                            onClick={() => handleSort('currentTorTime')}
                                        >
                                            <div className="flex items-center">
                                                TOR Time
                                                {sortField === 'currentTorTime' && (
                                                    sortDirection === 'asc' ? <ChevronUp size={12} className="ml-1" /> : <ChevronDown size={12} className="ml-1" />
                                                )}
                                            </div>
                                        </th>
                                        <th
                                            className="text-left p-3 text-xs font-semibold text-gray-700 cursor-pointer hover:bg-gray-200"
                                            onClick={() => handleSort('status')}
                                        >
                                            <div className="flex items-center">
                                                Status
                                                {sortField === 'status' && (
                                                    sortDirection === 'asc' ? <ChevronUp size={12} className="ml-1" /> : <ChevronDown size={12} className="ml-1" />
                                                )}
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {getFilteredAndSortedPallets().length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="text-center py-8 text-gray-500">
                                                No pallets found matching your criteria
                                            </td>
                                        </tr>
                                    ) : (
                                        getFilteredAndSortedPallets().map((pallet) => (
                                            <tr
                                                key={pallet.id}
                                                className={`border-b border-gray-100 hover:bg-blue-50 cursor-pointer ${getStatusBackground(pallet.status)}`}
                                                onClick={() => handleSelectPallet(pallet)}
                                            >
                                                <td className="p-3 text-sm font-medium">{pallet.palletNumber}</td>
                                                <td className="p-3 text-sm">{pallet.workOrder}</td>
                                                <td className="p-3 text-sm">{pallet.locationType}</td>
                                                <td className="p-3 text-sm">{pallet.location}</td>
                                                <td className="p-3 text-sm">
                                                    <div className="flex items-center">
                                                        <div
                                                            className="w-6 h-6 rounded-full border-2 flex items-center justify-center mr-2"
                                                            style={{
                                                                borderColor: getStatusColor(pallet.status),
                                                                backgroundColor: `${getStatusColor(pallet.status)}10`
                                                            }}
                                                        >
                                                            <span
                                                                className="text-xs font-bold"
                                                                style={{ color: getStatusColor(pallet.status) }}
                                                            >
                                                                {pallet.currentTorTime.substring(0, 4)}
                                                            </span>
                                                        </div>
                                                        <span className="text-blue-600 font-medium">{pallet.currentTorTime}</span>
                                                    </div>
                                                </td>
                                                <td className="p-3 text-sm">
                                                    <span
                                                        className="px-2 py-1 rounded-full text-xs font-medium text-white"
                                                        style={{ backgroundColor: getStatusColor(pallet.status) }}
                                                    >
                                                        {pallet.status.charAt(0).toUpperCase() + pallet.status.slice(1)}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-4 border-t border-gray-200 flex justify-between items-center">
                            <span className="text-sm text-gray-600">
                                Showing {getFilteredAndSortedPallets().length} of {activePallets.length} active pallets
                            </span>
                            <button
                                onClick={() => setShowActivePalletsModal(false)}
                                className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default TORExtension;