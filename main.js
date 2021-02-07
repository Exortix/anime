var myArray = []
let url = 'https://api.jikan.moe/v3'

$( document ).ready(function() {
    switch ($('#filter').val()) {
        case '1':
            window.document.title='Anime'
            $('#title').html(`My<strong>Anime</strong>ListSearch`)
            $.ajax({
                method:'GET',
                url:`${url}/top/anime`,
                success:function (response) {
                    myArray = response.top
                },
                complete:function () {
                    buildAnime(myArray)
                }
            }) 
            break;
        case '2':
            window.document.title='Manga'
            $('#title').html(`My<strong>Manga</strong>ListSearch`)
            window.document.title='Anime'
            $('#title').html(`My<strong>Anime</strong>ListSearch`)
            $.ajax({
                method:'GET',
                url:`${url}/top/manga`,
                success:function (response) {
                    myArray = response.top
                },
                complete:function () {
                    buildAnime(myArray)
                }
            }) 
            break;
    }
});

$('#filter').change( () => {
    switch ($('#filter').val()) {
        case '1':
            window.document.title='Anime'
            $('#title').html(`My<strong>Anime</strong>ListSearch`)
            $.ajax({
                method:'GET',
                url:`${url}/top/anime`,
                success:function (response) {
                    myArray = response.top
                },
                complete:function () {
                    buildAnime(myArray)
                }
            }) 
            break;
        case '2':
            window.document.title='Manga'
            $('#title').html(`My<strong>Manga</strong>ListSearch`)
            $.ajax({
                method:'GET',
                url:`${url}/top/manga`,
                success:function (response) {
                    myArray = response.top
                },
                complete:function () {
                    buildAnime(myArray)
                }
            })
            break;
    }
});

function search(query) {
    if ($('#search').val().length < 3) {
        switch ($('#filter').val()) {
            case '1':
                $.ajax({
                    method:'GET',
                    url:`${url}/top/anime`,
                    success:function (response) {
                        myArray = response.top
                    },
                    complete:function () {
                        buildAnime(myArray)
                    }
                }) 
                break;
            case '2':
                $.ajax({
                    method:'GET',
                    url:`${url}/top/manga`,
                    success:function (response) {
                        myArray = response.top
                    },
                    complete:function () {
                        buildAnime(myArray)
                    }
                })
                break;
        }
    } else {
        switch ($('#filter').val()) {
            case '1':
                $.ajax({
                    method:'GET',
                    url:`${url}/search/anime?q=${query}`,
                    success:function (response) {
                        myArray = response.results
                    },
                    complete:function () {
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
                            url:`${url}/search/manga?q=${query}&page=1&genre=12`,
                            success:function (response) {
                                myArray = _(myArray) 
                                .differenceBy(response.results, 'mal_id')
                                .value();
                                console.log(myArray)
                                $.ajax({
                                    method:'GET',
                                    url:`${url}/search/manga?q=${query}&page=1&genre=33`,
                                    success:function (response) {
                                        myArray = _(myArray) 
                                        .differenceBy(response.results, 'mal_id')
                                        .value();
                                        $.ajax({
                                            method:'GET',
                                            url:`${url}/search/manga?q=${query}&page=1&genre=34`,
                                            success:function (response) {
                                                myArray = _(myArray) 
                                                .differenceBy(response.results, 'mal_id')
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
                break;
            default:
                break;
        }
    }
}

function buildAnime(data){
    var animeList = document.getElementById('myAnimeList')
    animeList.querySelector('.row').innerHTML = ''

    for (var i = 0; i < Object.keys(data).length; i++){
        if (!(data[i].rated == 'Rx'||  data[i].rated == 'R+')) {

            var anime = `
                            <div class="col anime rounded">
                                    <a href=${data[i].url} target="_blank"><img class='rounded' src =${data[i].image_url}/></a>
                                    <h4>${data[i].title}</h4>
                                    <div class="row rounded" id='anime-stats'>
                                        <div class="col">
                                        ${data[i].type} (${data[i].episodes} eps)
                                        </div>
                                        <div class="col">
                                        ${(data[i].start_date != null) ? data[i].start_date.split('').slice(0, 4).join("") : ''}
                                        </div>
                                        <div class="col">
                                        ${data[i].score}
                                        </div>
                                    </div>
                                    <p>${data[i].synopsis}</p>
                                    <a href=${data[i].url} target="_blank" class="btn btn-secondary">Details</a>
                                    <a href='https://www12.9anime.to/search?keyword=${data[i].title}' target="_blank" class="btn btn-primary">Watch</a>
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
                                    <a href=${data[i].url} target="_blank" class="btn btn-secondary">Details</a>
                                    <a href='https://mangakakalot.com/search/story/${data[i].title.replace(/[\W_]/g, " ").trim().split(' ').join('_')}' target="_blank" class="btn btn-primary">Read</a>
                                    
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