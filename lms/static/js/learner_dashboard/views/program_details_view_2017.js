(function(define) {
    'use strict';

    define(['backbone',
            'jquery',
            'underscore',
            'gettext',
            'edx-ui-toolkit/js/utils/html-utils',
            'js/learner_dashboard/collections/course_card_collection',
            'js/learner_dashboard/views/program_header_view_2017',
            'js/learner_dashboard/views/collection_list_view',
            'js/learner_dashboard/views/course_card_view_2017',
            'js/learner_dashboard/views/program_details_sidebar_view',
            'text!../../../templates/learner_dashboard/program_details_view_2017.underscore'
           ],
         function(
             Backbone,
             $,
             _,
             gettext,
             HtmlUtils,
             CourseCardCollection,
             HeaderView,
             CollectionListView,
             CourseCardView,
             SidebarView,
             pageTpl
         ) {
             return Backbone.View.extend({
                 el: '.js-program-details-wrapper',

                 tpl: HtmlUtils.template(pageTpl),

                 initialize: function(options) {
                     this.options = options;
                     this.programModel = new Backbone.Model(this.options.programData);
                     this.courseCardCollection = new CourseCardCollection(
                        this.programModel.get('courses'),
                        this.options.userPreferences
                    );
                     this.render();
                 },

                 render: function() {
                    var data = {
                        total_count: this.courseCardCollection.length,
                        in_progress_count: this.courseCardCollection.length
                    };
                    data = $.extend(data, this.options.programData);
                    HtmlUtils.setHtml(this.$el, this.tpl(data));
                    this.postRender();
                 },

                 postRender: function() {
                     this.headerView = new HeaderView({
                         model: new Backbone.Model(this.options)
                     });
                     new CollectionListView({
                         el: '.js-course-list-in-progress',
                         childView: CourseCardView,
                         collection: this.courseCardCollection,
                         context: this.options,
                         titleContext: {
                             el: 'h2',
                             title: 'In Progress Course List'
                         }
                     }).render();

                     new CollectionListView({
                         el: '.js-course-list-remaining',
                         childView: CourseCardView,
                         collection: this.courseCardCollection,
                         context: this.options,
                         titleContext: {
                             el: 'h2',
                             title: 'Remaining Course List'
                         }
                     }).render();

                     new CollectionListView({
                         el: '.js-course-list-completed',
                         childView: CourseCardView,
                         collection: this.courseCardCollection,
                         context: this.options,
                         titleContext: {
                             el: 'h2',
                             title: 'Completed Course List'
                         }
                     }).render();

                     new SidebarView({
                         el: '.sidebar',
                         context: this.options
                     }).render();
                 }
             });
         }
    );
}).call(this, define || RequireJS.define);
