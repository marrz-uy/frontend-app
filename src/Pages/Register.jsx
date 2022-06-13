import React from 'react';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Layout } from '../Layout';
import AuthUser from '../Components/AuthUser';
import '../Css/Register.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const navigate = useNavigate();

  const { http } = AuthUser();

  const submitRegister = (e) => {
    e.preventDefault();
    http.post('/register', { email, password, name }).then((res) => {
      navigate('/login');
    });
  };

  return (
    <Layout>
      <div className="register">
        <form onSubmit={submitRegister}>
          <div>
            <h2>Registrarse</h2>
          </div>
          <div className="inputGroup">
            <div className='errorMessage'>
              <p id="errorMessageEmail">
                El email debe ser un mail valido 
              </p>
            </div>
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className='errorMessage'>
              <p id="errorMessagePassword">
                La contraseña debe tener mínimo 8 caracteres, como máximo 20 caracteres, con al menos 1 letra, 1 número y 1 carácter especial 
              </p>
            </div>
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className='errorMessage'>
              <p id="errorMessageName">
                El nombre debe tener mínimo 4 caracteres, como máximo 16 caracteres, con al menos 1 letra 
              </p>
            </div>
            <input
              className="input"
              type="text"
              name="name"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
				      <label class="formLabel" htmlFor="terms">
					      <input 
                className ='input' 
                type="checkbox" 
                name="terms" 
                id="terms"
                />
                <p>
                Acepto los Términos y Condiciones
                </p>
			      	</label>
			      
            <div className='errorMessageSubmit'>
              <p id="errorMessageSubmit">
                Error al registrarse, por favor revise los campos, y vuelva a intentarlo 
              </p>
            </div>
            <div className='successMessageSubmit'>
              <p id="successMessageSubmit">
                ¡Te has registrado con éxito!  
              </p>
            </div>
            <input type="submit" value="Registro" className="btn-register" />
          </div>
          <div className="linkALogin">
            <Link to="/login">Volver al login</Link>
          </div>
        </form>
      </div>
    </Layout>
  );
};

const formulario = document.getElementById('register');
const inputs = document.querySelectorAll('input');

const expresiones = {
  email: (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/), //formato de email
  password: (/^(?=.*\d)([A-Za-z0-9]{8,20})$/), // 1 caracter obligatorio, cualquier letra en mayuscula o minuscula, de 8 a 20 caracteres.
	name: (/^(?=.*\d)([A-Za-z]{4,16})$/) // 1 caracter obligatorio, cualquier letra en mayuscula o minuscula, de 4 a 16 caracteres.
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
		break;
		case "name":
			validarCampo(expresiones.name, e.target, 'name');
		break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo__${campo}`).classList.remove('errorMessage');
		document.getElementById(`grupo__${campo}`).classList.add('successMessageSubmit');
    document.querySelector(`#grupo__${campo} .errorMessage`).classList.remove('errorMessage');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('errorMessage');
		document.getElementById(`grupo__${campo}`).classList.remove('successMessage-active');
		document.querySelector(`#grupo__${campo} .errorMessage`).classList.add('errorMessage');
		campos[campo] = false;
	}
}


inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const terminos = document.getElementById('terms');
	if(campos.email && campos.password && campos.name  && terminos.checked ){
		formulario.reset();

		document.getElementById('successMessage').classList.add('successMessage');
		setTimeout(() => {
			document.getElementById('successMessage').classList.remove('successMessage');
		}, 5000);

		document.querySelectorAll('.successMessage').forEach((icono) => {
			icono.classList.remove('successMessage');
		});
	} else {
		document.getElementById('successMessage').classList.add('successMessage');
	}
});

export default Register;
