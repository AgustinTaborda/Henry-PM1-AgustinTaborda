document.addEventListener('DOMContentLoaded', function() {
    var progressBar = document.getElementById('progress-bar');
  
    window.addEventListener('scroll', function() {
      var scrollTop = window.scrollY;
      var windowHeight = window.innerHeight;
      var fullHeight = document.body.scrollHeight;
      var scrolled = (scrollTop / (fullHeight - windowHeight)) * 100;
  
      progressBar.style.width = scrolled + '%';
    });
  });
  