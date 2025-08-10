import { signOut } from "next-auth/react";
import { toast } from "sonner";
// Function to handle user logout
// This function is used to log out the user and redirect them to the login page
// It can be called from various parts of the application where user logout is required used in Settings and Profile components
export const handleLogout = async () => {
  try {
    await signOut({ callbackUrl: "/login", redirect: true });
  } catch (error) {
    toast.error("Failed to logout");
  }
};

export const handleDeleteAccount =
  () =>
  async ({
    onSuccess = () => {},
    onError = () => {},
    onFinally = () => {},
  }: {
    onSuccess?: () => void;
    onError?: () => void;
    onFinally?: () => void;
  }) => {
    try {
      const res = await fetch("/api/auth/delete-account", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (res.ok) {
        toast.success("Account deleted successfully");
        await signOut({ callbackUrl: "/login", redirect: true });
        onSuccess();
      } else {
        const data = await res.json();
        toast.error(data.message || "Failed to delete account");
        onError();
      }
    } catch (e) {
      toast.error("Failed to delete account");
      onError();
    } finally {
      onFinally();
    }
  };
