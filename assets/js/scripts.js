var validate = [];
var before_function = [];
var dyn_function = [];

dyn_function['page-load'] = function (filename) {
    $.ajax({
        url:'pages/'+filename+'.html',
        type:'GET',
        error: function(xhr, textStatus, error){
            console.log(xhr.status+" "+textStatus+" "+error);
            $.get( "pages/404.html", function( data ) {
                $( "#content" ).html( data );
            });
        },
        success: function(data, textStatus, xhr){
            if(xhr.status == 200){
                $('#content').html(data);
                $.get('config.json', function (configjson){
                    const config = configjson;
                    $('title').html(config.site_name);
                });
            }
        }
    });
};

/*===================================================*/
let searchParams = new URLSearchParams(window.location.search);
$(document).ready(function (e) {
    if(searchParams.has('page'))
        dyn_function['page-load'](searchParams.get('page'));
    else
        dyn_function['page-load']('home');
});