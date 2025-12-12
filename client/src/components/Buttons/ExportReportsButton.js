import React from 'react';


const ExportReportsButton = ({ reportType, format, onExport }) => {
    return (
        <button
            onClick={onExport}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-150 ease-in-out shadow-md"
        >
            Export {reportType} as {format.toUpperCase()}
        </button>
    );
};

export default ExportReportsButton;