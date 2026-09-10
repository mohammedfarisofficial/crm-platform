"use client";

import React, { useState } from "react";
import {
    Input,
    Button,
    TextField,
    Label,
    FieldError,
    Modal,
} from "@heroui/react";
import { useAuth } from "@crm/composables/authentication/context";
import { fetchClient as apiFetch } from "@crm/composables/authentication/functions";
import {
    API_BASE,
    VERSION,
    SERVICES,
    ENDPOINTS,
} from "@crm/utils/constants/endpoints";

const LEAD_CREATE_URL = `${API_BASE}${VERSION.V2}${SERVICES.BRANDS}${ENDPOINTS.BRANDS.CREATE_LEAD}`;

interface FormData {
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
}

interface FormErrors {
    first_name?: string;
    last_name?: string;
    email?: string;
    phone?: string;
}

const initialFormData: FormData = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
};

function validateForm(data: FormData): FormErrors {
    const errors: FormErrors = {};

    if (!data.first_name.trim()) {
        errors.first_name = "First name is required";
    }
    if (!data.last_name.trim()) {
        errors.last_name = "Last name is required";
    }
    if (!data.email.trim()) {
        errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "Please enter a valid email address";
    }
    if (!data.phone.trim()) {
        errors.phone = "Phone number is required";
    }

    return errors;
}

export function CreateLeadModal() {
    const { user } = useAuth();

    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [formError, setFormError] = useState<FormErrors>({});
    const [globalError, setGlobalError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (field: keyof FormData) => (value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (formError[field]) {
            setFormError((prev) => {
                const next = { ...prev };
                delete next[field];
                return next;
            });
        }
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setFormError({});
        setGlobalError("");
        setSuccess(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setGlobalError("");
        setSuccess(false);

        const errors = validateForm(formData);
        if (Object.keys(errors).length > 0) {
            setFormError(errors);
            return;
        }
        setFormError({});

        if (!user) {
            setGlobalError("User not authenticated. Please log in.");
            return;
        }
        if (!user.brand?.brand_id) {
            setGlobalError("No brand found. Please create a brand first.");
            return;
        }

        try {
            setIsLoading(true);

            await apiFetch(LEAD_CREATE_URL, {
                method: "POST",
                secure: true,
                body: {
                    ...formData,
                    brand_id: user.brand!.brand_id!,
                },
            });

            setSuccess(true);
            setFormData(initialFormData);
        } catch (err: any) {
            if (err.errors && err.errors.length > 0) {
                const fieldErrors: FormErrors = {};
                let hasGlobal = false;

                for (const e of err.errors) {
                    if (e.field && e.field in initialFormData) {
                        fieldErrors[e.field as keyof FormData] = e.message;
                    } else {
                        hasGlobal = true;
                    }
                }

                if (Object.keys(fieldErrors).length > 0) {
                    setFormError(fieldErrors);
                }
                if (hasGlobal) {
                    setGlobalError(
                        err.errors
                            .filter(
                                (e: any) =>
                                    !e.field || !(e.field in initialFormData)
                            )
                            .map((e: any) => e.message)
                            .join(", ")
                    );
                }
            } else {
                setGlobalError(
                    err.message || "Failed to create lead. Please try again."
                );
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal>
            <Button variant="primary" className="rounded-xl font-medium h-10 px-5">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M5 12h14" />
                    <path d="M12 5v14" />
                </svg>
                Create Lead
            </Button>
            <Modal.Backdrop>
                <Modal.Container size="md">
                    <Modal.Dialog>
                        {({ close }) => (
                            <>
                                <Modal.CloseTrigger
                                    onPress={() => {
                                        resetForm();
                                    }}
                                />
                                <Modal.Header>
                                    <Modal.Heading>Create a Lead</Modal.Heading>
                                </Modal.Header>
                                <Modal.Body>
                                    {/* Success Banner */}
                                    {success && (
                                        <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-sm rounded-xl border border-green-100 dark:border-green-900/30">
                                            Lead created successfully!
                                        </div>
                                    )}

                                    <form
                                        id="create-lead-form"
                                        onSubmit={handleSubmit}
                                        className="flex flex-col gap-5"
                                        noValidate
                                    >
                                        {/* Name Row */}
                                        <div className="grid grid-cols-2 gap-4">
                                            <TextField
                                                isRequired
                                                isInvalid={
                                                    !!formError.first_name
                                                }
                                                value={formData.first_name}
                                                onChange={handleChange(
                                                    "first_name"
                                                )}
                                                name="first_name"
                                            >
                                                <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                                    First Name
                                                </Label>
                                                <Input placeholder="John" />
                                                {formError.first_name && (
                                                    <FieldError>
                                                        {formError.first_name}
                                                    </FieldError>
                                                )}
                                            </TextField>

                                            <TextField
                                                isRequired
                                                isInvalid={
                                                    !!formError.last_name
                                                }
                                                value={formData.last_name}
                                                onChange={handleChange(
                                                    "last_name"
                                                )}
                                                name="last_name"
                                            >
                                                <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                                    Last Name
                                                </Label>
                                                <Input placeholder="Doe" />
                                                {formError.last_name && (
                                                    <FieldError>
                                                        {formError.last_name}
                                                    </FieldError>
                                                )}
                                            </TextField>
                                        </div>

                                        {/* Email */}
                                        <TextField
                                            isRequired
                                            isInvalid={!!formError.email}
                                            value={formData.email}
                                            onChange={handleChange("email")}
                                            name="email"
                                            type="email"
                                        >
                                            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                                Email
                                            </Label>
                                            <Input placeholder="john@example.com" />
                                            {formError.email && (
                                                <FieldError>
                                                    {formError.email}
                                                </FieldError>
                                            )}
                                        </TextField>

                                        {/* Phone */}
                                        <TextField
                                            isRequired
                                            isInvalid={!!formError.phone}
                                            value={formData.phone}
                                            onChange={handleChange("phone")}
                                            name="phone"
                                            type="tel"
                                        >
                                            <Label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                                Phone
                                            </Label>
                                            <Input placeholder="9876543210" />
                                            {formError.phone && (
                                                <FieldError>
                                                    {formError.phone}
                                                </FieldError>
                                            )}
                                        </TextField>

                                        {/* Global Error */}
                                        {globalError && (
                                            <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-xl border border-red-100 dark:border-red-900/30">
                                                {globalError}
                                            </div>
                                        )}
                                    </form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button
                                        variant="secondary"
                                        className="rounded-xl"
                                        slot="close"
                                        onPress={() => resetForm()}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        form="create-lead-form"
                                        variant="primary"
                                        isPending={isLoading}
                                        isDisabled={isLoading}
                                        className="rounded-xl"
                                    >
                                        Create Lead
                                    </Button>
                                </Modal.Footer>
                            </>
                        )}
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}