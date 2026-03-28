"use client";

import * as React from "react";
import type {
  Control,
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { Controller } from "react-hook-form";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

interface BaseFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  control: Control<TFieldValues>;
  name: TName;
  label?: React.ReactNode;
  description?: React.ReactNode;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  orientation?: "vertical" | "horizontal" | "responsive";
}

/**
 * Generic FormField component that wraps the Controller and Field layout.
 */
export function FormField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  description,
  className,
  orientation,
  render,
}: BaseFormFieldProps<TFieldValues, TName> & {
  render: (props: {
    field: ControllerRenderProps<TFieldValues, TName>;
    fieldState: ControllerFieldState;
    id: string;
  }) => React.ReactNode;
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          data-invalid={fieldState.invalid}
          data-disabled={field.disabled}
          orientation={orientation}
          className={className}
        >
          {label && <FieldLabel htmlFor={name}>{label}</FieldLabel>}
          {render({ field, fieldState, id: name })}
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

/**
 * Generic Input field
 */
export function FormInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  type,
  ...props
}: BaseFormFieldProps<TFieldValues, TName> & {
  type?: React.HTMLInputTypeAttribute;
  autoComplete?: string;
}) {
  return (
    <FormField
      {...props}
      render={({ field, fieldState, id }) => (
        <Input
          {...field}
          id={id}
          type={type}
          placeholder={props.placeholder}
          aria-invalid={fieldState.invalid}
          autoComplete={props.autoComplete}
        />
      )}
    />
  );
}

/**
 * Generic Textarea field
 */
export function FormTextarea<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: BaseFormFieldProps<TFieldValues, TName> & {
  className?: string;
}) {
  return (
    <FormField
      {...props}
      render={({ field, fieldState, id }) => (
        <Textarea
          {...field}
          id={id}
          placeholder={props.placeholder}
          className={cn("resize-none", props.className)}
          aria-invalid={fieldState.invalid}
        />
      )}
    />
  );
}

/**
 * Generic Select field
 */
export function FormSelect<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  options,
  ...props
}: BaseFormFieldProps<TFieldValues, TName> & {
  options: { label: string; value: string }[];
}) {
  return (
    <FormField
      {...props}
      render={({ field, fieldState, id }) => (
        <Select
          name={field.name}
          value={field.value}
          onValueChange={field.onChange}
          disabled={field.disabled}
        >
          <SelectTrigger id={id} aria-invalid={fieldState.invalid}>
            <SelectValue placeholder={props.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
}

/**
 * Generic Checkbox field (usually horizontal with label on the left/right)
 */
export function FormCheckbox<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: BaseFormFieldProps<TFieldValues, TName>) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState }) => (
        <Field
          orientation="horizontal"
          className={cn(
            "flex items-center justify-between gap-4 rounded-lg border p-4",
            props.className
          )}
          data-invalid={fieldState.invalid}
          data-disabled={field.disabled}
        >
          <div className="space-y-0.5">
            {props.label && (
              <FieldLabel htmlFor={field.name} className="text-base">
                {props.label}
              </FieldLabel>
            )}
            {props.description && (
              <FieldDescription>{props.description}</FieldDescription>
            )}
          </div>
          <Checkbox
            id={field.name}
            name={field.name}
            checked={field.value}
            onCheckedChange={field.onChange}
            disabled={field.disabled}
            aria-invalid={fieldState.invalid}
          />
        </Field>
      )}
    />
  );
}

/**
 * Generic Switch field
 */
export function FormSwitch<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: BaseFormFieldProps<TFieldValues, TName>) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState }) => (
        <Field
          orientation="horizontal"
          className={cn(
            "flex items-center justify-between gap-4 rounded-lg border p-4",
            props.className
          )}
          data-invalid={fieldState.invalid}
          data-disabled={field.disabled}
        >
          <div className="space-y-0.5">
            {props.label && (
              <FieldLabel htmlFor={field.name} className="text-base">
                {props.label}
              </FieldLabel>
            )}
            {props.description && (
              <FieldDescription>{props.description}</FieldDescription>
            )}
          </div>
          <Switch
            id={field.name}
            name={field.name}
            checked={field.value}
            onCheckedChange={field.onChange}
            disabled={field.disabled}
            aria-invalid={fieldState.invalid}
          />
        </Field>
      )}
    />
  );
}

/**
 * Generic RadioGroup field
 */
export function FormRadioGroup<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  options,
  ...props
}: BaseFormFieldProps<TFieldValues, TName> & {
  options: { label: string; value: string }[];
}) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field, fieldState }) => (
        <RadioGroup
          name={field.name}
          value={field.value}
          onValueChange={field.onChange}
          disabled={field.disabled}
          className="flex flex-col gap-3"
        >
          {options.map((option) => (
            <Field key={option.value} orientation="horizontal" className="gap-3">
              <RadioGroupItem
                value={option.value}
                id={`${field.name}-${option.value}`}
                aria-invalid={fieldState.invalid}
              />
              <FieldLabel
                htmlFor={`${field.name}-${option.value}`}
                className="font-normal cursor-pointer"
              >
                {option.label}
              </FieldLabel>
            </Field>
          ))}
        </RadioGroup>
      )}
    />
  );
}
