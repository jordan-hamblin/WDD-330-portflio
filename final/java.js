// window.onload = function(){
//     $('#show').hide();
//     $('#show2').hide();
//     $('#select1').change(show);

// }

// function show(event){
//     let action = $('#select1').val();
//     if (action == "new"){
//         $('#show').show();
//         $('#show2').show();
//     }
//     else{
//         $('#show').hide();
//     }   
// }




function calc() {
    let title = encodeURI($('#title').val());

    let url = "https://www.omdbapi.com/?i=tt3896198&apikey=f5d5f763&"
        + "t=" + title;


    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        success: (data) => {
            console.log('ajax success!', data);
            displayMovie(data);
           
        }
    }); 
}  

function displayMovie(data) {
    if ($('#title').val() != "") {

        let content = "Title: ";

        content += data.Title + "<br>"
            + "Year: " + data.Year + "<br>"
            + "Content Tating: " + data.Rated + "<br>"
            + "Release Date: " + data.Released + "<br>"
            + "Total Runtime: " + data.Runtime + "<br>"
            + "Genre: " + data.Genre + "<br>"
            + "Plot: " + data.Plot + "<br>"
            + "IMDB Rating: " + data.imdbRating + "<br>"
            + "Number of IMDB Votes:" + data.imdbVotes + "<br>"
            + "Metascore: " + data.Metascore + "<br>";
            

        $('#content').html(content);
    }
    else {
        $('#content').html("Please Fill Out All Fields");
    }
}


