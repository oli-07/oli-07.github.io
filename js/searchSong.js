async function searchSong() {
    console.log("Function called");
    document.querySelector(".song").innerHTML = "";
    let songInput = document.querySelector(".song-input").value;
    console.log(songInput);
    let apiKey = 'AIzaSyBEUbl5MBakJu23VZaRCxC1hVDMf_I2cL4';
    let apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${songInput}&type=video&key=${apiKey}`;
    try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        if (data.items.length > 0) {
            let videoId = data.items[0].id.videoId;
            console.log(videoId);
            let videoResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails,statistics&key=${apiKey}`);
            let videoData = await videoResponse.json();
            if(videoData.items[0].snippet.channelId != "UCc7_woMAIVIW2mAr1rPCsFQ") return document.querySelector(".song").innerHTML = "<h2>Sorry, we could not find a paramore song with that name.</h2>";
            let iframeOld = document.querySelector("iframe");
            if (iframeOld) {
                iframeOld.remove();
            }
            let iframe = document.createElement("iframe");
            iframe.setAttribute("src", `https://www.youtube.com/embed/${videoId}`);
            iframe.classList.add("music-video");
            iframe.setAttribute("allow", "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture");
            iframe.setAttribute("allowfullscreen", "");
            let song = document.querySelector(".song");
            song.appendChild(iframe);
        } else {
            console.log("No video found");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}