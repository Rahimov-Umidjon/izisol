'use client';

import { useState } from 'react';
import { Plus, Minus, MessageCircle } from 'lucide-react';

type FaqItem = {
    question: string;
    answer: string;
};

const tabs = ['General', 'Pricing', 'Process', 'Results'];

const faqs: FaqItem[] = [
    {
        question: 'What exactly does Kora do?',
        answer:
            'We help B2B companies between $2M and $50M in revenue grow faster and more predictably. That means diagnosing what is stalling your growth, building the strategy to fix it, and working alongside your team to execute. We are not an agency that runs campaigns. We are a growth partner that works on the systems, processes, and positioning that drive sustainable revenue.',
    },
    {
        question: 'What industries do you work with?',
        answer:
            'We primarily work with B2B SaaS, professional services, and technology-enabled businesses, though our frameworks apply to any company with a defined sales process and recurring revenue model.',
    },
    {
        question: 'How is Kora different from a marketing agency?',
        answer:
            'A marketing agency runs campaigns. We diagnose the entire revenue system — strategy, process, and execution — and stay embedded with your team until the gains compound on their own.',
    },
    {
        question: 'Who on our team would work with Kora?',
        answer:
            'Typically your founder or CEO, Head of Sales, and Head of Marketing. We work closely with whoever owns revenue outcomes, plus anyone hands-on with pipeline day to day.',
    },
];

export default function FaqSection() {
    const [activeTab, setActiveTab] = useState(0);
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const toggle = (index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    };

    return (
        <section className="w-full bg-[#FCFCFA] px-5 py-24 sm:px-10 lg:px-16">
            <div className="mx-auto w-full max-w-3xl rounded-[36px] bg-[#EFEFE0] p-4 sm:p-6">
                {/* Tabs */}
                <div className="mb-6 flex justify-center">
                    <div className="inline-flex items-center gap-1 rounded-full p-1">
                        {tabs.map((tab, i) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(i)}
                                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
                                    activeTab === i
                                        ? 'bg-emerald-500 text-white'
                                        : 'text-neutral-600 hover:text-neutral-900'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Accordion list */}
                <div className="flex flex-col gap-3">
                    {faqs.map((faq, index) => {
                        const isOpen = openIndex === index;
                        return (
                            <div
                                key={faq.question}
                                className="overflow-hidden rounded-[26px] bg-[#FCFCFA]"
                            >
                                <button
                                    onClick={() => toggle(index)}
                                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-8"
                                >
                                    <span className="text-[15px] font-semibold text-neutral-900 sm:text-base">
                                        {faq.question}
                                    </span>

                                    <span className="relative flex h-6 w-6 shrink-0 items-center justify-center">
                                        <Plus
                                            size={18}
                                            strokeWidth={2}
                                            className={`absolute text-neutral-900 transition-all duration-300 ${
                                                isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
                                            }`}
                                        />
                                        <Minus
                                            size={18}
                                            strokeWidth={2}
                                            className={`absolute text-neutral-900 transition-all duration-300 ${
                                                isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                                            }`}
                                        />
                                    </span>
                                </button>

                                {/* Bounce-open content via grid-template-rows trick */}
                                <div
                                    className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                                >
                                    <div className="overflow-hidden">
                                        <p className="px-6 pb-6 text-sm leading-6 text-neutral-500 sm:px-8">
                                            {faq.answer}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Contact card */}
                <div className="mt-3 flex flex-col items-start gap-4 rounded-[26px] bg-[#FCFCFA] px-6 py-6 sm:flex-row sm:items-center sm:px-8">
                    <div className="flex -space-x-3">
                        <img
                            src="https://i.pravatar.cc/80?img=32"
                            alt=""
                            className="h-12 w-12 rounded-full border-2 border-[#FCFCFA] object-cover"
                        />
                        <img
                            src="https://i.pravatar.cc/80?img=45"
                            alt=""
                            className="h-12 w-12 rounded-full border-2 border-[#FCFCFA] object-cover"
                        />
                        <img
                            src="https://i.pravatar.cc/80?img=13"
                            alt=""
                            className="h-12 w-12 rounded-full border-2 border-[#FCFCFA] object-cover"
                        />
                    </div>

                    <div>
                        <p className="text-sm text-neutral-500">
                            More questions? Reach out anytime.
                        </p>
                        <div className="mt-1 flex items-center gap-2">
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white">
                                <MessageCircle size={13} strokeWidth={2} />
                            </span>
                            <span className="text-lg font-semibold text-neutral-900">
                                support@kora.com
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}