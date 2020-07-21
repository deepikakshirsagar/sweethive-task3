(function() {

    var elem = document.querySelector('#images-section');
    var msnry = new Masonry( elem, {
    // options
    itemSelector: '.grid-item',
    columnWidth: 200
    });

    // element argument can be a selector string
    //   for an individual element
    var msnry = new Masonry( '#images-section', {
    // options
    });

    
    function loadImages(city) {
        var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=83f5c38d8918bc20e9298c812fbd9314&tags='+city+'&per_page=10&format=json&nojsoncallback=1';

        var http = new XMLHttpRequest();
    
        http.open("GET", apiurl, true);
        http.setRequestHeader('Access-Control-Allow-Origin', '*');
        http.responseType = 'json';
        http.send();

        http.onreadystatechange = function() {
            if (http.readyState == XMLHttpRequest.DONE) {   // XMLHttpRequest.DONE == 4
               if (http.status == 200) {
                   console.log(http.response)
                   var data = JSON.parse(http.responseText);
                //    document.getElementById("images-section").innerHTML = http.responseText;
               }
               else if (http.status == 400) {
                  alert('There was an error 400');
               }
               else {
                   alert('something else other than 200 was returned');
               }
            }
        };
    }

    function fetchImages(city) {
        var apiurl = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=83f5c38d8918bc20e9298c812fbd9314&tags='+city+'&per_page=10&format=json&nojsoncallback=1';
        fetch(apiurl).then(res => res.json()).then(data =>  {
            
            data.photos.photo.forEach(photo => {
                var getPhoto = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=83f5c38d8918bc20e9298c812fbd9314&photo_id="+photo.id+"&format=json&nojsoncallback=1";

                fetch(getPhoto).then( response => response.json()).then(data => {
                    console.log(data)
                    data.sizes.size.forEach(img => {
                        if(img.label == "Original") {
                            var node = document.createElement('img');
                            node.setAttribute('src', img.source);
                            elem.appendChild(node)
                        }
                        loader[0].classList.remove('show');
                        loader[0].classList.add('hide');
                    })
                    
                })


                
            });
        })
    }

    

    var buttons = document.getElementsByTagName('button');
    var loader = document.getElementsByClassName('spinner');
    for (var i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', event => {
            elem.innerHTML = '';
            console.log(event.target.textContent);
            loader[0].classList.remove('hide');
            loader[0].classList.add('show');
            fetchImages(event.target.textContent)
        });
      }
})()