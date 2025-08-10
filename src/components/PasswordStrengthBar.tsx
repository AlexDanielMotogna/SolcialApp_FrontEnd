import React from "react";
import { useTranslation } from "react-i18next";

type Props = {
	password: string;
};

const PasswordStrengthBar: React.FC<Props> = ({ password }) => {
	const { t } = useTranslation();

	const checks = [
		{
			label: t("password_strength_8_chars", "At least 8 characters"),
			valid: password.length >= 8,
		},
		{
			label: t("password_strength_uppercase", "Uppercase letter"),
			valid: /[A-Z]/.test(password),
		},
		{
			label: t("password_strength_lowercase", "Lowercase letter"),
			valid: /[a-z]/.test(password),
		},
		{
			label: t("password_strength_number", "Number"),
			valid: /[0-9]/.test(password),
		},
		{
			label: t("password_strength_special", "Special character"),
			valid: /[^A-Za-z0-9]/.test(password),
		},
	];

	const score = checks.filter((c) => c.valid).length;
	const percent = (score / checks.length) * 100;

	let barColor = "bg-red-500";
	if (score >= 4) barColor = "bg-green-500";
	else if (score === 3) barColor = "bg-yellow-500";
	else if (score === 2) barColor = "bg-orange-500";

	return (
		<div className="flex flex-col gap-1 mt-2">
			<span className="text-base text-[#ACB5BB] mb-1 font-semibold">
				{t("password_strength", "Password Strength:")}
			</span>
			{/* Strength bar */}
			<div className="w-full h-2 rounded bg-[#232326] mb-2">
				<div
					className={`h-2 rounded transition-all duration-300 ${barColor}`}
					style={{ width: `${percent}%` }}
				/>
			</div>
			<div className="grid grid-cols-2 gap-1">
				{checks.map((check, idx) => (
					<span
						key={idx}
						className={`flex items-center gap-1 text-sm ${
							check.valid ? "text-green-400" : "text-[#ACB5BB]"
						}`}
					>
						<span>{check.valid ? "✔" : "✖"}</span>
						{check.label}
					</span>
				))}
			</div>
		</div>
	);
};

export default PasswordStrengthBar;