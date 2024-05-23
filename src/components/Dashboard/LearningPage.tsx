import React from "react";

const LearningPage = () => {
  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-6">Cybersecurity</h1>

      <div className="w-full md:w-3/4 bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <section className="p-4 border-b">
          <h2 className="text-xl font-semibold mb-2">1. Insider Threats</h2>
          <p className="mb-4">An insider threat is a security risk that originates from within an organization, typically from current or former employees, contractors, or business associates who have access to sensitive information or systems. Insider threats can be intentional or unintentional and can result in data breaches, financial losses, reputational damage, and regulatory penalties.</p>
          <div className="flex justify-center">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/QXnNkSeT6dM?si=p62eZksll4RiEVFq" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </section>

        <section className="p-4 border-b">
          <h2 className="text-xl font-semibold mb-2">2. Data Leakage</h2>
          <p className="mb-4">Data leakage, also known as data loss, is the unauthorized transmission of sensitive information from within an organization to an external destination. This can occur through various channels, including email, file sharing, removable storage devices, and cloud services. Data leakage poses significant risks to organizations, including financial loss, regulatory non-compliance, damage to reputation, and loss of competitive advantage.</p>
          <div className="flex justify-center">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/NeUmClyrwBs?si=lCYVPqM9FN7hXzbj"frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </section>

        <section className="p-4">
          <h2 className="text-xl font-semibold mb-2">3. Scams and Phishing</h2>
          <p className="mb-4">Scams and phishing attacks are fraudulent attempts to obtain sensitive information, such as usernames, passwords, and financial details, by impersonating trusted entities or organizations. These attacks often involve deceptive emails, fake websites, or social engineering tactics to trick individuals into disclosing confidential information or performing unauthorized actions. Scams and phishing attacks pose significant threats to individuals and organizations, leading to financial losses, identity theft, and reputational damage.</p>
          <div className="flex justify-center">
            <iframe width="560" height="315" src="https://www.youtube.com/embed/XBkzBrXlle0?si=SnX-HB3D3bBHUY6m"frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
        </section>
      </div>

      <button className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Test Knowledge</button>
    </div>
  );
};

export default LearningPage;
