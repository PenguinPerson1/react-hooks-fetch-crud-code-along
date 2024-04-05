import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:4000/items")
    .then(r=>r.json())
    .then(items => setItems(items))
  },[])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }
  function addItem(newItem) {
    setItems([...items,newItem])
  }
  function updateItem(updatedItem) {
    setItems(items.map(item => {
      if(item.id === updatedItem.id){
        return updatedItem
      }
      return item
    }))
  }
  function deleteItem(removedItemId){
    setItems(items.filter(item => {
      return item.id !== removedItemId
    }))
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm addItem={addItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} updateItem={updateItem} deleteItem={deleteItem} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
