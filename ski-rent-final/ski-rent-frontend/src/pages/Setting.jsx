import React, { useEffect } from 'react';
import '../style.css';

export default function Setting() {
  useEffect(() => {
    const canvas = document.getElementById('bgCanvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      resize();
      window.addEventListener('resize', resize);
      return () => window.removeEventListener('resize', resize);
    }
  }, []);

  return (
    <div className="page settings-page">
      <div aria-hidden="true" className="bg-wrap">
        <canvas id="bgCanvas"></canvas>
      </div>

      <div className="layout">
        <aside className="sidebar">
          <div className="logo"></div>
          <nav className="nav">
            <a className="href" href="Info Menu.html">
              <div className="nav-item">
                <img alt="Dashboard" height="24" src="https://www.svgrepo.com/show/392628/arrow-small-top-triangle-direction-navigation.svg" width="24"/>
                Dashboard
              </div>
            </a>
            <a className="href active" href="Setting.html">
              <div className="nav-item">
                <img alt="Settings" height="24" src="https://www.svgrepo.com/show/392631/arrow-bottom-small-triangle-direction-navigation.svg" width="24"/>
                Settings
              </div>
            </a>
          </nav>
        </aside>

        <main className="main-content">
          <header className="header">
            <h1>Settings</h1>
            <div className="header-buttons">
              <button className="btn primary" onClick={() => exportTable('products','name,category,size,price,stock'.split(','),'products.csv')}>Export</button>
              <a href="AddContract.html">
                <button className="btn primary">+ New</button>
              </a>
            </div>
          </header>

          <section className="content-section">
            <div className="status-cards">
              <div className="status-card"><div className="status-value">15%</div><div className="status-label">Недельная аренда</div></div>
              <div className="status-card"><div className="status-value">7 дней</div><div className="status-label">Скидка</div></div>
              <div className="status-card"><div className="status-value">40%</div><div className="status-label">Сезонная аренда</div></div>
              <div className="status-card"><div className="status-value">30 дней</div><div className="status-label">Действия</div></div>
            </div>

            <div className="table-wrapper">
              <h2>Торговля</h2>
              <table>
                <thead>
                  <tr>
                    <th>Название</th><th>Категория</th><th>Размер</th><th>Цена/день</th><th>Количество</th><th>Действия</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Горные лыжи Rossignol</td>
                    <td><span className="status-badge status-active">Активен</span></td>
                    <td>170см</td><td>1 500 ₽</td><td>14 шт.</td>
                    <td><button className="action-btn action-edit">Ред.</button><button className="action-btn action-delete">Удал.</button></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="table-wrapper">
              <h2>Скидки</h2>
              <table>
                <thead>
                  <tr><th>Название</th><th>Скидка</th><th>Мин. дней</th><th>Действия</th></tr>
                </thead>
                <tbody>
                  <tr><td>Недельная аренда</td><td>15%</td><td>7 дней</td><td><button className="action-btn action-edit">Ред.</button><button className="action-btn action-delete">Удал.</button></td></tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
