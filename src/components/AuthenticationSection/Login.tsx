import { FaEnvelope, FaLock } from "react-icons/fa";
import { Button } from "./Button";
import { Input, Label } from "./Input";
import { ContainerLayout } from "./Layout";
import { useNavigate } from "react-router-dom";
import workrityLogo from "../../assets/Workrity-Logo-Wordmark-1024x298.webp";
import useApi from "../../hooks/useApi";
import { useAppDispatch } from "../../store/hooks";
import { setUser } from "../../store/User.strore"

function Login() {
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const dispatch = useAppDispatch(); // Initialize dispatch

  const { post, loading } = useApi<any, { email: string, password: string }>(apiUrl);

  const handleRegisterRedirect = () => {
    navigate("/");
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      email: (e.target as any).email.value,
      password: (e.target as any).password.value,
    };

    try {
      const response = await post(formData, '/login');
      if (response.message ===  'Login successful') {
            // Dispatch the user data to Redux store
            dispatch(setUser(response.user));
        console.log("Login successful", response);
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed. Please check your credentials.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[100vh] flex-col">
        <div className='loader'></div>
        <p className="text-blue-500 ">Logging in user...</p>
      </div>
    );
  }

  return (
    <ContainerLayout reverse={true}>
     <div className="mx-auto space-y-10 w-full max-w-sm lg:w-96 pt-20">
        <div className="text-center lg:text-start">
          <img alt="Company logo" src={workrityLogo} className="w-[50%] mx-auto xs:mt-[100px] sm:mt-0 lg:mx-0" />
          <h3 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h3>
        </div>

        <div className="space-y-6">
          <form onSubmit={handleLogin} className="flex flex-col gap-y-6">
            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="youremail@example.com"
                icon={FaEnvelope}
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="1234"
                icon={FaLock}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <div className="flex h-6 shrink-0 items-center">
                  <div className="group grid size-4 grid-cols-1">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-purple-600 checked:bg-purple-600 indeterminate:border-purple-600 indeterminate:bg-purple-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                    />
                  </div>
                </div>
                <label htmlFor="remember-me" className="block text-sm/6 text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm/6">
                <a
                  href="/"
                  className="font-semibold text-purple-600 hover:text-purple-500"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <Button variant="primary" type="submit" disabled={loading}>
                Sign in
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="text-center">
        <p className="mt-6 text-sm/6 text-gray-500">
          Don{"'"}t have an account yet?{" "}
          <Button
            variant="text"
            onClick={handleRegisterRedirect}
            className="px-0"
          >
            Create a new account
          </Button>
        </p>
      </div>
    </ContainerLayout>
  );
}

export default Login;
