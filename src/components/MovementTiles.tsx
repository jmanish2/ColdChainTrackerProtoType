import React, { useState, useEffect } from 'react';
import { Truck, Thermometer, Route, Package, ClipboardCheck, ArrowLeft, Forklift } from 'lucide-react';
import ReceivingDockIntake from './ReceivingDockIntake';
import PullProduct from './PullProduct';
import ReportForProduction from './ReportForProduction';
import FinishedGoodsStorage from './FinishedGoodsStorage';
import LineAccountability from './LineAccountability';


// Define primary colors to reference in style props when needed
const COLORS = {
    primaryRed: '#b22234',
    primaryBlue: '#0b3b60'
};

// Define tile options
const movementOptions = [
    {
        id: 'receiving-dock',
        name: 'Receiving Dock Intake',
        description: 'Process incoming shipments from suppliers into cold chain storage',
        icon: Truck,
        color: COLORS.primaryRed
    },
    {
        id: 'storage-retrieval',
        name: 'Pull Product',
        description: 'Pull temperature-sensitive product from refrigerated storage',
        icon: Thermometer,
        color: COLORS.primaryBlue
    },
    {
        id: 'production-consumption',
        name: 'Product Introduction',
        description: 'Report consumption of cold chain materials for finished goods manufacturing',
        icon: Route,
        color: COLORS.primaryBlue
    },
    {
        id: 'finished-goods',
        name: 'Finished Goods Storage',
        description: 'Transfer finished goods to refrigerated storage before shipping',
        icon: Forklift,
        color: COLORS.primaryBlue
    },
    {
        id: 'line-accountability',
        name: 'Line Accountability',
        description: 'Clear production line and report remaining materials for proper storage',
        icon: ClipboardCheck,
        color: COLORS.primaryRed
    }
];

interface MovementTilesProps {
    resetTrigger?: number; // Add this prop to trigger resets
}

const MovementTiles: React.FC<MovementTilesProps> = ({ resetTrigger }) => {
    const [selectedMovement, setSelectedMovement] = useState<string | null>(null);

    // Reset selectedMovement when resetTrigger changes
    useEffect(() => {
        setSelectedMovement(null);
    }, [resetTrigger]);

    const handleSelectMovement = (movementId: string) => {
        setSelectedMovement(movementId);
    };

    const handleBack = () => {
        setSelectedMovement(null);
    };

    // Render the selected movement component
    const renderSelectedMovement = () => {
        switch (selectedMovement) {
            case 'receiving-dock':
                return <ReceivingDockIntake onBack={handleBack} />;
            case 'storage-retrieval':
                return <PullProduct onBack={handleBack} />;
            case 'production-consumption':
                return <ReportForProduction onBack={handleBack} />;
            case 'finished-goods':
                return <FinishedGoodsStorage onBack={handleBack} />;
            case 'line-accountability':
                return <LineAccountability onBack={handleBack} />;
            default:
                return (
                    <div className="text-center p-8">
                        <p className="text-gray-600">Component for this tile is not yet implemented.</p>
                        <button
                            onClick={handleBack}
                            className="mt-4 text-blue-600 hover:text-blue-800"
                        >
                            ← Back to tiles
                        </button>
                    </div>
                );
        }
    };

    // If a movement is selected, render its component
    if (selectedMovement) {
        return renderSelectedMovement();
    }

    // Otherwise, show the tile grid
    return (
        <>
            <div className="mb-3">
                <h1 className="text-xl font-bold text-gray-800">Move Product</h1>
                <p className="text-sm text-gray-600">Select cold chain task</p>
            </div>

            <div className="grid grid-cols-3 gap-3">
                {movementOptions.map((option) => (
                    <div
                        key={option.id}
                        className="bg-white border border-gray-200 shadow-sm rounded-lg p-4 flex flex-col items-center cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleSelectMovement(option.id)}
                    >
                        <div
                            className="w-12 h-12 rounded-full flex items-center justify-center mb-2"
                            style={{ backgroundColor: option.color }}
                        >
                            <option.icon size={20} className="text-white" />
                        </div>
                        <h3 className="font-bold text-sm text-gray-800">{option.name}</h3>
                        <p className="text-xs text-gray-500 text-center mt-1">
                            {option.description}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default MovementTiles;