import React from "react";
import Link from "next/link";

const ModuleBox = ({ title, description, progress, isCompleted }: { title: string, description: string, progress: number, isCompleted: boolean }) => (
  <div className={`p-4 border ${isCompleted ? 'border-green-500' : 'border-gray-300'} rounded-md bg-white w-full md:w-1/4 mx-2 my-2`}>
    <h2 className="font-bold text-lg mb-2 text-center">{title}</h2>
    <p className="text-base mb-4 text-center">{description}</p>
    <div className="h-4 w-full bg-gray-200 rounded-full mb-4">
      <div className="h-4 bg-green-500 rounded-full" style={{ width: `${progress}%` }}></div>
    </div>
    <div className="relative">
      <Link href="/learningPage">
        <button className="bg-blue-500 text-white py-2 px-4 rounded w-full">View module</button>
      </Link>
    </div>
  </div>
);

const Learning = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <img src="/images/cybersec.jpg" alt="Cover Image" className="w-full h-52 object-cover"/>
      </div>
      <div className="flex flex-wrap justify-center w-full">
        <ModuleBox
          title="Insider Threats"
          description="Understand the dangers posed by internal actors within an organization."
          progress={70}
          isCompleted={false}
        />
        <ModuleBox
          title="Data Leakage"
          description="Learn how sensitive information can be unintentionally exposed and how to prevent it."
          progress={50}
          isCompleted={true}
        />
        <ModuleBox
          title="Scams"
          description="Identify various types of scams and techniques to protect against them."
          progress={90}
          isCompleted={true}
        />
        <ModuleBox
          title="Phishing Attacks"
          description="Discover how phishing attacks work and how to safeguard against them."
          progress={30}
          isCompleted={false}
        />
        <ModuleBox
          title="Cybersecurity Fundamentals"
          description="Gain a foundational understanding of key cybersecurity concepts."
          progress={80}
          isCompleted={false}
        />
      </div>
    </div>
  );
};

export default Learning;
