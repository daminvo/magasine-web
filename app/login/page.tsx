"use client"
import { useRef, useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";

const Login = () => {
    const usernameInputElement = useRef<HTMLInputElement>(null);
    const passwordInputElement = useRef<HTMLInputElement>(null);

    const [formMessage, setFormMessage] = useState('');

    const auth = useAuth();


    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if (usernameInputElement.current?.value == '')
            setFormMessage('Please provide a valid username');
        else if (passwordInputElement.current?.value == '')
            setFormMessage('Please provide a valid password');
        else {

            const dataForm = {
                username: usernameInputElement.current?.value,
                password: passwordInputElement.current?.value
            }
            auth.attemptLogin(dataForm);
        }

    };
    
    return (
        <div className="fit-height bg-gray-100 flex justify-center">
            <div className="py-6 px-8 h-80 mt-20 bg-white rounded shadow-xl">
            <form action="" method="POST" onSubmit={handleFormSubmit} className="w-96 h-5/6	 flex flex-col" >
                <div className="mb-6">
                <label className="block text-gray-800 font-bold">Username:</label>
                <input ref={usernameInputElement} className="w-full text-base py-2 border-b border-green-950 focus:outline-none focus:border-black" type="" placeholder="Enter your username" />
                </div>

                <div>
                <label className="block text-gray-800 font-bold">Password:</label>
                <input ref={passwordInputElement} className="w-full content-center text-base py-2 border-b border-green-950 focus:outline-none focus:border-black" type="" placeholder="Enter your password" />


                {/* <a href="#" className="text-sm font-thin text-gray-800 hover:underline mt-2 inline-block hover:text-indigo-600">Forget Password</a> */}
                </div>
                <button className="cursor-pointer py-2 px-4 block mt-auto bg-green-950 text-white font-bold w-full text-center rounded">Login</button>
                <h1>{formMessage ? formMessage : null}</h1>
            </form>
            </div>
        </div>
    )
}

export default Login;