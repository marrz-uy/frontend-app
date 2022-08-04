import React from 'react';
import Select from 'react-select';

function CustomSelect({styles, options, placeholder}) {
	

	return <div>
		<Select options={options} styles={styles} placeholder={placeholder}/>
	</div>
}

export default CustomSelect