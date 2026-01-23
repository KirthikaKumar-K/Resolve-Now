import React, { useState } from "react";
import { createGitHubIssue, createTicket } from "../api/ticketApi";
import { ChipInput } from "./ChipInput";

interface Props {
  onClose: () => void;
}

export const CreateTicketModal: React.FC<Props> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [labels, setLabels] = useState<string[]>([]);
  const [assignees, setAssignees] = useState<string[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await createTicket({
      title,
      description,
    });
    await createGitHubIssue(title, description, labels, assignees);

    onClose(); // close modal after save
  };

return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/20 backdrop-blur-xs">
      <div className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">Create New Ticket</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              placeholder="Enter ticket title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              placeholder="Enter ticket description"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
            />
          </div>

          <ChipInput
            label="Labels"
            placeholder="Type and press Enter to add labels"
            chips={labels}
            onChipsChange={setLabels}
          />

          <ChipInput
            label="Assignees"
            placeholder="Type and press Enter to add assignees"
            chips={assignees}
            onChipsChange={setAssignees}
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleSubmit}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 transform hover:scale-105"
          >
            Submit
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
