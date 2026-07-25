"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  FileText,
  Building2,
  User,
  Phone,
  Mail,
  MapPin,
  Send,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";

function ApplyFormContent() {
  const searchParams = useSearchParams();
  const initialProduct = searchParams.get("product") || "business";

  const [formData, setFormData] = useState({
    fullName: "",
    nationalId: "",
    phoneNumber: "",
    emailAddress: "",
    provinceDistrict: "",
    productCategory: initialProduct,
    loanAmount: "1000000",
    repaymentTerm: "6",
    preferredBranch: "kigali-kabuga",
    loanPurpose: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  useEffect(() => {
    const prodParam = searchParams.get("product");
    if (prodParam) {
      setFormData((prev) => ({ ...prev, productCategory: prodParam }));
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate Loan Application submission and Reference ID generation
    setTimeout(() => {
      const randomRef = "BAHO-2026-" + Math.floor(10000 + Math.random() * 90000);
      setIsSubmitting(false);
      setReferenceId(randomRef);
    }, 1200);
  };

  return (
    <div className="space-y-12">
      {referenceId ? (
        /* Confirmation Screen */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl max-w-3xl mx-auto text-center space-y-6">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
            <CheckCircle2 className="w-12 h-12 stroke-[2.5]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-widest text-baho-gold">
              APPLICATION SUBMITTED SUCCESSFULLY
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-baho-navy-dark">
              Thank You, {formData.fullName}!
            </h2>
            <p className="text-slate-600 text-base max-w-lg mx-auto">
              Your loan application has been received and routed to our credit underwriting team.
            </p>
          </div>

          {/* Reference ID Box */}
          <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl max-w-md mx-auto space-y-2">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Application Reference ID
            </div>
            <div className="text-3xl font-black text-baho-navy tracking-wider font-mono">
              {referenceId}
            </div>
            <div className="text-xs text-slate-500">
              Please save this ID to track your application status.
            </div>
          </div>

          {/* Next Steps List */}
          <div className="text-left bg-blue-50/70 border border-blue-100 rounded-2xl p-6 max-w-lg mx-auto space-y-3">
            <h4 className="text-sm font-extrabold text-baho-navy uppercase tracking-wider">
              What Happens Next?
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-700">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                <span>Our credit officer will review your details within 24 hours.</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                <span>You will receive an SMS and phone call to confirm documentation.</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                <span>Funds will be disbursed upon final credit committee approval.</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/financing">
              <Button variant="outline" size="md" className="font-bold">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
            <Link href="/">
              <Button variant="gold" size="md" className="font-bold shadow-md">
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        /* Main Loan Application Form */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-lg space-y-10 max-w-4xl mx-auto">
          <div className="border-b border-slate-100 pb-6 space-y-2">
            <div className="inline-flex items-center space-x-2 text-baho-gold font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>SECURE ONLINE LOAN APPLICATION</span>
            </div>
            <h2 className="text-3xl font-extrabold text-baho-navy-dark tracking-tight">
              Submit Loan Request
            </h2>
            <p className="text-slate-600 text-sm">
              Please complete all required fields accurately. All information is confidential under BNR regulatory guidelines.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Personal Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-extrabold text-baho-navy-dark border-b border-slate-100 pb-3 flex items-center space-x-2">
                <User className="w-5 h-5 text-baho-gold" />
                <span>1. Personal & Contact Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-800">
                    Full Name (as on National ID) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-baho-navy focus:bg-white text-sm font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-800">
                    National ID / Passport Number *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="1 19XX 8 XXXXXXX X XX"
                    value={formData.nationalId}
                    onChange={(e) =>
                      setFormData({ ...formData, nationalId: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-baho-navy focus:bg-white text-sm font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-800">
                    Phone Number (MTN / Airtel) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+250 7XX XXX XXX"
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-baho-navy focus:bg-white text-sm font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-800">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={formData.emailAddress}
                    onChange={(e) =>
                      setFormData({ ...formData, emailAddress: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-baho-navy focus:bg-white text-sm font-medium"
                  />
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <label className="block text-sm font-bold text-slate-800">
                    Residential Location (District & Sector) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Gasabo, Kimironko or Kamonyi, Ruyenzi"
                    value={formData.provinceDistrict}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        provinceDistrict: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-baho-navy focus:bg-white text-sm font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Loan Requirements */}
            <div className="space-y-6">
              <h3 className="text-lg font-extrabold text-baho-navy-dark border-b border-slate-100 pb-3 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-baho-gold" />
                <span>2. Financing Request Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-800">
                    Financing Product Category *
                  </label>
                  <select
                    required
                    value={formData.productCategory}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        productCategory: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-baho-navy focus:bg-white text-sm font-medium"
                  >
                    <option value="cash-advance">Cash Advance (RWF 50,000 – 500,000)</option>
                    <option value="personal">Personal Loan (RWF 200,000 – 2,000,000)</option>
                    <option value="startup-business">Startup Business Loan (RWF 500,000 – 5,000,000)</option>
                    <option value="business-growth">Business Growth Loan (RWF 2,000,000 – 20,000,000)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-800">
                    Requested Amount (RWF) *
                  </label>
                  <input
                    type="number"
                    required
                    min="50000"
                    step="50000"
                    placeholder="e.g. 1000000"
                    value={formData.loanAmount}
                    onChange={(e) =>
                      setFormData({ ...formData, loanAmount: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-baho-navy focus:bg-white text-sm font-medium"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-800">
                    Preferred Repayment Duration *
                  </label>
                  <select
                    required
                    value={formData.repaymentTerm}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        repaymentTerm: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-baho-navy focus:bg-white text-sm font-medium"
                  >
                    <option value="1">1 Month</option>
                    <option value="3">3 Months</option>
                    <option value="6">6 Months</option>
                    <option value="8">8 Months</option>
                    <option value="12">12 Months</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-800">
                    Preferred Processing Branch *
                  </label>
                  <select
                    required
                    value={formData.preferredBranch}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferredBranch: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-baho-navy focus:bg-white text-sm font-medium"
                  >
                    <option value="kigali-kabuga">Kigali — Head Office (Kabuga)</option>
                    <option value="ruyenzi">Ruyenzi Branch (Kamonyi)</option>
                    <option value="nyagatare-rwimiyaga">Nyagatare — Rwimiyaga Branch</option>
                    <option value="nyagatare-rukomo">Nyagatare — Rukomo Branch</option>
                  </select>
                </div>

                <div className="sm:col-span-2 space-y-2">
                  <label className="block text-sm font-bold text-slate-800">
                    Loan Purpose & Business Description *
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Briefly describe how you intend to use the loan capital..."
                    value={formData.loanPurpose}
                    onChange={(e) =>
                      setFormData({ ...formData, loanPurpose: e.target.value })
                    }
                    className="w-full px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-baho-navy focus:bg-white text-sm font-medium resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-500 font-medium">
                By submitting, you agree to BAHO Financial credit terms and authorization for credit verification.
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                variant="gold"
                size="lg"
                className="w-full sm:w-auto font-bold px-10 shadow-md flex-shrink-0"
              >
                {isSubmitting ? (
                  <span>Submitting Loan Request...</span>
                ) : (
                  <span className="flex items-center">
                    Submit Application
                    <Send className="w-4 h-4 ml-2" />
                  </span>
                )}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default function ApplyPage() {
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
              <span>BAHO FINANCIAL / ONLINE PORTAL</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Apply for a Loan
            </h1>

            <p className="text-base sm:text-lg text-slate-300 max-w-3xl font-normal leading-relaxed">
              Complete your online application in minutes for rapid 24-hour credit evaluation.
            </p>
          </Container>
        </section>

        {/* Section 2: Application Form Container */}
        <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/70">
          <Container>
            <Suspense fallback={<div className="text-center py-12 text-slate-500 font-bold">Loading application portal...</div>}>
              <ApplyFormContent />
            </Suspense>
          </Container>
        </section>
      </main>

      <Footer />
    </div>
  );
}
