import Select from 'react-select';

function CustomSelect({ styles, options, placeholder, value }) {
  return (
    <div>
      <Select
        options={options}
        styles={styles}
        placeholder={placeholder}
        defaultValue={value}
      />
    </div>
  );
}

export default CustomSelect;
