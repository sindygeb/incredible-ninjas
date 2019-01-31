//Default on load to see how modal looks - get rid of this when adding to master
$(window).on('load', function(){        
    $('#modalAge').modal('show');
}); 

//When age is < 18, we'll call this - "response.age" for now - modal shows up

if (response.age <= 18) {
    $('#modalAge').modal('show');
};

