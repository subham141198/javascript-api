// fetch all data from api
const fetchAllCatagories = () => {
    fetch('https://openapi.programming-hero.com/api/ai/tools')
      .then(res => res.json())
      // .then(data=>console.log(data.data.tools))
      .then((data) => showAllData(data.data.tools));
  };

  
  
  //    show Data
    const showAllData = newss => {
    // show More button 
    const showMore = document.getElementById('show-more')
    // slice data to show only 6 card and all data using show more button
    var nofNewsToShow = newss.slice(0, 6);
    cardShow(nofNewsToShow);
    var elements = document.getElementsByClassName("moder-trigger");
    classAdder(elements)
    showMore.classList.remove('d-none');
    showMore.addEventListener('click', function () {
      nofNewsToShow = newss.slice(6, 13);
      cardShow(nofNewsToShow);
      var elements = document.getElementsByClassName("moder-trigger");
      classAdder(elements);
      showMore.classList.add('d-none');
    })
    var sortByDate = document.getElementById("sort-by-date");
    sortByDate.addEventListener("click", function(){
        sortCard();
    });
  }
  function sortCard(){
    var div = document.querySelector('#data-container');
    var  card = div.querySelectorAll('[data-date]');
    var cardArr = [].slice.call(card).sort(function (a, b) {
        return (new Date(a.dataset.date))-(new Date(b.dataset.date))
    });
    cardArr.forEach(function (p) {
        div.appendChild(p);
    });
  }
  // show data on card dynamically
  function cardShow(newss) {
    const newsContainer = document.getElementById('data-container');
    newss.forEach(news => {
      const newsDiv = document.createElement('div');
      newsDiv.classList.add('col')
      var cardInnerHtml = `
            <div class="card" data-date="${news.published_in}">
            <img src="${news.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title">Features</h5>
              <ol class="list-group list-group-numbered mt-3">
            `;
      for (let i = 0; i < news.features.length; i++) {
        cardInnerHtml = cardInnerHtml + `<li class="list-group-item border-0 p-0">${news.features[i]}</li>`
      }
      cardInnerHtml = cardInnerHtml + ` </ol> <hr>
            <h3>${news.name} </h3>
            <i class=" fa fa-light fa-calendar me-1"></i>${news.published_in}</span>
    
            <div class="position-absolute bottom-0 end-0 ">
            <i class="fas fa-arrow-right  moder-trigger"  data-bs-toggle="modal"
            data-bs-target="#newsDetails" data-id="${news.id}"></i>
            </div>
            </div>
            </div>
          </div>`;
      newsDiv.innerHTML = cardInnerHtml;
      newsContainer.appendChild(newsDiv)
      return newsDiv;
    });
    
  }


  function classAdder(elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].addEventListener('click', myFunction);
    }
  }
  //   show modal by click arrow icon
  var myFunction = function () {
    var attribute = this.getAttribute("data-id");
    const url = 'https://openapi.programming-hero.com/api/ai/tool/' + attribute;
  
    fetch(url)
      .then(res => res.json())
      .then((data) => showModalData(data.data));
  };
  // for getting the id of modal
  const showModalData = infoDetails => {
    modalPopulator(infoDetails);
  }
  //  description and pricing part 
  function modalPopulator(info) {
    const modalBody = document.getElementById("modal-body")
    var modalInnerHtml = `<div class="row flex-nowrap">
                            <div class="col-6 description me-3">
                              <div class="row">
                                <div class="col-12 heading">
                                   <p>${info.description}</p>
                                </div>
                              </div>
                            <div class="row">`;
    if (!info.pricing) {
      modalInnerHtml = modalInnerHtml + `<div class="col-12 text-center">Its Free</div>`;
    }
    else {
      for (let price in info.pricing) {
        modalInnerHtml = modalInnerHtml + `<div class="col-4 price">
                                              <p class="m-0">${info.pricing[price].price}</p>
                                              <p class="m-0">${info.pricing[price].plan}</p>
                                            </div>`;
      }
    }
    //   features part
    modalInnerHtml = modalInnerHtml + `</div >
                                        <div class="col-12 features">
                                          <div class="row">
                                            <div class="col-6">
                                              <h5 class="card-title">Features</h5>
                                              <ol class="list-group list-group-numbered mt-3">`;
    for (let features in info.features) {
      modalInnerHtml = modalInnerHtml + `<li class=" border-0 p-0">${info.features[features].feature_name}</li>`;
    }
    modalInnerHtml = modalInnerHtml + ` </ol> 
                                      </div>
                                      <div class="col-6">
                                        <h5 class="card-title"> Integrations </h5>
                                        <ol class="list-group list-group-numbered mt-3">`;
    if (!info.integrations) {
      modalInnerHtml = modalInnerHtml + `Nothing to show`;
    }
    else {
      for (let integration in info.integrations) {
        modalInnerHtml = modalInnerHtml + `<li class="border-0 p-0">${info.integrations[integration]}</li>`;
      }
    }
    //   image part
    modalInnerHtml = modalInnerHtml + `</ol>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="col-6 banner position-relative">
                                <div class="row">
                                  <div class="col-12 ">
                                    <img src="${info.image_link[0]}" class="img-fluid">
                                  </div> 
                                  <div class="col-12 acc-scr position-absolute top-0 text-white"> 
                                      <span class=" bg-danger">${info.accuracy.score * 100}% accuracy</span>
                                  </div>
                                  <div class="col-12 text-center mt-3">`;
    if (!info.input_output_examples) {
      modalInnerHtml = modalInnerHtml + `Nothing to show`;
    }
    //   input output part
    else {
      for (let i = 0; i < info.input_output_examples.length - 1; i++) {
        modalInnerHtml = modalInnerHtml + `<h3 class="text-center">${info.input_output_examples[i].input}</h3>
                                            <p class="text-center">${info.input_output_examples[i].output}</p>`;
      }
    }
    modalInnerHtml = modalInnerHtml + `</div>  
                                      </div>  
                                    </div>  
                                  </div>  
                                </div>
                              </div >`;
    modalBody.innerHTML = modalInnerHtml;
  }
  