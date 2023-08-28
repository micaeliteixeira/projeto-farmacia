/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listMedications } from './../../store/medications-list/medicationsListSlice';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Box from '../../assets/image/drug.png';
import NotFound from '../../assets/image/not.png';
import style from './style.module.scss';

function Medications() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tokenState = useSelector((state) => state.login.token);
  const medicationsState = useSelector((state) => state.medications.list);

  const [list, setList] = useState();
  const [listLimit, setListLimit] = useState('');
  const [pagination, setPagination] = useState({
    total: '',
    page: 1,
    totalpage: '',
    limit: '',
  });

  const updatePagination = (updates) => {
    console.log(updates);
    setPagination((prevPagination) => ({
      ...prevPagination,
      updates,
    }));
    console.log(pagination);
  };

  const getList = (page, limit, search) => {
    console.log(search);
    let values;
    if (search) {
      console.log('to aqui');
      values = [
        {
          params: { page: page || 1, limit: limit || 20, search: search },
          token: tokenState,
        },
      ];
    } else {
      values = [
        {
          params: { page: page || 1, limit: limit || 20 },
          token: tokenState,
        },
      ];
    }

    dispatch(listMedications(values));
  };

  useEffect(() => {
    !tokenState && navigate('/');
  }, []);

  useEffect(() => {
    if (!list) {
      getList();
    }
  }, []);

  useEffect(() => {
    setList(medicationsState.data);
  }, [medicationsState.data]);

  useEffect(() => {
    setPagination({
      ...pagination,
      total: medicationsState.total,
      totalpage: medicationsState.last_page,
    });
  }, [medicationsState.last_page]);

  const renderList = () => {
    return (
      <div className={style.ContainerList}>
        <div className={style.ContainerListInfo}>
          <h3>{medicationsState.total} items found.</h3>
        </div>
        {list?.map((item, index) => (
          <div key={index} className={style.ContainerListCard}>
            <li>
              <img
                src={Box}
                alt="Medication Box"
                className={style.ContainerListCardImg}
              />
            </li>
            <div className={style.ContainerListCardText}>
              <li className={style.ContainerListCardTextTitle}>
                {item.drug_name}
              </li>
              <li className={style.ContainerListCardTextSubtitle1}>
                {item.active_ingredient}
              </li>
              <li className={style.ContainerListCardTextSubtitle2}>
                <span>Form: </span>
                {item.form}
              </li>
              <li className={style.ContainerListCardTextSubtitle2}>
                <span>Strength: </span> {item.strength}
              </li>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderNotFound = () => {
    return (
      <div className={style.ContainerError}>
        <img
          src={NotFound}
          alt="notfound"
          className={style.ContainerErrorImg}
        />
      </div>
    );
  };

  const renderPagination = () => {
    const controls = {
      next() {
        console.log('next');
        const nextPage = pagination.page + 1;
        if (nextPage < pagination.totalpage - 1) {
          pagination.page = nextPage;
          getList(nextPage, pagination.limit);
        }
      },
      prev() {
        console.log('prev');
        console.log(typeof pagination.page);
        const prevPage = pagination.page - 1;
        if (pagination.totalpage > prevPage) {
          pagination.page = prevPage;
          getList(prevPage, pagination.limit);
        }
      },
      goTo(page) {
        console.log('passei aqui');
        if (page >= 1 && pagination.totalpage >= page) {
          pagination.page = +page;
          getList(page, pagination.limit);
        }
      },
    };

    const handleChange = (e) => {
      setListLimit(e.target.value);
    };

    const handleUpdateLimit = () => {
      updatePagination({ limit: parseInt(listLimit) });
      getList(pagination.page, parseInt(listLimit));
    };

    const buttons = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    return (
      <div className={style.ContainerPagination}>
        <div className={style.ContainerPaginationButtons}>
          <button
            onClick={() => controls.goTo(1)}
            className={style.ContainerPaginationButtonsBtn}
          >
            «
          </button>
          <button
            onClick={() => controls.prev()}
            className={style.ContainerPaginationButtonsBtn}
          >
            &lt;
          </button>
          <div className={style.ContainerPaginationButtons}>
            {buttons?.map((page, index) => (
              <button
                key={index}
                onClick={() => controls.goTo(page)}
                className={style.ContainerPaginationBtn}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => controls.next()}
            className={style.ContainerPaginationButtonsBtn}
          >
            &gt;
          </button>
          <button
            onClick={() => controls.goTo(pagination.totalpage)}
            className={style.ContainerPaginationButtonsBtn}
          >
            »
          </button>
        </div>
        <div className={style.ContainerPaginationChange}>
          <p>Quantity of item to display:</p>
          <input
            type="number"
            min={1}
            max={pagination.total}
            onChange={handleChange}
            name="limit"
            value={listLimit}
            className={style.ContainerPaginationChangeIpt}
          />
          <button
            onClick={() => handleUpdateLimit()}
            className={style.ContainerPaginationChangeBtn}
          >
            Change
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header name="Medications" getList={getList} />

      {list?.length === 0 ? renderNotFound() : renderList()}
      {renderPagination()}
    </>
  );
}

export default Medications;
