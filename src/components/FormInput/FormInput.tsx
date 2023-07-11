import type { FormInputProps } from "./FormInput.definitions";
import "./FormInput.styles.css";

const FormInput = ({
  type,
  name,
  label,
  placeholder,
  defaultValue,
  onChange,
  onKeyPress,
  register,
  errors,
}: FormInputProps) => (
  <div className="form-input-container">
    <div className="form-input-inner-container">
      {label && <div className="form-input-label">{label}</div>}
      <input className="form-input" placeholder={placeholder} type={type} />
    </div>
  </div>
);

export default FormInput;
