import { useForm } from "react-hook-form";
import Button from "../../../Components/Custom/Button/Button";
import Input from "../../../Components/Custom/Input/Input";
import authService from "../../../appWrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { notify } from "../../../config/Toast";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSignup = async (data: any) => {
    try {
      await authService
        .createAccount(data.email, data.password, data.name)
        .then(() => {
          notify("success", "Account created successfully.");
          navigate("/");
        });
    } catch (error: any) {
      console.error("Signup failed:", error.message || error);
      notify("error", "Signup failed. Please check your credentials.");
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit(onSignup)}>
          <div className="mb-4">
            <Input
              label="Name"
              type="text"
              id="name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters long",
                },
              })}
            />
            {errors.name && (
              <p className="mt-1 text-sm font-semibold text-red-500">
                {typeof errors.name.message == "string" && errors.name.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <Input
              label="Email"
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value: string) => {
                    const pattern =
                      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    return pattern.test(value) || "Invalid email address";
                  },
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm font-semibold text-red-500">
                {typeof errors.email.message == "string" &&
                  errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <Input
              label="Password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
                validate: {
                  matchPattern: (value: string) => {
                    const pattern =
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;
                    return (
                      pattern.test(value) ||
                      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
                    );
                  },
                },
              })}
            />
            {errors.password && (
              <p className="mt-1 text-sm font-semibold text-red-500">
                {typeof errors.password.message == "string" &&
                  errors.password.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-600"
          >
            Sign Up
          </Button>
        </form>
        <p className="text-sm text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:underline dark:text-blue-400"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
