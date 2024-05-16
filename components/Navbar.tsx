"use client"
import Image from 'next/image'
import Link from 'next/link';
import { useAuth } from '../hooks/AuthProvider';
import { usePathname } from 'next/navigation'
import { useState } from 'react';

const Navbar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const auth = useAuth();
    const pathname = usePathname();

    const logout = () => auth.logOut();

    return (
        <nav>
          <div className="flex justify-between h-16 px-10 shadow items-center">
            <div className="flex items-center w-full">
                <Image
                    src="/images/logo1.png"
                    alt="logo"
                    width={120}
                    height={40}
                ></Image>
              <div className="hidden md:flex justify-around space-x-4 w-100 mx-auto">
                <a href="/" className={`${pathname === '/' ? 'border-b border-green-950 text-green-950': 'text-slate-500'} hover:text-green-950`}>Home</a>
                <a href="/shop" className={`${pathname === '/shop' ? 'border-b border-green-950 text-green-950': 'text-slate-500'} hover:text-green-950 `}>Shop Now</a>
                <a href="/contact" className={`${pathname === '/contact' ? 'border-b border-green-950 text-green-950': 'text-slate-500'} hover:text-green-950`}>Contact</a>
                <a href="/categories" className={`${pathname === '/categories' ? 'border-b border-green-950 text-green-950': 'text-slate-500'} hover:text-green-950`}>Categories</a>
              </div>
            </div>
            <div className="flex space-x-4 items-center min-w-36">
                {auth.token ? (
                <div className="relative">
                    <Image
                        onClick={() => setOpenMenu(!openMenu)}
                        src="/images/user.jpeg"
                        alt="user"
                        width={50}
                        height={50}
                        className="cursor-pointer rounded-full "
                    ></Image>
                    { openMenu && 
                    <div className="absolute right-3 w-52 px-5 py-3 bg-white rounded-lg shadow border">
                    <ul className="space-y-3">
                        <li className="flex items-center hover:border-red-600">
                            <a href="/my-products">
                                My Products
                            </a>
                        </li>
                        <hr />
                        <li onClick={logout} className="flex items-center hover:border-red-600 cursor-pointer">
                            <div className="mr-3 text-red-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                            </div>
                            Logout
                        </li>
                    </ul>
                    </div> }
                </div>
                ) : ( auth.isLoading ? 
                    <></> :
                    <Link
                        href="/login"
                        className="border hover:border-green-950 px-4 py-2 rounded bg-green-950 text-white text-sm"
                        >
                        Login
                    </Link>
                )}
            </div>
          </div>
      </nav>
    )
}

export default Navbar;