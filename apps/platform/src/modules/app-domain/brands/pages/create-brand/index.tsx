"use client";

import React, { useState } from "react";
import { Input, Button, TextField, Label } from "@heroui/react";
import { useAuth } from "@crm/composables/authentication/context";
import { fetchClient as apiFetch } from "@crm/composables/authentication/functions";
import { API_BASE, VERSION, SERVICES, ENDPOINTS } from "@crm/utils/constants/endpoints";

// Removed manual getCookie function as it is now handled by the composable internally

const BRAND_CREATE_URL = `${API_BASE}${VERSION.V2}${SERVICES.BRANDS}${ENDPOINTS.BRANDS.CREATE}`;

export function CreateBrandPage() {
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    name: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (value: string) => {
    setFormData((prev) => ({ ...prev, name: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (!user) {
      setFormError("User not authenticated. Please log in.");
      return;
    }

    try {
      setIsLoading(true);
      setFormError("");
      setSuccess(false);

      await apiFetch(BRAND_CREATE_URL, {
        method: "POST",
        secure: true,
        body: {
          name: formData.name,
        },
      });

      setSuccess(true);
      setFormData({ name: "" });
    } catch (err: any) {
      // In case the API error array format is returned
      if (err.errors && err.errors.length > 0) {
        setFormError(err.errors.map((e: any) => e.message).join(", "));
      } else {
        setFormError(err.message || "Failed to create brand. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-10">
      <div className="w-full max-w-md p-8 bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-zinc-200 dark:border-zinc-800">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2 text-zinc-900 dark:text-zinc-100">
            Create a Brand
          </h1>
          <p className="text-sm text-zinc-500">
            Enter the name for your new brand to get started.
          </p>
        </div>
        
        {formError && (
          <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-xl border border-red-100 dark:border-red-900/30">
            {formError}
          </div>
        )}
        
        {success && (
          <div className="mb-6 p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm rounded-xl border border-green-100 dark:border-green-900/30">
            Brand created successfully!
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <TextField isRequired value={formData.name} onChange={handleInputChange}>
            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">Brand Name</Label>
            <Input
              placeholder="e.g. Acme Corp"
              className="rounded-xl border-zinc-200 dark:border-zinc-800 focus:ring-2 focus:ring-indigo-500"
            />
          </TextField>
          
          <Button 
            type="submit" 
            variant="primary" 
            isPending={isLoading}
            className="w-full font-medium rounded-xl h-12 mt-2"
          >
            Create Brand
          </Button>
        </form>
      </div>
    </div>
  );
}