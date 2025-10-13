"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FormDataState {
  shopOwner: string;
  shopName: string;
  shopDescription: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  address: string;
  category: string;
  images: FileList | null;
}

export default function NewShopPage() {
  const [formData, setFormData] = useState<FormDataState>({
    shopOwner: "",
    shopName: "",
    shopDescription: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    address: "",
    category: "",
    images: null,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    
    if (e.target instanceof HTMLInputElement && e.target.type === "file") {
      const inputElement = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [id]: inputElement.files }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = new FormData();
    data.append("owner_id", formData.shopOwner);
    data.append("name", formData.shopName);
    data.append("description", formData.shopDescription);
    data.append("city", formData.city);
    data.append("state", formData.state);
    data.append("country", formData.country);
    data.append("zip_code", formData.zipcode);
    data.append("category", formData.category);
    data.append("address[]", formData.address);

    if (formData.images) {
      Array.from(formData.images).forEach((file) => {
        data.append("images", file);
      });
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shops`, {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      if (res.ok) {
        alert("Shop created successfully!");
        console.log(result);
      } else {
        alert(result.message || "Failed to create shop");
        console.error(result);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted px-4">
      <Card className="w-full max-w-2xl shadow-xl p-6 rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">Create New Shop</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="shopOwner">Shop Owner Id</Label>
              <Input type="text" id="shopOwner" value={formData.shopOwner} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shopName">Shop Name</Label>
              <Input type="text" id="shopName" value={formData.shopName} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="shopDescription">Shop Description</Label>
              <Textarea id="shopDescription" value={formData.shopDescription} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input type="text" id="city" value={formData.city} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input type="text" id="state" value={formData.state} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input type="text" id="country" value={formData.country} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zipcode">Zip Code</Label>
                <Input type="text" id="zipcode" value={formData.zipcode} onChange={handleChange} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input type="text" id="address" value={formData.address} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input type="text" id="category" value={formData.category} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="images">Images</Label>
              <Input type="file" id="images" multiple onChange={handleChange} />
            </div>

            <Button type="submit" className="w-full">
              Create Shop
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}