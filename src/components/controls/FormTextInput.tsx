import { RegisterOptions, useFormContext } from "react-hook-form";

export default function FormTextInput({
  name,
  label,
  registerOptions,
  className = ""
}: {
  name: string,
  label: string,
  registerOptions: RegisterOptions<any, string>,
  className?: string
}) {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className={`${className}`}>
      <label htmlFor={name} className="font-medium text-sm leading-6 text-gray-900">{label}</label>
      <input
        id={name}
        type="text"
        className={`input-primary mt-2 w-full ${errors[name] ? 'border-red-500' : ''}`}
        aria-invalid={errors[name] ? "true" : "false"}
        {...register(name, registerOptions)}
      />
      {errors[name] && <div className="mt-2 text-red-500" role="alert">{errors[name]?.message?.toString()}</div>}
    </div>
  );
}
