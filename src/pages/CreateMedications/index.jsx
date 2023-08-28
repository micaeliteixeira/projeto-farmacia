/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  createMedications,
  getManufacturers,
} from '../../store/create-medications/createMedications';
import Header from '../../components/Header';
import style from './style.module.scss';

function CreateMedications() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tokenState = useSelector((state) => state.login.token);
  const manufacturersState = useSelector((state) => state.create);

  const [newStateData, setNewStateData] = useState('');
  const [inputValues, setInputValues] = useState({
    drug_name: '',
    units_per_package: '',
    issued_on: '',
    expires_on: '',
  });

  useEffect(() => {
    !tokenState && navigate('/');
  });

  useEffect(() => {
    if (!manufacturersState.manufacturers) {
      dispatch(getManufacturers(tokenState));
    }
  }, [manufacturersState.manufacturers]);

  useEffect(() => {
    if (manufacturersState.manufacturers) {
      setNewStateData(manufacturersState.manufacturers.data);
    }
  }, [manufacturersState.manufacturers]);

  useEffect(() => {
    let interval;

    if (newStateData && manufacturersState.manufacturers) {
      interval = setInterval(() => {
        dispatch(getManufacturers(tokenState));
        newStateData.forEach((obj1, index) => {
          if (obj1.name !== manufacturersState.manufacturers[0][index].name) {
            setNewStateData(manufacturersState.manufacturers);
          }
        });
      }, 100000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [newStateData, manufacturersState.manufacturers]);

  const handleChange = (e) => {
    setInputValues({
      ...inputValues,
      manufacturers: newStateData,
      [e.target.name]: e.target.value,
    });
  };

  const compareDates = (dateIssues, dateExperie) => {
    const date1 = new Date(dateIssues);
    const date2 = new Date(dateExperie);

    if (date1 > date2) {
      return (
        <p className={style.ContainerTopError}>
          Experies on must be after the data of issues on.
        </p>
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createMedications(inputValues, tokenState));
  };

  return (
    <>
      <Header name="Create" />
      <div className={style.ContainerText}>
        <div className={style.ContainerTop}>
          <h2 className={style.ContainerTopTitle}>Create Medication</h2>
          {compareDates(inputValues.issued_on, inputValues.expires_on)}
          {manufacturersState.success === '201' ? (
            <p className={style.ContainerTopError}>
              Drug registered successfully
            </p>
          ) : (
            <p className={style.ContainerTopSuccess}>
              Error ao cadastrar medicamento, tente novamente.
            </p>
          )}
          <form onSubmit={handleSubmit} className={style.ContainerForm}>
            <label className={style.ContainerFormLabel}>Drug name:</label>
            <input
              type="text"
              id="ipt-drug_name"
              name="drug_name"
              value={inputValues.drug_name}
              onChange={handleChange}
              required
              className={style.ContainerFormInput}
              max={30}
            />

            <label className={style.ContainerFormLabel}>
              Units per package:
            </label>
            <input
              type="number"
              id="ipt-units_per_package"
              name="units_per_package"
              value={inputValues.units_per_package}
              onChange={handleChange}
              required
              className={style.ContainerFormInput}
            />

            <label className={style.ContainerFormLabel}>Issued on:</label>
            <input
              type="date"
              id="ipt-issued_on"
              name="issued_on"
              value={inputValues.issued_on}
              onChange={handleChange}
              required
              className={style.ContainerFormInput}
            />

            <label className={style.ContainerFormLabel}>Expires on:</label>
            <input
              type="date"
              id="expires_on"
              name="expires_on"
              value={inputValues.expires_on}
              onChange={handleChange}
              required
              className={style.ContainerFormInput}
            />

            <label className={style.ContainerFormLabel}>Mnufacturers:</label>
            <textarea
              type="text"
              id="manufacturers"
              name="manufacturers"
              value={JSON.stringify(newStateData)}
              onChange={handleChange}
              required
              className={style.ContainerFormInput}
              max={50}
            />

            <button
              type="submit"
              id="btn-sign-in"
              className={style.ContainerFormBtn}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateMedications;
