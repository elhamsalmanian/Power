import React from 'react';
import Image from 'next/image'

const Footer = () => {
  return (
    <footer className="flex flex-1 p-5 border-t-2 border-solid border-gray-300 dark:border-[#827397] justify-center items-center">
        <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-grow justify-center items-center "
        >
        Powered by{' '}
        <span className="h-[1em] ml-2">
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </span>
        </a>
    </footer>
  )
};

export default Footer;
