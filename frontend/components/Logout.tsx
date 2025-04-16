"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";

const Logout = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/logout`, {
        withCredentials: true,
      });
      toast({
        title: "Logged out",
        description: "You have successfully logged out.",
      });
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout Failed",
        description: "Something went wrong during logout.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleLogout} disabled={isLoading} variant="destructive">
      {isLoading ? "Logging out..." : "Logout"}
    </Button>
  );
};

export default Logout;
