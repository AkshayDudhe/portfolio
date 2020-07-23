jQuery(document).ready(function($) { 
  
  $('.show').click(function(){ //same as on('click', function(){}); I just prefer this syntax
    var target = $(this).attr('data-target'); //this will be card1 if the first is clicked.
    $('.'+target).slideToggle('slow'); //add . for class selector and use target to find the right element
  });

  $('.close').click(function(){ //close button
    var target=$(this).attr('data-target');
    $('.'+target).slideToggle('slow'); //find the nearest parent and close it
  });

});

/*$('.show').on('click',function(){
  $(this).parent().next(".card-reveal").slideToggle('show');
});

$('.close').on('click',function(){
  $(this).parent().slideToggle('show');
});*/


/*jQuery(document).ready(function($) {
  $(function(){
   $('.card-content button.show').on('click', function(){
     $(this).parents('.card-content').siblings('.card-reveal').slideToggle('slow');
   });
   $('.card-reveal button.close').on('click', function(){
     $(this).parents('.card-reveal').slideToggle('slow');
   });
 });
});*/