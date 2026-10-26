import React from 'react';
import { PageBanner } from '../components/PageBanner';
import { Branches } from '../components/Branches';
import { FaqAndEnquiry } from '../components/FaqAndEnquiry';
import { FinalCta } from '../components/FinalCta';
import { Phone, Mail, MapPin, Clock, PhoneCall } from 'lucide-react';

interface ContactPageProps {
  onOpenCounselling: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenCounselling }) => {
  const contactCards = [
    {
      icon: Phone,
      title: 'Call Us Directly',
      desc: 'Speak with our admissions counsellors',
      value: '+91 81858 83705',
      action: 'tel:+918185883705',
      actionLabel: 'Call Now',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50'
    },
    {
      icon: Mail,
      title: 'Email Us',
      desc: 'Send us your documents & queries',
      value: 'info@mastersvisa.com',
      action: 'mailto:info@mastersvisa.com',
      actionLabel: 'Send Email',
      color: 'text-sky-500',
      bg: 'bg-sky-50'
    },
    {
      icon: MapPin,
      title: 'Headquarters',
      desc: 'Visit our flagship study abroad centre',
      value: 'Trunk Road, Nellore, Andhra Pradesh',
      action: '#branches',
      actionLabel: 'View All Branches',
      color: 'text-rose-500',
      bg: 'bg-rose-50'
    },
    {
      icon: Clock,
      title: 'Operating Hours',
      desc: 'Open Monday through Saturday',
      value: '9:30 AM - 7:00 PM IST',
      action: '#faq',
      actionLabel: 'Book Appointment',
      color: 'text-amber-500',
      bg: 'bg-amber-50'
    }
  ];

  return (
    <div className="bg-[#FAF7F1]">
      {/* Page Header Banner */}
      <PageBanner
        breadcrumbs={[{ label: 'Contact Us' }]}
        badge="GET IN TOUCH"
        badgeIcon={<PhoneCall className="w-3.5 h-3.5 text-[#D99A35]" />}
        title="Get in Touch with Our Expert Counsellors"
        highlightWord="Expert Counsellors"
        description="Connect with our global education specialists. Visit our branches across Andhra Pradesh, Telangana, Karnataka, and Tamil Nadu, or book a virtual session."
      />

      {/* Quick Contact Info Cards */}
      <section className="py-12 bg-white border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FAF7F1] rounded-2xl p-6 border border-slate-200/80 hover:border-[#D99A35]/50 hover:shadow-card transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl ${card.bg} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                      <Icon className={`w-6 h-6 ${card.color}`} />
                    </div>
                    <h3 className="text-base font-bold text-[#10243F] mb-1">
                      {card.title}
                    </h3>
                    <p className="text-xs text-[#64748B] mb-3">
                      {card.desc}
                    </p>
                    <p className="text-sm font-extrabold text-[#10243F]">
                      {card.value}
                    </p>
                  </div>

                  <a
                    href={card.action}
                    className="mt-4 pt-3 border-t border-slate-200/60 text-xs font-bold text-[#D99A35] hover:text-[#B87A1E] transition-colors inline-block"
                  >
                    {card.actionLabel} &rarr;
                  </a>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Branches Section */}
      <Branches onOpenCounselling={onOpenCounselling} />

      {/* Enquiry Form & FAQ Section */}
      <FaqAndEnquiry />

      {/* Final Sunset Call to Action */}
      <FinalCta onOpenCounselling={onOpenCounselling} />
    </div>
  );
};

export default ContactPage;
