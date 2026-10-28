// components/ContactUs/ReachUsPopup.jsx
"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { FiArrowRight, FiX, FiPhone } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import countryList from "react-select-country-list";

import config from "../../lib/config";
import { SafeImage } from "../../lib/SafeImage";
import "react-toastify/dist/ReactToastify.css";

const overlayVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.25 } }, exit: { opacity: 0, transition: { duration: 0.2 } } };
const modalVariants = { hidden: { opacity: 0, scale: 0.98, y: 12 }, visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }, exit: { opacity: 0, scale: 0.98, y: 8, transition: { duration: 0.18 } } };
const leftVariants = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut" } } };
const rightVariants = { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: "easeOut", delay: 0.04 } } };

const selectStyles = { control: (base, state) => ({ ...base, minHeight: "44px", height: "44px", borderRadius: "8px", borderWidth: "1px", borderColor: state.isFocused ? "#f97316" : "#e5e7eb", boxShadow: state.isFocused ? "0 0 0 1px #f97316" : "none", transition: "border-color 0.2s ease", "&:hover": { borderColor: "#f97316" } }), valueContainer: (base) => ({ ...base, padding: "2px 10px" }), placeholder: (base) => ({ ...base, color: "#9ca3af", fontSize: "13px" }), singleValue: (base) => ({ ...base, color: "#111827", fontSize: "13px" }), input: (base) => ({ ...base, fontSize: "13px" }), indicatorsContainer: (base) => ({ ...base, height: "42px" }), menu: (base) => ({ ...base, zIndex: 10001, borderRadius: "8px", overflow: "hidden" }), menuPortal: (base) => ({ ...base, zIndex: 10002 }), option: (base, state) => ({ ...base, padding: "8px 10px", fontSize: "13px", cursor: "pointer", backgroundColor: state.isSelected ? "#f97316" : state.isFocused ? "#fff7ed" : "#fff", color: state.isSelected ? "#fff" : "#111827" }) };

const inputClassName = "h-11 w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3 text-[13px] text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500";
const messageClassName = "w-full resize-none rounded-lg border border-gray-200 bg-white px-3 py-2 text-[13px] text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-orange-500 focus:ring-1 focus:ring-orange-500";

