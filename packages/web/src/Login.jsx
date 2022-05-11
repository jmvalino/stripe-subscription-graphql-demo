import { useState } from "react";
import { Auth } from "aws-amplify";
import { Redirect } from "react-router-dom";
const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(0);

  async function handleSubmit(e) {
    e.preventDefault();
    const user = await Auth.signIn(username, password);
    setUser(user);
  }

  if (user) {
    return <Redirect to="/plans" />;
  }

  return (
    <div className="flex flex-col justify-center w-full max-w-xl m-auto h-screen">
      <div className="flex flex-col">
        <h1 className="text-3xl text-primary">Login</h1>
        <p className="text-lg text-gray-700">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <form className="gap-2 mt-6 flex flex-col">
        <label>Username</label>
        <input
          onChange={(e) => setUsername(e.target.value)}
          type="text"
          className="border-primary border rounded-sm p-3"
        />
        <label>Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="border-primary border rounded-sm p-3"
        />
        <button
          onClick={handleSubmit}
          className="bg-primary text-white text-lg px-2 py-4 rounded-sm"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
