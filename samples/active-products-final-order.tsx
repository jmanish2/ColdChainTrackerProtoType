import React from 'react';
import { ChevronDown, Clock, Package, Home, RotateCw, BarChart2, Settings, AlertTriangle, Search, Camera, Download, Printer, Calendar } from 'lucide-react';

// Define primary colors to reference in style props when needed
const COLORS = {
  primaryRed: '#b22234',
  primaryBlue: '#0b3b60',
  green: '#10b981',
  yellow: '#f59e0b',
  red: '#ef4444'
};

const ActiveProductsScreen = () => {
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
      <main className="flex-1 overflow-y-auto p-2 pb-16">
        {/* Title and basic info */}
        <div className="mb-2">
          <h1 className="text-lg font-bold text-gray-800">Active Products</h1>
          <p className="text-xs text-gray-600">Monitoring cold chain products currently out of refrigeration</p>
        </div>
        
        {/* Warning Banner - Positioned FIRST */}
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
        
        {/* License Plate Scan Section - Positioned SECOND */}
        <div className="bg-white rounded border border-gray-200 p-2 mb-2">
          <h2 className="text-xs font-bold text-gray-800 mb-1">Scan License Plate or Enter Product ID</h2>
          
          <div className="grid grid-cols-5 gap-2 items-end">
            <div className="col-span-3">
              <label className="block text-xs text-gray-700 mb-1">License Plate / Product ID*</label>
              <input type="text" className="w-full text-sm rounded border border-gray-300 p-2" placeholder="Enter ID" />
            </div>
            
            <button style={{backgroundColor: COLORS.primaryRed}} className="text-white rounded-full py-2 px-3 flex items-center justify-center text-sm">
              <Camera size={14} className="mr-1" />
              Scan License Plate
            </button>
            
            <button style={{backgroundColor: COLORS.primaryBlue}} className="text-white rounded-full py-2 px-3 flex items-center justify-center text-sm">
              <Search size={14} className="mr-1" />
              Find Product
            </button>
          </div>
        </div>
        
        {/* Filters */}
        <div className="bg-white rounded border border-gray-200 p-2 mb-2">
          <div className="flex justify-between items-center mb-2">
            <div className="text-xs font-bold text-gray-700">Filters</div>
            
            {/* Export/Print */}
            <div className="flex gap-1">
              <button className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded-full border border-gray-300">
                <Download size={12} className="mr-1" />
                Export
              </button>
              <button className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded-full border border-gray-300">
                <Printer size={12} className="mr-1" />
                Print
              </button>
            </div>
          </div>
          
          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1">
            <div className="flex items-center bg-white border rounded-full px-2 py-0.5">
              <span className="text-xs text-gray-600 mr-1">Status:</span>
              <span className="text-xs">All</span>
              <ChevronDown size={10} className="ml-1 text-gray-500" />
            </div>
            
            <div className="flex items-center bg-white border rounded-full px-2 py-0.5">
              <span className="text-xs text-gray-600 mr-1">Time:</span>
              <span className="text-xs">All</span>
              <ChevronDown size={10} className="ml-1 text-gray-500" />
            </div>
            
            <div className="flex items-center bg-white border rounded-full px-2 py-0.5">
              <span className="text-xs text-gray-600 mr-1">Line:</span>
              <span className="text-xs">All Lines</span>
              <ChevronDown size={10} className="ml-1 text-gray-500" />
            </div>
            
            {/* Location Type Filter */}
            <div className="flex items-center bg-white border rounded-full px-2 py-0.5">
              <span className="text-xs text-gray-600 mr-1">Location Type:</span>
              <span className="text-xs">All</span>
              <ChevronDown size={10} className="ml-1 text-gray-500" />
            </div>
            
            {/* Location Filter */}
            <div className="flex items-center bg-white border rounded-full px-2 py-0.5">
              <span className="text-xs text-gray-600 mr-1">Location:</span>
              <span className="text-xs">All</span>
              <ChevronDown size={10} className="ml-1 text-gray-500" />
            </div>
            
            <div className="flex items-center bg-white border rounded-full px-2 py-0.5">
              <span className="text-xs text-gray-600 mr-1">Work Order:</span>
              <span className="text-xs">All</span>
              <ChevronDown size={10} className="ml-1 text-gray-500" />
            </div>
            
            {/* Quick Status Filter Chips */}
            <button className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full border border-yellow-300">
              Warning
            </button>
            <button className="bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded-full border border-red-300">
              Critical
            </button>
            <button className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full border border-blue-300">
              Recent
            </button>
          </div>
        </div>
        
        {/* Active Products List */}
        <div className="bg-white rounded border border-gray-200 overflow-hidden mb-2">
          {/* Table Header */}
          <div className="bg-gray-100 p-2 grid grid-cols-12 gap-1 text-xs font-semibold text-gray-700">
            <div className="col-span-2">Product ID</div>
            <div className="col-span-1">Work Order</div>
            <div className="col-span-1">Line</div>
            <div className="col-span-1">Location Type</div>
            <div className="col-span-1">Location</div>
            <div className="col-span-1">Time Out</div>
            <div className="col-span-1">Return By</div>
            <div className="col-span-4 text-right">Time Remaining</div>
          </div>
          
          {/* Product Row - Normal */}
          <div className="p-2 grid grid-cols-12 gap-1 text-xs border-b border-gray-200">
            <div className="col-span-2">
              <div className="font-semibold">Pallet #P001</div>
              <div className="text-gray-500">PZFAE23</div>
            </div>
            <div className="col-span-1">
              <div>#11520</div>
              <div className="text-gray-500">Batch A</div>
            </div>
            <div className="col-span-1">Production 3</div>
            <div className="col-span-1">Packaging</div>
            <div className="col-span-1">Line 2</div>
            <div className="col-span-1">
              <div>09:30 AM</div>
              <div className="text-gray-500">Today</div>
            </div>
            <div className="col-span-1">
              <div>11:30 PM</div>
              <div className="text-gray-500">Today</div>
            </div>
            <div className="col-span-4">
              <div className="flex items-center justify-end gap-2">
                <div className="w-11 h-11 rounded-full border-4 border-green-500 flex flex-col items-center justify-center">
                  <div className="text-green-600 font-bold">8:45</div>
                </div>
                <div className="flex flex-col gap-1">
                  <select className="text-xs border rounded p-0.5 w-28">
                    <option>Production Area</option>
                    <option>Packaging</option>
                    <option>QC Lab</option>
                  </select>
                  <select className="text-xs border rounded p-0.5 w-28">
                    <option>Line 2</option>
                    <option>Line 3</option>
                    <option>QC Station 1</option>
                  </select>
                </div>
                <button style={{backgroundColor: COLORS.primaryBlue}} className="text-white text-xs rounded-full px-2 py-1 h-8">
                  Change Location
                </button>
              </div>
            </div>
          </div>
          
          {/* Product Row - Warning */}
          <div className="p-2 grid grid-cols-12 gap-1 text-xs border-b border-gray-200 bg-yellow-50">
            <div className="col-span-2">
              <div className="font-semibold">Case #C002</div>
              <div className="text-gray-500">PZFAE23</div>
            </div>
            <div className="col-span-1">
              <div>#11520</div>
              <div className="text-gray-500">Batch A</div>
            </div>
            <div className="col-span-1">Production 3</div>
            <div className="col-span-1">QC</div>
            <div className="col-span-1">QC Lab 1</div>
            <div className="col-span-1">
              <div>08:15 AM</div>
              <div className="text-gray-500">Today</div>
            </div>
            <div className="col-span-1">
              <div>10:45 PM</div>
              <div className="text-gray-500">Today</div>
            </div>
            <div className="col-span-4">
              <div className="flex items-center justify-end gap-2">
                <div className="w-11 h-11 rounded-full border-4 border-yellow-500 flex flex-col items-center justify-center">
                  <div className="text-yellow-600 font-bold">0:30</div>
                </div>
                <div className="flex flex-col gap-1">
                  <select className="text-xs border rounded p-0.5 w-28">
                    <option>QC</option>
                    <option>Production Area</option>
                    <option>Packaging</option>
                  </select>
                  <select className="text-xs border rounded p-0.5 w-28">
                    <option>QC Lab 1</option>
                    <option>QC Lab 2</option>
                    <option>Line 3</option>
                  </select>
                </div>
                <button style={{backgroundColor: COLORS.primaryBlue}} className="text-white text-xs rounded-full px-2 py-1 h-8">
                  Change Location
                </button>
              </div>
            </div>
          </div>
          
          {/* Product Row - Normal */}
          <div className="p-2 grid grid-cols-12 gap-1 text-xs border-b border-gray-200">
            <div className="col-span-2">
              <div className="font-semibold">Tray #T003</div>
              <div className="text-gray-500">PZFAE24</div>
            </div>
            <div className="col-span-1">
              <div>#11521</div>
              <div className="text-gray-500">Batch B</div>
            </div>
            <div className="col-span-1">Production 4</div>
            <div className="col-span-1">Staging</div>
            <div className="col-span-1">Zone B</div>
            <div className="col-span-1">
              <div>10:45 AM</div>
              <div className="text-gray-500">Today</div>
            </div>
            <div className="col-span-1">
              <div>12:45 AM</div>
              <div className="text-gray-500">Tomorrow</div>
            </div>
            <div className="col-span-4">
              <div className="flex items-center justify-end gap-2">
                <div className="w-11 h-11 rounded-full border-4 border-green-500 flex flex-col items-center justify-center">
                  <div className="text-green-600 font-bold">12:15</div>
                </div>
                <div className="flex flex-col gap-1">
                  <select className="text-xs border rounded p-0.5 w-28">
                    <option>Staging</option>
                    <option>Production Area</option>
                    <option>Packaging</option>
                  </select>
                  <select className="text-xs border rounded p-0.5 w-28">
                    <option>Zone B</option>
                    <option>Zone A</option>
                    <option>Zone C</option>
                  </select>
                </div>
                <button style={{backgroundColor: COLORS.primaryBlue}} className="text-white text-xs rounded-full px-2 py-1 h-8">
                  Change Location
                </button>
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
          
          <div className="flex flex-col items-center" style={{color: COLORS.primaryRed}}>
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
      
      {/* Footer - Acsis Branding */}
      <footer style={{background: `linear-gradient(to right, ${COLORS.primaryRed}, ${COLORS.primaryBlue})`}} className="fixed bottom-0 w-full text-white text-xs p-1 text-center z-10">
        <p>TOR Cold Chain Tracker v1.0 | © 2025 Acsis, Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ActiveProductsScreen;