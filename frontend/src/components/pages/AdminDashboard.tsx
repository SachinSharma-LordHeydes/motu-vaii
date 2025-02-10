import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Response {
  message: string;
  success: boolean;
  data: Waste[];
}

interface Waste {
  condition: string;
  quantity: number;
  type: string;
  _id: string;
  status: boolean;
}

const AdminDashboard = () => {
  const [wasteData, setWasteData] = useState<Waste[]>([]);

  const getWasteDetail = async () => {
    try {
      const { data }: { data: Response } = await axios.get(
        "http://localhost:3000/api/v1/add-waste"
      );

      console.log("getWasteDetails Response-->", data);

      if (!data.success) {
        console.log("Failed to fetch waste");
        toast.error("Failed to fetch waste details");
        return;
      }

      setWasteData(data.data);
      toast.success("Waste details fetched successfully");
    } catch (error: any) {
      console.log("Error occurred fetching waste details", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getWasteDetail();
  }, []);

  const manageWaste = async (wasteId: string) => {
    try {
      console.log("Managing waste with ID:", wasteId);

      const { data }: { data: Response } = await axios.post(
        "http://localhost:3000/api/v1/manage-waste",
        { wasteId }
      );

      if (!data.success) {
        toast.error("Failed to manage waste");
        return;
      }

      toast.success("Waste successfully managed");
      getWasteDetail(); // Refresh waste data after managing
    } catch (error: any) {
      console.error("Error managing waste:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="admin-dashboard p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-6">Manage waste records and perform administrative tasks.</p>

      <h2 className="text-lg font-bold mb-4">Waste List</h2>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Type</th>
            <th className="border border-gray-300 px-4 py-2">Condition</th>
            <th className="border border-gray-300 px-4 py-2">Quantity</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {wasteData.length > 0 ? (
            wasteData.map((waste) => (
              <tr key={waste._id}>
                <td className="border border-gray-300 px-4 py-2">{waste.type}</td>
                <td className="border border-gray-300 px-4 py-2">{waste.condition}</td>
                <td className="border border-gray-300 px-4 py-2">{waste.quantity}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {waste.status ? "Managed Waste" : "Unmanaged Waste"}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {waste.status ? (
                    <div className="">Managed</div>
                  ) : (
                    <button
                      onClick={() => manageWaste(waste._id)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Click To Manage
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="border border-gray-300 px-4 py-2 text-center">
                No waste records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
