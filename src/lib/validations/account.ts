import * as z from "zod"

export const accountFormSchema = z.object({
  username: z.string({
    error: (issue) => (issue.input === undefined || issue.input === "" ? "Username is required." : "Invalid username."),
  }).min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string({
    error: (issue) => (issue.input === undefined || issue.input === "" ? "Email is required." : "Invalid email."),
  }).email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string({
    error: (issue) => (issue.input === undefined || issue.input === "" ? "Bio is required." : "Invalid bio."),
  }).max(160, "Bio must be at most 160 characters.").min(4, "Bio must be at least 4 characters."),
  type: z.enum(["personal", "business", "other"], {
    error: (issue) => (issue.input === undefined ? "Account type is required." : "Invalid account type."),
  }),
  marketing_emails: z.boolean(),
  security_emails: z.boolean(),
  theme: z.enum(["light", "dark", "system"], {
    error: (issue) => (issue.input === undefined ? "Theme is required." : "Invalid theme."),
  }),
})

export type AccountFormValues = z.infer<typeof accountFormSchema>
