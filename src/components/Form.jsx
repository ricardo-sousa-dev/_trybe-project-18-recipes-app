import React, { useContext } from 'react';
import Context from '../Context/Context';

function Form() {
  const {
    button,
    handleChange,
    handleClick,
    handleShowPassword,
    icon,
    showPassword,
  } = useContext(Context);

  return (
  // <form className="login-form">
  //   <div className="field ">
  //     <span className="fa fa-user" />
  //     <input
  //       type="email"
  //       id="input-email"
  //       placeholder="Insira seu e-mail"
  //       data-testid="email-input"
  //       onChange={ handleChange }
  //     />
  //   </div>
  //   <div className="field space ">
  //     <span className="fa fa-lock" />
  //     <input
  //       type={ showPassword }
  //       id="input-password"
  //       placeholder="Insira sua senha"
  //       data-testid="password-input"
  //       onChange={ handleChange }
  //     />
  //     <button
  //       type="button"
  //       onClick={ handleShowPassword }
  //       className="input-group-text"
  //     >
  //       <i className={ icon } />
  //     </button>
  //   </div>
  //   <button
  //     type="button"
  //     data-testid="login-submit-btn"
  //     disabled={ button }
  //     onClick={ handleClick }
  //     className="btn"
  //     id="submit-button"
  //   >
  //     Entrar
  //   </button>
  // </form>

    // <div id="login-column" className="col-md-6">
    <div id="login-box" className="col-md-12 ">
      <h1 className="h1Login">Login</h1>
      <form id="login-form" className="form" action="" method="post">
        <input
          name="username"
          className="form-control"
          type="email"
          id="input-email"
          placeholder="Insira seu e-mail"
          data-testid="email-input"
          onChange={ handleChange }
        />

        <div className="divPassword">
          <input
            name="password"
            className="form-control"
            type={ showPassword }
            id="input-password"
            placeholder="Insira sua senha"
            data-testid="password-input"
            onChange={ handleChange }
          />

          <button
            type="button"
            onClick={ handleShowPassword }
            className="input-group-text"
          >
            <i className={ icon } />
          </button>
        </div>

        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ button }
          onClick={ handleClick }
          className="btn"
          id="submit-button"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Form;
