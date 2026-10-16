"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import {
  FiArrowRight,
  FiX,
  FiPhone,
} from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import countryList from "react-select-country-list";

import config from "../../lib/config";
import { SafeImage } from "../../lib/SafeImage";

import "react-toastify/dist/ReactToastify.css";

/* =========================================================
   ANIMATIONS
========================================================= */

const overlayVariants = {
  hidden: {
    opacity: 0,
  },

  visible: {
    opacity: 1,
    transition: {
      duration: 0.25,
    },
  },

  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    y: 20,
  },

  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    opacity: 0,
    scale: 0.97,
    y: 10,
    transition: {
      duration: 0.2,
    },
  },
};

const leftVariants = {
  hidden: {
    opacity: 0,
    x: -30,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      delay: 0.05,
      ease: "easeOut",
    },
  },
};

const rightVariants = {
  hidden: {
    opacity: 0,
    x: 30,
  },

  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.45,
      delay: 0.1,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   REACT SELECT STYLES
========================================================= */

const selectStyles = {
  control: (base, state) => ({
    ...base,

    minHeight: "48px",
    height: "48px",

    borderRadius: "8px",
    borderWidth: "1px",

    borderColor: state.isFocused
      ? "#f97316"
      : "#e5e7eb",

    boxShadow: state.isFocused
      ? "0 0 0 1px #f97316"
      : "none",

    transition: "all 0.2s ease",

    "&:hover": {
      borderColor: "#f97316",
    },
  }),

  valueContainer: (base) => ({
    ...base,
    padding: "2px 14px",
  }),

  placeholder: (base) => ({
    ...base,
    color: "#9ca3af",
    fontSize: "14px",
  }),

  singleValue: (base) => ({
    ...base,
    color: "#111827",
    fontSize: "14px",
  }),

  input: (base) => ({
    ...base,
    fontSize: "14px",
  }),

  indicatorsContainer: (base) => ({
    ...base,
    height: "46px",
  }),

  menu: (base) => ({
    ...base,
    zIndex: 10000,
    borderRadius: "8px",
    overflow: "hidden",
  }),

  option: (base, state) => ({
    ...base,

    padding: "9px 14px",
    fontSize: "14px",
    cursor: "pointer",

    backgroundColor: state.isSelected
      ? "#f97316"
      : state.isFocused
      ? "#fff7ed"
      : "#ffffff",

    color: state.isSelected
      ? "#ffffff"
      : "#111827",
  }),
};

/* =========================================================
   COMMON INPUT CLASS
========================================================= */

const inputClassName = `
  h-12
  w-full
  rounded-lg
  border
  border-gray-200
  bg-white
  px-4
  text-sm
  text-gray-900
  outline-none
  transition-all
  duration-200
  placeholder:text-gray-400
  focus:border-orange-500
  focus:ring-1
  focus:ring-orange-500
`;

/* =========================================================
   COMPONENT
========================================================= */

export default function ReachUsPopup({ open, onClose }) {
  const router = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* =========================================================
     FORM
  ========================================================= */

  const {
    register,
    handleSubmit,
    control,
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      industry: "",
      country: "",
      time: "",
      message: "",
    },
  });

  /* =========================================================
     COUNTRY OPTIONS
  ========================================================= */

  const countryOptions = useMemo(
    () => countryList().getData(),
    []
  );

  /* =========================================================
     INDUSTRY OPTIONS
  ========================================================= */

  const industryOptions = useMemo(
    () => [
      {
        label: "IT Services",
        value: "IT Services",
      },
      {
        label: "Finance",
        value: "Finance",
      },
      {
        label: "Healthcare",
        value: "Healthcare",
      },
      {
        label: "Manufacturing",
        value: "Manufacturing",
      },
      {
        label: "Jewellery",
        value: "Jewellery",
      },
    ],
    []
  );

  /* =========================================================
     SUBMIT
  ========================================================= */

  const onSubmit = async (data) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${config.API}/submit.php`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.success) {
        toast.success("Form submitted successfully");

        reset();

        onClose();

        router.push("/successful");
      } else {
        toast.error(
          response.data?.message ||
            "Submission failed"
        );
      }
    } catch (error) {
      console.error(
        "Form submission error:",
        error
      );

      toast.error(
        "Submission failed. Try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <>
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            className="
              fixed
              inset-0
              z-[9999]
              flex
              items-center
              justify-center
              overflow-y-auto
              bg-black/60
              px-4
              py-5
              backdrop-blur-[2px]
            "
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          >
            {/* =================================================
                MODAL
            ================================================= */}

            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(event) =>
                event.stopPropagation()
              }
              className="
                relative
                w-full
                max-w-3xl
                overflow-hidden
                rounded-xl
                bg-white
                shadow-[0_25px_80px_rgba(0,0,0,0.35)]
              "
            >
              {/* =================================================
                  CLOSE BUTTON
              ================================================= */}

              <button
                type="button"
                onClick={onClose}
                aria-label="Close popup"
                className="
                  absolute
                  right-3
                  top-3
                  z-50
                  flex
                  h-8
                  w-8
                  items-center
                  justify-center
                  rounded-full
                  bg-white
                  shadow-md
                  transition-all
                  duration-200
                  hover:scale-105
                  hover:bg-gray-50
                  focus:outline-none
                  focus:ring-2
                  focus:ring-orange-500
                "
              >
                <FiX className="text-lg text-orange-500" />
              </button>

              {/* =================================================
                  TWO COLUMN LAYOUT
              ================================================= */}

              <div className="grid grid-cols-1 md:grid-cols-2">

                {/* =================================================
                    LEFT COLUMN
                ================================================= */}

                <motion.div
                  variants={leftVariants}
                  className="
                    relative
                    flex
                    min-h-[420px]
                    flex-col
                    justify-center
                    overflow-hidden
                    bg-orange-500
                    px-6
                    py-8
                    text-white
                    sm:px-8
                  "
                >
                  {/* DECORATIVE CIRCLE */}

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      -right-24
                      -top-24
                      h-56
                      w-56
                      rounded-full
                      bg-white/10
                    "
                  />

                  <div
                    aria-hidden="true"
                    className="
                      pointer-events-none
                      absolute
                      -bottom-28
                      -left-16
                      h-64
                      w-64
                      rounded-full
                      border
                      border-white/10
                    "
                  />

                  {/* CONTENT */}

                  <div className="relative z-10">

                    {/* LOGO */}

                    <SafeImage
                      src="/homebg/logof.png"
                      alt="Everence"
                      className="
                        mb-6
                        h-auto
                        w-auto
                        max-w-[150px]
                        object-contain
                        object-left
                      "
                    />

                    {/* HEADING */}

                    <h2
                      className="
                        max-w-sm
                        text-2xl
                        font-bold
                        leading-[1.15]
                        tracking-tight
                        sm:text-3xl
                      "
                    >
                      The Right Conversation
                      <br />
                      Starts Before the Risk
                      <br />
                      Becomes Urgent
                    </h2>

                    {/* DESCRIPTION */}

                    <p
                      className="
                        mt-4
                        max-w-sm
                        text-sm
                        leading-6
                        text-white/90
                      "
                    >
                      Get expert guidance before a
                      digital incident becomes a
                      serious business risk.
                    </p>

                    {/* =================================================
                        EMERGENCY CALL
                    ================================================= */}

                    <a
                      href="tel:+918655412100"
                      aria-label="Call Emergency Support at +91 86554 12100"
                      className="
                        group
                        mt-6
                        inline-flex
                        w-fit
                        items-center
                        gap-3
                        rounded-lg
                        bg-white
                        px-4
                        py-3
                        text-orange-500
                        shadow-md
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:bg-orange-50
                        hover:shadow-lg
                      "
                    >
                      {/* PHONE ICON */}

                      <span
                        className="
                          flex
                          h-9
                          w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-orange-500
                          text-white
                          transition-transform
                          duration-300
                          group-hover:scale-105
                        "
                      >
                        <FiPhone className="text-base" />
                      </span>

                      {/* PHONE DETAILS */}

                      <span className="text-left">

                        <span
                          className="
                            block
                            text-[9px]
                            font-bold
                            uppercase
                            tracking-[0.15em]
                            text-orange-500
                          "
                        >
                          Emergency Call
                        </span>

                        <span
                          className="
                            mt-0.5
                            block
                            text-sm
                            font-bold
                            text-gray-900
                          "
                        >
                          +91 86554 12100
                        </span>

                      </span>

                      <FiArrowRight
                        className="
                          ml-1
                          text-base
                          transition-transform
                          duration-300
                          group-hover:translate-x-1
                        "
                      />
                    </a>

                  </div>
                </motion.div>

                {/* =================================================
                    RIGHT COLUMN - FORM
                ================================================= */}

                <motion.div
                  variants={rightVariants}
                  className="
                    flex
                    flex-col
                    justify-center
                    bg-white
                    px-5
                    py-6
                    sm:px-7
                    md:px-8
                  "
                >

                  {/* FORM HEADER */}

                  <div className="mb-4 pr-8">

                    <h3
                      className="
                        text-xl
                        font-bold
                        leading-tight
                        text-gray-900
                      "
                    >
                      Reach Us
                    </h3>

                    <p
                      className="
                        mt-1
                        text-xs
                        leading-5
                        text-gray-500
                      "
                    >
                      Tell us how we can help protect
                      your business.
                    </p>

                  </div>

                  {/* =================================================
                      FORM
                  ================================================= */}

                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-3"
                  >

                    {/* =================================================
                        ROW 1
                    ================================================= */}

                    <div
                      className="
                        grid
                        grid-cols-1
                        gap-3
                        sm:grid-cols-2
                      "
                    >

                      {/* NAME */}

                      <input
                        type="text"
                        autoComplete="name"
                        placeholder="Full Name*"
                        className={inputClassName}
                        {...register("name", {
                          required:
                            "Full name is required",
                        })}
                      />

                      {/* EMAIL */}

                      <input
                        type="email"
                        autoComplete="email"
                        placeholder="Email*"
                        className={inputClassName}
                        {...register("email", {
                          required:
                            "Email is required",

                          pattern: {
                            value:
                              /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

                            message:
                              "Enter a valid email",
                          },
                        })}
                      />

                    </div>

                    {/* =================================================
                        ROW 2
                    ================================================= */}

                    <div
                      className="
                        grid
                        grid-cols-1
                        gap-3
                        sm:grid-cols-2
                      "
                    >

                      {/* PHONE */}

                      <input
                        type="tel"
                        autoComplete="tel"
                        placeholder="Phone*"
                        className={inputClassName}
                        {...register("phone", {
                          required:
                            "Phone number is required",
                        })}
                      />

                      {/* INDUSTRY */}

                      <Controller
                        name="industry"
                        control={control}
                        rules={{
                          required:
                            "Industry is required",
                        }}
                        render={({ field }) => (
                          <CreatableSelect
                            value={
                              field.value
                                ? {
                                    label:
                                      field.value,
                                    value:
                                      field.value,
                                  }
                                : null
                            }
                            options={
                              industryOptions
                            }
                            styles={
                              selectStyles
                            }
                            placeholder="Industry*"
                            isClearable
                            onChange={(value) =>
                              field.onChange(
                                value?.label ||
                                  ""
                              )
                            }
                          />
                        )}
                      />

                    </div>

                    {/* =================================================
                        ROW 3
                    ================================================= */}

                    <div
                      className="
                        grid
                        grid-cols-1
                        gap-3
                        sm:grid-cols-2
                      "
                    >

                      {/* COUNTRY */}

                      <Controller
                        name="country"
                        control={control}
                        rules={{
                          required:
                            "Country is required",
                        }}
                        render={({ field }) => (
                          <Select
                            value={
                              countryOptions.find(
                                (option) =>
                                  option.label ===
                                  field.value
                              ) || null
                            }
                            options={
                              countryOptions
                            }
                            styles={
                              selectStyles
                            }
                            placeholder="Country*"
                            isClearable
                            onChange={(value) =>
                              field.onChange(
                                value?.label ||
                                  ""
                              )
                            }
                          />
                        )}
                      />

                      {/* BEST TIME */}

                      <select
                        className={inputClassName}
                        {...register("time")}
                      >
                        <option value="">
                          Best time to contact?
                        </option>

                        <option value="Morning">
                          Morning
                        </option>

                        <option value="Afternoon">
                          Afternoon
                        </option>

                        <option value="Evening">
                          Evening
                        </option>
                      </select>

                    </div>

                    {/* =================================================
                        MESSAGE
                    ================================================= */}

                    <textarea
                      rows={3}
                      placeholder="Write Message"
                      className="
                        w-full
                        resize-none
                        rounded-lg
                        border
                        border-gray-200
                        bg-white
                        px-4
                        py-3
                        text-sm
                        text-gray-900
                        outline-none
                        transition-all
                        duration-200
                        placeholder:text-gray-400
                        focus:border-orange-500
                        focus:ring-1
                        focus:ring-orange-500
                      "
                      {...register("message")}
                    />

                    {/* =================================================
                        SUBMIT
                    ================================================= */}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="
                        flex
                        h-11
                        w-full
                        items-center
                        justify-center
                        rounded-lg
                        bg-orange-500
                        px-4
                        text-sm
                        font-semibold
                        text-white
                        transition-all
                        duration-300
                        hover:bg-orange-600
                        focus:outline-none
                        focus:ring-2
                        focus:ring-orange-500
                        focus:ring-offset-2
                        disabled:cursor-not-allowed
                        disabled:opacity-60
                      "
                    >
                      {isSubmitting ? (
                        "Submitting..."
                      ) : (
                        <>
                          SUBMIT
                          <FiArrowRight
                            className="
                              ml-2
                              text-lg
                            "
                          />
                        </>
                      )}
                    </button>

                  </form>

                </motion.div>

              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================
          TOAST
      ========================================================= */}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
      />
    </>
  );
}