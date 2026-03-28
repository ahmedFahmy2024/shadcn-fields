"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
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
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      placeholder="antigravity"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldDescription>
                      This is your public display name.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Email */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      {...field}
                      id={field.name}
                      type="email"
                      placeholder="hello@example.com"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldDescription>
                      We will use this for account notifications.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Password */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <InputGroup>
                      <InputGroupInput
                        {...field}
                        id={field.name}
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
                    <FieldDescription>At least 8 characters.</FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Bio */}
              <Controller
                name="bio"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Bio</FieldLabel>
                    <Textarea
                      {...field}
                      id={field.name}
                      placeholder="Tell us a little bit about yourself"
                      className="resize-none"
                      aria-invalid={fieldState.invalid}
                    />
                    <FieldDescription>
                      You can <span>@mention</span> other users and
                      organizations.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Account Type */}
              <Controller
                name="type"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Account Type</FieldLabel>
                    <Select
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue placeholder="Select an account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FieldDescription>
                      Choose how you will use this account.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* Theme */}
              <Controller
                name="theme"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FieldSet data-invalid={fieldState.invalid}>
                    <FieldLegend>Theme</FieldLegend>
                    <RadioGroup
                      name={field.name}
                      value={field.value}
                      onValueChange={field.onChange}
                      className="flex flex-col gap-3"
                    >
                      {(["light", "dark", "system"] as const).map((theme) => (
                        <Field
                          key={theme}
                          orientation="horizontal"
                          className="gap-3"
                        >
                          <RadioGroupItem
                            value={theme}
                            id={`theme-${theme}`}
                            aria-invalid={fieldState.invalid}
                          />
                          <FieldLabel
                            htmlFor={`theme-${theme}`}
                            className="font-normal cursor-pointer"
                          >
                            {theme.charAt(0).toUpperCase() + theme.slice(1)}
                          </FieldLabel>
                        </Field>
                      ))}
                    </RadioGroup>
                    <FieldDescription>
                      Select your preferred color scheme.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </FieldSet>
                )}
              />

              {/* Notifications */}
              <FieldSet>
                <FieldLegend>Notifications</FieldLegend>
                <FieldGroup className="gap-4">
                  <Controller
                    name="marketing_emails"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        orientation="horizontal"
                        className="flex items-center justify-between gap-4 rounded-lg border p-4"
                      >
                        <div className="space-y-0.5">
                          <FieldLabel
                            htmlFor={field.name}
                            className="text-base"
                          >
                            Marketing Emails
                          </FieldLabel>
                          <FieldDescription>
                            Receive emails about new products, features, and
                            more.
                          </FieldDescription>
                        </div>
                        <Checkbox
                          id={field.name}
                          name={field.name}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-invalid={fieldState.invalid}
                        />
                      </Field>
                    )}
                  />

                  <Controller
                    name="security_emails"
                    control={form.control}
                    render={({ field, fieldState }) => (
                      <Field
                        orientation="horizontal"
                        className="flex items-center justify-between gap-4 rounded-lg border p-4"
                      >
                        <div className="space-y-0.5">
                          <FieldLabel
                            htmlFor={field.name}
                            className="text-base"
                          >
                            Security Emails
                          </FieldLabel>
                          <FieldDescription>
                            Receive emails about your account security.
                          </FieldDescription>
                        </div>
                        <Switch
                          id={field.name}
                          name={field.name}
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          aria-invalid={fieldState.invalid}
                        />
                      </Field>
                    )}
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
