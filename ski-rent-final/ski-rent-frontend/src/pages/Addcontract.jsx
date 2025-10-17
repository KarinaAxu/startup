import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../style.css';

export default function Addcontract() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      client: e.target.clientName.value,
      phone: e.target.clientPhone.value,
      start: e.target.startDate.value,
      end: e.target.endDate.value,
      products: []
    };

    // сохраняем данные во временный черновик
    localStorage.setItem('currentContract', JSON.stringify(data));

    // переходим на страницу верификации кода
    navigate('/verification');
  };

  return (
    <div className="page">
      <div className="bg-wrap"><canvas id="bgCanvas"></canvas></div>

      <div className="modal-overlay">
        <div className="modal">
          <button className="close-btn" onClick={() => navigate('/setting')}>×</button>
          <h2>Создание нового договора</h2>

          <form id="contractForm" onSubmit={handleSubmit}>
            <label>ФИО клиента</label>
            <input id="clientName" name="clientName" type="text" required />

            <label>Телефон</label>
            <input id="clientPhone" name="clientPhone" type="number" required />

            <label>Дата начала аренды</label>
            <input id="startDate" name="startDate" type="date" required />

            <label>Дата окончания аренды</label>
            <input id="endDate" name="endDate" type="date" required />

            <Link to="/editcontract">
              <button type="button" className="social-btn">+ Добавить товар</button>
            </Link>

            <button className="btn primary" type="submit">Создать договор</button>
          </form>
        </div>
      </div>
    </div>
  );
}