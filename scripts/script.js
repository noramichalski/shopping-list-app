"use strict";

const input = document.getElementById("itemInput");
const shoppingList = document.getElementById("shoppingList");

// load saved items or default to empty
let shoppingItems = JSON.parse(localStorage.getItem("shoppingItems")) || [];

// save items to localStorage
function saveItems() {
  localStorage.setItem("shoppingItems", JSON.stringify(shoppingItems));
}

// render current list
function renderItems() {
  // safely empty list before rendering the up-to-date list
  shoppingList.replaceChildren();

  // build the list
  shoppingItems.forEach((item, index) => {
    const li = document.createElement("li");

    // add strikethrough style if item is market as completed
    if (item.done) li.classList.add("completed");

    // create list item label
    const itemLabel = document.createElement("span");
    itemLabel.textContent = item.text;
    itemLabel.style.cursor = "pointer";
    itemLabel.addEventListener("click", () => toggleDone(index));

    // create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    deleteButton.className = "delete";
    deleteButton.addEventListener("click", () => deleteItem(index));

    // add label and delete button to list items
    li.appendChild(itemLabel);
    li.appendChild(deleteButton);

    // add list item to list
    shoppingList.appendChild(li);
  });
}

// add new item to shopping list
function addItem() {
  // clean up extra whitespace
  const value = input.value.trim();

  // add item to current list
  if (value) {
    shoppingItems.push({ text: value, done: false });
    // reset input field
    input.value = "";
    // update list in localStorage
    saveItems();
    // render updated list based on localStorage
    renderItems();
  }
}

// toggle completed state
function toggleDone(index) {
  // toggle "done" status/property on item object
  shoppingItems[index].done = !shoppingItems[index].done;
  // update list in localStorage
  saveItems();
  // render updated list
  renderItems();
}

// delete item
function deleteItem(index) {
  shoppingItems.splice(index, 1);
  // update list in localStorage
  saveItems();
  // render updated list
  renderItems();
}

// add item on "return" keypress
input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addItem();
  }
});

// initial list render
renderItems();