export default function ReachUsPopup({ open, onClose }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); 
  }, []);

  const { register, handleSubmit, control, reset } = useForm({ defaultValues: { name: "", email: "", phone: "", industry: "", country: "", time: "", message: "" } });
  const countryOptions = useMemo(() => countryList().getData(), []);
  
  // ✅ UPDATED INDUSTRY OPTIONS
  const industryOptions = useMemo(
    () => [
      { label: "Law Firm", value: "Law Firm" },
      { label: "Media House", value: "Media House" },
      { label: "Production", value: "Production" },
      { label: "Chatter Account", value: "Chatter Account" },
      { label: "Private Equity Firm", value: "Private Equity Firm" },
      { label: "Mergers, Acquisitions, and IPO Speciality", value: "Mergers, Acquisitions, and IPO Speciality" },
      { label: "Real Estate", value: "Real Estate" },
      { label: "Infrastructure Industry", value: "Infrastructure Industry" },
      { label: "HR and Risk Compliance Team", value: "HR and Risk Compliance Team" },
      { label: "IT Services", value: "IT Services" },
      { label: "Finance", value: "Finance" },
      { label: "Healthcare", value: "Healthcare" },
      { label: "Manufacturing", value: "Manufacturing" },
      { label: "Jewellery", value: "Jewellery" },
    ],
    []
  );

  const onSubmit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const response = await axios.post(`${config.API}/submit.php`, data, { headers: { "Content-Type": "application/json" } });
      if (response.data?.success) {
        reset();
        onClose?.();
        router.push("/successful");
      } else {
        toast.error(response.data?.message || "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Reach Us form submission error:", error);
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-black/60 px-3 py-3 backdrop-blur-[2px] sm:px-4 sm:py-5" variants={overlayVariants} initial="hidden" animate="visible" exit="exit" onClick={onClose}>
            <motion.div variants={modalVariants} initial="hidden" animate="visible" exit="exit" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="reach-us-heading" className="relative max-h-[92dvh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white shadow-[0_25px_80px_rgba(0,0,0,0.35)] md:overflow-hidden">
              <button type="button" onClick={onClose} aria-label="Close popup" className="absolute right-2 top-2 z-[10003] flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 sm:right-3 sm:top-3">
                <FiX className="text-lg text-orange-500" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <motion.div variants={leftVariants} className="relative hidden min-h-[460px] flex-col justify-center overflow-hidden bg-orange-500 px-7 py-8 text-white md:flex">
                  <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-white/10" />
                  <div aria-hidden="true" className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full border border-white/10" />
                  <div className="relative z-10">
                    <SafeImage src="/homebg/logof.png" alt="Everence" className="mb-6 h-auto max-w-[150px] object-contain object-left" />
                    <h2 className="max-w-sm text-2xl font-bold leading-tight tracking-tight lg:text-3xl">The Right Conversation<br />Starts Before the Risk<br />Becomes Urgent</h2>
                    <p className="mt-4 max-w-sm text-sm leading-6 text-white/90">Get expert guidance before a digital incident becomes a serious business risk.</p>
                    <a href="tel:+918655412100" aria-label="Call Emergency Support at +91 86554 12100" className="group mt-6 inline-flex w-fit items-center gap-3 rounded-lg bg-white px-4 py-3 text-orange-500 shadow-md transition hover:-translate-y-0.5 hover:bg-orange-50 hover:shadow-lg">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-500 text-white transition-transform group-hover:scale-105"><FiPhone className="text-base" /></span>
                      <span className="text-left"><span className="block text-[9px] font-bold uppercase tracking-[0.15em]">Emergency Call</span><span className="mt-0.5 block text-sm font-bold text-gray-900">+91 86554 12100</span></span>
                      <FiArrowRight className="ml-1 text-base transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </motion.div>

                <motion.div variants={rightVariants} className="flex min-w-0 flex-col justify-center bg-white px-3 py-4 sm:px-6 sm:py-6 md:px-8">
                  <div className="mb-3 pr-8 sm:mb-4">
                    <h3 id="reach-us-heading" className="text-xl font-bold leading-tight text-gray-900 sm:text-2xl">Reach Us</h3>
                    <p className="mt-1 text-xs leading-4 text-gray-500 sm:leading-5">Tell us how we can help protect your business.</p>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 sm:space-y-3">
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <input type="text" autoComplete="name" placeholder="Full Name*" aria-label="Full Name" className={inputClassName} {...register("name", { required: "Full name is required" })} />
                      <input type="email" autoComplete="email" placeholder="Email*" aria-label="Email" className={inputClassName} {...register("email", { required: "Email is required", pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email" } })} />
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <input type="tel" autoComplete="tel" placeholder="Phone*" aria-label="Phone" className={inputClassName} {...register("phone", { required: "Phone number is required" })} />
                      <Controller name="industry" control={control} rules={{ required: "Industry is required" }} render={({ field }) => (
                        <CreatableSelect
                          instanceId="reach-us-industry"
                          value={field.value ? { label: field.value, value: field.value } : null}
                          options={industryOptions}
                          styles={selectStyles}
                          placeholder="Industry*"
                          isClearable
                          menuPosition="fixed"
                          menuPortalTarget={mounted ? document.body : undefined}
                          onChange={(option) => field.onChange(option?.label || "")}
                        />
                      )} />
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      <Controller name="country" control={control} rules={{ required: "Country is required" }} render={({ field }) => (
                        <Select
                          instanceId="reach-us-country"
                          value={countryOptions.find((option) => option.label === field.value) || null}
                          options={countryOptions}
                          styles={selectStyles}
                          placeholder="Country*"
                          isClearable
                          menuPosition="fixed"
                          menuPortalTarget={mounted ? document.body : undefined}
                          onChange={(option) => field.onChange(option?.label || "")}
                        />
                      )} />
                      <select aria-label="Best time to contact" className={inputClassName} {...register("time")}>
                        <option value="">Best time</option>
                        <option value="Morning">Morning</option>
                        <option value="Afternoon">Afternoon</option>
                        <option value="Evening">Evening</option>
                      </select>
                    </div>

                    <textarea rows={2} placeholder="Write Message (optional)" aria-label="Write Message" className={messageClassName} {...register("message")} />

                    <button type="submit" disabled={isSubmitting} className="flex h-11 w-full items-center justify-center rounded-lg bg-orange-500 px-4 text-sm font-semibold text-white transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60">
                      {isSubmitting ? "Submitting..." : (<>SUBMIT<FiArrowRight className="ml-2 text-lg" /></>)}
                    </button>
                  </form>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover />
    </>
  );
}