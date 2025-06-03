import React, { useState } from 'react';
import { ChevronDown, Clock, Package, Home, RotateCw, BarChart2, Settings, AlertTriangle, Calendar, Plus, Minus } from 'lucide-react';

const FloorPlanDashboard = () => {
  // Define primary colors to match the brand guidelines
  const COLORS = {
    primaryRed: '#b22234',
    primaryBlue: '#0b3b60',
    green: '#10b981',
    yellow: '#f59e0b',
    red: '#ef4444',
    coldStorage: '#cce5ff',
    acclimatization: '#fff2cc',
    packaging: '#e8f5e9'
  };

  // State for selected product/area and zoom level
  const [selectedItem, setSelectedItem] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Sample product data with locations - only showing products outside cold storage
  const products = [
    {
      id: 'P001',
      type: 'Pallet',
      product: 'Aloxtra 50mg',
      workOrder: '#11520',
      locationType: 'Packaging',
      location: 'Packaging Line 2',
      coordinates: { x: 150, y: 370 },
      timeOut: '09:30 AM',
      timeRemaining: '8:45',
      status: 'normal'
    },
    {
      id: 'C002',
      type: 'Case',
      product: 'Dermavic Gel',
      workOrder: '#11520',
      locationType: 'Packaging',
      location: 'Packaging Line 4',
      coordinates: { x: 550, y: 370 },
      timeOut: '08:15 AM',
      timeRemaining: '0:30',
      status: 'warning'
    },
    {
      id: 'T003',
      type: 'Tray',
      product: 'Zencort 10mg',
      workOrder: '#11521',
      locationType: 'Acclimatization',
      location: 'Acclimatization B',
      coordinates: { x: 350, y: 180 },
      timeOut: '10:45 AM',
      timeRemaining: '12:15',
      status: 'normal'
    },
    {
      id: 'B004',
      type: 'Box',
      product: 'Nevoxol 100mg',
      workOrder: '#11522',
      locationType: 'Packaging',
      location: 'Packaging Line 1',
      coordinates: { x: 150, y: 250 },
      timeOut: '11:20 AM',
      timeRemaining: '6:10',
      status: 'normal'
    },
    {
      id: 'P005',
      type: 'Pallet',
      product: 'Fibroquin',
      workOrder: '#11523',
      locationType: 'Acclimatization',
      location: 'Acclimatization A',
      coordinates: { x: 150, y: 180 },
      timeOut: '07:45 AM',
      timeRemaining: '1:15',
      status: 'warning'
    }
  ];

  // Handle zoom controls
  const handleZoomIn = () => {
    if (zoomLevel < 1.5) setZoomLevel(zoomLevel + 0.1);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.5) setZoomLevel(zoomLevel - 0.1);
  };

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'critical':
        return COLORS.red;
      case 'warning':
        return COLORS.yellow;
      default:
        return COLORS.green;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header - PCI Pharma Branding */}
      <header style={{background: `linear-gradient(to right, ${COLORS.primaryRed}, ${COLORS.primaryBlue})`}} className="text-white p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="font-bold text-xl">pci</div>
            <div className="text-lg font-semibold text-white">Cold Chain Tracking</div>
            <div className="w-4 h-4 rounded-full bg-green-500 ml-1"></div>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center bg-white/10 px-4 py-1 mr-4 rounded-full">
              <span className="text-white">ACALITO | Surface_1</span>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">0</div>
              <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">2</div>
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">3</div>
              <span className="ml-3 text-white">Light: On</span>
              <div className="w-8 h-8 rounded-full bg-yellow-500 ml-1"></div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-2 pb-14">
        {/* Title and Controls */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-lg font-bold text-gray-800">Floor Plan View</h1>
            <p className="text-xs text-gray-600">Active Cold Chain Products Location</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-white border rounded p-1">
              <Calendar size={14} className="text-gray-500 ml-1 mr-1" />
              <select className="text-xs py-0.5 px-1 border-0">
                <option>Real-time View</option>
                <option>Last Hour</option>
                <option>Today</option>
              </select>
            </div>
            
            <div className="flex bg-white border rounded">
              <button onClick={handleZoomOut} className="p-1">
                <Minus size={14} className="text-gray-500" />
              </button>
              <span className="flex items-center px-2 text-xs border-l border-r">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button onClick={handleZoomIn} className="p-1">
                <Plus size={14} className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Warning Banner */}
        <div className="bg-yellow-50 border border-yellow-500 rounded-lg p-2 mb-2 flex items-center">
          <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white mr-2">
            <AlertTriangle size={14} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-yellow-800 text-sm">WARNING: Approaching Exposure Limit</h3>
            <p className="text-yellow-800 italic text-xs">2 products have less than 90 minutes remaining before exposure time limit.</p>
          </div>
          <button className="px-2 py-1 bg-yellow-800 text-white rounded-full text-xs">View All</button>
        </div>
        
        {/* Floor Plan and Details Section */}
        <div className="flex gap-2 h-[calc(100vh-200px)]">
          {/* Floor Plan */}
          <div className="flex-1 bg-white border border-gray-200 rounded-lg p-2 overflow-hidden relative">
            {/* Floor Plan SVG */}
            <div 
              className="w-full h-full overflow-auto" 
              style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center', transition: 'transform 0.2s' }}
            >
              <svg width="700" height="450" viewBox="0 0 700 450" className="mx-auto">
                {/* Building outline */}
                <rect x="50" y="50" width="600" height="350" fill="#f9fafb" stroke="#666" strokeWidth="2" />
                
                {/* Cold Storage Areas - Multiple */}
                <g>
                  {/* Cold Storage 1 */}
                  <rect x="80" y="80" width="120" height="80" fill={COLORS.coldStorage} stroke="#0073e6" strokeWidth="2" />
                  <text x="140" y="120" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0073e6">
                    Cold Storage A
                  </text>
                  
                  {/* Cold Storage 2 */}
                  <rect x="220" y="80" width="120" height="80" fill={COLORS.coldStorage} stroke="#0073e6" strokeWidth="2" />
                  <text x="280" y="120" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0073e6">
                    Cold Storage B
                  </text>
                  
                  {/* Cold Storage 3 */}
                  <rect x="360" y="80" width="120" height="80" fill={COLORS.coldStorage} stroke="#0073e6" strokeWidth="2" />
                  <text x="420" y="120" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0073e6">
                    Cold Storage C
                  </text>
                  
                  {/* Cold Storage 4 */}
                  <rect x="500" y="80" width="120" height="80" fill={COLORS.coldStorage} stroke="#0073e6" strokeWidth="2" />
                  <text x="560" y="120" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#0073e6">
                    Cold Storage D
                  </text>
                </g>
                
                {/* Acclimatization Areas - Multiple */}
                <g>
                  {/* Acclimatization 1 */}
                  <rect x="80" y="180" width="120" height="60" fill={COLORS.acclimatization} stroke="#f59e0b" strokeWidth="2" />
                  <text x="140" y="210" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#f59e0b">
                    Acclimatization A
                  </text>
                  
                  {/* Acclimatization 2 */}
                  <rect x="220" y="180" width="120" height="60" fill={COLORS.acclimatization} stroke="#f59e0b" strokeWidth="2" />
                  <text x="280" y="210" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#f59e0b">
                    Acclimatization B
                  </text>
                  
                  {/* Acclimatization 3 */}
                  <rect x="360" y="180" width="120" height="60" fill={COLORS.acclimatization} stroke="#f59e0b" strokeWidth="2" />
                  <text x="420" y="210" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#f59e0b">
                    Acclimatization C
                  </text>
                </g>
                
                {/* Packaging Lines - Multiple */}
                <g>
                  {/* Packaging Line 1 */}
                  <rect x="80" y="260" width="120" height="110" fill={COLORS.packaging} stroke="#4caf50" strokeWidth="2" />
                  <text x="140" y="315" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#4caf50">
                    Packaging Line 1
                  </text>
                  
                  {/* Packaging Line 2 */}
                  <rect x="220" y="260" width="120" height="110" fill={COLORS.packaging} stroke="#4caf50" strokeWidth="2" />
                  <text x="280" y="315" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#4caf50">
                    Packaging Line 2
                  </text>
                  
                  {/* Packaging Line 3 */}
                  <rect x="360" y="260" width="120" height="110" fill={COLORS.packaging} stroke="#4caf50" strokeWidth="2" />
                  <text x="420" y="315" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#4caf50">
                    Packaging Line 3
                  </text>
                  
                  {/* Packaging Line 4 */}
                  <rect x="500" y="260" width="120" height="110" fill={COLORS.packaging} stroke="#4caf50" strokeWidth="2" />
                  <text x="560" y="315" textAnchor="middle" fontSize="14" fontWeight="bold" fill="#4caf50">
                    Packaging Line 4
                  </text>
                </g>
                
                {/* Product indicators - now only showing products outside cold storage */}
                {products.map((product) => (
                  <g 
                    key={product.id} 
                    transform={`translate(${product.coordinates.x}, ${product.coordinates.y})`}
                    onClick={() => setSelectedItem(product)}
                    style={{cursor: 'pointer'}}
                  >
                    <circle 
                      r="15" 
                      fill="white" 
                      stroke={getStatusColor(product.status)} 
                      strokeWidth="3" 
                    />
                    <text 
                      textAnchor="middle" 
                      dominantBaseline="central" 
                      fontSize="10" 
                      fontWeight="bold"
                    >
                      {product.id}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
          </div>
          
          {/* Details Panel */}
          <div className="w-72 bg-white border border-gray-200 rounded-lg p-2">
            <h2 className="text-sm font-bold text-gray-800 mb-2">Active Products</h2>
            
            {selectedItem ? (
              <div>
                <div className="p-2 rounded bg-gray-50 mb-2">
                  <div className="font-bold">{selectedItem.type} #{selectedItem.id}</div>
                  <div className="text-sm">{selectedItem.product}</div>
                  <div className="text-xs text-gray-500">{selectedItem.workOrder}</div>
                </div>
                
                <div className="mb-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-600">Location:</span>
                    <span className="text-xs font-semibold">{selectedItem.location}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-600">Area Type:</span>
                    <span className="text-xs font-semibold">{selectedItem.locationType}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-600">Time Out of Storage:</span>
                    <span className="text-xs font-semibold">{selectedItem.timeOut}</span>
                  </div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-600">Time Remaining:</span>
                    <span className="text-xs font-semibold" style={{color: getStatusColor(selectedItem.status)}}>
                      {selectedItem.timeRemaining}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-1">
                  <button style={{backgroundColor: COLORS.primaryBlue}} className="flex-1 text-white rounded px-2 py-1 text-xs">
                    View Details
                  </button>
                  <button style={{backgroundColor: COLORS.primaryRed}} className="flex-1 text-white rounded px-2 py-1 text-xs">
                    Return to Storage
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500 text-sm">
                Select a product on the floor plan to view details
              </div>
            )}
            
            <div className="mt-4">
              <h3 className="text-xs font-bold text-gray-800 mb-1">Products by Status</h3>
              
              <div className="text-xs space-y-1">
                <div className="flex justify-between px-2 py-1 bg-green-50 rounded">
                  <span>Normal Status:</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between px-2 py-1 bg-yellow-50 rounded">
                  <span>Warning Status:</span>
                  <span className="font-semibold">2</span>
                </div>
                <div className="flex justify-between px-2 py-1 bg-red-50 rounded">
                  <span>Critical Status:</span>
                  <span className="font-semibold">0</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <h3 className="text-xs font-bold text-gray-800 mb-1">Products by Location</h3>
              
              <div className="text-xs space-y-1">
                <div className="flex justify-between px-2 py-1 bg-yellow-50 rounded">
                  <span>Acclimatization:</span>
                  <span className="font-semibold">2</span>
                </div>
                <div className="flex justify-between px-2 py-1 bg-blue-50 rounded">
                  <span>Packaging:</span>
                  <span className="font-semibold">3</span>
                </div>
              </div>
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
          
          <div className="flex flex-col items-center text-gray-600">
            <Package size={20} />
            <span className="text-xs">Pull Product</span>
          </div>
          
          <div className="flex flex-col items-center text-gray-600">
            <Clock size={20} />
            <span className="text-xs">Active Products</span>
          </div>
          
          <div className="flex flex-col items-center text-gray-600">
            <RotateCw size={20} />
            <span className="text-xs">Return Product</span>
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
      
      {/* Footer - PCI Branding */}
      <footer style={{background: `linear-gradient(to right, ${COLORS.primaryRed}, ${COLORS.primaryBlue})`}} className="fixed bottom-10 w-full text-white text-xs p-1 text-center z-10">
        <p>Cold Chain Tracker v1.0 | © 2025 PCI Pharma Services</p>
      </footer>
    </div>
  );
};

export default FloorPlanDashboard;