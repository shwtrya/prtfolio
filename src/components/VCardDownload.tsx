import React from 'react';
import { motion } from 'framer-motion';
import { Download, User, Phone, Mail, MapPin, Globe } from 'lucide-react';

const VCardDownload: React.FC = () => {
  const generateVCard = () => {
    const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Shawava Tritya
N:Tritya;Shawava;;;
TEL;TYPE=CELL:+6285187805786
EMAIL;TYPE=INTERNET:shawavatritya@gmail.com
ADR;TYPE=HOME:;;Cileungsi;Bogor;Jawa Barat;;Indonesia
URL:https://shawavatritya.netlify.app
TITLE:IT Support & Data Entry Specialist
ORG:Freelance
NOTE:Ahli dalam teknologi, data entry, dan instalasi jaringan. Siap membantu dengan berbagai proyek IT dan solusi bisnis.
END:VCARD`;

    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Shawava_Tritya.vcf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const contactDetails = [
    {
      icon: User,
      label: 'Nama',
      value: 'Shawava Tritya'
    },
    {
      icon: Phone,
      label: 'Telepon',
      value: '+62 851-8780-5786'
    },
    {
      icon: Mail,
      label: 'Email',
      value: 'shawavatritya@gmail.com'
    },
    {
      icon: MapPin,
      label: 'Lokasi',
      value: 'Cileungsi, Bogor'
    },
    {
      icon: Globe,
      label: 'Website',
      value: 'shawavatritya.netlify.app'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed bottom-24 right-4 z-40 max-w-[280px]"
    >
      <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-4 space-y-3">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">Quick Contact</h3>
          <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        </div>

        <div className="space-y-2 max-h-[200px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          {contactDetails.map((detail, index) => {
            const Icon = detail.icon;
            return (
              <motion.div
                key={detail.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start space-x-2 text-xs"
              >
                <Icon className="w-3 h-3 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-gray-500 dark:text-gray-400 text-[10px] uppercase tracking-wide">
                    {detail.label}
                  </p>
                  <p className="text-gray-900 dark:text-white font-medium truncate">
                    {detail.value}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.button
          onClick={generateVCard}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 text-white font-semibold py-2.5 px-4 rounded-lg shadow-lg transition-all duration-300 group"
        >
          <Download className="w-4 h-4 group-hover:animate-bounce" />
          <span className="text-sm">Download vCard</span>
        </motion.button>

        <p className="text-[10px] text-center text-gray-500 dark:text-gray-400 italic">
          Simpan kontak saya ke ponsel Anda
        </p>
      </div>
    </motion.div>
  );
};

export default VCardDownload;
