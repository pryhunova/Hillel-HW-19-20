import { v4 as uuidv4 } from "uuid";

class ShoppingList {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.maxAmount = 4;
    this.list = [];
    this.id = uuidv4;
  }

  addItem(title, amount, unit) {
    if (this.list.length > this.maxAmount) {
      throw new Error(`Превысили допустимое количество.`);
    }

    if (!title) {
      throw new Error(`Заполните название продукта.`);
    }

    if (!amount) {
      throw new Error(`Заполните количество в продукте ${title}`);
    }

    if (!unit) {
      throw new Error(`Укажите единицу измерения в продукте ${title}`);
    }

    this.list.push(new ShoppingListItem(id, title, amount, unit));
  }

  removeItem(id) {
    if (!this.list.find((elem) => elem.id === +id)) {
      throw new Error(`Нет элемента с id №${id}...`);
    }

    this.list = this.list.filter((elem) => elem.id !== +id);
  }
}

class ShoppingListItem {
  constructor(title, amount, unit) {
    this.id = itemId;
    this.title = title;
    this.amount = amount;
    this.unit = unit;
  }
}

const newShoppingList = new ShoppingList("Список покупок", "Наташа Прыгунова");

function makeNewShoppingList() {
  try {
    newShoppingList.addItem("Кефир", "1", "л");
    newShoppingList.addItem("Икра консерва", "1", "шт");
    newShoppingList.addItem("Банан", "1", "кг");
    newShoppingList.addItem("Мясо", "0,5", "кг");
    newShoppingList.addItem("Молоко", "1", "л");
  } catch (error) {
    console.log(error);
  }

  try {
    newShoppingList.removeItem("4");
  } catch (error) {
    console.log(error);
  }
  try {
    newShoppingList.addItem("", "1", "кг");
  } catch (error) {
    console.log(error);
  } finally {
    console.log(newShoppingList.list);
  }
}

// function shoppingListMarkup() {
//   const wrapperEL = document.querySelector(".wrapper");

//   for (const item of newShoppingList.list) {
//     const createItemEl = document.createElement("p");
//     wrapperEL.appendChild(createItemEl);
//     createItemEl.innerText = `${item.title}, количество = ${item.amount}, ${item.unit}`;
//   }
// }

makeNewShoppingList();
