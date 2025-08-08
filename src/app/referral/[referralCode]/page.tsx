import { redirect } from "next/navigation";

interface referralCodePageProps {
  params: { referralCode: string };
}

export default function page({ params }: referralCodePageProps) {
  redirect(`/register?referredBy=${params.referralCode}`);
}
