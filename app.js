// Storage Controller

// Item Controller
const ItemCtrl = (function() {
    // Item Constructor
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }
    // Data Struction - State
    const data = {
        items: [
            // { id:0, name: 'Steak Dinner', calories: 1200 },
            // { id:1, name: 'Cookie', calories: 400 },
            // { id:2, name: 'Eggs', calories: 200 }
        ],
        currentItem: null,
        totalCalories: 0
    }

    // Public methods
    return {
        getItems: function() {
            return data.items;
        },
        addItem: function(name, calories) {
            let ID;
            // Create ID
            if(data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Calories to number
            calories = parseInt(calories);

            // Create new Item
            newItem = new Item(ID, name, calories)

            // Add to items array
            data.items.push(newItem);

            return newItem;
        },
        getTotalAmount: function() {
            let total = 0;

            // Loop through items and add cals
            data.items.forEach((item) => {
                total += item.calories;
            });

            // Set total calories in data structure
            data.totalCalories = total;

            // Return total
            return data.totalCalories;
        },
        logData: function () {
            return data
        }
    }
})();


// UI Controller
const UICtrl = (function() {
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemNameInput: '#item-name',
        itemCaloriesInput: '#item-calories',
        totalAmount: '.total-amount' 
    }
    // Public methods
    return {
        populateItemList: function(items) {
            let html = '';

            items.forEach(function(item) {
                html += `<li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item far fa-edit"></i>
                </a>
            </li>`;
            });
            // Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getItemInput: function(){
            return {
                name: document.querySelector(UISelectors.itemNameInput).value,
                calories: document.querySelector(UISelectors.itemCaloriesInput).value,
            }
        },
        addListItem: function(item){
            // Show the list
            document.querySelector(UISelectors.itemList).style.display = 'block';

            // Create li element
            const li = document.createElement('li');
            // Add class
            li.className = 'collection-item';
            // Add ID
            li.id = `item-${item.id}`;
            // Add HTML
            li.innerHTML = `<strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item far fa-edit"></i>
                </a>`;
                // Insert item
                document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend', li);
        },
        clearInput: function() {
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        hideList: function() {
            document.querySelector(UISelectors.itemList).style.display = 'none';
        },
        showTotalAmount: function(totalAmount){
            document.querySelector(UISelectors.totalAmount).textContent = totalAmount;
        },
        getSelectors: function() {
            return UISelectors;
        }
    }
})();


// App Controller

const App = (function(ItemCtrl, UICtrl) {
    // Load even listeners

    const loadEventListeners = function() {
        // Get UI Selectors
        const UISelectors = UICtrl.getSelectors();

        // Add item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);
    }

    // Add item submit
    const itemAddSubmit = (e) => {
        // Get form input from UI Controller
        const input = UICtrl.getItemInput();

        // Check for name and calorie input
        if(input.name !== '' && input.calories !== '') {
            // Add item
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            // Add item to UI list
            UICtrl.addListItem(newItem);

            // Get total amount
            const totalAmount = ItemCtrl.getTotalAmount();

            // Add total amount to UI
            UICtrl.showTotalAmount(totalAmount)

            // Clear input
            UICtrl.clearInput();
        }

        e.preventDefault();
    }

    // Public methods
    return {
        init: function() {
            // Fetch items from data strucure
            const items = ItemCtrl.getItems();

            // Check if any items
            if(items.length === 0) {
                UICtrl.hideList();
            } else {
                // Populate list with items
                UICtrl.populateItemList(items)
            }

            // Get total calories
            const totalAmount = ItemCtrl.getTotalAmount();

            // Add total amount to UI
            UICtrl.showTotalAmount(totalAmount)

            // Load event listeners
            loadEventListeners();
        }
    }
})(ItemCtrl, UICtrl);


// Initialize App
App.init();