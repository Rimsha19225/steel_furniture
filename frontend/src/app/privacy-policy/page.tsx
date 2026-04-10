'use client';
import Navbar from '@/components/navbar';
import { useState } from 'react';
import { Shield, Lock, Eye, Database, Mail } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const sections = [
    {
      title: "1. Introduction",
      content: "At Steel Furniture, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or purchase our products.\n\nBy using our website, you consent to the data practices described in this policy. If you do not agree with the terms, please do not access or use our website."
    },
    {
      title: "2. Information We Collect",
      content: "We collect the following types of information:\n\nPersonal Information:\n• Name, email address, phone number\n• Shipping and billing address\n• Payment information (processed securely)\n• Order history and preferences\n\nNon-Personal Information:\n• Browser type and version\n• Device information\n• IP address and location data\n• Pages visited and time spent\n• Referring website addresses"
    },
    {
      title: "3. How We Use Your Information",
      content: "We use your information to:\n• Process and fulfill your orders\n• Communicate about your purchases\n• Send order confirmations and updates\n• Provide customer support\n• Improve our website and services\n• Send promotional emails (with your consent)\n• Prevent fraud and enhance security\n• Comply with legal obligations\n\nWe do not sell, rent, or trade your personal information to third parties."
    },
    {
      title: "4. Information Sharing and Disclosure",
      content: "We may share your information with:\n\nService Providers:\n• Payment processors for transactions\n• Shipping companies for delivery\n• IT service providers for website maintenance\n\nLegal Requirements:\n• When required by law or legal process\n• To protect our rights and property\n• To prevent fraud or illegal activities\n\nBusiness Transfers:\n• In case of merger, acquisition, or sale of assets\n• You will be notified via email of any ownership change"
    },
    {
      title: "5. Data Security",
      content: "We implement appropriate security measures to protect your information:\n\n• SSL encryption for all transactions\n• Secure servers and databases\n• Regular security audits and updates\n• Restricted employee access to data\n• Encryption of sensitive information\n• Regular backup of data\n\nHowever, no method of transmission over the internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security."
    },
    {
      title: "6. Cookies and Tracking",
      content: "We use cookies and similar tracking technologies to:\n• Enhance your browsing experience\n• Remember your preferences\n• Analyze website traffic\n• Improve our services\n\nTypes of cookies we use:\n• Essential cookies (required for website function)\n• Performance cookies (analyze usage)\n• Functional cookies (remember preferences)\n• Marketing cookies (targeted advertising)\n\nYou can control cookies through your browser settings. Disabling cookies may affect website functionality."
    },
    {
      title: "7. Your Privacy Rights",
      content: "You have the right to:\n\n• Access: Request a copy of your personal data\n• Correction: Update inaccurate or incomplete data\n• Deletion: Request deletion of your data\n• Opt-out: Unsubscribe from marketing communications\n• Portability: Receive your data in a structured format\n• Restriction: Limit how we use your data\n\nTo exercise these rights, contact us at privacy@steelfurniture.com. We'll respond within 30 days."
    },
    {
      title: "8. Data Retention",
      content: "We retain your personal information:\n• As long as necessary to fulfill the purposes outlined in this policy\n• To comply with legal obligations\n• To resolve disputes and enforce agreements\n\nOrder information is retained for 7 years for tax and accounting purposes. After the retention period, data is securely deleted or anonymized."
    },
    {
      title: "9. Third-Party Links",
      content: "Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review the privacy policies of any website you visit.\n\nThis Privacy Policy applies only to information collected by our website."
    },
    {
      title: "10. Children's Privacy",
      content: "Our website is not intended for children under 18 years of age. We do not knowingly collect personal information from children. If we discover that we have collected information from a child without parental consent, we will delete it immediately.\n\nIf you believe a child has provided us with personal information, please contact us."
    },
    {
      title: "11. Changes to This Policy",
      content: "We may update this Privacy Policy periodically. Changes will be:\n• Posted on this page with an updated revision date\n• Notified via email for significant changes\n• Effective immediately upon posting\n\nWe encourage you to review this policy regularly. Continued use of our website after changes constitutes acceptance of the updated policy."
    },
    {
      title: "12. International Data Transfers",
      content: "Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your information during international transfers, including:\n\n• Standard contractual clauses\n• Adequacy decisions\n• Binding corporate rules\n\nBy using our website, you consent to the transfer of your information as described."
    },
    {
      title: "13. Contact Us",
      content: "For privacy-related questions, concerns, or requests:\n\nEmail: privacy@steelfurniture.com\nPhone: +91 123456789\nAddress: Baldia Town, Karachi, Pakistan\n\nData Protection Officer: privacy@steelfurniture.com\n\nWe take your privacy seriously and will respond to all inquiries promptly."
    }
  ];

  const toggleSection = (index: number) => {
    setOpenSection(openSection === index ? null : index);
  };

  return (
    <div>
      <Navbar />
      <main className="w-[95%] sm:w-[85%] mx-auto pt-[6.5rem] sm:pt-[8.5rem] pb-12">
        <h1 className="text-[2.3rem] text-[#ea580c] font-bold mb-7 sm:mb-12 text-center mt-4">Privacy Policy</h1>
        
        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-6 text-center">
            <div className="bg-[#ea580c] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Secure Data</h3>
            <p className="text-gray-600 text-sm">SSL encrypted transactions</p>
          </div>
          <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-6 text-center">
            <div className="bg-[#ea580c] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Private Info</h3>
            <p className="text-gray-600 text-sm">We never sell your data</p>
          </div>
          <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-6 text-center">
            <div className="bg-[#ea580c] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Transparency</h3>
            <p className="text-gray-600 text-sm">Clear data practices</p>
          </div>
          <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-6 text-center">
            <div className="bg-[#ea580c] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Database className="w-8 h-8 text-white" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Your Control</h3>
            <p className="text-gray-600 text-sm">Manage your data rights</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-6 sm:p-8 mb-12">
          <p className="text-gray-600 text-sm sm:text-base mb-6">
            Last updated: February 2026. Your privacy is important to us. This policy explains how we collect, use, and protect your personal information.
          </p>

          <div className="space-y-4">
            {sections.map((section, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <button
                  onClick={() => toggleSection(index)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                >
                  <span className="font-semibold text-gray-900">{section.title}</span>
                  <span className={`transform transition-transform duration-200 ${openSection === index ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                {openSection === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 text-sm sm:text-base whitespace-pre-line">{section.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-tl from-[#eff0f0] to-[#d9dbde] rounded-lg p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <Mail className="w-8 h-8 text-[#ea580c] flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Privacy Questions?</h2>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                If you have any questions about this Privacy Policy or our data practices, please contact our Data Protection Officer at{' '}
                <span className="text-[#ea580c] font-semibold">privacy@steelfurniture.com</span>. 
                We're committed to addressing your concerns promptly.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
