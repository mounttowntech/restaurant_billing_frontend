const Select = ({
  label,
  name,
  register,
  error,
  // value,
  // onChange,
  options = [],
  placeholder = "Select option",
  optionValue = "_id",
  optionLabel = "label",
  required = false,
}) => {
  // console.log("options value : ", options);
  const registerProps = typeof register === "function" ? register(name) : {};

  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}

      <select
        id={name}
        {...registerProps}
        name={name}
        className="form-control"
        required={required}
        // value={value !== undefined ? value : undefined}
        // onChange={onChange}
      >
        <option value="">{placeholder}</option>

        {options.map((item, index) => (
          <option
            key={item[optionValue] || index}
            value={item[optionValue] || ""}
          >
            {item[optionLabel]}
          </option>
        ))}
      </select>

      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Select;
