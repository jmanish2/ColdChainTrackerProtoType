import React, { useState } from 'react';
import { ArrowLeft, AlertTriangle, Camera, Upload, Clock, ClockArrowUp } from 'lucide-react';

// Define primary colors to reference in style props when needed
const COLORS = {
    primaryRed: '#b22234',
    primaryBlue: '#0b3b60'
};

interface TORExtensionProps {
    onBack: () => void;
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
                    className="text-white rounded-full py-2 px-3 text-sm whitespace-nowrap"
                    onClick={handleScanPallet}
                >
                    <Camera size={12} className="mr-1 inline" />
                    Scan Pallet
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
        </>
    );
};

export default TORExtension;