import React, {useEffect} from 'react';
import Navbar from './navbar'
import Footer from './footer'
import {useAppContext} from '../stores/appContext';
import { useRouter } from 'next/router'


const Layout = ({ children }) => {
  const router = useRouter()
  const { user } = useAppContext();
  
    return (
        <>
          <Navbar />
            <main className="bg-gray-100 dark:bg-[#2b2933] text-gray-900">
              {children}
            </main>
          <Footer />
        </>
      )
};

export default Layout;
