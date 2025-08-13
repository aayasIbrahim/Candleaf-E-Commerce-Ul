// pages/admin/UsersList.jsx
import {
  useGetUserQuery,
  useDeleteUserMutation,
} from "../../features/firebaseApi/firebaseApiSlice";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";

export default function UsersList() {
  const { data: users, isLoading, isError } = useGetUserQuery();
  const [deleteUser] = useDeleteUserMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        toast.success("User deleted successfully");
      } catch {
        toast.error("Failed to delete user");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-green-500"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="text-center text-red-500 py-6">Failed to load users.</p>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">All Users</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white shadow-lg rounded-lg border">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-50 text-gray-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="border-b p-4">Email</th>
              <th className="border-b p-4">Role</th>
              <th className="border-b p-4">Joined</th>
              <th className="border-b p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr
                key={user.id}
                className={`transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-green-50`}
              >
                <td className="border-b p-4">{user.email}</td>
                <td className="border-b p-4 capitalize">
                  {user.role || "user"}
                </td>
                <td className="border-b p-4">
                  {user.createdAt
                    ? new Date(
                        user.createdAt.seconds * 1000
                      ).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="border-b p-4 text-center">
                  <button
                    onClick={() => handleDelete(user.id)}
                    title="Delete User"
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition"
                  >
                    <FaTrash size={14} />
                  </button>
                </td>
              </tr>
            ))}

            {users?.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {users?.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded-lg shadow border flex flex-col gap-2"
          >
            <p className="text-sm">
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            <p className="text-sm capitalize">
              <span className="font-semibold">Role:</span> {user.role || "user"}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Joined:</span>{" "}
              {user.createdAt
                ? new Date(user.createdAt.seconds * 1000).toLocaleDateString()
                : "N/A"}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {users?.length === 0 && (
          <p className="text-center text-gray-500">No users found</p>
        )}
      </div>
    </div>
  );
}
