
$(document).ready(function () {
    $.getJSON("https://openapi.programming-hero.com/api/ai/tools", function( data ) {
    dataPopulator(data.data.tools)
    });
});

function dataPopulator(data){
    $.each(data, function (index, value) { 
         console.log(index)
        var features = [];
        $.each(value.features, function (featureIndex, featureValue) { 
            features[featureIndex] = featureValue;
        });
        cardInnerHtml = cardPopulator(value.image,features,value.name,value.published_in)
        $("#data-container").append(cardInnerHtml);
    });
}

function cardPopulator(image,features,name,date_of_publish){
    var cardHtml = `
    <div class="col">
        <div class="card">
            <img src="`+image+`" class="card-img-top" alt="...">
            <div class="card-body">
                <span class="card-title">Features</span>
            </div>
            <ul class="list-group list-group-flush">`;
    $.each(features, function (featureIndex, featureValue) { 
        cardHtml+= `
                <li class="list-group-item">`+featureValue+`</li>`;
    });
        cardHtml+= `
            </ul>
            <div class="row card-body align-items-center">
                <div class="col-10 ">
                    <h5 class="card-title">`+name+`</h5>
                    <p class="card-text">`+date_of_publish+`</p>
                </div>
                <div class="col-2 rounded-circle modal-opener text-center">
                    <i class="fa-solid fa-arrow-right"></i>
                </div>
            </div>
        </div>`;
  return cardHtml;
}