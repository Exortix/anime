var myArray = []
let url = 'https://api.jikan.moe/v3'

$('#filter').change( () => {
    switch ($('#filter').val()) {
        case '1':
            window.document.title='Anime'
            $('#title').html(`My<strong>Anime</strong>ListSearch`)
            break;
        case '2':
            window.document.title='Manga'
            $('#title').html(`My<strong>Manga</strong>ListSearch`)
            break;
    }
});

function search(query) {
    switch ($('#filter').val()) {
        case '1':
            $.ajax({
                method:'GET',
                url:`${url}/search/anime?q=${query}`,
                success:function (response) {
                    myArray = response
                    buildAnime(myArray)
                }
            })           
            break;
        case '2':
            $.ajax({
                method:'GET',
                url:`${url}/search/manga?q=${query}&page=1`,
                success:function (response) {
                    myArray = response.results
                    $.ajax({
                        method:'GET',
                        url:`${url}/search/manga?q=${query}&page=1&genre=9`,
                        success:function (response) {
                            myArray = _(myArray) 
                            .differenceBy(response.results, 'mal_id', 'url', 'image_url', 'synopsis', 'type', 'volumes', 'title', 'score', 'start_date')
                            .map(_.partial(_.pick, _, 'mal_id', 'url', 'image_url', 'synopsis', 'type', 'volumes', 'title', 'score', 'start_date'))
                            .value();
                            $.ajax({
                                method:'GET',
                                url:`${url}/search/manga?q=${query}&page=1&genre=12`,
                                success:function (response) {
                                    myArray = _(myArray) 
                                    .differenceBy(response.results, 'mal_id', 'url', 'image_url', 'synopsis', 'type', 'volumes', 'title', 'score', 'start_date')
                                    .map(_.partial(_.pick, _, 'mal_id', 'url', 'image_url', 'synopsis', 'type', 'volumes', 'title', 'score', 'start_date'))
                                    .value();
                                    $.ajax({
                                        method:'GET',
                                        url:`${url}/search/manga?q=${query}&page=1&genre=33`,
                                        success:function (response) {
                                            myArray = _(myArray) 
                                            .differenceBy(response.results, 'mal_id', 'url', 'image_url', 'synopsis', 'type', 'volumes', 'title', 'score', 'start_date')
                                            .map(_.partial(_.pick, _, 'mal_id', 'url', 'image_url', 'synopsis', 'type', 'volumes', 'title', 'score', 'start_date'))
                                            .value();
                                            $.ajax({
                                                method:'GET',
                                                url:`${url}/search/manga?q=${query}&page=1&genre=34`,
                                                success:function (response) {
                                                    myArray = _(myArray) 
                                                    .differenceBy(response.results, 'mal_id', 'url', 'image_url', 'synopsis', 'type', 'volumes', 'title', 'score', 'start_date')
                                                    .map(_.partial(_.pick, _, 'mal_id', 'url', 'image_url', 'synopsis', 'type', 'volumes', 'title', 'score', 'start_date'))
                                                    .value();
                                                },
                                                complete:function () {
                                                    buildManga(myArray)
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    }) 
                }
            }) 
            break;
        default:
            break;
    }
}

function buildAnime(data){
    var animeList = document.getElementById('myAnimeList')
    animeList.querySelector('.row').innerHTML = ''

    for (var i = 0; i < Object.keys(data.results).length; i++){
        if (!(data.results[i].rated == 'Rx'||  data.results[i].rated == 'R+')) {

            var anime = `
                            <div class="col anime rounded">
                                    <a href=${data.results[i].url} target="_blank"><img class='rounded' src =${data.results[i].image_url}/></a>
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
                                    <a href=${data.results[i].url} target="_blank" class="btn btn-primary">read more</a>
                            </div>
                        `
            animeList.querySelector('.row').innerHTML += anime
        }
    }
}

function buildManga(data){
    var mangaList = document.getElementById('myAnimeList')
    mangaList.querySelector('.row').innerHTML = ''

    for (var i = 0; i < Object.keys(data).length; i++){
        if (!(data[i].type == 'Doujinshi')) {
            var manga = `
                            <div class="col anime rounded">
                                    <a href=${data[i].url} target="_blank"><img class='rounded' src =${data[i].image_url}/></a>
                                    <h4>${data[i].title}</h4>
                                    <div class="row rounded" id='anime-stats'>
                                        <div class="col">
                                        ${data[i].type}
                                        </div>
                                        <div class="col">
                                        ${(data[i].start_date != null) ? data[i].start_date.split('').slice(0, 4).join("") : ''}
                                        </div>
                                        <div class="col">
                                        ${data[i].score}
                                        </div>
                                    </div>
                                    <p>${data[i].synopsis}</p>
                                    <a href=${data[i].url} target="_blank" class="btn btn-primary">read more</a>
                            </div>
                        `
            mangaList.querySelector('.row').innerHTML += manga
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