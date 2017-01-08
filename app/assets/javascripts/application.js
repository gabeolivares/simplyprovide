// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require underscore
//= require bootstrap-sprockets
//= require_tree .
$(function() {
   min = 1900
   max = (new Date).getFullYear() + 2
   selectCreate = document.getElementById('movie-year');

  for (var i = min; i<=max; i++){
      var opt = document.createElement('option');
      opt.value = i;
      opt.innerHTML = i;
      selectCreate.appendChild(opt);
  }

  selectCreate.value = new Date().getFullYear();

});

function createJob() {
    console.log('in create')
    first_name = $('#first-name').val()
    last_name = $('#last-name').val()
    email = $('#email').val()
    job_type = $('#job-type').val()
    desc = $('#desc').val()
    timeline = $('#desired-timeline').val()
    price = $('#price').val()

    if (first_name == "" ||
        last_name == "" ||
        email == "" ||
        job_type == "" ||
        desc == "" ||
        timeline == "" ||
        price == "")
    {
      $('#create-empty-msg').show();
      return;
    }
    params = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      job_type: job_type,
      description: desc,
      timeline: timeline,
      price: price
    };
    console.log(params)
    create_html = ""
    $.ajax({
    data: params,
    method: 'POST',
    success: function(data) {
      $('#create-success').html('')
      $('#create-empty-msg').css("display","none");
      $('#create-error-msg').css("display","none");
          create_html += '<div style="color:green;text-align:center;font-size: 18px;">'
          create_html += 'Succesfully saved job. Saving to Job list. . . '
          create_html += '</div>'
          create_html += '<table class="table">'
          create_html += '<thead>'
          create_html += '<tr>'
          create_html += '<th>First Name</th>'
          create_html += '<th>Last Name</th>'
          create_html += '<th>Email</th>'
          create_html += '<th>Job Type</th>'
          create_html += '<th>Description</th>'
          create_html += '<th>Timeline</th>'
          create_html += '<th>Price</th>'
          create_html += '</tr>'
          create_html += '</thead>'
          create_html += '<tbody>'
          create_html += '<tr>'
          create_html += '<td>' + data.first_name +'</td>'
          create_html += '<td>' + data.last_name + '</td>'
          create_html += '<td>' + data.email + '</td>'
          create_html += '<td>' + data.job_type + '</td>'
          create_html += '<td>' + data.description + '</td>'
          create_html += '<td>' + data.timeline + '</td>'
          create_html += '<td>' + data.price + '</td>'
          create_html += '</tr>'
          create_html += '</tbody>'
          create_html += '</table>'
          $('#create-success').html(create_html)
          $('#movie-title').val("")
          $('#movie-actors').val("")
          $('#movie-genre').val("")
          $('#movie-year').val("")
          $('#movie-rating').val("")
          window.setTimeout(function(){location.reload()},3000)

    },
    error: function (xhr, ajaxOptions, thrownError) {
      $('#create-success').html('')
      $('#create-empty-msg').css("display","none");
      $('#create-error-msg').show();
      },

    url: "/create_job"
  });
}
function destroyMovie(id){
  if (confirm("Are you sure you want to delete this job?")) {
    delete_id = "#delete-error-msg-" + id


    $.ajax({
    data: {id: id},
    method: 'DELETE',
    success: function(data) {
      $(delete_id).hide();
      remove_row = '#row-' + data.id
      $(remove_row).remove();

    },
    error: function (xhr, ajaxOptions, thrownError) {
      $(delete_id).show();
      },

    url: "/destroy_job"
  });
 }
  return false;
}

