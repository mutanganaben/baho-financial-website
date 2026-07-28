"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { fetchApi } from "@/lib/api";
import {
  CheckCircle2,
  FileText,
  User,
  Send,
  ShieldCheck,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

function ApplyFormContent() {
  const searchParams = useSearchParams();
  const initialProduct = searchParams.get("product") || "business-growth";

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

  const [fieldErrors, setFieldErrors] = useState<{
    nationalId?: string;
    phoneNumber?: string;
  }>({});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const prodParam = searchParams.get("product");
    if (prodParam) {
      setFormData((prev) => ({ ...prev, productCategory: prodParam }));
    }
  }, [searchParams]);

  // Handler for National ID: strictly 16 numeric digits only
  const handleNationalIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, "").slice(0, 16);
    setFormData((prev) => ({ ...prev, nationalId: numericValue }));
    if (fieldErrors.nationalId) {
      setFieldErrors((prev) => ({ ...prev, nationalId: undefined }));
    }
  };

  // Handler for Phone Number: digits and leading '+' only
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

  // Client-side validation before dispatching HTTP request
  const validateForm = (): boolean => {
    const errors: { nationalId?: string; phoneNumber?: string } = {};

    // National ID check: must be exactly 16 numeric digits
    if (!/^\d{16}$/.test(formData.nationalId)) {
      errors.nationalId =
        "National ID must be exactly 16 numeric digits (e.g. 1199880011223344).";
    }

    // Rwanda Phone Number check: +25078XXXXXXX or 078XXXXXXX
    const cleanPhone = formData.phoneNumber.replace(/\s+/g, "");
    if (!/^(\+?250|0)?7[2389]\d{7}$/.test(cleanPhone)) {
      errors.phoneNumber =
        "Please enter a valid Rwandan mobile number (e.g. +250 788 123 456 or 0788123456).";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Run client-side validation
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Map product category dropdown values to backend product slugs
    let productSlug = formData.productCategory;
    if (productSlug === "personal") productSlug = "personal-loan";
    if (productSlug === "startup-business") productSlug = "startup-business-loan";
    if (productSlug === "business-growth") productSlug = "business-growth-loan";

    const payload = {
      fullName: formData.fullName,
      nationalId: formData.nationalId,
      phone: formData.phoneNumber,
      email: formData.emailAddress.trim() || undefined,
      district: formData.provinceDistrict,
      productSlug,
      amountRequested: parseInt(formData.loanAmount, 10),
      durationMonths: parseInt(formData.repaymentTerm, 10),
      preferredBranch: formData.preferredBranch,
      loanPurpose: formData.loanPurpose,
    };

    try {
      await fetchApi<{ success: boolean }>("/applications", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      setSubmitted(true);
    } catch (err: any) {
      console.error("Loan application submission error:", err);
      setErrorMessage(
        err.message || "Failed to submit loan request. Please verify your details."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      {submitted ? (
        /* Clean Confirmation Screen */
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
            <p className="text-slate-600 text-base max-w-lg mx-auto leading-relaxed">
              We have received your loan application. Our credit underwriting team will review your application and contact you via phone call shorty.
            </p>
          </div>

          {/* Next Steps List */}
          <div className="text-left bg-blue-50/70 border border-blue-100 rounded-2xl p-6 max-w-lg mx-auto space-y-3">
            <h4 className="text-sm font-extrabold text-baho-navy uppercase tracking-wider">
              What Happens Next?
            </h4>
            <ul className="space-y-2.5 text-xs font-medium text-slate-700">
              <li className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                <span>Our credit officer will review your application details.</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                <span>You will receive a phone call from our team to confirm details.</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                <span>Fast credit evaluation and disbursement upon approval.</span>
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

          {/* Validation Error Banner */}
          {errorMessage && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 flex items-start space-x-3 text-rose-800 text-sm">
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
              <div className="font-medium">{errorMessage}</div>
            </div>
          )}

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
                    maxLength={16}
                    placeholder="1199880011223344 (16 digits)"
                    value={formData.nationalId}
                    onChange={handleNationalIdChange}
                    className={`w-full px-4 py-3.5 rounded-xl border bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-baho-navy focus:bg-white text-sm font-medium ${
                      fieldErrors.nationalId
                        ? "border-rose-400 ring-1 ring-rose-400"
                        : "border-slate-200"
                    }`}
                  />
                  {fieldErrors.nationalId && (
                    <p className="text-xs font-semibold text-rose-600 flex items-center pt-0.5">
                      <AlertCircle className="w-3.5 h-3.5 inline mr-1 flex-shrink-0" />
                      <span>{fieldErrors.nationalId}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-800">
                    Phone Number (MTN / Airtel) *
                  </label>
                  <input
                    type="tel"
                    required
                    maxLength={13}
                    placeholder="+250 78X XXX XXX"
                    value={formData.phoneNumber}
                    onChange={handlePhoneChange}
                    className={`w-full px-4 py-3.5 rounded-xl border bg-slate-50/50 text-slate-900 focus:outline-none focus:ring-2 focus:ring-baho-navy focus:bg-white text-sm font-medium ${
                      fieldErrors.phoneNumber
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

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-slate-800">
                    Email Address (Optional)
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
                    <option value="personal-loan">Personal Loan (RWF 200,000 – 2,000,000)</option>
                    <option value="startup-business-loan">Startup Business Loan (RWF 500,000 – 5,000,000)</option>
                    <option value="business-growth-loan">Business Growth Loan (RWF 2,000,000 – 20,000,000)</option>
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
                    <option value="2">2 Months</option>
                    <option value="3">3 Months</option>
                    <option value="4">4 Months</option>
                    <option value="5">5 Months</option>
                    <option value="6">6 Months</option>
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
