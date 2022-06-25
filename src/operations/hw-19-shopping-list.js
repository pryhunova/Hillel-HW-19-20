import { v4 as uuidv4 } from "uuid";

class ShoppingListItem {
  constructor(title, amount, measurment) {
    this.id = uuidv4();
    this.title = title;
    this.amount = amount;
    this.measurment = measurment;
  }
}

class ShoppingList {
  constructor(listName, author, maxAmount) {
    this.id = uuidv4();
    this.listName = listName;
    this.author = author;
    this.maxAmount = maxAmount;
    this.items = [];
  }

  addItem(itemConfig) {
    if (this.items.length >= this.maxAmount) {
      throw new Error(`Превысили допустимое количество.`);
    }
    if (!itemConfig.title) {
      throw new Error(`Заполните название продукта.`);
    }
    if (!itemConfig.amount) {
      throw new Error(`Заполните количество в продукте ${itemConfig.title}`);
    }
    if (!itemConfig.measurment) {
      throw new Error(
        `Укажите единицу измерения в продукте ${itemConfig.title}`
      );
    }

    this.items.push(
      new ShoppingListItem(
        itemConfig.title,
        itemConfig.amount,
        itemConfig.measurment,
        itemConfig.id
      )
    );
  }

  removeItem(title) {
    if (!this.items.find((elem) => elem.title === title)) {
      throw new Error(`Товар ${title} не найден`);
    }

    this.items = this.items.filter((elem) => elem.title !== title);
  }

  [Symbol.iterator]() {
    let count = 0;
    return {
      next: () => {
        let value = this.items[count++];
        return { value, done: !value };
      },
    };
  }
}

function shoppingListMarkup(item) {
  const wrapperEL = document.querySelector(".wrapper");
  const createItemEl = document.createElement("p");
  createItemEl.innerText = `${item.title}, количество = ${item.amount} ${item.measurment}. Id объекта: ${item.id}.`;
  wrapperEL.appendChild(createItemEl);
}

function errorMarkup(error) {
  const wrapperEL = document.querySelector(".wrapper");
  const createItemEl = document.createElement("p");
  createItemEl.innerText = error.message;
  wrapperEL.appendChild(createItemEl);
}

const newShoppingList = {
  listName: "Список покупок",
  author: "Ната",
  maxAmount: "5",
  items: [
    { title: "Морковь", amount: 500, measurment: "гр" },
    { title: "Кефир", amount: 1, measurment: "л" },
    { title: "Мясо", amount: 1, measurment: "кг" },
    { title: "Молоко", measurment: "л" },
    { title: "Чай", amount: 100, measurment: "гр" },
    { title: "Яйца", amount: 10, measurment: "шт" },
    { title: "", amount: 1, measurment: "шт" },
  ],
};

function makeNewShoppingList(newShoppingList) {
  let testList;
  try {
    testList = new ShoppingList(
      newShoppingList.listName,
      newShoppingList.author,
      newShoppingList.maxAmount
    );
  } catch (error) {
    errorMarkup(error);
  }

  for (let item of newShoppingList.items) {
    try {
      testList.addItem(item);
      shoppingListMarkup(testList.items[testList.items.length - 1]);
    } catch (error) {
      errorMarkup(error);
    }
  }
}

function iterationShoppingList() {
  let list = new ShoppingList("Список покупок 2", "я", 4);
  list.addItem({ title: "Яйца", amount: 10, measurment: "шт" });
  list.addItem({ title: "Молоко", amount: 1, measurment: "л" });
  list.addItem({ title: "Кефир", amount: 1, measurment: "л" });

  for (const item of list) {
    console.log(item);
  }
}

makeNewShoppingList(newShoppingList);
iterationShoppingList();
