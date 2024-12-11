import React, { useState, useEffect } from 'react';

const ShoppingList = () => {

  const [products, setProducts] = useState([]); //тут мы храним что у нас уже есть в нашем shoppinglist
  const [inputValue, setInputValue] = useState(''); //тут мы храним что пользователь вводит
  const [editIndex, setEditIndex] = useState(null);//а тут мы отслеживаем с каким продуктом из спика


  useEffect(() => {
    /**
     * Эта функция отвечает за парсинг данных из нашего localStorage, который
     * записывает всё в json, если там есть что-то мы выгружаем это и показываем пользователю
     */
    const storedProducts = JSON.parse(localStorage.getItem('shoppingList'));
    if (storedProducts) {
      setProducts(storedProducts);
    }
  }, []);


  useEffect(() => {
    /**
     * Эта функция отвечает за внесение новых продуктов в наш шоппинг лист
     */
    localStorage.setItem('shoppingList', JSON.stringify(products));
  }, [products]);

  const handleInputChange = (e) => {
    /**
     * Тут мы просто отслеживаем что вводит пользователь чтобы в любой момент обработать
     */
    setInputValue(e.target.value);
  };

  const handleAddProduct = () => {
    if (inputValue.trim() === '') return;

    if (editIndex !== null) {
      const updatedProducts = products.map((product, index) =>
        index === editIndex ? inputValue : product
      );
      setProducts(updatedProducts);
      setEditIndex(null);
    } else {
      setProducts([...products, inputValue]);
    }

    setInputValue('');
  };

  const handleEditProduct = (index) => {
    setInputValue(products[index]);
    setEditIndex(index);
  };

  const handleDeleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  return (
    <div>
      <h1>Shopping List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Add a product"
      />
      <button onClick={handleAddProduct}>
        {editIndex !== null ? 'Update Product' : 'Add Product'}
      </button>
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product}
            <button onClick={() => handleEditProduct(index)}>Edit</button>
            <button onClick={() => handleDeleteProduct(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShoppingList;