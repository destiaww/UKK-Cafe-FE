import axios from "axios";
import React, { useState } from "react";

export default function Login() {
    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const handleChange = (e) => {
        setUser(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        let data = {
            username: user.username,
            password: user.password
        }

        await axios.post('http://localhost:9000/user/login', data)
            .then((result) => {
                console.log(result.data.data)
                sessionStorage.setItem('nama_user', result.data.data[0].nama_user)
                sessionStorage.setItem('token', result.data.token)
                sessionStorage.setItem('logged', result.data.logged)
                sessionStorage.setItem('role', result.data.data[0].role)
                sessionStorage.setItem('id_user', result.data.data[0].id)
                window.location.reload()
            })
    }
    
    return (
        <section className=" h-screen">
            
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 border-[#AA5656] bg-[#042f2e] ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        
                        <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white text-center">
                            <strong>LOGIN</strong>
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">Username</label>
                                <input autoComplete="off" type="text"  name="username" id="username" value={user.username} onChange={handleChange} className=" sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                                <input type="password" name="password" id="password" value={user.password} onChange={handleChange} className=" sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required="" />
                            </div>

                            <button type="submit" className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-[#3f6212] hover:bg-[#65a30d] focus:ring-blue-800">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    )
}