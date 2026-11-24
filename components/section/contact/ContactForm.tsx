"use client";

import React from "react";
import { contactPageContent } from "@/content/contact.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  siteAddress: string;
  elevatorName: string;
  elevatorCount: string;
  basementCount: string;
  floorCount: string;
  passengerCapacity: string;
  message: string;
  website_hp: string;
}

const initialFormData: ContactFormData = {
  name: "",
  phone: "",
  email: "",
  siteAddress: "",
  elevatorName: "",
  elevatorCount: "",
  basementCount: "",
  floorCount: "",
  passengerCapacity: "",
  message: "",
  website_hp: "",
};

export const ContactForm: React.FC = () => {
  const { form: formContent } = contactPageContent;
  const { fields, submit, feedback } = formContent;

  const [formData, setFormData] = React.useState<ContactFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) {
      setErrorMessage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json().catch(() => null);

      if (response.ok && result?.success) {
        setIsSuccess(true);
        setFormData(initialFormData);
      } else {
        setErrorMessage(result?.message || feedback.error.message);
      }
    } catch {
      setErrorMessage(feedback.error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div
        role="alert"
        aria-live="polite"
        className="flex flex-col items-center justify-center text-center gap-4 py-16 px-8 rounded-2xl bg-green-50 border border-green-200"
      >
        <div
          aria-hidden="true"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100"
        >
          <svg
            className="h-7 w-7 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-green-800">
          {feedback.success.heading}
        </h2>
        <p className="text-sm text-green-700 max-w-sm">
          {feedback.success.message}
        </p>
        <Button
          type="button"
          onClick={() => setIsSuccess(false)}
          variant="outline"
          className="mt-2 border-green-300 text-green-700 hover:bg-green-50"
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-primary mb-2">
        {formContent.heading}
      </h2>
      <p className="text-md text-muted-foreground">{formContent.description}</p>

      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6"
        aria-label="Contact Revotek Elevators"
      >
        {/* Hidden Honeypot Field for anti-bot protection */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website_hp">Leave this field blank</label>
          <input
            type="text"
            id="website_hp"
            name="website_hp"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website_hp}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-primary"
              >
                {fields.name.label}
                <span aria-hidden="true" className="ml-1 text-red-500">
                  *
                </span>
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                aria-required="true"
                placeholder={fields.name.placeholder}
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="phone"
              className="text-sm font-medium text-primary"
            >
              {fields.phone.label}
              <span aria-hidden="true" className="ml-1 text-red-500">
                *
              </span>
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="numeric"
              required
              aria-required="true"
              placeholder={fields.phone.placeholder}
              maxLength={10}
              value={formData.phone}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-primary"
            >
              {fields.email.label}
              <span className="ml-1 text-muted-foreground text-xs">
                (optional)
              </span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder={fields.email.placeholder}
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="sm:col-span-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="siteAddress"
                className="text-sm font-medium text-primary"
              >
                {fields.siteAddress?.label ?? "Site Address / Project Location"}
                <span aria-hidden="true" className="ml-1 text-red-500">
                  *
                </span>
              </Label>
              <Input
                id="siteAddress"
                name="siteAddress"
                type="text"
                autoComplete="street-address"
                required
                aria-required="true"
                placeholder={
                  fields.siteAddress?.placeholder ??
                  "Enter complete site address (e.g., Building name, Street, Area, City)"
                }
                value={formData.siteAddress}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="elevatorName"
                className="text-sm font-medium text-primary"
              >
                Your Elevator Name
                <span aria-hidden="true" className="ml-1 text-red-500">
                  *
                </span>
              </Label>
              <Input
                id="elevatorName"
                name="elevatorName"
                type="text"
                required
                aria-required="true"
                placeholder="Enter your elevator name"
                value={formData.elevatorName}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="elevatorCount"
              className="text-sm font-medium text-primary"
            >
              How Many Elevators You Have in Building?
              <span aria-hidden="true" className="ml-1 text-red-500">
                *
              </span>
            </Label>
            <Input
              id="elevatorCount"
              name="elevatorCount"
              type="number"
              min={1}
              inputMode="numeric"
              required
              aria-required="true"
              placeholder="Enter number of elevators"
              value={formData.elevatorCount}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="basementCount"
              className="text-sm font-medium text-primary"
            >
              How Many Basement You Have?
              <span aria-hidden="true" className="ml-1 text-red-500">
                *
              </span>
            </Label>
            <Input
              id="basementCount"
              name="basementCount"
              type="number"
              min={0}
              inputMode="numeric"
              required
              aria-required="true"
              placeholder="Enter number of basements"
              value={formData.basementCount}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="floorCount"
              className="text-sm font-medium text-primary"
            >
              How Many Floor You Have?
              <span aria-hidden="true" className="ml-1 text-red-500">
                *
              </span>
            </Label>
            <Input
              id="floorCount"
              name="floorCount"
              type="number"
              min={1}
              inputMode="numeric"
              required
              aria-required="true"
              placeholder="Enter number of floors"
              value={formData.floorCount}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="passengerCapacity"
              className="text-sm font-medium text-primary"
            >
              Your Passenger Capacity
              <span aria-hidden="true" className="ml-1 text-red-500">
                *
              </span>
            </Label>
            <Input
              id="passengerCapacity"
              name="passengerCapacity"
              type="number"
              min={1}
              inputMode="numeric"
              required
              aria-required="true"
              placeholder="Enter passenger capacity"
              value={formData.passengerCapacity}
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="sm:col-span-2">
            <div className="space-y-1.5">
              <div className="flex items-baseline justify-between">
                <Label
                  htmlFor="message"
                  className="text-sm font-medium text-primary"
                >
                  {fields.message.label}
                  <span aria-hidden="true" className="ml-1 text-red-500">
                    *
                  </span>
                </Label>
                <span
                  aria-live="polite"
                  className={`text-xs tabular-nums ${
                    formData.message.length > 900
                      ? "text-amber-600 font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {formData.message.length}/1000
                </span>
              </div>
              <Textarea
                id="message"
                name="message"
                rows={5}
                required
                aria-required="true"
                placeholder={fields.message.placeholder}
                maxLength={1000}
                className="resize-none"
                value={formData.message}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        <p className="text-xs text-muted-foreground">
          Fields marked{" "}
          <span aria-hidden="true" className="text-red-500">
            *
          </span>{" "}
          <span className="sr-only">(asterisk)</span> are required.
        </p>

        {errorMessage && (
          <div
            role="alert"
            aria-live="assertive"
            className="p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 flex items-start gap-3"
          >
            <svg
              className="h-5 w-5 text-red-500 shrink-0 mt-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div>
              <p className="font-semibold">{feedback.error.heading}</p>
              <p className="mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto min-w-40"
          aria-busy={isSubmitting}
        >
          {isSubmitting ? submit.labelLoading : submit.label}
        </Button>
      </form>
    </div>
  );
};
