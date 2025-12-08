import React from 'react';

const ButtonGroup = ({ buttons = [] }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {buttons.map((button, idx) => (
        <button
          key={idx}
          onClick={button.onClick}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 ${
            button.className || 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
