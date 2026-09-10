"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { CtaBanner } from "@/components/home/cta-banner";
import { fetchApi } from "@/lib/api";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    emailAddress: "",
    subject: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState<{
    phoneNumber?: string;
    message?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // Phone input handler for Rwandan numbers
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    if (val.startsWith("+")) {
      val = "+" + val.slice(1).replace(/\D/g, "");
    } else {
      val = val.replace(/\D/g, "");
    }
    val = val.slice(0, 13);
    setFormData((prev) => ({ ...prev, phoneNumber: val }));
    if (fieldErrors.phoneNumber) {
      setFieldErrors((prev) => ({ ...prev, phoneNumber: undefined }));
    }
  };

  // Client-side validation before sending request
  const validateForm = (): boolean => {
    const errors: { phoneNumber?: string; message?: string } = {};

    // Validate phone number format
    const cleanPhone = formData.phoneNumber.replace(/\s+/g, "");
    if (!/^(\+?250|0)?7[2389]\d{7}$/.test(cleanPhone)) {
      errors.phoneNumber =
        "Please enter a valid Rwandan mobile number (e.g. +250 788 123 456 or 0788123456).";
    }

    // Validate message length (minimum 10 characters)
    if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters long.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    const payload = {
      fullName: formData.fullName,
      email: formData.emailAddress,
      phone: formData.phoneNumber,
      subject: formData.subject,
      message: formData.message,
    };

    try {
      await fetchApi<{ success: boolean }>("/contacts", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error("Contact message submission error:", err);
      setErrorMessage(
        err.message || "Failed to send your message. Please check your details and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-baho-bg">
      <Navbar />

      <main className="flex-1">
        {/* Section 1: Hero Banner */}
        <section className="bg-[#0B1B33] text-white py-16 lg:py-20 relative overflow-hidden border-b border-slate-800">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />

          <Container className="relative z-10 space-y-4">
            <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
              <span className="w-6 h-0.5 bg-baho-gold inline-block" />
              <span>BAHO FINANCIAL LTD.</span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
              Contact Us
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-3xl font-normal leading-relaxed">
              We&apos;re here to help. Reach out to our team any time.
            </p>
          </Container>
        </section>

        {/* Section 2: Contact Form & HQ Info Grid */}
        <section className="py-16 lg:py-20 bg-white border-b border-slate-200/70">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

              {/* Left Column: Send Us a Message */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-3">
                  <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
                    <span className="w-6 h-0.5 bg-baho-gold inline-block" />
                    <span>GET IN TOUCH</span>
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-baho-navy-dark tracking-tight">
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
                      Thank you for contacting BAHO Financial. Your message has been stored in our database and our client relations team will respond within 24 hours.
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
                    {/* Error Banner */}
                    {errorMessage && (
                      <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start space-x-3 text-rose-800 text-sm">
                        <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                        <div className="font-medium">{errorMessage}</div>
                      </div>
                    )}

                    {/* Full Name & Phone Number Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-sm font-bold text-slate-800">
                          Full Name *
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
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          maxLength={13}
                          placeholder="+250 78X XXX XXX"
                          value={formData.phoneNumber}
                          onChange={handlePhoneChange}
                          className={`w-full px-4 py-3.5 rounded-xl border bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-baho-navy focus:bg-white transition-all text-sm font-medium ${fieldErrors.phoneNumber
                            ? "border-rose-400 ring-1 ring-rose-400"
                            : "border-slate-200"
                            }`}
                        />
                        {fieldErrors.phoneNumber && (
                          <p className="text-xs font-semibold text-rose-600 flex items-center pt-0.5">
                            <AlertCircle className="w-3.5 h-3.5 inline mr-1 flex-shrink-0" />
                            <span>{fieldErrors.phoneNumber}</span>
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email Address */}
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-slate-800">
                        Email Address *
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
                        Subject *
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
                        Message *
                      </label>
                      <textarea
                        required
                        rows={5}
                        placeholder="How can we help you? (Minimum 10 characters)"
                        value={formData.message}
                        onChange={(e) => {
                          setFormData({ ...formData, message: e.target.value });
                          if (fieldErrors.message) {
                            setFieldErrors((prev) => ({
                              ...prev,
                              message: undefined,
                            }));
                          }
                        }}
                        className={`w-full px-4 py-3.5 rounded-xl border bg-slate-50/50 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-baho-navy focus:bg-white transition-all text-sm font-medium resize-none ${fieldErrors.message
                          ? "border-rose-400 ring-1 ring-rose-400"
                          : "border-slate-200"
                          }`}
                      />
                      {fieldErrors.message && (
                        <p className="text-xs font-semibold text-rose-600 flex items-center pt-0.5">
                          <AlertCircle className="w-3.5 h-3.5 inline mr-1 flex-shrink-0" />
                          <span>{fieldErrors.message}</span>
                        </p>
                      )}
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
                          <Send className="w-4 h-4 ml-2" strokeWidth={2} />
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>

              {/* Right Column: Find Us & Direct Contact */}
              <div className="lg:col-span-5 space-y-6">
                <div className="space-y-2">
                  <div className="inline-flex items-center space-x-3 text-baho-gold font-bold text-xs sm:text-sm tracking-wider uppercase">
                    <span className="w-8 h-0.5 bg-baho-gold inline-block" />
                    <span>OUR OFFICE & CONTACT</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-baho-navy-dark tracking-tight">
                    Get in Touch Directly
                  </h2>
                </div>

                <div className="space-y-4">
                  {/* Head Office */}
                  <div className="flex items-start space-x-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-baho-gold flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6" strokeWidth={1.75} />
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

                  {/* Call Us Directly / Main Phone */}
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-2xl bg-blue-50 text-baho-navy flex items-center justify-center flex-shrink-0">
                        <Phone className="w-6 h-6" strokeWidth={1.75} />
                      </div>
                      <div>
                        <h3 className="text-base font-extrabold text-baho-navy-dark">
                          Phone Call Support
                        </h3>
                        <p className="text-xs text-slate-500">
                          Speak directly with our loan officers
                        </p>
                      </div>
                    </div>

                    <a
                      href="tel:+250788381721"
                      className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-slate-200 hover:border-baho-navy hover:shadow-sm transition-all group"
                    >
                      <div className="flex items-center space-x-3">
                        <Phone className="w-4 h-4 text-baho-navy group-hover:text-baho-gold transition-colors" />
                        <span className="text-base font-bold text-slate-900">+250 788 381 721</span>
                      </div>
                      <span className="text-xs font-bold px-3 py-1.5 rounded-lg bg-baho-navy text-white group-hover:bg-[#16355E] transition-colors shadow-sm">
                        Call Now
                      </span>
                    </a>
                  </div>

                  {/* WhatsApp Support Section */}
                  <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#25D366] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                          <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.04 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.16 12.04 20.16C10.66 20.16 9.3 19.8 8.1 19.11L7.79 18.93L4.66 19.75L5.49 16.7L5.29 16.38C4.54 15.19 4.14 13.57 4.14 11.91C4.14 7.37 7.84 3.67 12.04 3.67ZM8.83 7.37C8.64 7.37 8.34 7.44 8.08 7.72C7.82 8.01 7.08 8.7 7.08 10.12C7.08 11.54 8.11 12.91 8.26 13.1C8.4 13.3 10.26 16.17 13.11 17.4C15.48 18.42 15.96 18.22 16.48 18.17C17 18.12 18.15 17.49 18.39 16.82C18.63 16.14 18.63 15.56 18.56 15.44C18.49 15.32 18.3 15.25 18.01 15.11C17.72 14.96 16.3 14.27 16.03 14.17C15.77 14.07 15.58 14.02 15.39 14.31C15.19 14.6 14.63 15.26 14.46 15.45C14.29 15.65 14.12 15.67 13.83 15.53C13.54 15.38 12.61 15.08 11.51 14.1C10.65 13.33 10.07 12.38 9.9 12.09C9.73 11.8 9.88 11.64 10.03 11.5C10.16 11.37 10.32 11.16 10.47 10.99C10.61 10.82 10.66 10.69 10.76 10.5C10.86 10.31 10.81 10.14 10.74 10C10.66 9.85 10.08 8.42 9.84 7.84C9.6 7.27 9.36 7.35 9.18 7.34C9.01 7.33 8.83 7.37 8.83 7.37Z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900">
                          WhatsApp Support
                        </h3>
                        <p className="text-xs text-slate-600">+250 788 381 721</p>
                      </div>
                    </div>

                    <a
                      href="https://wa.me/250788381721?text=Hello%20BAHO%20Financial%2C%20I%20would%20like%20to%20inquire%20about%20your%20services."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-4 py-2.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs rounded-xl shadow-sm transition-all"
                    >
                      Chat on WhatsApp
                    </a>
                  </div>

                  {/* Email Section */}
                  <div className="flex items-start space-x-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 text-baho-gold flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6" strokeWidth={1.75} />
                    </div>
                    <div className="space-y-1 pt-0.5">
                      <h3 className="text-base font-extrabold text-baho-navy-dark">
                        Email Address
                      </h3>
                      <a
                        href="mailto:info@bahofinancial.com"
                        className="text-sm font-bold text-baho-navy hover:text-baho-gold hover:underline block transition-colors"
                      >
                        info@bahofinancial.com
                      </a>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start space-x-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/80 shadow-sm">
                    <div className="w-12 h-12 rounded-2xl bg-slate-200/80 text-slate-700 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6" strokeWidth={1.75} />
                    </div>
                    <div className="space-y-1 pt-0.5">
                      <h3 className="text-base font-extrabold text-baho-navy-dark">
                        Working Hours
                      </h3>
                      <p className="text-sm text-slate-600 font-medium">
                        Mon–Fri: 8:00am – 5:00pm
                      </p>
                    </div>
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
