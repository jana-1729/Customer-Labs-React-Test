import React, { useState } from 'react';
import { SchemaOption, SelectedSchema, SegmentData } from '../types';
import { SCHEMA_OPTIONS, WEBHOOK_URL } from '../constants';

interface SegmentPopupProps {
  onClose: () => void;
}

const SegmentPopup: React.FC<SegmentPopupProps> = ({ onClose }) => {
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState<SelectedSchema[]>([]);
  const [currentSelection, setCurrentSelection] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const getAvailableOptions = (): SchemaOption[] => {
    const selectedValues = selectedSchemas.map((schema) => schema.value);
    return SCHEMA_OPTIONS.filter(
      (option) => !selectedValues.includes(option.value)
    );
  };

  const handleAddSchema = (value: string) => {
    if (!value) return;

    const selectedOption = SCHEMA_OPTIONS.find(
      (opt) => opt.value === value
    );

    if (selectedOption) {
      const newSchema: SelectedSchema = {
        id: `${Date.now()}-${Math.random()}`,
        value: selectedOption.value,
        label: selectedOption.label,
      };

      setSelectedSchemas([...selectedSchemas, newSchema]);
      setCurrentSelection('');
    }
  };

  // Handle removing a schema
  const handleRemoveSchema = (id: string) => {
    setSelectedSchemas(selectedSchemas.filter((schema) => schema.id !== id));
  };

  // Handle changing an existing schema
  const handleChangeSchema = (id: string, newValue: string) => {
    const selectedOption = SCHEMA_OPTIONS.find((opt) => opt.value === newValue);

    if (selectedOption) {
      setSelectedSchemas(
        selectedSchemas.map((schema) =>
          schema.id === id
            ? { ...schema, value: newValue, label: selectedOption.label }
            : schema
        )
      );
    }
  };

  const getAvailableOptionsForDropdown = (currentId: string): SchemaOption[] => {
    const selectedValues = selectedSchemas
      .filter((schema) => schema.id !== currentId)
      .map((schema) => schema.value);

    return SCHEMA_OPTIONS.filter(
      (option) => !selectedValues.includes(option.value)
    );
  };

  // Get trait type for a value
  const getTraitType = (value: string): 'user' | 'group' => {
    const option = SCHEMA_OPTIONS.find((opt) => opt.value === value);
    return option?.trait || 'user';
  };

  // Handle save
  const handleSave = async () => {
    if (!segmentName.trim()) {
      alert('Please enter a segment name');
      return;
    }

    if (selectedSchemas.length === 0) {
      alert('Please add at least one schema');
      return;
    }

    const data: SegmentData = {
      segment_name: segmentName,
      schema: selectedSchemas.map((schema) => ({
        [schema.value]: schema.label,
      })),
    };

    setIsSaving(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert('Segment saved successfully!');
        console.log('Sent data:', data);
        onClose();
      } else {
        alert('Failed to save segment');
      }
    } catch (error) {
      console.error('Error saving segment:', error);
      alert('Error saving segment. Check console for details.');
    } finally {
      setIsSaving(false);
    }
  };

  const availableOptions = getAvailableOptions();

  return (
    <div className="flex flex-col h-full">
      <div className="bg-teal-600 text-white px-6 py-4 flex items-center">
        <button onClick={onClose} className="mr-3 hover:opacity-80">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h2 className="text-xl font-medium">Saving Segment</h2>
      </div>

      <div className="flex-1 px-6 py-6 overflow-y-auto">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter the Name of the Segment
          </label>
          <input
            type="text"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            placeholder="Name of the segment"
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        <p className="text-sm text-gray-700 mb-4">
          To save your segment, you need to add the schemas to build the query
        </p>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            <span className="text-sm text-gray-600">- User Traits</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full"></span>
            <span className="text-sm text-gray-600">- Group Traits</span>
          </div>
        </div>

        {selectedSchemas.length > 0 && (
          <div className="border-2 border-blue-400 rounded p-4 mb-4 bg-blue-50">
            <div className="space-y-3">
              {selectedSchemas.map((schema) => {
                const trait = getTraitType(schema.value);
                const availableOpts = getAvailableOptionsForDropdown(schema.id);

                return (
                  <div key={schema.id} className="flex items-center gap-3">
                    {/* Trait Indicator */}
                    <span
                      className={`w-3 h-3 rounded-full flex-shrink-0 ${
                        trait === 'user' ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    ></span>

                    <select
                      value={schema.value}
                      onChange={(e) =>
                        handleChangeSchema(schema.id, e.target.value)
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value={schema.value}>{schema.label}</option>
                      {availableOpts.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>

                    <button
                      onClick={() => handleRemoveSchema(schema.id)}
                      className="text-gray-400 hover:text-gray-600 flex-shrink-0"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20 12H4"
                        />
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {availableOptions.length > 0 && (
          <div className="flex items-center gap-3 mb-4">
            <span className="w-3 h-3 bg-gray-300 rounded-full flex-shrink-0"></span>
            <select
              value={currentSelection}
              onChange={(e) => handleAddSchema(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">Add schema to segment</option>
              {availableOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="w-5"></div>
          </div>
        )}

        <button
          onClick={() => handleAddSchema(currentSelection)}
          disabled={!currentSelection}
          className={`text-teal-600 text-sm hover:underline flex items-center gap-1 ${
            !currentSelection ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <span className="text-lg">+</span>
          Add new schema
        </button>
      </div>

      <div className="px-6 py-4 border-t flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSaving ? 'Saving...' : 'Save the Segment'}
        </button>
        <button
          onClick={onClose}
          className="text-red-600 px-6 py-2 rounded hover:bg-red-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default SegmentPopup;

