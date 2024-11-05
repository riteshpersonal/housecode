"use client";
import { brokerLogin } from "@/utils/brokerApi";
import { useState } from "react";
import { toast } from "sonner";
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const broker = await brokerLogin(email, password);
      toast.success("loggedin successfully!");
      // Redirect to the dashboard or protected page
      window.location.href = "/broker"; // or use Next.js router.push('/dashboard')
    } catch (error) {
      toast.error(error.message);
      
    }
  };

  return (
    <div className="flex justify-center mt-20 h-screen">
      
      <div className="max-w-6xl px-10">
        <h1 className="text-center text-3xl font-bold mt-2 mb-2">Broker Login</h1>
        <hr />
        <div className="flex justify-center mt-10">
          <form onSubmit={handleSubmit} action="">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name=""
              id=""
              className="py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-primary"
              placeholder="Enter your email"
            />{" "}
            <br /> <br />
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name=""
              id=""
              className="py-3 p-5 rounded-md  bg-zinc-50 md:w-[500px] w-[300px] outline-primary"
              placeholder="Enter your password"
            />
            <div className="flex justify-end mt-3 mb-4">
              <a href="#" className="text-blue-700">
                Forgot password
              </a>
            </div>
            <button
              type="submit"
              className="py-3 bg-primary text-white w-full rounded-md font-bold"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
