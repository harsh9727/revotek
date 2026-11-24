"use client";

import React from "react";
import { contactPageContent } from "@/content/contact.json";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const ContactForm: React.FC = () => {
  const { form: formContent } = contactPageContent;
  const { fields, submit } = formContent;

  return (
    <div>
      <h2 className="text-xl font-bold text-primary mb-2">
        {formContent.heading}
      </h2>
      <p className="text-md text-muted-foreground">{formContent.description}</p>

      <form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="mt-8 space-y-6"
        aria-label="Contact Revotek Elevators"
      >
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
            />
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
              min={0}
              inputMode="numeric"
              required
              aria-required="true"
              placeholder="Enter number of elevators"
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
              min={0}
              inputMode="numeric"
              required
              aria-required="true"
              placeholder="Enter number of floors"
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
              min={0}
              inputMode="numeric"
              required
              aria-required="true"
              placeholder="Enter passenger capacity"
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
                  className="text-xs tabular-nums text-muted-foreground"
                >
                  0/1000
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

        <Button
          type="button"
          className="w-full sm:w-auto min-w-40"
        >
          {submit.label}
        </Button>
      </form>
    </div>
  );
};
