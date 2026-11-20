import React, { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

interface FaqItem {
  question: string
  answer: string
}

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs: FaqItem[] = [
    {
      question: 'How does TRM differ from standard CRMs like Salesforce and HubSpot?',
      answer:
        'Traditional CRMs (Salesforce, HubSpot) focus exclusively on lead acquisition and sales funnel tracking, completely ignoring delivery capacity, talent performance, and operational burn. TRM unites resource capacity (360° employee intelligence), sprint delivery (Kanban boards), and financial balance sheets in one fast, lightweight system.',
    },
    {
      question: 'How fast can our team migrate from Excel or Google Sheets?',
      answer:
        'Migration takes less than 3 minutes. TRM provides built-in CSV importing and automated data mapping. You can import your entire employee directory, project tasks, and historical transaction logs without paying tens of thousands to specialized enterprise consultants.',
    },
    {
      question: 'How is data security, isolation, and access control handled?',
      answer:
        'TRM is built on enterprise-grade Spring Security 6 with stateless JWT authentication, BCrypt password hashing, and Flyway versioned migrations. All cloud endpoints are HTTPS-enforced, with database migrations fully auditable and zero credential exposure.',
    },
    {
      question: 'Can TRM be hosted on our private cloud or on-premise infrastructure?',
      answer:
        'Yes. We provide production-ready Docker containers and Docker Compose configurations. You can run TRM on Render, AWS ECS, GCP Cloud Run, or your self-managed Kubernetes clusters with full data sovereignty.',
    },
    {
      question: 'Does TRM support dark mode and keyboard shortcuts?',
      answer:
        'Yes! TRM includes first-class dark mode support and a global Command Palette (Cmd/Ctrl + K) inspired by Linear and Attio, allowing power users to navigate, search, and execute actions with sub-10ms response times.',
    },
  ]

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section id="faq" className="py-24 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-slate-800 text-primary dark:text-indigo-400 font-extrabold text-xs uppercase tracking-wider mb-4 border border-indigo-100 dark:border-slate-700">
            <HelpCircle size={14} />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-gray-950 dark:text-white tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-slate-300">
            Everything you need to know about the product, architecture, and deployment options.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/40 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left font-bold text-gray-900 dark:text-white text-base sm:text-lg focus:outline-none cursor-pointer"
                >
                  <span className="pr-4">{faq.question}</span>
                  <div
                    className={`p-1.5 rounded-full bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-primary dark:text-indigo-400' : 'text-gray-400'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 text-sm sm:text-base text-gray-600 dark:text-slate-300 leading-relaxed border-t border-gray-100 dark:border-slate-800/80 pt-4 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
