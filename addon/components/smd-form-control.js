import Ember from 'ember';
import layout from '../templates/components/smd-form-control';

export default Ember.Component.extend({
  layout,
  tagName: 'div',
  classNames: [
    'smd-form__control',
    'mdl-textfield',
    'mdl-js-textfield',
  ],
  classNameBindings: [
    'inputTypeModifier',
    'floatingClass',
    'invalidClass',
    'validClass',
  ],
  // Attributes
  name: null,
  disabled: false,
  label: null,
  model: null,
  type: 'text',
  icon: null,
  tip: null,
  isFloating: true,
  max: null,
  min: null,
  step: null,
  cols: null,
  rows: 3,
  format: 'DD/MM/YYYY',
  placeholder: null,
  options: Ember.A([{
    label: 'Option 1',
    value: 1,
  }, {
    label: 'Option 2',
    value: 2,
  }, {
    label: 'Option 3',
    value: 3,
  }, ]),
  nullOption: null,
  // Computed
  hasNullOption: Ember.computed.bool('nullOption'),
  computedOptions: Ember.computed('options', 'value', function() {
    var options = this.get('options'),
      value = this.get('value');

    var array = [];

    options.forEach(
      function(o) {
        var option;
        if (o.value == value) {
          option = {
            label: o.label,
            value: o.value,
            checked: true,
          };
        } else {
          var option = {
            label: o.label,
            value: o.value,
            checked: false,
          };
        }
        array.push(option);
      }
    );
    return array;
  }),
  hasLabel: Ember.computed('label', 'type', function() {
    let label = this.get('label'),
      type = this.get('type');
    var noLabel = ['switch', 'checkbox'];
    if (noLabel.indexOf(type) !== -1) {
      return false;
    }
    return !!label;
  }),
  notValidating: Ember.computed.not('validation.isValidating'),
  didValidate: false,
  hasContent: Ember.computed.notEmpty('value'),
  isValid: Ember.computed.and('hasContent', 'validation.isValid', 'notValidating'),
  isInvalid: Ember.computed.oneWay('validation.isInvalid'),
  isTextarea: Ember.computed.equal('type', 'textarea'),
  isSwitch: Ember.computed.equal('type', 'switch'),
  isCheckbox: Ember.computed.equal('type', 'checkbox'),
  isRadio: Ember.computed.equal('type', 'radio'),
  isIcon: Ember.computed.equal('type', 'icon'),
  isSelect: Ember.computed.equal('type', 'select'),
  isDate: Ember.computed.equal('type', 'date'),
  showErrorClass: Ember.computed.and('notValidating', 'showErrorMessage', 'hasContent', 'validation'),
  showErrorMessage: Ember.computed('validation.isDirty', 'isInvalid', 'didValidate', function() {
    return (this.get('validation.isDirty') || this.get('didValidate')) && this.get('isInvalid');
  }),
  showWarningMessage: Ember.computed('validation.isDirty', 'validation.warnings.[]', 'isValid', 'didValidate', function() {
    return (this.get('validation.isDirty') || this.get('didValidate')) && this.get('isValid') && !Ember.isEmpty(this.get('validation.warnings'));
  }),
  showTip: Ember.computed('tip', function() {
    return (this.get('tip'));
  }),
  // Classes
  inputTypeModifier: Ember.computed('type', function() {
    return 'smd-form__control--' + this.get('type');
  }),
  floatingClass: Ember.computed('isFloating', function() {
    if (this.get('isFloating')) {
      return 'mdl-textfield--floating-label';
    }
  }),
  invalidClass: Ember.computed('isInvalid', function() {
    if ((this.get('validation.isDirty') || this.get('didValidate')) && this.get('isInvalid')) {
      return 'is-invalid';
    }
  }),
  validClass: Ember.computed('isValid', function() {
    if (this.get('isValid')) {
      return 'is-valid';
    }
  }),
  inputClasses: Ember.computed('type', function() {
    var classNames = [];
    let type = this.get('type');

    if (type === 'range') {
      classNames.push('mdl-slider');
      classNames.push('mdl-js-slider');
    } else {
      classNames.push('mdl-textfield__input');
    }
    classNames.push('smd-form__input');
    classNames.push('smd-form__input--' + type);
    return classNames.join(' ');
  }),
  labelClasses: Ember.computed('type', function() {
    var classNames = [];
    classNames.push('mdl-textfield__label');
    classNames.push('smd-form__label');
    let type = this.get('type');
    let types = ['select', 'radio', 'icon', 'date', 'month', 'week', 'time', 'datetime', 'datetime-local', 'range'];
    if (types.indexOf(type) !== -1) {
      classNames.push('smd-form__label--fixed');
    }
    return classNames.join(' ');
  }),
  // Methods
  init() {
    this._super(...arguments);
    var propName = this.get('name');
    if (this.get("model")) {
      Ember.defineProperty(this, 'validation', Ember.computed.oneWay(`model.validations.attrs.${propName}`));
      Ember.defineProperty(this, 'value', Ember.computed.alias(`model.${propName}`));
    }
  },
  didInsertElement() {
    this._super(...arguments);
    componentHandler.upgradeElement(this.element);
  },
  actions: {
    selectedOption(option) {
      if (option.value !== undefined) {
        this.set('value', option.value);
      } else {
        this.set('value', option);
      }
    },
    checkOption(option) {
      if (option.value !== undefined) {
        this.set('value', option.value);
      } else {
        this.set('value', option);
      }
    },
    selectedDate(date) {
      this.set('value', date);
    },
  },
});
