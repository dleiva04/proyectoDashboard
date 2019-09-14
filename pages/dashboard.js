import '../assets/tailwind.scss';
import React, { Component } from 'react';

export default class dashboard extends Component {
     render() {
          return (
               <div className="w-screen h-screen md:flex">
                    <nav className="bg-blue-500 md:w-24 h-full hidden md:block p-4 shadow-lg flex justify-center items-center flex-col text-white">
                         <div className="h-20 bg-indigo-200"></div>
                         <div className="h-70 bg-yellow-200"></div>
                         <div className="h-10 bg-green-200"></div>
                    </nav>
                    <section className="w-full h-full p-4">
                         section
                    </section>
               </div>
          )
     }
}
