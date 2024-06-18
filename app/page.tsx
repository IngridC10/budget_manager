import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export default function Home() {
  redirect("/board");
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-[570px] h-[570px]  p-14 bg-colorLightBlue rounded-xl shadow-lg">
        <h1 className="mb-4 text-[25px] m-5 font-bold text-center text-gray-700">
          My Account
        </h1>
        <form>
          <div className="mb-4">
            <label
              className="block mb-2 text-xl font-bold text-gray-700"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="w-full h-16 px-3 py-2 leading-tight text-gray-700 border rounded-md shadow appearance-none focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block mb-2 text-xl font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="w-full h-16 px-3 py-2 mb-3 leading-tight text-gray-700 border rounded-md shadow appearance-none border-red focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-center p-12 ">
            <Link
              href="/board"
              className="px-4 py-2 text-lg font-bold text-white bg-black rounded-lg hover:bg-customBlue focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
