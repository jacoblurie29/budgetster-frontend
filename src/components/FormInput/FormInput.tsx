import { Controller } from "react-hook-form";
import type { FormInputProps } from "./FormInput.definitions";
import "./FormInput.styles.css";

/**
 * FormInput component
 *
 * @param {string} name - name of the input
 * @param {string} type - type of the input
 * @param {string} label - label of the input
 * @param {string} placeholder - placeholder of the input
 * @param {string} defaultValue - default value of the input
 * @param {any} control - control of the input (from react-hook-form)
 */
const FormInput = ({
  name,
  type,
  label,
  placeholder,
  defaultValue,
  control,
}: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <div className="form-input-container">
        <div className="form-input-inner-container">
          {label && <div className="form-input-label">{label}</div>}
          <input
            onChange={field.onChange}
            onBlur={field.onBlur}
            name={field.name}
            ref={field.ref}
            className="form-input"
            placeholder={placeholder}
            type={type}
            defaultValue={defaultValue}
          />
        </div>
      </div>
    )}
  />
);

export default FormInput;
