
$(document).ready(function () {
    // $.getJSON("https://pws-translate.dvlpsite.com/beaverwp/wp-json/wc/v3/products", function( data ) {
    //     console.log(data)
    // dataPopulator(data.data.tools)
    // });
    jQuery.ajax({
        type: 'GET',
        url: 'https://pws-translate.dvlpsite.com/beaverwp/wp-json/wc/v3/products',
        cache: false,
        beforeSend: function(jqXHR, settings) {
        },
        headers: {"Authorization": "Basic " + btoa("ck_bd6fbe3aa68470c259dab31cefaabd8c3f7af2fa" + ":" + "cs_2760377bf8b230b0be765054782e7906be7787e1") },
        success: function(data) {
            console.log(data);
        }
      });


      jQuery.ajax({
        type: 'POST',
        url: 'https://pws-translate.dvlpsite.com/beaverwp/wp-json/wc/v3/products/841',
        cache: false,
        data : {
            name:"Hey How are you ?",
            sale_price:"58"
        },
        beforeSend: function(_jqXHR, settings) {
        },
        headers: {"Authorization": "Basic " + btoa("ck_bd6fbe3aa68470c259dab31cefaabd8c3f7af2fa" + ":" + "cs_2760377bf8b230b0be765054782e7906be7787e1") },
        success: function(data) {
            console.log(data);
        }
      });

});

// function dataPopulator(data){
//     $.each(data, function (index, value) { 
//          console.log(index)
//         var features = [];
//         $.each(value.features, function (featureIndex, featureValue) { 
//             features[featureIndex] = featureValue;
//         });
//         cardInnerHtml = cardPopulator(value.image,features,value.name,value.published_in)
//         $("#data-container").append(cardInnerHtml);
//     });
// }

// function cardPopulator(image,features,name,date_of_publish){
//     var cardHtml = `
//     <div class="col">
//         <div class="card">
//             <img src="`+image+`" class="card-img-top" alt="...">
//             <div class="card-body">
//                 <span class="card-title">Features</span>
//             </div>
//             <ul class="list-group list-group-flush">`;
//     $.each(features, function (featureIndex, featureValue) { 
//         cardHtml+= `
//                 <li class="list-group-item">`+featureValue+`</li>`;
//     });
//         cardHtml+= `
//             </ul>
//             <div class="row card-body align-items-center">
//                 <div class="col-10 ">
//                     <h5 class="card-title">`+name+`</h5>
//                     <p class="card-text">`+date_of_publish+`</p>
//                 </div>
//                 <div class="col-2 rounded-circle modal-opener text-center">
//                     <i class="fa-solid fa-arrow-right"></i>
//                 </div>
//             </div>
//         </div>`;
//   return cardHtml;
// }