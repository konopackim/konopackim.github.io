let accessToken = 'dupa';
let live_video_id = '';

document.getElementById('login-status-btn').onclick = function() {
    FB.getLoginStatus(function(response) {
        console.log('[FB.getLoginStatus] response ' + response.status);
        if (response.status === 'connected') {
            accessToken = response.authResponse.accessToken;
            console.log('[FB.getLoginStatus] Access token: ' + response.authResponse.accessToken);
        } 
    } );
}

document.getElementById('login-btn').onclick = function() {
    FB.login(function(response) {
      console.log('FB.login response ' + response.status);
      accessToken = response.authResponse.accessToken;
      console.log('[FB.login] Access token: ' + response.authResponse.accessToken);
    });
    return false;
}


document.getElementById('accesToken-btn').onclick = function() {
    console.log("Acess token: " + accessToken);
}

document.getElementById('set-video-id-btn').onclick = function(event) {
    live_video_id = document.getElementById("liveVideoId").value;
    showLiveVideoId();
}



document.getElementById('stream-btn').onclick = function() {
  var source = new EventSource(`https://streaming-graph.facebook.com/${live_video_id}/live_comments?access_token=${accessToken}&comment_rate=one_per_two_seconds&fields=from{name,id},message`);
  source.onmessage = function(event) {
    console.log(event);
    console.log(event.message);
    let comment = document.createElement('p');
    comment.innerHTML = event.message;
    document.getElementById('login-btn').appendChild(comment);
  };
}

showLiveVideoId();

function showLiveVideoId() {
    document.getElementById("live-video-id-p").innerHTML = "Live video id: " + live_video_id;
} 