document.addEventListener("DOMContentLoaded", function () {
    fetch('/menu.json')
        .then(response => response.json())
        .then(data => {
            const menuDiv = document.getElementById("menu");
            menuDiv.innerHTML = `<h2>Menu for ${data.restaurant}</h2>`;
            
            data.items.forEach(item => {
                const menuItemDiv = document.createElement("div");
                menuItemDiv.className = "menu-item";
                
                const img = document.createElement("img");
                img.src = item.image;
                img.alt = item.name;
                
                const itemDetailsDiv = document.createElement("div");
                itemDetailsDiv.innerHTML = `<strong>${item.name}</strong><br>Price: ${item.price}`;
                
                menuItemDiv.appendChild(img);
                menuItemDiv.appendChild(itemDetailsDiv);
                menuDiv.appendChild(menuItemDiv);
            });
        })
        .catch(error => console.error('Error fetching the menu:', error));
});
