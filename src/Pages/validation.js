import '../Pages/Register';

const formulario = document.getElementById('register');
const inputs = document.querySelectorAll('.register input');

const expresiones = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,

    password: /^.{8,20}$/, // 8 a 20 digitos.

    name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/ // Letras y espacios, pueden llevar acentos.
    
}

const campos = {
	email: false,
	password: false,
	name: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
        case "email":
			validarCampo(expresiones.email, e.target, 'email');
		break;
        case "password":
			validarCampo(expresiones.password, e.target, 'password');
		case "name":
			validarCampo(expresiones.name, e.target, 'name');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('errorMessageSubmit');
		document.getElementById(`grupo__${campo}`).classList.add('successMessageSubmit');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('errorMessageSubmit');
		document.getElementById(`grupo__${campo}`).classList.remove('successMessageSubmit');
		campos[campo] = false;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	if(campos.email && campos.password && campos.name.checked ){
		formulario.reset();

		document.getElementById('successMessageSubmit').classList.add('successMessageSubmit');
		setTimeout(() => {
			document.getElementById('successMessageSubmit').classList.remove('successMessageSubmit');
		}, 5000);

		document.querySelectorAll('.successMessageSubmit').forEach((icono) => {
			icono.classList.remove('successMessageSubmit');
		});
	} else {
		document.getElementById('successMessageSubmit').classList.add('successMessageSubmit');
	}
});

