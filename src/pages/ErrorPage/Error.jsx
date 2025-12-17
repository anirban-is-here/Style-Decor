import React from 'react';
import { Link } from 'react-router';
import errorImg from '../../assets/error.png'


const Error = () => {
    return (
      <>
        {/*
        This example requires updating your template:

        ```
        <html class="h-full">
        <body class="h-full">
        ```
      */}
        <main className="grid place-items-center px-6 py-12 sm:py-22 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center h-80">
              <img className="" src={errorImg} alt="Error" />
            </div>
            
            <h1 className="mt-1 text-5xl font-bold tracking-tight text-balance text-secondary sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/"
                className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </Link>
            </div>
          </div>
        </main>
      </>
    );
};

export default Error;