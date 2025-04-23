import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import { Button } from "./Button";
import { Input, Label } from "./Input";
import { ContainerLayout } from "./Layout";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import workrityLogo from '../../assets/Workrity-Logo-Wordmark-1024x298.webp';
import useApi from '../../hooks/useApi'; // Import the custom useApi hook

function Register() {
  const navigate = useNavigate(); // Initialize navigate function

  // Define the API URL from the environment variable
  const apiUrl = import.meta.env.VITE_API_URL;

  // Initialize the useApi hook with the base API URL
  const { post, loading } = useApi<any, { username: string, email: string, password: string, profilePicture: File | null }>(apiUrl);

  const handleregister = async (formData: { username: string, email: string, password: string, profilePicture: File | null }) => {
    try {
      const response = await post(formData, '/register'); // API call to register the user
      if (response) {
        console.log('Registration successful:', response);
        navigate("/login"); // Redirect to login page after successful registration
      }
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const handleLoginRedirect = () => {
    navigate("/login"); // Navigate to login page
  };

  // Fields to be rendered in the form
  const formFields = [
    {
      id: "username",
      name: "username",
      type: "text",
      placeholder: "Your username",
      icon: FaUser,
      label: "Username"
    },
    {
      id: "email",
      name: "email",
      type: "email",
      placeholder: "youremail@example.com",
      icon: FaEnvelope,
      label: "Email address"
    },
    {
      id: "password",
      name: "password",
      type: "password",
      placeholder: "1234",
      icon: FaLock,
      label: "New Password"
    },
    {
      id: "confirm-password",
      name: "confirm-password",
      type: "password",
      placeholder: "1234",
      icon: FaLock,
      label: "Confirm Password"
    },
    {
      id: "profile-picture",
      name: "profile-picture",
      type: "file",
      placeholder: "",
      icon: FaUser,
      label: "Profile Picture"
    }
  ];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    // Access form elements correctly using e.target.elements
    const formData = {
      username: (e.target as any).username.value,
      email: (e.target as any).email.value,
      password: (e.target as any).password.value,
      profilePicture: (e.target as any).elements['profile-picture'].files[0] || null, // Correct way to access file input
    };
  
    handleregister(formData);
  };
  

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className='loder'></div>
      </div>
    );
  }

  return (
    <ContainerLayout>
      <div className="mx-auto space-y-10 w-full max-w-sm lg:w-96">
        <div className="text-center lg:text-start">
          <img alt="Company logo" src={workrityLogo} className="size-16 mx-auto lg:mx-0" />
          <h3 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">
            Create new account
          </h3>
        </div>

        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
            {formFields.map((field) => (
              <div key={field.id}>
                <Label htmlFor={field.id}>{field.label}</Label>
                <Input
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  icon={field.icon}
                />
              </div>
            ))}

            <div className="flex gap-3">
              <div className="flex h-6 shrink-0 items-center">
                <div className="group grid size-4 grid-cols-1">
                  <input
                    id="accept-terms"
                    name="accept-terms"
                    type="checkbox"
                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-purple-600 checked:bg-purple-600 indeterminate:border-purple-600 indeterminate:bg-purple-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                  />
                </div>
              </div>
              <label
                htmlFor="accept-terms"
                className="block text-sm/6 font-medium text-gray-900"
              >
                I accept{" "}
                <a href="/" className="underline blue-500">
                  Terms of Service and Privacy Policy
                </a>
              </label>
            </div>

            <div>
              <Button variant="primary" disabled={loading} type="submit">Register</Button>
            </div>
          </form>
        </div>
      </div>

      <div className="text-center">
        <p className="mt-6 text-sm/6 text-gray-500">
          Already have an account?{" "}
          <Button variant="text" onClick={handleLoginRedirect} className="px-0">
            Login
          </Button>
        </p>
      </div>
    </ContainerLayout>
  );
}

export default Register;
