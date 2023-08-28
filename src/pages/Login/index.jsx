/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendLogin } from '../../store/login/loginSlice';
import Logo from '../../assets/image/logo.png';
import Meds from '../../assets/image/meds.jpg';
import style from './style.module.scss';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorState = useSelector((state) => state.login.error);
  const tokenState = useSelector((state) => state.login.token);

  const [inputValues, setinputValues] = useState({
    username: '',
    password: '',
  });

  const [taketoken, setTakeToken] = useState();

  useEffect(() => {
    !tokenState && setTakeToken(tokenState);
    if (!errorState && taketoken !== undefined) navigate('/medications');
  }, [tokenState]);

  const handleChange = (e) => {
    setinputValues({ ...inputValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendLogin(inputValues));
  };

  return (
    <>
      <div className={style.ContainerLogin}>
        <img className={style.ImgMed} src={Meds} alt="Meds" />
        <div className={style.ContainerText}>
          <div className={style.ContainerTop}>
            <img
              className={style.ContainerTopImg}
              src={Logo}
              alt="Your Company"
            />
            <h2 className={style.ContainerTopTitle}>Sign in to your account</h2>
            <p hidden={!errorState} className={style.ContainerTopError}>
              Username or password is incorrect. Please try logging in again.
            </p>
          </div>

          <form onSubmit={handleSubmit} className={style.ContainerForm}>
            <label className={style.ContainerFormLabel}>Username</label>
            <input
              type="text"
              id="ipt-username"
              name="username"
              value={inputValues.username}
              onChange={handleChange}
              required
              className={style.ContainerFormInput}
            />

            <label className={style.ContainerFormLabel}>Password</label>
            <input
              type="password"
              id="ipt-password"
              name="password"
              value={inputValues.password}
              onChange={handleChange}
              required
              className={style.ContainerFormInput}
            />

            <button
              type="submit"
              id="btn-sign-in"
              className={style.ContainerFormBtn}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
export default Login;
