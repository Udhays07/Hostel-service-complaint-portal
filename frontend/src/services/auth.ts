complaint-Portal\frontend\src\services\auth.ts
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuthProtection() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return null;
}

export function useAdminProtection() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("userRole");
    
    if (!token) {
      router.push("/login");
      return;
    }
    
    if (role !== "admin") {
      router.push("/dashboard");
    }
  }, [router]);

  return null;
}