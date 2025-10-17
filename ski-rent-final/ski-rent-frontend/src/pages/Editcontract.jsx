import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style.css';

export default function Editcontract() {
  const navigate = useNavigate();
  const [contract, setContract] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('currentContract');
    if (stored) setContract(JSON.parse(stored));
  }, []);

  const products = [
    { name: "Горные лыжи Rossignol", cat: "Активен", size: "170см", price: "1500 ₽", stock: "14" },
    { name: "Сноуборд Burton", cat: "Ожидает", size: "158см", price: "2000 ₽", stock: "10" },
    { name: "Шлем POC", cat: "Ожидает", size: "L", price: "400 ₽", stock: "25" },
  ];

  const handleSelectProduct = (product) => {
    setSelectedProducts(prev =>
      prev.includes(product)
        ? prev.filter(p => p !== product)
        : [...prev, product]
    );
  };

  const handleSave = () => {
    const allContracts = JSON.parse(localStorage.getItem('contracts') || '[]');
    if (contract) {
      const updatedContract = { ...contract, products: selectedProducts };
      allContracts.push(updatedContract);
      localStorage.setItem('contracts', JSON.stringify(allContracts));
      localStorage.removeItem('currentContract');
    }
    alert('Договор сохранён ✅');
    navigate('/infomenu');
  };

  return (
    <div className="page">
      <div className="bg-wrap"><canvas id="bgCanvas"></canvas></div>

      <div className="modal-overlay">
        <div className="modal">
          <button className="close-btn" onClick={() => navigate('/setting')}>×</button>
          <h2>Редактирование черновика</h2>

          {contract ? (
            <>
              <p><strong>Клиент:</strong> {contract.client}</p>
              <p><strong>Телефон:</strong> {contract.phone}</p>
              <p><strong>Период аренды:</strong> {contract.start} — {contract.end}</p>
              <hr style={{ borderColor: '#333', margin: '10px 0 20px' }} />

              <table className="edit-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Товар</th>
                    <th>Категория</th>
                    <th>Размер</th>
                    <th>Цена/день</th>
                    <th>Доступно</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p, i) => (
                    <tr key={i}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(p)}
                          onChange={() => handleSelectProduct(p)}
                        />
                      </td>
                      <td>{p.name}</td>
                      <td>{p.cat}</td>
                      <td>{p.size}</td>
                      <td>{p.price}</td>
                      <td>{p.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <br />
              <button className="btn primary" onClick={handleSave}>Сохранить договор</button>
            </>
          ) : (
            <p>Загрузка данных договора...</p>
          )}
        </div>
      </div>
    </div>
  );
}