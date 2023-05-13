document.addEventListener("DOMContentLoaded", function () {

    document.getElementById('main-action-button').onclick = function () {
        document.getElementById('products').scrollIntoView({ behavior: "smooth" });
    }

    let nav_links = document.querySelectorAll('.menu-item a');
    nav_links.forEach((e) => {
        e.onclick = function () {
            let section = e.dataset.link;

            document.getElementById(section).scrollIntoView({ behavior: "smooth" });
        }
    })

    let buttons = document.querySelectorAll('.product-button'); 
    for (let button of buttons) {
        button.onclick = function () {
            document.getElementById('order').scrollIntoView({ behavior: "smooth" });
        }
    }
    
    let form_inputs = document.querySelectorAll('input[name]');
    document.getElementById('order-action').onclick = function () {
        let hasError = false;

        form_inputs.forEach((e) => {
            if (!e.value) {
                e.parentElement.style.background = "red";

                hasError = true;
            } else {
                e.parentElement.style.background = "";
            }
        });

        if (!hasError) {
            form_inputs.forEach((e) => {
                e.value = "";
            }); 
            alert("Спасибо за заказ! Мы скоро свяжемся с вами.");   
        }
    }

    document.getElementById('change-currency').onclick = function (e) {
        let current_currency = e.target.innerText;

        let new_currency = "$";
        let coefficient = 1;

        if (current_currency === "$") {
            new_currency = "₽";
            coefficient = 80;
        } else if (current_currency === "₽") {
            new_currency = "BYN";
            coefficient = 3;
        } else if (current_currency === 'BYN') {
            new_currency  = '€';
            coefficient = 0.9;
        } else if (current_currency === '€') {
            new_currency  = '¥';
            coefficient = 6.9;
        }

        e.target.innerText = new_currency;

        document.querySelectorAll('.products-item-price').forEach((e) => {
            let base_price = e.getAttribute("data-base-price");
            let calc_price = (base_price * coefficient).toFixed(1);
            
            e.innerHTML = calc_price + "&nbsp;" + new_currency;
        })
    }
})