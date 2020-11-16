"use strict";

var App = {
  init: function() {
    this.initBurgerHandler();
    this.stickyNavigationHandler();
    var projects = document.querySelectorAll('.project');

    if (projects.length) {
      this.initFadeInProjects(projects);
    }
  },
  initFadeInProjects: function(projects) {
    for (var i = 0; i < projects.length; i++) {
      projects[i].classList.add('transparent');
    }

    var updateProjectsView = function() {
      var viewportTop = window.pageYOffset || document.documentElement.scrollTop;
      var viewportBottom = viewportTop + window.innerHeight;

      for(var i = 0; i < projects.length; i++) {
        var project = projects[i];
        var projectTopOffset = project.getBoundingClientRect().top + viewportTop;

        if (projectTopOffset <= viewportBottom) {
          var projectClasses = project.classList;
          projectClasses.remove('transparent');
          projectClasses.add('animated');
          projectClasses.add('fadeInUp');
        }
      }
    };

    updateProjectsView();
    window.addEventListener('scroll', updateProjectsView);
  },
  initBurgerHandler: function() {
    var body = document.body;
    var burger = document.querySelector('.burger');

    burger.addEventListener('click', function() {
      body.classList.toggle('show-burger-menu');
    });
  },
  stickyNavigationHandler: function() {
    var scrollPosition = 0;
    var body = document.body;

    var updateNavigationView = function() {
      var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;
      var isUpDirection = (currentScrollPos && currentScrollPos < scrollPosition);

      if (isUpDirection) {
        body.classList.add('sticky-navigation');
      } else {
        body.classList.remove('sticky-navigation');
      }

      if (currentScrollPos > scrollPosition) {
        body.classList.remove('show-burger-menu');
      }

      scrollPosition = currentScrollPos;
    };

    window.addEventListener('scroll', updateNavigationView);
  }
};

App.init();
