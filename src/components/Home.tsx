import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Home = () => {
    return (
        <>
            {/* Title */}
            <div className="mb-3">
                <h1 className="text-xl font-bold text-gray-800">Dashboard - Cold Chain Overview</h1>
                <p className="text-sm text-gray-600">Monitor and manage all cold chain operations</p>
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
        </>
    );
};

export default Home;