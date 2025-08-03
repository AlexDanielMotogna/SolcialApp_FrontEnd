import React from "react";

const criteria = [
	{
		label: "At least 8 characters",
		test: (pw: string) => pw.length >= 8,
	},
	{
		label: "Uppercase letter",
		test: (pw: string) => /[A-Z]/.test(pw),
	},
	{
		label: "Lowercase letter",
		test: (pw: string) => /[a-z]/.test(pw),
	},
	{
		label: "Number",
		test: (pw: string) => /[0-9]/.test(pw),
	},
	{
		label: "Special character",
		test: (pw: string) => /[^A-Za-z0-9]/.test(pw),
	},
];

const colors = [
	"bg-gray-300",
	"bg-red-500",
	"bg-yellow-400",
	"bg-green-500",
	"bg-emerald-600",
];
const textColors = [
	"text-gray-400",
	"text-red-500",
	"text-yellow-500",
	"text-green-600",
	"text-emerald-600",
];
const labels = ["Too short", "Weak", "Medium", "Strong", "Very Strong"];

const getPasswordStrength = (password: string) => {
	let score = 0;
	criteria.forEach((c) => {
		if (c.test(password)) score++;
	});
	// Bonus: very strong if all criteria + length >= 16
	if (score === criteria.length && password.length >= 16) score++;
	return score;
};

const PasswordStrengthBar = ({ password }: { password: string }) => {
	const score = getPasswordStrength(password);

	return (
		<div className="w-full mt-2">
			<div className="flex gap-1">
				{[1, 2, 3].map((i) => (
					<div
						key={i}
						className={`h-2 flex-1 rounded ${
							score >= i ? colors[score] : colors[0]
						} transition-all duration-300`}
					/>
				))}
			</div>
			<div className="flex items-center justify-between mt-1 text-xs">
				<span className="text-[#ACB5BB]">Password Strength:</span>
				<span className={`font-semibold lowercase ${textColors[score]}`}>
					{labels[score]}
				</span>
			</div>
			<div className="grid grid-cols-2 gap-y-1 gap-x-2 mt-2">
				{criteria.map((c, idx) => {
					const ok = c.test(password);
					return (
						<div
							key={c.label}
							className="flex items-center gap-2 text-sm"
						>
							{ok ? (
								<span className="text-green-500">✔</span>
							) : (
								<span className="text-gray-500">○</span>
							)}
							<span
								className={
									ok ? "text-green-400" : "text-gray-400"
								}
							>
								{c.label}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default PasswordStrengthBar;