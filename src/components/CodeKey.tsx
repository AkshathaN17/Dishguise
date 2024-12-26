import React from 'react';

export const CodeKey: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Recipe Categories Guide</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-800">Cuisine Types:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Indian Recipes - Physical abuse support</li>
              <li>Italian Recipes - Emotional abuse support</li>
              <li>Chinese Recipes - Sexual assault support</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Course Types:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Starter - Initial support</li>
              <li>Main Course - Intermediate assistance</li>
              <li>Dessert - Urgent intervention</li>
            </ul>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="mt-6 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Close
        </button>
      </div>
    </div>
  );
};