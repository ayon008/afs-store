'use client';

export default function LegalNotices() {
  return (
    <main className="flex justify-center items-start min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl text-left space-y-8">
        <h1 className="text-4xl font-bold text-center">LEGAL NOTICES</h1>
        
        <section>
          <h2 className="text-2xl font-semibold mb-6">FOIL AND CO</h2>
          <div className="space-y-4 text-gray-700">
            <p><strong>SAS</strong>, a French company with a capital of <strong>110 250,00 €</strong></p>
            <p>Represented by <strong>Mr. Tanguy LE BIHAN</strong></p>
            <p>Head office: <strong>Pencran (29800), ZAE Correquer</strong></p>
          </div>
        </section>

        <section className="bg-gray-100 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Company Registration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            <div>
              <p><strong>Registered at the RCS of Brest</strong></p>
              <p className="font-mono">n° 822 822 615</p>
            </div>
            <div>
              <p><strong>VAT number</strong></p>
              <p className="font-mono">FR23822822615</p>
            </div>
            <div>
              <p><strong>Siret number</strong></p>
              <p className="font-mono">82282261500032</p>
            </div>
            <div>
              <p><strong>APE Code</strong></p>
              <p>7112B Engineering, technical studies</p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">Responsible for publication</h3>
          <p className="text-gray-700">
            <strong>Mr. Tanguy LE BIHAN</strong>, representative of the company FOIL AND CO
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <p className="text-gray-700">
            <a href="mailto:contact@foilandco.com" className="text-blue-600 hover:underline font-semibold">
              contact@foilandco.com
            </a>
          </p>
        </section>

        <section className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Design, production and hosting</h3>
          
          <div className="space-y-4">
            <div>
              <p className="font-semibold text-gray-800">Design and graphic creation:</p>
              <p className="text-gray-700">Foil and Co</p>
              <p className="text-gray-700">Director: <strong>Vlad Zamari</strong></p>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Hosting:</h4>
              <p className="text-gray-700">
                <strong>OVH</strong>
              </p>
              <p className="text-sm text-gray-600">
                Registered in the Lille Trade and Companies Register under number: 
                <span className="font-mono">Lille Metropole B 424 761 419</span>
              </p>
              <p className="text-sm text-gray-600">
                Headquarters: <strong>2 rue Kellermann, 59100 ROUBAIX</strong>
              </p>
              <p className="text-sm">
                <strong>VAT number:</strong> <span className="font-mono">FR22424761419</span>
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}