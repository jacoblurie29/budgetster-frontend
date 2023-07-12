import { Controller } from "react-hook-form";
import type { FormCheckboxProps } from "./FormCheckbox.definitions";
import "./FormCheckbox.styles.css";

/**
 * FormInput component
 *
 * @param {string} name - name of the input
 * @param {string} label - label of the input
 * @param {boolean} defaultChecked - default checked value of the input
 * @param {any} control - control of the input (from react-hook-form)
 */
const FormCheckbox = ({
  name,
  label,
  defaultChecked,
  control,
}: FormCheckboxProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <div className="checkbox-wrapper-42">
        <input
          {...field}
          id="cbx-42"
          type="checkbox"
          defaultChecked={defaultChecked}
        />
        <label className="cbx" htmlFor="cbx-42" />
        <label className="lbl" htmlFor="cbx-42">
          {label}
        </label>
      </div>
    )}
  />
);

export default FormCheckbox;
