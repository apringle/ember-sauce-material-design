import Ember from 'ember';
import layout from '../templates/components/smd-form';

export default Ember.Component.extend({
  // Attributes
  layout,
  tagName: 'form',
  model: null,
  // Computed
  childFormControls: Ember.computed('childViews', function() {
    var childViews = this.get('childViews');
    if (childViews) {
      return childViews.filter(function(currentChildView) {
        return currentChildView.constructor.toString().indexOf('smd-form-control') !== -1;
      });
    }
  }),
  // Events
  submit(e) {
    e.preventDefault();

    var errorMessages = [];

    var formControls = this.get('childFormControls');

    formControls.forEach(
      function(formControl) {
        if (!formControl.get('validation.isValid')) {
          errorMessages.addObjects(formControl.get('validation.errors').mapBy('message'));
        }
        formControl.set('didValidate', true);
      }
    );

    if (errorMessages.length !== 0) {
      var errorMessage = errorMessages.join(', ');
      // TODO: Toast
      Ember.Logger.log("TOAST: " + errorMessage);
      return;
    }
    this.sendAction('action', this.get('model'));
  },
  didInsertElement() {
    this._super(...arguments);
  }
});
