import * as z from "zod";

export const accountFormSchema = z.object({
  username: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Username is required."
          : "Invalid username.",
    })
    .min(2, {
      error: "Username must be at least 2 characters.",
    }),
  email: z.email({
    error: (issue) =>
      issue.input === undefined
        ? "Email is required."
        : "Please enter a valid email address.",
  }),
  bio: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Bio is required." : "Invalid bio.",
    })
    .max(160, { error: "Bio must be at most 160 characters." })
    .min(4, { error: "Bio must be at least 4 characters." }),
  type: z.enum(["personal", "business", "other"], {
    error: (issue) =>
      issue.input === undefined
        ? "Account type is required."
        : "Invalid account type.",
  }),
  marketing_emails: z.boolean(),
  security_emails: z.boolean(),
  theme: z.enum(["light", "dark", "system"], {
    error: (issue) =>
      issue.input === undefined ? "Theme is required." : "Invalid theme.",
  }),
  password: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Password is required."
          : "Invalid password.",
    })
    .min(8, { error: "Password must be at least 8 characters." }),
});

export type AccountFormValues = z.infer<typeof accountFormSchema>;
