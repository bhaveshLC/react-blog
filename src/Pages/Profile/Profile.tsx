import { useEffect } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white shadow-md rounded-lg p-6 w-96 dark:bg-gray-800">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-600">
            {user?.name
              ? user.name
                  .split(" ")
                  .map((n: string) => n[0])
                  .join("")
                  .toUpperCase()
              : "N/A"}
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-800 dark:text-gray-200">
            {user?.name || "User Name"}
          </h2>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
            Profile Details
          </h3>
          <ul className="mt-2 text-gray-600 dark:text-gray-200 space-y-2">
            <li>
              <span className="font-semibold">Email:</span>{" "}
              {user?.email || "N/A"}
            </li>
            <li>
              <span className="font-semibold">Phone:</span>{" "}
              {user?.phone || "N/A"}
            </li>
            <li>
              <span className="font-semibold">Email Verified:</span>{" "}
              <span
                className={`border-1  px-2 py-1  rounded-full   font-semibold ${
                  user.emailVerification
                    ? "bg-green-200 text-green-800 border-green-300 "
                    : "bg-yellow-200 text-yellow-600  border-yellow-300"
                }`}
              >
                {user.emailVerification ? "Verified" : "Pending"}
              </span>
            </li>
            <li>
              <span className="font-semibold">Registered On:</span>{" "}
              {new Date(user.registration).toDateString()}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
