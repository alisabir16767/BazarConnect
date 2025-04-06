"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    zip_code: "",
    role: "customer",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Signup successful!");
        // optionally reset form or redirect
      } else {
        const error = await response.json();
        alert("Signup failed: " + error.message);
      }
    } catch (err) {
      console.error("Signup error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted px-4">
      <Card className="w-full max-w-xl shadow-xl p-6 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              ["username", "Username"],
              ["email", "Email"],
              ["password", "Password", "password"],
              ["name", "Full Name"],
              ["address", "Address"],
              ["city", "City"],
              ["state", "State"],
              ["country", "Country"],
              ["zip_code", "Zip Code"],
            ].map(([id, label, type = "text"]) => (
              <div className="space-y-2" key={id}>
                <Label htmlFor={id}>{label}</Label>
                <Input
                  id={id}
                  type={type}
                  placeholder={`Enter ${label}`}
                  value={formData[id as keyof typeof formData]}
                  onChange={handleChange}
                />
              </div>
            ))}

            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
