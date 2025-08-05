"use client";

import Image from 'next/image';
import Link from "next/link";
import User from "../../../public/imgs/user.svg";
import Key from "../../../public/imgs/key.svg";
import Eye from "../../../public/imgs/eye.svg";
import EyeSlash from "../../../public/imgs/eye-slash.svg";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LoadingBar } from "@/components/ui/LoadingBar";
import AuthLayout from "@/components/layouts/auth-layout";
import AuthErrorModal from "@/components/modals/AuthErrorModal";
import AuthSuccessModal from "@/components/modals/AuthSuccessModal";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  repeatPassword: "",
  avatar: null,
};

const getPasswordStrength = (password: string) => {
  let score = 0;
  if (!password) return score;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;
  return score;
};

const Register = () => {
  const [form, setForm] = useState(initialForm);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (form.avatar) {
      const url = URL.createObjectURL(form.avatar);
      setAvatarPreview(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setAvatarPreview(null);
    }
  }, [form.avatar]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setForm((prev) => ({
        ...prev,
        avatar: files && files[0] ? files[0] : null,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    setFieldErrors({});

    // Validation
    const errors: { [key: string]: string } = {};

    if (!form.fullName.trim()) errors.fullName = "Full name is required.";
    if (!form.email.trim()) errors.email = "Email is required.";
    else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(form.email)) errors.email = "Please enter a valid email address.";
    }
    if (!form.phone.trim()) errors.phone = "Phone number is required.";
    else {
      const phoneRegex = /^\+?\d{7,15}$/;
      if (!phoneRegex.test(form.phone)) errors.phone = "Please enter a valid phone number (e.g. +1234567890).";
    }
    if (!form.password.trim()) errors.password = "Password is required.";
    else if (getPasswordStrength(form.password) < 3) errors.password = "Password is too weak. Please use a stronger password.";
    if (!form.repeatPassword.trim()) errors.repeatPassword = "Repeat password is required.";
    if (form.password && form.repeatPassword && form.password !== form.repeatPassword)
      errors.repeatPassword = "Passwords don't match.";
    if (!form.avatar) errors.avatar = "Avatar is required.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("username", form.fullName);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("password", form.password);
    if (form.avatar) formData.append("avatar", form.avatar);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Registration successful!");
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSpinner(true);
          router.push("/login");
        }, 1500);
      } else {
        setError(data.msg || "Registration failed");
        setShowErrorModal(true);
      }
    } catch (err: any) {
      setError("Registration failed");
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      {showSpinner ? (
        <div className="w-full flex flex-col items-center justify-center py-20">
          <LoadingBar
            variant="success"
            size="md"
            text={<span className="text-xl font-semibold">Redirecting to login page...</span>}
            className="shadow-md shadow-green-500/20 mb-6"
          />
          <p className="text-[#ACB5BB] text-xl font-semibold">Redirecting...</p>
        </div>
      ) : (
        <form
          className="w-full flex flex-col gap-8 text-xl"
          onSubmit={handleRegister}
        >
          <div className="w-full p-8 flex items-center justify-between">
            <h3 className="text-5xl text-white font-bold">Register</h3>
          </div>
          <div className="w-full flex flex-col gap-6 px-4 py-4 sm:px-8">
            <div className="w-full flex flex-col items-center gap-4">
              <input
                type="file"
                accept="image/png, image/gif, image/jpeg"
                name="avatar"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleChange}
              />
              <div
                className="avatar-preview cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-300 shadow-md"
                  />
                ) : (
                  <div className="w-24 h-24 flex justify-center items-center border-4 border-gray-300 rounded-full shadow-md bg-[#232326]">
                    <Image src={User} alt="Upload Avatar" width={44} height={44} />
                  </div>
                )}
              </div>
              {fieldErrors.avatar && (
                <p className="text-red-500 text-xl mt-2">{fieldErrors.avatar}</p>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="text-xl text-[#ACB5BB] font-medium">Full name</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className={`w-full py-5 px-4 bg-[#232326] border-2 rounded-xl text-xl text-white placeholder-[#6C7278] shadow focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all ${
                  fieldErrors.fullName ? "border-red-500" : "border-[#44444A]"
                }`}
                placeholder="Yourname"
                required
              />
              {fieldErrors.fullName && (
                <p className="text-red-500 text-xl mt-1">{fieldErrors.fullName}</p>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="text-xl text-[#ACB5BB] font-medium">Email</label>
              <div className="relative w-full">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Image src={User} alt="user" width={32} height={32} />
                </span>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  className={`w-full py-5 pl-16 pr-4 bg-[#232326] border-2 rounded-xl text-xl text-white placeholder-[#6C7278] shadow focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all ${
                    fieldErrors.email ? "border-red-500" : "border-[#44444A]"
                  }`}
                  placeholder="yourname@gmail.com"
                  required
                />
              </div>
              {fieldErrors.email && (
                <p className="text-red-500 text-xl mt-1">{fieldErrors.email}</p>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="text-xl text-[#ACB5BB] font-medium">Phone Number</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={`w-full py-5 px-4 bg-[#232326] border-2 rounded-xl text-xl text-white placeholder-[#6C7278] shadow focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all ${
                  fieldErrors.phone ? "border-red-500" : "border-[#44444A]"
                }`}
                placeholder="(+12)435-1213-232"
                required
              />
              {fieldErrors.phone && (
                <p className="text-red-500 text-xl mt-1">{fieldErrors.phone}</p>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="text-xl text-[#ACB5BB] font-medium">Password</label>
              <div className="relative w-full">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Image src={Key} alt="key" width={32} height={32} />
                </span>
                <input
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  className={`w-full py-5 pl-16 pr-12 bg-[#232326] border-2 rounded-xl text-xl text-white placeholder-[#6C7278] shadow focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all ${
                    fieldErrors.password ? "border-red-500" : "border-[#44444A]"
                  }`}
                  placeholder="********"
                  required
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6C7278] hover:text-[#9945FF] transition-colors"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  <span className="inline-block" style={{ filter: "contrast(2) brightness(1.5)" }}>
                    <Image src={showPassword ? EyeSlash : Eye} alt="toggle password" width={28} height={28} />
                  </span>
                </button>
              </div>
              {fieldErrors.password && (
                <p className="text-red-500 text-xl mt-1">{fieldErrors.password}</p>
              )}
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="text-xl text-[#ACB5BB] font-medium">Repeat Password</label>
              <div className="relative w-full">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Image src={Key} alt="key" width={32} height={32} />
                </span>
                <input
                  name="repeatPassword"
                  value={form.repeatPassword}
                  onChange={handleChange}
                  type={showRepeatPassword ? "text" : "password"}
                  className={`w-full py-5 pl-16 pr-12 bg-[#232326] border-2 rounded-xl text-xl text-white placeholder-[#6C7278] shadow focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all ${
                    fieldErrors.repeatPassword ? "border-red-500" : "border-[#44444A]"
                  }`}
                  placeholder="********"
                  required
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6C7278] hover:text-[#9945FF] transition-colors"
                  onClick={() => setShowRepeatPassword(v => !v)}
                  aria-label={showRepeatPassword ? "Hide password" : "Show password"}
                >
                  <span className="inline-block" style={{ filter: "contrast(2) brightness(1.5)" }}>
                    <Image src={showRepeatPassword ? EyeSlash : Eye} alt="toggle password" width={28} height={28} />
                  </span>
                </button>
              </div>
              {fieldErrors.repeatPassword && (
                <p className="text-red-500 text-xl mt-1">{fieldErrors.repeatPassword}</p>
              )}
            </div>
          </div>
          <div className="w-full border-t border-[#44444A] p-8 flex flex-col gap-4">
            <button
              className="w-full py-4 rounded-xl font-bold text-xl bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] text-white shadow-green-500/20
transform transition-all duration-200 hover:scale-105 hover:shadow-lg hover:from-[#7c37cc] hover:to-[#0BCB7B] focus:outline-none focus:ring-2 focus:ring-[#9945FF]"
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Register"}
            </button>

            {loading && (
              <div className="w-full my-4">
                <LoadingBar
                  variant="success"
                  size="md"
                  text={<span className="text-xl">Creating account...</span>}
                  className="shadow-md shadow-green-500/20"
                />
              </div>
            )}

            <p className="font-medium text-xl text-[#ACB5BB] text-center">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] bg-clip-text text-transparent cursor-pointer text-xl"
              >
                Login Here
              </Link>
            </p>
          </div>
        </form>
      )}
      {/* Success Modal */}
      {showSuccessModal && (
        <AuthSuccessModal
          title="Email Sent!"
          message="Registration successful! Please check your inbox and follow the instructions in the email."
          onClose={() => setShowSuccessModal(false)}
          className="text-xl"
        />
      )}
      {/* Error Modal */}
      {showErrorModal && error && (
        <AuthErrorModal
          title="Error"
          message={error}
          onClose={() => setShowErrorModal(false)}
          className="text-xl"
        />
      )}
    </AuthLayout>
  );
};

export default Register;
