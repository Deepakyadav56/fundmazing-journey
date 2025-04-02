
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Search, PhoneCall, Mail, MessageCircle, HelpCircle } from 'lucide-react';
import PageContainer from '@/components/layout/PageContainer';

const Help = () => {
  const faqs = [
    {
      question: "How do I start investing in mutual funds?",
      answer: "To start investing, first complete your KYC verification. Then browse funds in the Explore section, select a fund, and choose either a one-time investment or SIP. Follow the payment process to complete your investment."
    },
    {
      question: "What is a SIP?",
      answer: "SIP (Systematic Investment Plan) allows you to invest a fixed amount in mutual funds at regular intervals (typically monthly). It helps in rupee cost averaging and building wealth over time through disciplined investing."
    },
    {
      question: "How do I track my investments?",
      answer: "You can track all your investments in the Dashboard section. It provides details like current value, returns, XIRR, and investment history for each fund you've invested in."
    },
    {
      question: "What is XIRR?",
      answer: "XIRR (Extended Internal Rate of Return) is a method to calculate returns on investments made at irregular intervals. It represents the annualized return on your mutual fund investments, taking into account all cash flows."
    },
    {
      question: "How can I redeem my investments?",
      answer: "To redeem, go to your Dashboard or Portfolio, select the fund you wish to redeem, click on 'Redeem', and follow the instructions. The redemption amount will be credited to your registered bank account within 2-3 business days."
    },
    {
      question: "What are the tax implications on mutual fund investments?",
      answer: "Equity funds held for more than 1 year are subject to 10% LTCG tax (above ₹1 lakh). For debt funds, LTCG (>3 years) is taxed at 20% with indexation benefits. For shorter holding periods, gains are added to your income and taxed at applicable rates."
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  return (
    <PageContainer title="Help & Support" showBackButton>
      <div className="space-y-8 pb-6">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search for help topics"
            className="pl-10"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="flex flex-col h-20 bg-white">
            <PhoneCall size={20} className="mb-1 text-fundeasy-green" />
            <span>Call Us</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-20 bg-white">
            <Mail size={20} className="mb-1 text-fundeasy-green" />
            <span>Email</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-20 bg-white">
            <MessageCircle size={20} className="mb-1 text-fundeasy-green" />
            <span>Chat</span>
          </Button>
          <Button variant="outline" className="flex flex-col h-20 bg-white">
            <HelpCircle size={20} className="mb-1 text-fundeasy-green" />
            <span>FAQs</span>
          </Button>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="bg-white rounded-lg p-2">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-sm font-medium">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-700">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="bg-white p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <Input placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input type="email" placeholder="Enter your email" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Subject</label>
              <Input placeholder="Subject of your query" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <Textarea placeholder="Describe your issue or query" rows={4} />
            </div>
            <Button type="submit" className="w-full bg-fundeasy-green">Submit</Button>
          </form>
        </div>
      </div>
    </PageContainer>
  );
};

export default Help;
