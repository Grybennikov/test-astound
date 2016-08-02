function initClickOnProduct() {
    var product = $(".product-wrapper");
    var close_btn = $(".close-wrapper");
    var black_cover = $(".black-cover");
    product.on("click", function() {
        openPopup($(this).data().id);
    });
    close_btn.on("click", function(){
    	black_cover.fadeOut(300);
    });
}

function openPopup(product_id) {
    console.log(product_id); //Need for ajax request to server with id of product
    var black_cover = $(".black-cover");
    var popup = $(".product-popup");
    console.log("Call AJAX");
    $.ajax({
        url: "response.json",
        method: "GET",
        success: function(data) {
            console.log("SUCCESS!");
            black_cover.fadeIn(300);
        }
    });
     black_cover.fadeIn(300);
}

$(document).ready(function() {
    initClickOnProduct();
});
