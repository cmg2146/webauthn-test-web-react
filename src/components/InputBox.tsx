export default function InputBox({
  name,
  type,
  label = "",
  placeholder = "",
  value,
  onChange,
}: {
  name: string,
  type: string,
  label?: string,
  placeholder?: string,
  value: string,
  onChange: (newValue: string) => void
}) {
  return (
    <>
      {label &&
        <label
          htmlFor={name}
          className="mb-1 font-bold text-sm"
        >
          {label}
        </label>
      }
      <input
        type={type}
        className="input-primary mb-1"
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </>
  );
}