var myArray = []
let url = 'https://api.jikan.moe/v3'


function search(query) {
    $.ajax({
        method:'GET',
        url:`${url}/search/anime?q=${query}`,
        success:function (response) {
            myArray = response
            buildTable(myArray)
            console.log(myArray)
        }
    })
}

function buildTable(data){
    var animeList = document.getElementById('myAnimeList')
    animeList.querySelector('.row').innerHTML = ''

    for (var i = 0; i < Object.keys(data.results).length; i++){
        if (!(data.results[i].rated == 'Rx'||  data.results[i].rated == 'R+')) {

            var anime = `
                            <div class="col anime rounded">
                                    <a href=${data.results[i].url}><img class='rounded' src =${data.results[i].image_url}/></a>
                                    <h4>${data.results[i].title}</h4>
                                    <div class="row rounded" id='anime-stats'>
                                        <div class="col">
                                        ${data.results[i].type} (${data.results[i].episodes} eps)
                                        </div>
                                        <div class="col">
                                        ${(data.results[i].start_date != null) ? data.results[i].start_date.split('').slice(0, 4).join("") : ''}
                                        </div>
                                        <div class="col">
                                        ${data.results[i].score}
                                        </div>
                                    </div>
                                    <p>${data.results[i].synopsis}</p>
                                    <a href='https://www12.9anime.to/search?keyword=${data.results[i].title}' class="btn btn-primary">watch</a>
                            </div>
                        `
            animeList.querySelector('.row').innerHTML += anime
        }
    }
}


// Execute a function when the user releases a key on the keyboard
document.getElementById('search').addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      document.getElementById("search-button").click();
    }
  });