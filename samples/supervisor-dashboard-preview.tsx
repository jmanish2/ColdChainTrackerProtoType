import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Clock, Package, Home, RotateCw, BarChart2, Settings, AlertTriangle, Calendar, ChevronRight } from 'lucide-react';

const SupervisorDashboard = () => {
  // Sample data
  const hourlyActivityData = [
    { name: '6 AM', pulls: 0, returns: 0 },
    { name: '7 AM', pulls: 1, returns: 0 },
    { name: '8 AM', pulls: 1, returns: 0 },
    { name: '9 AM', pulls: 2, returns: 1 },
    { name: '10 AM', pulls: 1, returns: 1 },
    { name: '11 AM', pulls: 1, returns: 1 },
    { name: '12 PM', pulls: 0, returns: 2 },
  ];

  const returnTimelineData = [
    { name: '12 PM', normal: 0, warning: 0, critical: 0 },
    { name: '1 PM', normal: 0, warning: 0, critical: 0 },
    { name: '2 PM', normal: 0, warning: 0, critical: 0 },
    { name: '3 PM', normal: 0, warning: 0, critical: 0 },
    { name: '4 PM', normal: 0, warning: 0, critical: 0 },
    { name: '5 PM', normal: 0, warning: 0, critical: 0 },
    { name: '6 PM', normal: 0, warning: 0, critical: 0 },
    { name: '7 PM', normal: 0, warning: 0, critical: 0 },
    { name: '8 PM', normal: 1, warning: 1, critical: 0 },
  ];

  const weeklyTrendData = [
    { name: 'Mon', compliance: 91 },
    { name: 'Tue', compliance: 88 },
    { name: 'Wed', compliance: 95 },
    { name: 'Thu', compliance: 94 },
    { name: 'Fri', compliance: 93 },
  ];

  // Active products data
  const activeProductsData = {
    critical: [],
    warning: [
      {
        id: 'C002',
        type: 'Case',
        workOrder: '#11520',
        line: 'Production 3',
        locationType: 'QC',
        location: 'QC Lab 1',
        timeOut: '08:15 AM',
        timeRemaining: '0:30',
        returnBy: '10:45 PM'
      }
    ],
    normal: [
      {
        id: 'P001',
        type: 'Pallet',
        workOrder: '#11520',
        line: 'Production 3',
        locationType: 'Packaging',
        location: 'Line 2',
        timeOut: '09:30 AM',
        timeRemaining: '8:45',
        returnBy: '11:30 PM'
      },
      {
        id: 'T003',
        type: 'Tray',
        workOrder: '#11521',
        line: 'Production 4',
        locationType: 'Staging',
        location: 'Zone B',
        timeOut: '10:45 AM',
        timeRemaining: '12:15',
        returnBy: '12:45 AM'
      }
    ]
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-700 to-blue-900 text-white p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="font-bold text-xl">pci</div>
            <div className="flex items-center text-lg font-semibold text-white">
              Cold Chain Tracking
              <div className="w-2 h-2 rounded-full bg-green-500 ml-2"></div>
            </div>
          </div>
          
          <div className="flex items-center bg-white bg-opacity-10 px-4 py-2 rounded-md">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">0</div>
              <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white font-bold">1</div>
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">2</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center bg-white bg-opacity-10 px-4 py-1 rounded-full mr-2">
              <span>ACALITO | WHS | Rockford</span>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-2 pb-16">
        {/* Title and Date Filter */}
        <div className="flex justify-between items-center mb-2">
          <div>
            <h1 className="text-lg font-bold text-gray-800">Dashboard</h1>
            <p className="text-xs text-gray-600">Cold Chain Monitoring Overview</p>
          </div>
          
          <div className="flex items-center bg-white border rounded p-1">
            <Calendar size={14} className="text-gray-500 ml-1 mr-1" />
            <select className="text-xs py-0.5 px-1 border-0">
              <option>Today</option>
              <option>Yesterday</option>
            </select>
          </div>
        </div>
        
        {/* Warning Banner */}
        <div className="bg-yellow-50 border-2 border-yellow-500 rounded p-2 mb-2 flex items-center">
          <div className="w-7 h-7 rounded-full bg-yellow-500 flex items-center justify-center text-white mr-2">
            <AlertTriangle size={14} />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-yellow-800 text-sm">WARNING: Approaching Exposure Limit</h3>
            <p className="text-yellow-800 italic font-semibold text-xs">Case #C002 has 30 minutes remaining before exposure time limit.</p>
          </div>
          <button className="px-2 py-1 bg-yellow-800 text-white rounded-full text-xs">View</button>
        </div>
        
        {/* Status Overview Cards */}
        <div className="grid grid-cols-4 gap-2 mb-2">
          <div className="bg-white rounded-lg border border-gray-200 p-2 flex flex-col items-center justify-center">
            <div className="text-xs text-gray-600">Total Products</div>
            <div className="text-2xl font-bold">3</div>
            <div className="text-xs text-gray-600">Active</div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-2 flex flex-col items-center justify-center">
            <div className="text-xs text-gray-600">Today's Activity</div>
            <div className="text-2xl font-bold">7</div>
            <div className="text-xs text-gray-600">Transactions</div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-2 flex flex-col items-center justify-center">
            <div className="text-xs text-gray-600">Avg. Time Out</div>
            <div className="text-2xl font-bold">4:37</div>
            <div className="text-xs text-gray-600">Hours:Min</div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-2 flex flex-col items-center justify-center">
            <div className="text-xs text-gray-600">Compliance Rate</div>
            <div className="text-2xl font-bold">93%</div>
            <div className="text-xs text-gray-600">Success</div>
          </div>
        </div>
        
        {/* First Row of Charts */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          {/* Hourly Activity Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-2">
            <h2 className="text-xs font-bold text-gray-800 mb-1">Today's Activity by Hour</h2>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyActivityData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{fontSize: 10}} />
                  <YAxis tick={{fontSize: 10}} />
                  <Tooltip />
                  <Bar dataKey="pulls" fill="#0b3b60" name="Pulls" />
                  <Bar dataKey="returns" fill="#60a5fa" name="Returns" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Return Timeline Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-2">
            <h2 className="text-xs font-bold text-gray-800 mb-1">Return Timeline - Next 8 Hours</h2>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={returnTimelineData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" tick={{fontSize: 10}} />
                  <YAxis tick={{fontSize: 10}} />
                  <Tooltip />
                  <Bar dataKey="normal" stackId="a" fill="#10b981" name="Normal" />
                  <Bar dataKey="warning" stackId="a" fill="#f59e0b" name="Warning" />
                  <Bar dataKey="critical" stackId="a" fill="#ef4444" name="Critical" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        
        {/* Weekly Compliance Trend */}
        <div className="bg-white rounded-lg border border-gray-200 p-2 mb-2">
          <h2 className="text-xs font-bold text-gray-800 mb-1">Weekly Compliance Trend</h2>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyTrendData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize: 10}} />
                <YAxis domain={[80, 100]} tick={{fontSize: 10}} />
                <Tooltip />
                <Line type="monotone" dataKey="compliance" stroke="#10b981" name="Compliance %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Active Products Status Grouping */}
        <div className="bg-white rounded-lg border border-gray-200 p-2 mb-14">
          <h2 className="text-xs font-bold text-gray-800 mb-1">Active Products by Status</h2>
          
          {/* Critical Section - Empty but showing header */}
          <div>
            <div className="flex items-center bg-red-50 p-2 rounded-t border border-red-200">
              <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
              <span className="font-semibold text-red-800">Critical</span>
              <div className="ml-2 px-2 py-0.5 bg-white rounded-full text-xs text-red-800">0</div>
              <div className="ml-auto">
                <ChevronRight size={16} className="text-red-800" />
              </div>
            </div>
          </div>
          
          {/* Warning Section */}
          <div className="mt-2">
            <div className="flex items-center bg-yellow-50 p-2 rounded-t border border-yellow-200">
              <div className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></div>
              <span className="font-semibold text-yellow-800">Warning</span>
              <div className="ml-2 px-2 py-0.5 bg-white rounded-full text-xs text-yellow-800">1</div>
              <div className="ml-auto">
                <ChevronRight size={16} className="text-yellow-800" />
              </div>
            </div>
            <div className="border-l border-r border-b border-yellow-200 rounded-b p-2 mb-2">
              {activeProductsData.warning.map((product) => (
                <div key={product.id} className="flex justify-between items-center p-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-11 h-11 rounded-full border-4 border-yellow-500 flex flex-col items-center justify-center">
                      <div className="text-yellow-600 font-bold text-xs">{product.timeRemaining}</div>
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold text-sm">{product.type} #{product.id}</div>
                      <div className="text-xs text-gray-500">{product.workOrder} • {product.line}</div>
                      <div className="text-xs text-gray-500">{product.locationType} - {product.location}</div>
                    </div>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <div>Out: {product.timeOut}</div>
                    <div>Return by: {product.returnBy}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Normal Section */}
          <div className="mt-2">
            <div className="flex items-center bg-green-50 p-2 rounded-t border border-green-200">
              <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
              <span className="font-semibold text-green-800">Normal</span>
              <div className="ml-2 px-2 py-0.5 bg-white rounded-full text-xs text-green-800">2</div>
              <div className="ml-auto">
                <ChevronRight size={16} className="text-green-800" />
              </div>
            </div>
            <div className="border-l border-r border-b border-green-200 rounded-b p-2">
              {activeProductsData.normal.map((product) => (
                <div key={product.id} className="flex justify-between items-center p-2 border-b border-gray-100">
                  <div className="flex items-center">
                    <div className="w-11 h-11 rounded-full border-4 border-green-500 flex flex-col items-center justify-center">
                      <div className="text-green-600 font-bold text-xs">{product.timeRemaining}</div>
                    </div>
                    <div className="ml-3">
                      <div className="font-semibold text-sm">{product.type} #{product.id}</div>
                      <div className="text-xs text-gray-500">{product.workOrder} • {product.line}</div>
                      <div className="text-xs text-gray-500">{product.locationType} - {product.location}</div>
                    </div>
                  </div>
                  <div className="text-right text-xs text-gray-500">
                    <div>Out: {product.timeOut}</div>
                    <div>Return by: {product.returnBy}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 py-1 z-20">
        <div className="flex justify-around items-center">
          <div className="flex flex-col items-center text-red-700">
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
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-red-700 to-blue-900 fixed bottom-0 w-full text-white text-xs p-1 text-center z-10">
        <p>TOR Cold Chain Tracker v1.0 | © 2025 Acsis, Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SupervisorDashboard;