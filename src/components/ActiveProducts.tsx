import React, { useState } from 'react';
import { ArrowLeft, AlertTriangle, Radar, Camera, Eye } from 'lucide-react';

// Define primary colors to reference in style props when needed
const COLORS = {
    primaryRed: '#b22234',
    primaryBlue: '#0b3b60'
};

interface ActiveProductsProps {
    onBack: () => void;
}

interface ProductData {
    id: string;
    palletNumber: string;
    workOrder: string;
    material: string;
    materialDescription: string;
    currentLocationType: string;
    currentLocation: string;
    timeOut: string;
    returnBy: string;
    torTime: string;
    status: 'safe' | 'warning' | 'critical';
    torMinutes: number; // for sorting
}

const ActiveProducts: React.FC<ActiveProductsProps> = ({ onBack }) => {
    const [palletSearch, setPalletSearch] = useState('');
    const [workOrderSearch, setWorkOrderSearch] = useState('');
    const [materialSearch, setMaterialSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [locationTypeFilter, setLocationTypeFilter] = useState('all');
    const [locationFilter, setLocationFilter] = useState('all');

    // Mock data for active products
    const [activeProducts] = useState<ProductData[]>([
        {
            id: '1',
            palletNumber: 'PAL-001234',
            workOrder: 'WO-11520',
            material: 'MAT-VAC-001',
            materialDescription: 'Temperature Sensitive Vaccine - Storage Req: 2-8°C',
            currentLocationType: 'Production Line',
            currentLocation: 'Production Line 1',
            timeOut: 'Apr 29, 2025 - 09:30 AM',
            returnBy: 'Apr 29, 2025 - 11:30 PM',
            torTime: '0:25:30',
            status: 'critical',
            torMinutes: 25
        },
        {
            id: '2',
            palletNumber: 'PAL-001235',
            workOrder: 'WO-11521',
            material: 'MAT-VAC-002',
            materialDescription: 'Vaccine Component B - Storage Req: 2-8°C',
            currentLocationType: 'Finished Goods',
            currentLocation: 'Finished Goods Storage A',
            timeOut: 'Apr 29, 2025 - 08:15 AM',
            returnBy: 'Apr 29, 2025 - 10:45 PM',
            torTime: '1:45:15',
            status: 'warning',
            torMinutes: 105
        },
        {
            id: '3',
            palletNumber: 'PAL-001236',
            workOrder: 'WO-11520',
            material: 'MAT-VAC-001',
            materialDescription: 'Temperature Sensitive Vaccine - Storage Req: 2-8°C',
            currentLocationType: 'Production Prep',
            currentLocation: 'Production Prep Area 2',
            timeOut: 'Apr 29, 2025 - 07:30 AM',
            returnBy: 'Apr 29, 2025 - 09:30 PM',
            torTime: '4:30:45',
            status: 'safe',
            torMinutes: 270
        },
        {
            id: '4',
            palletNumber: 'PAL-001237',
            workOrder: 'WO-11522',
            material: 'MAT-VAC-003',
            materialDescription: 'Vaccine Stabilizer - Storage Req: 2-8°C',
            currentLocationType: 'Cold Storage',
            currentLocation: 'Cold Storage Room A-1',
            timeOut: 'Apr 29, 2025 - 10:00 AM',
            returnBy: 'Apr 30, 2025 - 12:00 AM',
            torTime: '3:15:20',
            status: 'safe',
            torMinutes: 195
        },
        {
            id: '5',
            palletNumber: 'PAL-001238',
            workOrder: 'WO-11521',
            material: 'MAT-VAC-002',
            materialDescription: 'Vaccine Component B - Storage Req: 2-8°C',
            currentLocationType: 'Production Line',
            currentLocation: 'Production Line 3',
            timeOut: 'Apr 29, 2025 - 08:45 AM',
            returnBy: 'Apr 29, 2025 - 11:15 PM',
            torTime: '1:10:30',
            status: 'warning',
            torMinutes: 70
        },
        {
            id: '6',
            palletNumber: 'PAL-001239',
            workOrder: 'WO-11523',
            material: 'MAT-VAC-004',
            materialDescription: 'Vaccine Adjuvant - Storage Req: 2-8°C',
            currentLocationType: 'Finished Goods',
            currentLocation: 'Finished Goods Storage B',
            timeOut: 'Apr 29, 2025 - 06:30 AM',
            returnBy: 'Apr 29, 2025 - 08:30 PM',
            torTime: '6:20:15',
            status: 'safe',
            torMinutes: 380
        },
        {
            id: '7',
            palletNumber: 'PAL-001240',
            workOrder: 'WO-11520',
            material: 'MAT-VAC-001',
            materialDescription: 'Temperature Sensitive Vaccine - Storage Req: 2-8°C',
            currentLocationType: 'Production Prep',
            currentLocation: 'Production Prep Area 1',
            timeOut: 'Apr 29, 2025 - 09:45 AM',
            returnBy: 'Apr 30, 2025 - 12:15 AM',
            torTime: '0:15:45',
            status: 'critical',
            torMinutes: 15
        },
        {
            id: '8',
            palletNumber: 'PAL-001241',
            workOrder: 'WO-11524',
            material: 'MAT-VAC-005',
            materialDescription: 'Vaccine Preservative - Storage Req: 2-8°C',
            currentLocationType: 'Cold Storage',
            currentLocation: 'Cold Storage Room B-2',
            timeOut: 'Apr 29, 2025 - 08:00 AM',
            returnBy: 'Apr 29, 2025 - 10:00 PM',
            torTime: '2:45:30',
            status: 'safe',
            torMinutes: 165
        }
    ]);

    const locationTypes = ['all', 'Cold Storage', 'Production Prep', 'Production Line', 'Finished Goods'];

    const getLocationsByType = (type: string) => {
        if (type === 'all') return ['all'];

        const locationMap: { [key: string]: string[] } = {
            'Cold Storage': ['Cold Storage Room A-1', 'Cold Storage Room B-2', 'Cold Storage Room C-3', 'Cold Storage Room D-4'],
            'Production Prep': ['Production Prep Area 1', 'Production Prep Area 2', 'Production Prep Area 3', 'Production Prep Area 4'],
            'Production Line': ['Production Line 1', 'Production Line 2', 'Production Line 3', 'Production Line 4'],
            'Finished Goods': ['Finished Goods Storage A', 'Finished Goods Storage B', 'Finished Goods Storage C', 'Finished Goods Storage D']
        };

        return ['all', ...(locationMap[type] || [])];
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

    const handleScanPallet = () => {
        setPalletSearch('PAL-001234');
    };

    const handleScanWorkOrder = () => {
        setWorkOrderSearch('WO-11520');
    };

    const handleScanMaterial = () => {
        setMaterialSearch('MAT-VAC-001');
    };

    // Filter and sort products
    const filteredProducts = activeProducts
        .filter(product => {
            const matchesPallet = palletSearch === '' ||
                product.palletNumber.toLowerCase().includes(palletSearch.toLowerCase());
            const matchesWorkOrder = workOrderSearch === '' ||
                product.workOrder.toLowerCase().includes(workOrderSearch.toLowerCase());
            const matchesMaterial = materialSearch === '' ||
                product.material.toLowerCase().includes(materialSearch.toLowerCase());

            const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
            const matchesLocationType = locationTypeFilter === 'all' || product.currentLocationType === locationTypeFilter;
            const matchesLocation = locationFilter === 'all' || product.currentLocation === locationFilter;

            return matchesPallet && matchesWorkOrder && matchesMaterial && matchesStatus && matchesLocationType && matchesLocation;
        })
        .sort((a, b) => {
            // Sort by status priority (critical first), then by time remaining
            const statusPriority = { critical: 0, warning: 1, safe: 2 };
            if (statusPriority[a.status] !== statusPriority[b.status]) {
                return statusPriority[a.status] - statusPriority[b.status];
            }
            return a.torMinutes - b.torMinutes;
        });

    const handleClearSearch = () => {
        setPalletSearch('');
        setWorkOrderSearch('');
        setMaterialSearch('');
        setStatusFilter('all');
        setLocationTypeFilter('all');
        setLocationFilter('all');
    };

    const handleViewDetails = (productId: string) => {
        console.log('View details for product:', productId);
        // Implementation for viewing product details
    };

    const getStatusPillStyle = (status: string, isSelected: boolean) => {
        const colors = {
            critical: isSelected ? 'bg-red-100 text-red-800 border-red-300' : 'bg-white text-red-600 border-red-300',
            warning: isSelected ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : 'bg-white text-yellow-600 border-yellow-300',
            safe: isSelected ? 'bg-green-100 text-green-800 border-green-300' : 'bg-white text-green-600 border-green-300'
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-600 border-gray-300';
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
                        <Radar size={18} className="text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">Active Products</h1>
                        <p className="text-sm text-gray-600">Monitor products currently out of refrigeration with TOR tracking</p>
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

            {/* Compact Search/Scan Row - All 3 on one line */}
            <div className="flex items-center mb-3 gap-2">
                <div className="flex items-center flex-1">
                    <label className="text-sm text-gray-700 w-16 flex-shrink-0">Pallet:</label>
                    <input
                        type="text"
                        className="flex-1 text-sm rounded border border-gray-300 p-2 mr-1"
                        placeholder="Enter pallet"
                        value={palletSearch}
                        onChange={(e) => setPalletSearch(e.target.value)}
                    />
                    <button
                        style={{ backgroundColor: COLORS.primaryRed }}
                        className="text-white rounded-full py-2 px-2 text-xs whitespace-nowrap"
                        onClick={handleScanPallet}
                    >
                        <Camera size={10} className="mr-1 inline" />
                        Scan
                    </button>
                </div>

                <div className="flex items-center flex-1">
                    <label className="text-sm text-gray-700 w-20 flex-shrink-0">Work Order:</label>
                    <input
                        type="text"
                        className="flex-1 text-sm rounded border border-gray-300 p-2 mr-1"
                        placeholder="Enter WO"
                        value={workOrderSearch}
                        onChange={(e) => setWorkOrderSearch(e.target.value)}
                    />
                    <button
                        style={{ backgroundColor: COLORS.primaryRed }}
                        className="text-white rounded-full py-2 px-2 text-xs whitespace-nowrap"
                        onClick={handleScanWorkOrder}
                    >
                        <Camera size={10} className="mr-1 inline" />
                        Scan
                    </button>
                </div>

                <div className="flex items-center flex-1">
                    <label className="text-sm text-gray-700 w-16 flex-shrink-0">Material:</label>
                    <input
                        type="text"
                        className="flex-1 text-sm rounded border border-gray-300 p-2 mr-1"
                        placeholder="Enter material"
                        value={materialSearch}
                        onChange={(e) => setMaterialSearch(e.target.value)}
                    />
                    <button
                        style={{ backgroundColor: COLORS.primaryRed }}
                        className="text-white rounded-full py-2 px-2 text-xs whitespace-nowrap"
                        onClick={handleScanMaterial}
                    >
                        <Camera size={10} className="mr-1 inline" />
                        Scan
                    </button>
                </div>

                <button
                    className="px-3 py-2 text-sm text-gray-600 border border-gray-300 rounded"
                    onClick={handleClearSearch}
                >
                    Clear All
                </button>
            </div>

            {/* Filter Rows */}
            <div className="flex items-center mb-2">
                <label className="text-sm text-gray-700 w-32 flex-shrink-0">Location Type:</label>
                <select
                    className="flex-1 text-sm rounded border border-gray-300 p-2 mr-4"
                    value={locationTypeFilter}
                    onChange={(e) => {
                        setLocationTypeFilter(e.target.value);
                        setLocationFilter('all');
                    }}
                >
                    {locationTypes.map(type => (
                        <option key={type} value={type}>
                            {type === 'all' ? 'All Types' : type}
                        </option>
                    ))}
                </select>
                <label className="text-sm text-gray-700 w-24 flex-shrink-0">Location:</label>
                <select
                    className="flex-1 text-sm rounded border border-gray-300 p-2"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    disabled={locationTypeFilter === 'all'}
                >
                    {getLocationsByType(locationTypeFilter).map(location => (
                        <option key={location} value={location}>
                            {location === 'all' ? 'All Locations' : location}
                        </option>
                    ))}
                </select>
            </div>

            {/* Status Filter Capsules */}
            <div className="flex items-center mb-4">
                <label className="text-sm text-gray-700 w-32 flex-shrink-0">Status:</label>
                <div className="flex gap-2">
                    <button
                        className={`px-3 py-1 text-xs rounded-full border ${statusFilter === 'all' ? 'bg-gray-100 text-gray-800 border-gray-300' : 'bg-white text-gray-600 border-gray-300'}`}
                        onClick={() => setStatusFilter('all')}
                    >
                        All
                    </button>
                    <button
                        className={`px-3 py-1 text-xs rounded-full border ${getStatusPillStyle('critical', statusFilter === 'critical')}`}
                        onClick={() => setStatusFilter(statusFilter === 'critical' ? 'all' : 'critical')}
                    >
                        Critical
                    </button>
                    <button
                        className={`px-3 py-1 text-xs rounded-full border ${getStatusPillStyle('warning', statusFilter === 'warning')}`}
                        onClick={() => setStatusFilter(statusFilter === 'warning' ? 'all' : 'warning')}
                    >
                        Warning
                    </button>
                    <button
                        className={`px-3 py-1 text-xs rounded-full border ${getStatusPillStyle('safe', statusFilter === 'safe')}`}
                        onClick={() => setStatusFilter(statusFilter === 'safe' ? 'all' : 'safe')}
                    >
                        Safe
                    </button>
                </div>
            </div>

            {/* Products Summary */}
            <div className="mb-3">
                <p className="text-sm text-gray-600">
                    Showing {filteredProducts.length} of {activeProducts.length} active products
                    {filteredProducts.filter(p => p.status === 'critical').length > 0 && (
                        <span className="ml-2 text-red-600 font-semibold">
                            ({filteredProducts.filter(p => p.status === 'critical').length} critical)
                        </span>
                    )}
                </p>
            </div>

            {/* Products Table */}
            <div className="bg-white border border-gray-200 rounded overflow-hidden">
                {/* Table Header */}
                <div className="bg-gray-50 border-b border-gray-200 p-3">
                    <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-gray-700">
                        <div className="col-span-1">Pallet #</div>
                        <div className="col-span-1">Work Order</div>
                        <div className="col-span-2">Material</div>
                        <div className="col-span-1">Location Type</div>
                        <div className="col-span-1">Location</div>
                        <div className="col-span-1">Time Out</div>
                        <div className="col-span-1">Return By</div>
                        <div className="col-span-1">TOR Time</div>
                        <div className="col-span-3">Actions</div>
                    </div>
                </div>

                {/* Table Body */}
                <div className="max-h-96 overflow-y-auto">
                    {filteredProducts.length === 0 ? (
                        <div className="p-6 text-center text-gray-500">
                            No products found matching your criteria
                        </div>
                    ) : (
                        filteredProducts.map((product) => (
                            <div
                                key={product.id}
                                className={`p-3 border-b border-gray-100 ${getStatusBackground(product.status)}`}
                            >
                                <div className="grid grid-cols-12 gap-2 text-sm items-center">
                                    <div className="col-span-1 font-medium">{product.palletNumber}</div>
                                    <div className="col-span-1">{product.workOrder}</div>
                                    <div className="col-span-2">
                                        <div className="font-medium">{product.material}</div>
                                        <div className="text-xs text-gray-500">{product.materialDescription}</div>
                                    </div>
                                    <div className="col-span-1">{product.currentLocationType}</div>
                                    <div className="col-span-1">{product.currentLocation}</div>
                                    <div className="col-span-1">
                                        <div className="text-xs">{product.timeOut}</div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="text-xs">{product.returnBy}</div>
                                    </div>
                                    <div className="col-span-1">
                                        <div className="flex items-center">
                                            <div
                                                className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
                                                style={{
                                                    borderColor: getStatusColor(product.status),
                                                    backgroundColor: `${getStatusColor(product.status)}10`
                                                }}
                                            >
                                                <span
                                                    className="text-xs font-bold"
                                                    style={{ color: getStatusColor(product.status) }}
                                                >
                                                    {product.torTime.substring(0, 4)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-3">
                                        <button
                                            style={{ backgroundColor: COLORS.primaryBlue }}
                                            className="text-white rounded-full py-1 px-3 text-xs flex items-center"
                                            onClick={() => handleViewDetails(product.id)}
                                        >
                                            <Eye size={12} className="mr-1" />
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default ActiveProducts;