import '../Pages/Register';

const formulario = document.getElementById('message');
const inputs = document.querySelectorAll('.message input');

const expresiones = {
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,

    password: /^.{8,20}$/, // 8 a 20 digitos.

    name: /^[a-zA-Z]{1,6}$/ // solo letras letras hasta 16 digitos.
    
}

const campos = {
	email: false,
	password: false,
	name: false
}

const text = "Waiting for an input";

const validarFormulario = (e) => {
	switch (e.target.name) {
        case "email":
			validarCampo(expresiones.email, e.target, 'email');
		break;
        case "password":
			validarCampo(expresiones.password, e.target, 'password');
		break;
		case "name":
			validarCampo(expresiones.name, e.target, 'name');
		break;
		default:
			console.log(text);
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test (input.value)){
		/*alert('Campos llenados correctamente');
		return;*/

		document.getElementById(`grupo__${campo}`).classList.remove('errorMessageSubmit');
		document.getElementById(`grupo__${campo}`).classList.add('successMessageSubmit');
		campos[campo] = true;
		
	} else {
		/*alert('Error al llenar los campos, por favor vuelva a intetarlo');
		return;
		*/
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

		document.getElementById('message').classList.add('successMessageSubmit');
		setTimeout(() => {
			document.getElementById('message').classList.remove('errorMessageSubmit');
		}, 5000);

		document.querySelectorAll('.message').forEach((icono) => {
			icono.classList.remove('errorMessageSubmit');
		});
	} else {
		document.getElementById('message').classList.add('successMessageSubmit');
	}
});
