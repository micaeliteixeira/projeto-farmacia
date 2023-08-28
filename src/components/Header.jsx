/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import Logo from '../assets/image/logo.svg';
import lupa from '../assets/image/lupa.svg';
import style from './style.module.scss';
import { useNavigate } from 'react-router-dom';

function Header({ name, getList }) {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleClick = () => {
    if (search.length >= 3) {
      getList(1, 20, search);
    } else {
      getList(1, 20);
    }
  };

  const handleChange = (e) => {
    if (e.target.value.length === 0) {
      getList(1, 20);
    }
    setSearch(e.target.value);
  };

  return (
    <div className={style.ContainerHeader}>
      <div className={style.ContainerLogo}>
        <img className={style.ContainerLogoImg} src={Logo} alt="Logo" />
        <h2 className={style.ContainerLogoTitle}>Pharmacy</h2>
      </div>
      <div className={style.ContainerSearch}>
        <input
          type="text"
          placeholder=""
          name="search"
          className={style.ContainerSearchInput}
          value={search}
          onChange={handleChange}
        />
        <button
          className={style.ContainerSearchBtn}
          onClick={() => {
            handleClick();
          }}
          disabled={search.length < 3}
        >
          <img
            src={lupa}
            alt="Search"
            className={style.ContainerSearchBtnImg}
          />
        </button>
      </div>
      <div className={style.ContainerMenu}>
        <button
          className={style.ContainerMenuBtn}
          onClick={() =>
            navigate(name === 'Medications' ? '/create' : '/medications')
          }
        >
          {name === 'Medications' ? 'Create Medication' : 'Medications'}
        </button>
        <button
          className={style.ContainerMenuBtn}
          onClick={() => navigate('/')}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
