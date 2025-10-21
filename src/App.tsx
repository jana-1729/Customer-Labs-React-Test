import React, { useState } from 'react';
import Modal from './components/Modal';
import SegmentPopup from './components/SegmentPopup';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          View Audience
        </h1>
        <button
          onClick={openModal}
          className="bg-white text-gray-700 border-2 border-gray-300 px-6 py-3 rounded hover:bg-gray-50 transition-colors font-medium"
        >
          Save segment
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <SegmentPopup onClose={closeModal} />
      </Modal>
    </div>
  );
}

export default App;
