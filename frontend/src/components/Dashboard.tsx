import React, { useState } from "react";
import { Plus, Power } from "lucide-react";
import { CreateTicketModal } from "./CreateTicketModal";
import { TicketTable } from "./TicketTable";

type TicketStatus = "OPEN" | "IN_PROGRESS" | "CLOSED";
type Role = "USER" | "ADMIN";

interface DashboardProps {
  role: Role;
  onLogout: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ role, onLogout }) => {
  const [showModal, setShowModal] = useState(false);
  const [userTab, setUserTab] = useState<TicketStatus>("OPEN");
  const [adminTab, setAdminTab] = useState<TicketStatus>("OPEN");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold text-gray-800">
            Support Ticket System
          </h1>

          <button
            onClick={onLogout}
            className=" text-blue p-3 rounded-lg font-semibold transition duration-200 hover:scale-105"
            aria-label="Logout"
          >
            <Power size={20} />
          </button>
        </div>

        {/* USER */}
        {role === "USER" && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setShowModal(true)}
                className=" flex items-center gap-2 text-blue-600  bg-blue-100 px-6 py-3 rounded-lg font-semibold"
              >
                <Plus size={20} /> Create Ticket
              </button>
            </div>

            <div className="flex gap-2 mb-6 border-b">
              {(["OPEN", "IN_PROGRESS", "CLOSED"] as TicketStatus[]).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setUserTab(tab)}
                    className={`px-4 py-2 font-semibold ${
                      userTab === tab
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600"
                    }`}
                  >
                    {tab === "OPEN" && "🔴 Open Tickets"}
                    {tab === "IN_PROGRESS" && "🟡 In Progress Tickets"}
                    {tab === "CLOSED" && "✅ Closed Tickets"}
                  </button>
                ),
              )}
            </div>

            <TicketTable statuses={[userTab]} />
          </div>
        )}

        {/* ADMIN */}
        {role === "ADMIN" && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex gap-2 mb-6 border-b">
              {(["OPEN", "IN_PROGRESS", "CLOSED"] as TicketStatus[]).map(
                (tab) => (
                  <button
                    key={tab}
                    onClick={() => setAdminTab(tab)}
                    className={`px-4 py-2 font-semibold ${
                      adminTab === tab
                        ? "text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600"
                    }`}
                  >
                    {tab === "OPEN" && "🔴 Open Tickets"}
                    {tab === "IN_PROGRESS" && "🟡 In Progress Tickets"}
                    {tab === "CLOSED" && "✅ Closed Tickets"}
                  </button>
                ),
              )}
            </div>

            <TicketTable
              statuses={[adminTab]}
              admin
              onStatusChange={(status) => setAdminTab(status)}
            />
          </div>
        )}

        {showModal && <CreateTicketModal onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
};
