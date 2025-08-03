"use client";

import Image from 'next/image';
import Link from "next/link";
import User from "../../../public/imgs/user.svg";
import LeftArrow from "../../../public/imgs/arrow-left.svg";
import Key from "../../../public/imgs/key.svg";
import Eye from "../../../public/imgs/eye.svg";
import EyeSlash from "../../../public/imgs/eye-slash.svg";
import bg from "../../../public/imgs/bg2.svg";
import logo from "../../../public/imgs/logo.png";
import CryptoBalance from "../../../public/imgs/Crypto-Balancee.png";
import Headline from "../../../public/imgs/Headline.png";
import Button from "../../components/Button";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import PasswordStrengthBar from "../../components/PasswordStrengthBar";
import { FaSpinner } from "react-icons/fa";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  repeatPassword: "",
  avatar: null,
};

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
  repeatPassword: Yup.string()
    .required("Repeat password is required")
    .oneOf([Yup.ref('password'), null], "Passwords must match"),
});

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
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [success, setSuccess] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
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

    // Validation
    const invalidFields: string[] = [];
    if (!form.fullName.trim()) invalidFields.push("Full name");
    if (!form.email.trim()) invalidFields.push("Email");
    if (!form.phone.trim()) invalidFields.push("Phone Number");
    if (!form.password.trim()) invalidFields.push("Password");
    if (!form.repeatPassword.trim()) invalidFields.push("Repeat Password");
    if (!form.avatar) invalidFields.push("Avatar");

    if (invalidFields.length > 0) {
      setError(`Please fill: ${invalidFields.join(", ")}`);
      setLoading(false);
      return;
    }
    if (form.password !== form.repeatPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("username", form.fullName);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("password", form.password);
    if (form.avatar) formData.append("avatar", form.avatar);

    const phone = formData.get("phone") as string;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Registration successful!");
        setShowModal(true);
        setTimeout(() => {
          setShowSpinner(true);
          router.push("/login");
        }, 1500);
      } else {
        setError(data.msg || "Registration failed");
      }
    } catch (err: any) {
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="w-screen h-auto md:h-screen bg-[#111113] ">
        <div className="fixed inset-0 w-full h-full z-0">
          <Image
            src={bg}
            alt=""
            fill
            className="object-cover pointer-events-none select-none"
            priority
            quality={90}
            style={{ zIndex: 0 }}
          />
        </div>
        <div className="w-full min-h-screen flex flex-col md:grid md:grid-cols-2 justify-center items-center relative pb-12">
          {/* gauche: illustration/logo */}
          <div className="w-full flex flex-col items-center justify-center px-2 py-6">
            <Image src={logo} className="mb-7 pt-12 w-64" alt=''/>
            <Image src={CryptoBalance} className="w-[65%] hidden md:block" alt=''/>
            <Image src={Headline} className="px-7" alt=''/>
          </div>
          {/* droite: formulaire */}
          <div className="w-full max-h-max md:h-full px-4 pt-12 md:pt-4 pb-4">
            <div className="w-full h-full bg-[#161618] border border-[#2C2C30] rounded-[20px] flex justify-center items-center py-8 sm:py-12">
              {showSpinner ? (
                <div className="w-full flex flex-col items-center justify-center py-20">
                  <FaSpinner className="animate-spin text-[#9945FF] text-5xl mb-4" />
                  <p className="text-[#ACB5BB] text-lg font-semibold">Redirecting...</p>
                </div>
              ) : (
                <form
                  className="relative bg-[#161618] w-full max-w-[400px] flex flex-col items-start gap-6 mx-auto"
                  onSubmit={handleRegister}
                >
                  <div className="w-full p-6 sm:p-8 flex items-center justify-between">
                    <h3 className="text-[1.8rem] text-white font-semibold">Register</h3>
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
                          <img src={avatarPreview} alt="Avatar Preview" className="w-20 h-20 rounded-full object-cover border-4 border-gray-300 shadow-md" />
                        ) : (
                          <div className="w-20 h-20 flex justify-center items-center border-4 border-gray-300 rounded-full shadow-md">
                            <Image src={User} alt="Upload Avatar" />
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <label className="text-[1.1rem] text-[#ACB5BB] font-medium">Full name</label>
                      <input
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        className="w-full py-4 px-4 bg-[#232326] border-2 border-[#44444A] rounded-xl text-[1.1rem] text-white placeholder-[#6C7278] shadow focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all"
                        placeholder="Yourname"
                        required
                      />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <label className="text-[1.1rem] text-[#ACB5BB] font-medium">Email</label>
                      <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full py-4 px-4 bg-[#232326] border-2 border-[#44444A] rounded-xl text-[1.1rem] text-white placeholder-[#6C7278] shadow focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all"
                        placeholder="yourname@gmail.com"
                        required
                      />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <label className="text-[1.1rem] text-[#ACB5BB] font-medium">Phone Number</label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full py-4 px-4 bg-[#232326] border-2 border-[#44444A] rounded-xl text-[1.1rem] text-white placeholder-[#6C7278] shadow focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all"
                        placeholder="(+12)435-1213-232"
                        required
                      />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <label className="text-[1.1rem] text-[#ACB5BB] font-medium">Password</label>
                      <div className="relative w-full">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2">
                          <Image src={Key} alt="key" width={20} height={20} />
                        </span>
                        <input
                          name="password"
                          value={form.password}
                          onChange={handleChange}
                          type={showPassword ? "text" : "password"}
                          className="w-full py-4 pl-12 pr-12 bg-[#232326] border-2 border-[#44444A] rounded-xl text-[1.1rem] text-white placeholder-[#6C7278] shadow focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all"
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
                            <Image src={showPassword ? EyeSlash : Eye} alt="toggle password" width={20} height={20} />
                          </span>
                        </button>
                      </div>
                      <PasswordStrengthBar password={form.password} />
                    </div>
                    <div className="w-full flex flex-col gap-2">
                      <label className="text-[1.1rem] text-[#ACB5BB] font-medium">Repeat Password</label>
                      <div className="relative w-full">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2">
                          <Image src={Key} alt="key" width={20} height={20} />
                        </span>
                        <input
                          name="repeatPassword"
                          value={form.repeatPassword}
                          onChange={handleChange}
                          type={showRepeatPassword ? "text" : "password"}
                          className="w-full py-4 pl-12 pr-12 bg-[#232326] border-2 border-[#44444A] rounded-xl text-[1.1rem] text-white placeholder-[#6C7278] shadow focus:border-[#9945FF] focus:ring-2 focus:ring-[#9945FF] focus:outline-none transition-all"
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
                            <Image src={showRepeatPassword ? EyeSlash : Eye} alt="toggle password" width={20} height={20} />
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="w-full border-t border-[#44444A] p-8 flex flex-col gap-4">
                    <button
                      className="w-full py-3 rounded-xl font-bold text-lg bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] text-white shadow-green-500/20
    transform transition-all duration-200 hover:scale-105 hover:shadow-lg hover:from-[#7c37cc] hover:to-[#0BCB7B] focus:outline-none focus:ring-2 focus:ring-[#9945FF]"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "Register"}
                    </button>
                    {error && (
                      <div className="text-red-500 text-sm">{error}</div>
                    )}
                    {success && (
                      <div className="text-green-500 text-sm">{success}</div>
                    )}
                    <p className="font-medium text-[1.1rem] text-[#ACB5BB] text-center">
                      Already have an account?{" "}
                      <Link
                        href="/login"
                        className="font-semibold bg-gradient-to-r from-[#9945FF] to-[#0BCB7B] bg-clip-text text-transparent cursor-pointer"
                      >
                        Login Here
                      </Link>
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-[#161618] border border-[#44444A] rounded-2xl shadow-2xl p-8 flex flex-col items-center gap-4 w-[350px]">
            <h2 className="text-white text-2xl font-semibold mb-2">Email Sent!</h2>
            <p className="text-[#ACB5BB] text-center">
              Registration successful! Please check your inbox and follow the instructions in the email.
            </p>
            <button
              className="mt-4 px-6 py-2 rounded-xl bg-[#9945FF] text-white font-bold hover:bg-[#7c37cc] transition"
              onClick={() => setShowModal(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
