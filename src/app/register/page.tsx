"use client";

import Image from 'next/image';
import Link from "next/link";
import User from "../../../public/imgs/user.svg";
import LeftArrow from "../../../public/imgs/arrow-left.svg";
import Key from "../../../public/imgs/key.svg";
import Eye from "../../../public/imgs/eye-slash.svg";
import bg from "../../../public/imgs/bg2.svg";
import logo from "../../../public/imgs/logo.png";
import CryptoBalance from "../../../public/imgs/Crypto-Balancee.png";
import Headline from "../../../public/imgs/Headline.png";
import Button from "../../components/Button";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  password: "",
  repeatPassword: "",
  avatar: null,
};

const Register = () => {
  const [form, setForm] = useState(initialForm);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
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
        // Redirection ou autre action
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
      <div className="w-screen h-[994px] md:h-screen bg-[#111113] ">
        <Image src={bg} className="relative" alt=''/>
        <div className="w-full h-screen absolute top-0 left-0 grid grid-cols-1 md:grid-cols-2 justify-start md:justify-center items-start md:items-center">
          <div className="w-full md:h-screen flex flex-col items-center justify-center">
            <Image src={logo} className="mb-7 pt-12 w-64" alt=''/>
            <Image src={CryptoBalance} className="w-[65%] hidden md:block" alt=''/>
            <Image src={Headline} className="px-7" alt=''/>
          </div>
          <div className="w-full max-h-max md:h-full px-4 pt-12 md:pt-4 pb-4">
            <div className="w-full h-full bg-[#161618] border border-[#2C2C30] rounded-[20px] flex justify-center items-center ">
              <form className="w-[343px] h-full flex justify-center items-center flex-col gap-10 p-9" onSubmit={handleRegister}>
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
                <div className="w-full flex flex-col items-start justify-start gap-[1rem]">
                  <label className="text-white font-semibold">Full name</label>
                  <input
                    name="fullName"
                    value={form.fullName}
                    onChange={handleChange}
                    className="w-full py-3 px-4 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.3rem] text-[#6C7278] font-normal outline-none"
                    placeholder="Yourname"
                    required
                  />
                  <label className="text-white font-semibold">Email</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full py-3 px-4 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.3rem] text-[#6C7278] font-normal outline-none"
                    placeholder="yourname@gmail.com"
                    required
                  />
                  <label className="text-white font-semibold">Phone Number</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full py-3 px-4 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.3rem] text-[#6C7278] font-normal outline-none"
                    placeholder="(+12)435-1213-232"
                    required
                  />
                  <label className="text-white font-semibold">Password</label>
                  <input
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    type="password"
                    className="w-full py-3 px-4 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.3rem] text-[#6C7278] font-normal outline-none"
                    placeholder="********"
                    required
                  />
                  <label className="text-white font-semibold">Repeat Password</label>
                  <input
                    name="repeatPassword"
                    value={form.repeatPassword}
                    onChange={handleChange}
                    type="password"
                    className="w-full py-3 px-4 bg-[#2C2C30] border border-[#44444A] rounded-xl text-[1.3rem] text-[#6C7278] font-normal outline-none"
                    placeholder="********"
                    required
                  />
                </div>
                <button className="w-full py-3 px-4 bg-[#9945FF] text-white rounded-xl font-semibold" type="submit" disabled={loading}>
                  {loading ? "Loading..." : "Register"}
                </button>
                {error && (
                  <div className="text-red-500 text-sm">{error}</div>
                )}
                {success && (
                  <div className="text-green-500 text-sm">{success}</div>
                )}
                <p className="font-medium text-[1.4rem] text-[#ACB5BB]">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-semibold gradient bg-clip-text text-transparent cursor-pointer"
                  >
                    Login Here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
