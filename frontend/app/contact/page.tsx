"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CtaBanner } from "@/components/home/cta-banner";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building2,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-baho-bg">
      <Navbar />

      <main className="flex-1">
        {/* Section 1: Hero Banner */}
        <section className="bg-[#0B1B33] text-white py-10 sm:py-12 lg:py-14 relative overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

          <Container className="relative z-10 space-y-3">
            <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
              <span className="w-8 h-0.5 bg-baho-gold inline-block" />
              <span>BAHO FINANCIAL</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Contact Us
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-3xl font-normal leading-relaxed">
              We&apos;re here to help. Reach out to our team any time.
            </p>
          </Container>
        </section>

        {/* Section 2: Contact Form & HQ Info Grid (Matching Figma Reference Screenshot) */}
        <section className="py-20 lg:py-24 bg-white border-b border-slate-200/70">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Send Us a Message */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-3">
                  <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
                    <span className="w-8 h-0.5 bg-baho-gold inline-block" />
                    <span>GET IN TOUCH</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-extrabold text-baho-navy-dark tracking-tight">
                    Send Us a Message
                  </h2>
                </div>

                {submitted ? (
                  <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-3xl space-y-4 text-center">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-9 h-9" />
                    </div>
                    <h3 className="text-2xl font-bold text-emerald-950">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-emerald-800 text-base max-w-md mx-auto">
                      Thank you for contacting BAHO Financial. Our client relations team has received your message and will respond within 24 hours.
                    </p>
                    <div className="pt-2">
                      <Button
                        variant="outline"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            fullName: "",
                            phoneNumber: "",
                            emailAddress: "",
                            subject: "",
                            message: "",
                          });
                        }}
                        className="font-bold border-emerald-300 text-emerald-900 hover:bg-emerald-100"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name & Phone Number Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-slate-800">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Your full name"
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                          }
                          className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-baho-navy focus:bg-white transition-all text-sm font-medium"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-slate-800">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+250 7XX XXX XXX"
                          value={formData.phoneNumber}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phoneNumber: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-baho-navy focus:bg-white transition-all text-sm font-medium"
                        />
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-slate-800">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        value={formData.emailAddress}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            emailAddress: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-baho-navy focus:bg-white transition-all text-sm font-medium"
                      />
                    </div>

                    {/* Subject Dropdown */}
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-slate-800">
                        Subject
                      </label>
                      <select
                        required
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-baho-navy focus:bg-white transition-all text-sm font-medium"
                      >
                        <option value="" disabled>
                          Select a subject
                        </option>
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Loan Application Support">
                          Loan Application Support
                        </option>
                        <option value="Branch Consultation">
                          Branch Consultation
                        </option>
                        <option value="Feedback & Support">
                          Feedback & Support
                        </option>
                      </select>
                    </div>

                    {/* Message Area */}
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-slate-800">
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-baho-navy focus:bg-white transition-all text-sm font-medium resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      variant="gold"
                      size="lg"
                      className="w-full sm:w-auto font-bold px-8 shadow-md"
                    >
                      {isSubmitting ? (
                        <span>Sending Message...</span>
                      ) : (
                        <span className="flex items-center">
                          Send Message
                          <Send className="w-4 h-4 ml-2" />
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>

              {/* Right Column: Find Us */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-3">
                  <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
                    <span className="w-8 h-0.5 bg-baho-gold inline-block" />
                    <span>OUR OFFICE</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl font-extrabold text-baho-navy-dark tracking-tight">
                    Find Us
                  </h2>
                </div>

                {/* Contact Information List matching Figma screenshot */}
                <div className="space-y-6">
                  {/* Head Office */}
                  <div className="flex items-start space-x-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div className="space-y-1 pt-0.5">
                      <h3 className="text-base font-extrabold text-baho-navy-dark">
                        Head Office
                      </h3>
                      <p className="text-sm text-slate-600 font-medium">
                        Kabuga Commercial Center, Main Highway, Kigali, Rwanda
                      </p>
                    </div>
                  </div>

                  {/* Main Phone */}
                  <div className="flex items-start space-x-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div className="space-y-1 pt-0.5">
                      <h3 className="text-base font-extrabold text-baho-navy-dark">
                        Main Phone
                      </h3>
                      <a
                        href="tel:+250788123456"
                        className="text-sm font-bold text-blue-600 hover:underline block"
                      >
                        +250 788 123 456
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start space-x-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div className="space-y-1 pt-0.5">
                      <h3 className="text-base font-extrabold text-baho-navy-dark">
                        Email
                      </h3>
                      <a
                        href="mailto:info@bahofinancial.rw"
                        className="text-sm font-bold text-blue-600 hover:underline block"
                      >
                        info@bahofinancial.rw
                      </a>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start space-x-4 p-5 rounded-2xl bg-slate-50 border border-slate-100">
                    <div className="w-12 h-12 rounded-2xl bg-slate-200/80 text-slate-700 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div className="space-y-1 pt-0.5">
                      <h3 className="text-base font-extrabold text-baho-navy-dark">
                        Working Hours
                      </h3>
                      <p className="text-sm text-slate-600 font-medium">
                        Mon–Fri: 8:30am – 5:00pm
                      </p>
                      <p className="text-sm text-slate-600 font-medium">
                        Sat: 9:00am – 1:00pm
                      </p>
                    </div>
                  </div>
                </div>

                {/* Building / Office Image Container */}
                <div className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-slate-100 border border-slate-200 shadow-md">
                  <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
                    alt="BAHO Financial Head Office Building"
                    fill
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white text-xs font-bold flex items-center justify-between bg-slate-950/80 backdrop-blur-md p-3 rounded-xl border border-white/10">
                    <span>Kigali Head Office (Kabuga)</span>
                    <Building2 className="w-4 h-4 text-baho-gold" />
                  </div>
                </div>
              </div>

            </div>
          </Container>
        </section>

        {/* Section 3: Call to Action Banner */}
        <CtaBanner />
      </main>

      <Footer />
    </div>
  );
}
