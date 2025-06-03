import React from 'react';
import { Bell, ChevronDown, Clock, Package, Home, RotateCw, BarChart2, Settings, AlertTriangle, Search, Camera, CheckCircle, FileText } from 'lucide-react';

// Define primary colors to reference in style props when needed
const COLORS = {
  primaryRed: '#b22234',
  primaryBlue: '#0b3b60',
  green: '#10b981',
  yellow: '#f59e0b',
  red: '#ef4444'
};

const ReturnProductScreen = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header - PCI Pharma Branding */}
      <header style={{background: `linear-gradient(to right, ${COLORS.primaryRed}, ${COLORS.primaryBlue})`}} className="text-white p-2">
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
              <div className="w-6 h-6 flex items-center justify-center mr-2">
                <svg viewBox="0 0 24 24" width="18" height="18" className="stroke-white fill-none">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <span>ACALITO | WHS | Rockford</span>
            </div>
            
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center cursor-pointer">
              <svg viewBox="0 0 24 24" width="16" height="16" className="stroke-white fill-none">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-3 pb-16">
        {/* Title */}
        <div className="mb-2">
          <h1 className="text-xl font-bold text-gray-800">Return Cold Chain Product</h1>
          <p className="text-sm text-gray-600">Document products returning to refrigeration</p>
        </div>
        
        {/* Warning Banner - Following exact guidelines structure */}
        <div className="bg-yellow-50 border-2 border-yellow-500 rounded p-2 mb-2 flex items-center">
          <div className="w-7 h-7 rounded-full bg-yellow-500 flex items-center justify-center text-white mr-2">
            <AlertTriangle size={14} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-yellow-800 text-sm">WARNING: Approaching Exposure Limit</h3>
            <p className="text-yellow-800 italic font-semibold animate-pulse text-xs">Case #C002 has 30 minutes remaining before exposure time limit.</p>
          </div>
          <button className="px-2 py-1 bg-yellow-800 text-white rounded-full text-xs">View</button>
        </div>
        
        {/* License Plate Scan Section */}
        <div className="mb-2 bg-gray-50 border border-gray-200 rounded p-2">
          <h2 className="text-xs font-bold text-gray-800 mb-1">Scan License Plate or Enter Product ID</h2>
          
          <div className="grid grid-cols-3 gap-2 items-end">
            <div className="col-span-1">
              <label className="block text-xs text-gray-700 mb-1">License Plate / Product ID*</label>
              <input type="text" className="w-full text-sm rounded border border-gray-300 p-1" defaultValue="P001" />
            </div>
            
            <button style={{backgroundColor: COLORS.primaryRed}} className="text-white rounded-full py-1 px-2 flex items-center justify-center text-xs h-8">
              <Camera size={12} className="mr-1" />
              Scan License Plate
            </button>
            
            <button style={{backgroundColor: COLORS.primaryBlue}} className="text-white rounded-full py-1 px-2 flex items-center justify-center text-xs h-8">
              <Search size={12} className="mr-1" />
              Find Product
            </button>
          </div>
        </div>
        
        {/* Product Details Section */}
        <div className="mb-2">
          <h2 className="text-xs font-bold text-gray-800 mb-1">Product Details</h2>
          
          <div className="bg-gray-50 border border-gray-200 rounded p-2">
            {/* Product Information and Time Indicators in one row */}
            <div className="grid grid-cols-3 gap-2 mb-2">
              <div className="col-span-2">
                <h3 className="font-semibold text-gray-800 mb-1 text-sm">Pallet #P001</h3>
                
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div className="text-gray-600">Work Order:</div>
                  <div>#11520 (Cold Chain Batch A)</div>
                  
                  <div className="text-gray-600">Lot Number:</div>
                  <div>PZFAE23</div>
                  
                  <div className="text-gray-600">Line:</div>
                  <div>Production 3</div>
                  
                  <div className="text-gray-600">Time Out of Cooler:</div>
                  <div>09:30 AM (Today)</div>
                  
                  <div className="text-gray-600">Current Status:</div>
                  <div className="inline-block bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">Packaging</div>
                </div>
              </div>
              
              {/* Time Circular Indicator */}
              <div className="bg-white rounded p-2 flex flex-col items-center justify-center">
                <div className="relative w-20 h-20 mb-1">
                  {/* Circular border with color based on time remaining */}
                  <div className="absolute inset-0 rounded-full border-8 border-green-500"></div>
                  
                  {/* Center content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="font-bold text-lg text-green-600">8:44</div>
                    <div className="text-xs text-gray-600">Remaining</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-x-2 w-full text-xs">
                  <div className="text-gray-600">Allowed:</div>
                  <div className="text-right">14:00:00</div>
                  
                  <div className="text-gray-600">Used:</div>
                  <div className="text-right">05:15:23</div>
                </div>
              </div>
            </div>
            
            {/* Return Details and Quality Assessment side by side */}
            <div className="grid grid-cols-2 gap-2">
              {/* Return Details */}
              <div className="border border-gray-200 rounded bg-white p-2">
                <h3 className="font-semibold text-gray-800 mb-1 text-xs">Return Details</h3>
                
                <div className="space-y-1">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-700">Quantity Pulled*</label>
                      <input type="number" className="w-full text-xs rounded border border-gray-300 p-1 bg-gray-100" disabled defaultValue="4" />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-700">Quantity Returning*</label>
                      <input type="number" className="w-full text-xs rounded border border-gray-300 p-1" defaultValue="4" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-700">Type*</label>
                    <select className="w-full text-xs rounded border border-gray-300 p-1">
                      <option>Pallet</option>
                      <option>Case</option>
                      <option>Tray</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="flex items-center text-xs">
                      <input type="checkbox" className="mr-1" />
                      Partial Return
                    </label>
                  </div>
                </div>
              </div>
              
              {/* Quality Assessment Section */}
              <div className="border border-gray-200 rounded bg-white p-2">
                <h3 className="font-semibold text-gray-800 mb-1 text-xs">Quality Assessment</h3>
                
                <div className="space-y-1">
                  <div>
                    <label className="block text-xs text-gray-700">Temperature Compliant*</label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input type="radio" name="temperature" className="mr-1" defaultChecked />
                        <span className="text-xs">Yes (2-8°C)</span>
                      </label>
                      
                      <label className="flex items-center">
                        <input type="radio" name="temperature" className="mr-1" />
                        <span className="text-xs">No</span>
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs text-gray-700">Product Condition*</label>
                    <select className="w-full text-xs rounded border border-gray-300 p-1">
                      <option>Acceptable</option>
                      <option>Minor damage (usable)</option>
                      <option>Damaged (not usable)</option>
                      <option>Requires inspection</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-gray-700">QA Code</label>
                      <input type="text" className="w-full text-xs rounded border border-gray-300 p-1" placeholder="QA code" />
                    </div>
                    
                    <div>
                      <label className="block text-xs text-gray-700">Notes</label>
                      <input type="text" className="w-full text-xs rounded border border-gray-300 p-1" placeholder="Optional" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Return Location Section */}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs text-gray-700">Return Location Type*</label>
                <select className="w-full text-xs rounded border border-gray-300 p-1">
                  <option>Cold Storage</option>
                  <option>Refrigeration Unit</option>
                  <option>Freezer</option>
                  <option>Temperature-Controlled Area</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs text-gray-700">Return Location*</label>
                <select className="w-full text-xs rounded border border-gray-300 p-1">
                  <option>Cold Storage A</option>
                  <option>Refrigeration Unit B12</option>
                  <option>Main Cooler</option>
                  <option>Staging Area Cooler</option>
                </select>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-end gap-2 mt-2">
              <button className="bg-gray-200 text-gray-700 rounded-full py-1 px-3 text-xs">
                Cancel
              </button>
              <button style={{backgroundColor: COLORS.primaryBlue}} className="text-white rounded-full py-1 px-3 text-xs flex items-center">
                <CheckCircle size={12} className="mr-1" />
                Confirm & Return to Cooler
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
          
          <div className="flex flex-col items-center text-gray-600">
            <Package size={20} />
            <span className="text-xs">Pull Product</span>
          </div>
          
          <div className="flex flex-col items-center text-gray-600">
            <Clock size={20} />
            <span className="text-xs">Active Products</span>
          </div>
          
          <div className="flex flex-col items-center" style={{color: COLORS.primaryRed}}>
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
      
      {/* Footer - Acsis Branding */}
      <footer style={{background: `linear-gradient(to right, ${COLORS.primaryRed}, ${COLORS.primaryBlue})`}} className="fixed bottom-0 w-full text-white text-xs p-1 text-center z-10">
        <p>TOR Cold Chain Tracker v1.0 | © 2025 Acsis, Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ReturnProductScreen;