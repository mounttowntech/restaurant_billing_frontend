const Select = ({
  label,
  name,
  register,
  error,
  value,
  onChange,
  options = [],
  placeholder = "Select option",
  optionValue = "_id",
  optionLabel = "label",
  required = false,
}) => {
  const registerProps = typeof register === "function" ? register(name) : {};

  return (
    <div className="form-group">
      {label && <label>{label}</label>}

      <select
        {...registerProps}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
        required={required}
      >
        <option value="">{placeholder}</option>

        {options.map((item, index) => (
          <option key={item[optionValue] ?? index} value={item[optionValue]}>
            {item[optionLabel]}
          </option>
        ))}
      </select>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Select;
