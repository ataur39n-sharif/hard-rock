// Search Song
// api link: https://api.lyrics.ovh/suggest/:searchText

// Lyric
// lyric link: https://api.lyrics.ovh/v1/:artist/:title


const searchSong = search =>{
    const searchField = document.getElementById('searchField').value;
    const searchBySong = `https://api.lyrics.ovh/suggest/${searchField}`
    fetch(searchBySong)
    .then(response => response.json())
    .then(songList =>{
        songInfo(songList.data);
    })
}

const songInfo = songData => {

    const searchResult = document.getElementById('searchResults');
    searchResult.innerHTML = '';
    songData.forEach(song => {
        console.log(song);

        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3'

        const songDivData = `
        
            <div class="col-md-9">
            <h3 class="lyrics-name">${song.title}</h3>
            <p class="author lead">${song.album.title} by <span>${song.artist.name}</span></p>
            <audio controls>
            <source src="${song.preview}"></audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="songLyric('${song.artist.name}', '${song.album.title}')" class="btn btn-success">Get Lyrics</button>
            </div>

        `
        songDiv.innerHTML= songDivData ;
        searchResult.appendChild(songDiv);
    });
}

const songLyric = (artist , title) => {
    const lyricApi = `https://api.lyrics.ovh/v1/${artist}/${title}`
   fetch(lyricApi)
   .then(response => response.json())
   .then(data =>{
    displayLyrics(data.lyrics);
   })
    
}

const displayLyrics = lyrics => {
    
    const lyricsData = document.getElementById('lyrics');
    lyricsData.innerText = lyrics ;
}