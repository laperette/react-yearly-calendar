!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.Calendar=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Day = React.createClass({displayName: 'Day',

  getDefaultProps: function() {
    return {
      classes: ''
    };
  },

  render: function() {
    return (
      React.createElement("div", {className: this.props.day.classes}, 
        React.createElement("span", {className: "day-number"}, this.props.day.day.date())
      )
    );
  }
});

var CalendarControls = React.createClass({displayName: 'CalendarControls',

  next: function() {
    this.props.onNext();
  },

  prev: function() {
    this.props.onPrev();
  },

  render: function() {
    return (
      React.createElement("div", {className: "clndr-controls"}, 
        React.createElement("div", {onClick: this.prev}, "Prev"), 
        React.createElement("div", {className: "current-month"}, this.props.date.format('MMMM YYYY')), 
        React.createElement("div", {onClick: this.next}, "Next")
      )
    );
  }
});

var Calendar = React.createClass({displayName: 'Calendar',

  getDefaultProps: function() {
    return {
      weekOffset: 0,
      lang: 'en',
      forceSixRows: false,
    };
  },

  getInitialState: function() {
    return {
      date: moment()
    };
  },

  next: function() {
    this.setState({date: this.state.date.add('months', 1)});
  },

  prev: function() {
    this.setState({date: this.state.date.subtract('months', 1)});
  },

  createDay: function(day) {
    return {
      day: day.date(),
      date: day
    };
  },

  /**
   * Return an array of days for the current month
   */

  days: function() {
    var days = [];
    var date = this.state.date.startOf('month');
    var diff = date.weekday() - this.props.weekOffset;
    if (diff < 0) diff += 7;

    var i;
    for (var i = 0; i < diff; i++) {
      var day = moment([this.state.date.year(), this.state.date.month(), i-diff+1])
      days.push({day: day, classes: 'prev-month'});
    }

    var numberOfDays = date.daysInMonth();
    for (i = 1; i <= numberOfDays; i++) {
      var day = moment([this.state.date.year(), this.state.date.month(), i]);
      days.push({day: day});
    }

    i = 1;
    while (days.length % 7 !== 0) {
      var day = moment([this.state.date.year(), this.state.date.month(), numberOfDays+i]);
      days.push({day: day, classes: 'next-month'});
      i++;
    }

    if (this.props.forceSixRows && days.length !== 42) {
      var start = moment(days[days.length-1].date).add('days', 1);
      while (days.length < 42) {
        days.push({day: moment(start), classes: 'next-month'});
        start.add('days', 1);
      }
    }

    return days;
  },

  render: function() {
    var renderDay = function(day) {
      return React.createElement(Day, {day: day});
    };

    return (
      React.createElement("div", {className: "clndr"}, 
        React.createElement(CalendarControls, {date: this.state.date, onNext: this.next, onPrev: this.prev}), 
        React.createElement("div", {className: "clndr-grid"}, 
          React.createElement("div", {className: "days"}, 
            this.days().map(renderDay)
          ), 
          React.createElement("div", {className: "clearfix"})
        )
      )
    );
  }
});

module.exports = Calendar;

},{}]},{},[1])(1)
});