function searchMovies(){
  search = $('#movie-search').val()
  if (search == ""){
    $('#search-success').html('');
    $('#search-error-msg').show();
    return;
  }
  search_param = $('#movie-search-param').val()

  params = {
    search: search,
    search_param: search_param
  }
  $.ajax({
  data: params,
  method: 'POST',
  success: function(data) {
    $('#search-error-msg').css("display","none")
    $('#search-success').html('');

    search_html = ''
    search_html += '<div style="color:green;text-align:center;font-size: 18px;">'
    search_html += 'Found ' + data.length + ' ' + search_param + ' with ' + search + '.'
    if (data.length >0){
      search_html += '</div>'
      search_html += '<table class="table">'
      search_html += '<thead>'
      search_html += '<tr>'
      search_html += '<th>Title</th>'
      search_html += '<th>Actors</th>'
      search_html += '<th>Genre</th>'
      search_html += '<th>Year</th>'
      search_html += '<th>Rating</th>'
      search_html += '</tr>'
      search_html += '</thead>'
      search_html += '<tbody>'
      _.each(data, function(data) {
        search_html += '<tr>'
        search_html += '<td>' + data.title +'</td>'
        search_html += '<td>' + data.actors + '</td>'
        search_html += '<td>' + data.genre + '</td>'
        search_html += '<td>' + data.year + '</td>'
        search_html += '<td>' + data.rating + '</td>'
        search_html += '</tr>'
      });
      search_html += '</tbody>'
      search_html += '</table>'
    }
    $('#search-success').html(search_html)
  },
  error: function (xhr, ajaxOptions, thrownError) {
    $('#search-success').html('');
    $('#search-error-msg').show();
    },

  url: "/search_movie"
});
}

function searchIMBDMovies(){
  search = $('#movie-imdb-search').val()
  if (search == ""){
    $('#search-imdb-success').html('');
    $('#search-imdb-error-msg').show();
    return;
  }

  params = {
    search: search,
  }
  $.ajax({
  data: params,
  method: 'POST',
  success: function(data) {
    $('#search-imdb-error-msg').css("display","none")
    $('#search-imdb-success').html('');

    search_html = ''
    search_html += '<div style="color:green;text-align:center;font-size: 18px;">'
    search_html += 'Found ' + data.length +  ' movies with ' + search + '.'
    if (data.length >0){
      search_html += '</div>'
      search_html += '<table class="table">'
      search_html += '<thead>'
      search_html += '<tr>'
      search_html += '<th>Title</th>'
      search_html += '<th>Overview</th>'
      search_html += '<th>Release Date</th>'
      search_html += '<th>Popularity</th>'
      search_html += '</tr>'
      search_html += '</thead>'
      search_html += '<tbody>'
      _.each(data, function(data) {
        search_html += '<tr>'
        search_html += '<td>' + data.original_title +'</td>'
        search_html += '<td>' + data.overview + '</td>'
        search_html += '<td>' + data.release_date + '</td>'
        search_html += '<td>' + data.vote_average + '</td>'
        search_html += '</tr>'
      });
      search_html += '</tbody>'
      search_html += '</table>'
    }
    $('#search-imdb-success').html(search_html)
  },
  error: function (xhr, ajaxOptions, thrownError) {
    $('#search-imdb-success').html('');
    $('#search-imdb-error-msg').show();
    },

  url: "/search_imdb_movie"
});
}

function editMovie(id){
 edit_error_id = "#edit-error-msg-" + id
 title = $('#edit-title-' + id).val()
 actors = $('#edit-actors-'+ id).val()
 genre = $('#edit-genre-'+ id).val()
 year = $('#edit-year-'+ id).val()
 rating = $('#edit-rating-'+ id).val()

 if (rating > 5 || year < 1900 || year > 2017){
   $(edit_error_id).show()
   return;
 }
 params = {
   id: id,
   title: title,
   actors: actors,
   genre: genre,
   year: year,
   rating: rating
 };

 $.ajax({
 data: params,
 method: 'PATCH',
 success: function(data) {
   $(edit_error_id).css("display","none")

   $('#title-' + id).html(data.title)
   $('#actors-' + id).html(data.actors)
   $('#genre-' + id).html(data.genre)
   $('#year-' + id).html(data.year)
   $('#rating-' + id).html(data.rating)
   $('#editMovie-' + id).modal('toggle');

 },
 error: function (xhr, ajaxOptions, thrownError) {
   $(edit_error_id).show()
   },

 url: "/edit_movie"
});
}
