import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

const InputGroup = ({ icon, handleSet }) => {
  return (
    <div className="input-group">
      <label className="input-fill">
        {icon === 'email' ? (
          <input
            onChange={(e) => handleSet(['email', e.target.value])}
            type="email"
            name="email"
            id="email"
          />
        ) : icon === 'password' ? (
          <input
            onChange={(e) => handleSet(['password', e.target.value])}
            type="password"
            name="password"
            id="password"
          />
        ) : (
          <input
            onChange={(e) => handleSet(['name', e.target.value])}
            type="text"
            name="name"
            id="name"
          />
        )}

        <span className="input-label">
          {icon === 'email'
            ? 'Correo electronico'
            : icon === 'password'
            ? 'Contraseña'
            : 'Nombre de usuario'}
        </span>
        <FontAwesomeIcon
          icon={
            icon === 'email'
              ? faEnvelope
              : icon === 'password'
              ? faLock
              : faUser
          }
          className="icon"
        />
      </label>
    </div>
  );
};

export default InputGroup;
