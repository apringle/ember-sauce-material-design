import Ember from 'ember';
import layout from '../templates/components/smd-header';

export default Ember.Component.extend({
  // Component setup
  layout,
  tagName: 'header',
  classNames: 'smd-header',
  classNameBindings: ['fabClassModifier', 'minimizedClassModifier'],
  // Attributes
  item: null,
  title: '',
  backIcon: null,
  toolbarIconOne: null,
  toolbarIconTwo: null,
  toolbarIconThree: null,
  fabIcon: null,
  coverImageClass: null,
  coverImageSrc: null,
  isMiniFab: false,
  isRightFab: false,
  isMinimized: false,
  // Actions
  backAction: null,
  fabAction: null,
  toolbarActionOne: null,
  toolbarActionTwo: null,
  toolbarActionThree: null,
  searchAction: false,
  // Computed
  fabClassModifier: Ember.computed('hasFab', function() {
    if (this.get('hasFab')) {
      if (this.get('isMiniFab')) {
        return 'smd-header--with-mini-fab';
      } else {
        return 'smd-header--with-fab';
      }
    }
  }),
  minimizedClassModifier: Ember.computed('isMinimized', function() {
    if (this.get('isMinimized')) {
      return 'smd-header--minimized';
    }
  }),
  fabClassNames: Ember.computed('isMiniFab', 'isRightFab', function() {
    var classNames = [];
    if (this.get('isMiniFab')) {
      classNames.push('smd-header__mini-fab');
      if (this.get('isRightFab')) {
        classNames.push('smd-header__mini-fab--right');
      }
    } else {
      classNames.push('smd-header__fab');
      if (this.get('isRightFab')) {
        classNames.push('smd-header__fab--right');
      }
    }
    return classNames.join(' ');
  }),
  searchClassNames: Ember.computed('isMiniFab', function() {
    var classNames = [];
    if (this.get('isMiniFab')) {
      classNames.push('smd-header__mini-search');
    } else {
      classNames.push('smd-header__search');
    }
    return classNames.join(' ');
  }),
  hasFab: Ember.computed.bool('fabIcon'),
  hasBack: Ember.computed.bool('backIcon'),
  hasToolbarOne: Ember.computed.bool('toolbarIconOne'),
  hasToolbarTwo: Ember.computed.bool('toolbarIconTwo'),
  hasToolbarThree: Ember.computed.bool('toolbarIconThree'),
  hasCoverImageClass: Ember.computed.bool('coverImageClass'),
  hasCoverImageSrc: Ember.computed.bool('coverImageSrc'),
  hasSearch: Ember.computed.bool('searchAction'),
  // actions
  actions: {
    backAction: function() {
      if (this.get('backAction')) {
        this.sendAction('backAction', this.get('item'));
      } else if (this.get('action')) {
        this.sendAction('action', 'back', this.get('item'));
      }
    },
    fabAction: function() {
      if (this.get('fabAction')) {
        this.sendAction('fabAction', this.get('item'));
      } else if (this.get('action')) {
        this.sendAction('action', 'fab', this.get('item'));
      }
    },
    toolbarActionOne: function() {
      if (this.get('toolbarActionOne')) {
        this.sendAction('toolbarActionOne', this.get('item'));
      } else if (this.get('action')) {
        this.sendAction('action', 'toolbarOne', this.get('item'));
      }
    },
    toolbarActionTwo: function() {
      if (this.get('toolbarActionTwo')) {
        this.sendAction('toolbarActionTwo', this.get('item'));
      } else if (this.get('action')) {
        this.sendAction('action', 'toolbarTwo', this.get('item'));
      }
    },
    toolbarActionThree: function() {
      if (this.get('toolbarActionThree')) {
        this.sendAction('toolbarActionThree', this.get('item'));
      } else if (this.get('action')) {
        this.sendAction('action', 'toolbarThree', this.get('item'));
      }
    },
    searchAction: function(term) {
      this.sendAction('searchAction', term);
    }
  },
  //
  didRender: function() {
    //

    var $parent = Ember.$('body > .ember-view'),
      $header = Ember.$('.smd-header'),
      originalHeight = $header.outerHeight(),
      minHeight = originalHeight - 160,
      $title = $header.find('.smd-header__title');

    if ($header.hasClass('smd-header--with-fab')) {
      minHeight = minHeight + 28;
    }

    //
    $parent.scroll(function() {

      var scroll = Ember.$(this).scrollTop(),
        $header = Ember.$('.smd-header'),
        $body = Ember.$('.smd-body'),
        height = (originalHeight - scroll);

      if (height < minHeight) {
        $header.css('height', '');
        $header
          .addClass("smd-header--minimized")
          .addClass("smd-header--fixed")
          .removeClass("smd-header--transition");

        $title.css('transform', '');

      } else if (scroll > 1) {
        $header.css('height', height);
        $header
          .addClass("smd-header--transition")
          .removeClass("smd-header--minimized")
          .removeClass("smd-header--fixed");

        // title scale factor
        var scale = (height - minHeight) / (originalHeight - minHeight);

        var fact = .75 + (.25 * scale);

        $title.css('transform', 'scale(' + fact + ') translateZ(0px)')

        $parent.css('margin-top', height);
      } else {
        $title.css('transform', '');
        $header.css('height', '')
          .removeClass("smd-header--transition")
          .removeClass("smd-header--minimized")
          .removeClass("smd-header--fixed");
        $parent.css('margin-top', 0);
      }
    });
  }
});
