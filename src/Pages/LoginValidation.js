const formulario = document.getElementById('#email','#password');

const expresiones = {
	email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    password: /^.{8,20}$/ // 8 a 20 digitos.
}

const campos = {
    email: false,
	password: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "email":
			validarCampo(expresiones.email, e.target, 'email');
		break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('errorMessage');
		document.getElementById(`grupo__${campo}`).classList.add('successMessage');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('errorMessage');
		document.getElementById(`grupo__${campo}`).classList.remove('successMessage');
		campos[campo] = false;
	}
}


inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	if(campos.password && campos.email){
		formulario.reset();

		document.getElementById('submitMessage').classList.add('successMessageSubmit');
		setTimeout(() => {
			document.getElementById('submitMessage').classList.remove('successMessageSubmit');
		}, 5000);
	} else {
		document.getElementById('submitMessage').classList.add('errorMessageSubmit');
	}
});

//Debo ver el RegisterValidation.js ahora