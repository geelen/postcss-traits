'use strict';

var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireWildcard(_postcss);

exports['default'] = function (css, result) {
  css.eachAtRule(function (rule) {
    if (rule.name == 'trait') {
      var expressions = rule.params.replace(/^\(|\)$/g, '').split(/, +/);
      expressions.forEach(function (expression) {
        var _expression$split = expression.split(/: +/);

        var _expression$split2 = _slicedToArray(_expression$split, 2);

        var trait = _expression$split2[0];
        var args = _expression$split2[1];

        rule.parent.insertBefore(rule, _postcss2['default'].atRule({ name: 'mixin', params: trait, source: rule.source }));
        if (args) args.split(' ').forEach(function (arg) {
          rule.parent.insertBefore(rule, _postcss2['default'].atRule({ name: 'mixin', params: '' + trait + ':' + arg, source: rule.source }));
        });
      });
      rule.removeSelf();
    }
  });
};

module.exports = exports['default'];
