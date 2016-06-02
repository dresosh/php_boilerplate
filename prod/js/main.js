$( document ).ready( function() {

// Global ----------------------------------------------------------------------

var navHeight  = $( 'nav' ).height()
   ,paddingTop = navHeight

// Body Padding
if ( $( 'nav' ).hasClass( 'navbar-fixed-top' ) ) {
  $( 'body' ).css( 'padding-top', navHeight )
}

// Smooth scroll
$( "a[href^='#']" ).on( 'click', function( e ) {

    // prevent default anchor click behavior
    e.preventDefault();

    // store hash
    var hash = this.hash;

    // animate
    $( 'html, body' ).animate( {
        scrollTop: $( hash ).offset().top - paddingTop
    }, 800, function(){

        // when done, add hash to url
        // ( default click behaviour )
        window.location.hash = hash;
    } );

} );

// Scrollspy
$( 'body' ).scrollspy( {
  target: '#main-nav',
  offset: paddingTop
} )


// Make nav collapse after link was clicked
if ( screen.width < 769 ) {
  $( '.nav a' ).on( 'click', function(){
    navbarClick();
  });
  function navbarClick() {
    $( '.btn-navbar' ).click()
    $( '.navbar-toggle' ).click()
  }
}


// Home ------------------------------------------------------------------------


} )
