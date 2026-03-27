"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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
  accountFormSchema,
  type AccountFormValues,
} from "@/lib/validations/account";

export default function Page() {
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FieldGroup>
              <Field data-invalid={!!form.formState.errors.username}>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input
                  id="username"
                  placeholder="antigravity"
                  {...form.register("username")}
                  aria-invalid={!!form.formState.errors.username}
                />
                <FieldDescription>
                  This is your public display name.
                </FieldDescription>
                <FieldError errors={[form.formState.errors.username]} />
              </Field>

              <Field data-invalid={!!form.formState.errors.email}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="hello@example.com"
                  {...form.register("email")}
                  aria-invalid={!!form.formState.errors.email}
                />
                <FieldDescription>
                  We will use this for account notifications.
                </FieldDescription>
                <FieldError errors={[form.formState.errors.email]} />
              </Field>

              <Field data-invalid={!!form.formState.errors.bio}>
                <FieldLabel htmlFor="bio">Bio</FieldLabel>
                <Textarea
                  id="bio"
                  placeholder="Tell us a little bit about yourself"
                  className="resize-none"
                  {...form.register("bio")}
                  aria-invalid={!!form.formState.errors.bio}
                />
                <FieldDescription>
                  You can <span>@mention</span> other users and organizations.
                </FieldDescription>
                <FieldError errors={[form.formState.errors.bio]} />
              </Field>

              <Field data-invalid={!!form.formState.errors.type}>
                <FieldLabel>Account Type</FieldLabel>
                <Select
                  onValueChange={(value) =>
                    form.setValue("type", value as AccountFormValues["type"])
                  }
                >
                  <SelectTrigger aria-invalid={!!form.formState.errors.type}>
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
                <FieldError errors={[form.formState.errors.type]} />
              </Field>

              <FieldSet data-invalid={!!form.formState.errors.theme}>
                <FieldLegend>Theme</FieldLegend>
                <RadioGroup
                  defaultValue="system"
                  onValueChange={(value) =>
                    form.setValue("theme", value as AccountFormValues["theme"])
                  }
                  className="flex flex-col gap-3"
                  aria-invalid={!!form.formState.errors.theme}
                >
                  <Field orientation="horizontal" className="gap-3">
                    <RadioGroupItem value="light" id="theme-light" />
                    <FieldLabel
                      htmlFor="theme-light"
                      className="font-normal cursor-pointer"
                    >
                      Light
                    </FieldLabel>
                  </Field>
                  <Field orientation="horizontal" className="gap-3">
                    <RadioGroupItem value="dark" id="theme-dark" />
                    <FieldLabel
                      htmlFor="theme-dark"
                      className="font-normal cursor-pointer"
                    >
                      Dark
                    </FieldLabel>
                  </Field>
                  <Field orientation="horizontal" className="gap-3">
                    <RadioGroupItem value="system" id="theme-system" />
                    <FieldLabel
                      htmlFor="theme-system"
                      className="font-normal cursor-pointer"
                    >
                      System
                    </FieldLabel>
                  </Field>
                </RadioGroup>
                <FieldDescription>
                  Select your preferred color scheme.
                </FieldDescription>
                <FieldError errors={[form.formState.errors.theme]} />
              </FieldSet>

              <FieldSet>
                <FieldLegend>Notifications</FieldLegend>
                <FieldGroup className="gap-4">
                  <Field
                    orientation="horizontal"
                    className="flex items-center justify-between gap-4 rounded-lg border p-4"
                  >
                    <div className="space-y-0.5">
                      <FieldLabel className="text-base">
                        Marketing Emails
                      </FieldLabel>
                      <FieldDescription>
                        Receive emails about new products, features, and more.
                      </FieldDescription>
                    </div>
                    <Checkbox
                      checked={form.watch("marketing_emails")}
                      onCheckedChange={(checked) =>
                        form.setValue("marketing_emails", !!checked)
                      }
                    />
                  </Field>
                  <Field
                    orientation="horizontal"
                    className="flex items-center justify-between gap-4 rounded-lg border p-4"
                  >
                    <div className="space-y-0.5">
                      <FieldLabel className="text-base">
                        Security Emails
                      </FieldLabel>
                      <FieldDescription>
                        Receive emails about your account security.
                      </FieldDescription>
                    </div>
                    <Switch
                      checked={form.watch("security_emails")}
                      onCheckedChange={(checked) =>
                        form.setValue("security_emails", checked)
                      }
                    />
                  </Field>
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
