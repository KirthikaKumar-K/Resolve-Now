import React, { useEffect, useState } from "react";
import { getTickets, updateTicketStatus, type Ticket, type TicketStatus } from "../api/ticketApi";

interface TicketTableProps {
  statuses: TicketStatus[];
  admin?: boolean;
  onStatusChange?: (newStatus: TicketStatus) => void;
}

export const TicketTable: React.FC<TicketTableProps> = ({
  statuses,
  admin = false,
  onStatusChange,
}) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  // ✅ FETCH WHEN TAB CHANGES
  useEffect(() => {
    loadTickets();
  }, [statuses]);

  const loadTickets = async () => {
    const data = await getTickets();
    setTickets(data.filter((t) => statuses.includes(t.status)));
  };

  const getStatusColor = (status: TicketStatus) => {
    switch (status) {
      case "OPEN":
        return "bg-red-100 text-red-800 px-3 py-1 rounded-full";
      case "IN_PROGRESS":
        return "bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full";
      case "CLOSED":
        return "bg-green-100 text-green-800 px-3 py-1 rounded-full";
    }
  };

  const handleStatusChange = async (id: number, status: TicketStatus) => {
    await updateTicketStatus(id, status);
    await loadTickets();
    if (onStatusChange) {
      onStatusChange(status);
    }
  };

  if (tickets.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">No tickets found</div>
    );
  }

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <div
          key={ticket.id}
          className="shadow-xl rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow mb-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {ticket.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3">
                {ticket.description}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Status:</span>
                <span className={getStatusColor(ticket.status)}>
                  {ticket.status.replace("_", " ")}
                </span>
              </div>
            </div>

            {admin && (
              <div className="flex-shrink-0">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Change Status
                </label>
                <select
                  value={ticket.status}
                  onChange={(e) =>
                    handleStatusChange(ticket.id, e.target.value as TicketStatus)
                  }
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="OPEN">OPEN</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="CLOSED">CLOSED</option>
                </select>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
