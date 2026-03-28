"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup, FieldLegend, FieldSet } from "@/components/ui/field";
import {
  FormCheckbox,
  FormField,
  FormInput,
  FormRadioGroup,
  FormSelect,
  FormSwitch,
  FormTextarea,
} from "@/app/generic/_components/form-field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  type AccountFormValues,
  accountFormSchema,
} from "@/lib/validations/account";

export default function Page() {
  const [showPassword, setShowPassword] = React.useState(false);
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      username: "",
      email: "",
      bio: "",
      marketing_emails: false,
      security_emails: true,
      theme: "system",
      type: "personal",
      password: "",
    },
  });

  function onSubmit(values: AccountFormValues) {
    toast.success("Form submitted successfully!", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-b from-background to-muted/50 p-4 md:p-24">
      <Card className="w-full max-w-2xl shadow-xl border-primary/10">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold tracking-tight">
            Account Settings
          </CardTitle>
          <CardDescription>
            Update your profile and notification preferences.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="account-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FieldGroup>
              {/* Username */}
              <FormInput
                control={form.control}
                name="username"
                label="Username"
                placeholder="antigravity"
                description="This is your public display name."
                autoComplete="off"
              />

              {/* Email */}
              <FormInput
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="hello@example.com"
                description="We will use this for account notifications."
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                label="Password"
                description="At least 8 characters."
                render={({ field, fieldState, id }) => (
                  <InputGroup>
                    <InputGroupInput
                      {...field}
                      id={id}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      aria-invalid={fieldState.invalid}
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff data-icon="inline-start" />
                        ) : (
                          <Eye data-icon="inline-start" />
                        )}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                )}
              />

              {/* Bio */}
              <FormTextarea
                control={form.control}
                name="bio"
                label="Bio"
                placeholder="Tell us a little bit about yourself"
                description={
                  <>
                    You can <span>@mention</span> other users and organizations.
                  </>
                }
              />

              {/* Account Type */}
              <FormSelect
                control={form.control}
                name="type"
                label="Account Type"
                placeholder="Select an account type"
                description="Choose how you will use this account."
                options={[
                  { label: "Personal", value: "personal" },
                  { label: "Business", value: "business" },
                  { label: "Other", value: "other" },
                ]}
              />

              {/* Theme */}
              <FormField
                control={form.control}
                name="theme"
                description="Select your preferred color scheme."
                render={({ fieldState }) => (
                  <FieldSet data-invalid={fieldState.invalid}>
                    <FieldLegend>Theme</FieldLegend>
                    <FormRadioGroup
                      control={form.control}
                      name="theme"
                      options={[
                        { label: "Light", value: "light" },
                        { label: "Dark", value: "dark" },
                        { label: "System", value: "system" },
                      ]}
                    />
                  </FieldSet>
                )}
              />

              {/* Notifications */}
              <FieldSet>
                <FieldLegend>Notifications</FieldLegend>
                <FieldGroup className="gap-4">
                  <FormCheckbox
                    control={form.control}
                    name="marketing_emails"
                    label="Marketing Emails"
                    description="Receive emails about new products, features, and more."
                  />

                  <FormSwitch
                    control={form.control}
                    name="security_emails"
                    label="Security Emails"
                    description="Receive emails about your account security."
                  />
                </FieldGroup>
              </FieldSet>
            </FieldGroup>

            <Button
              type="submit"
              className="w-full h-11 text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
