import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../../appWrite/auth";
import Button from "../../../Components/Custom/Button/Button";
import Input from "../../../Components/Custom/Input/Input";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../../../store/authSlice";
import { notify } from "../../../config/Toast";
const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const login = async (data: any) => {
    try {
      await authService.login(data.email, data.password);
      const userData = await authService.getCurrentUser();

      if (userData) {
        dispatch(authLogin(userData));
        notify("success", "Login successfully.");
        navigate("/");
      } else {
        throw new Error("Failed to retrieve user data after login.");
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      notify("error", error);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-gray-100">
          Sign in to your account
        </h2>

        <form onSubmit={handleSubmit(login)} className="space-y-4">
          <div>
            <Input
              label="Email"
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) => {
                    const pattern =
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    return pattern.test(value) || "Invalid email address";
                  },
                },
              })}
              className={`w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              } dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500 font-semibold">
                {typeof errors.email.message == "string" &&
                  errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Input
              label="Password"
              type="password"
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className={`w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "focus:ring-blue-500"
              } dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-500 font-semibold">
                {typeof errors.password.message === "string" &&
                  errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Login
          </Button>
        </form>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{" "}
          <Link
            to="/sign-up"
            className="text-blue-500 hover:underline dark:text-blue-400"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
// Hello Team,
// Today, I implemented filters (search, sort, limit), pagination, and theming. I also used Redux to persist filter and page states.
