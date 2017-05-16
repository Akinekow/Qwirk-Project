(function() {
    'use strict';

    angular
        .module('app.examples.calendar')
        .controller('CalendarController', CalendarController);

    /* @ngInject */
    function CalendarController($scope, $rootScope, $mdDialog, $mdToast, $filter, $element, triTheming, triLayout, uiCalendarConfig) {
        var vm = this;
        vm.addEvent = addEvent;
        vm.calendarOptions = {
            contentHeight: 'auto',
            selectable: true,
            aspectRatio: 1.8,
            editable: true,
            header: false,
            defaultView: 'timelineDay',
            groupByDateAndResource : false,
            allDayDefault : false,
            resourceAreaWidth: '40%',
            resourceColumns: [
                  {
                    group: true,
                    labelText: 'Building',
                    field: 'building'
                  },
                  {
                    labelText: 'Room',
                    field: 'title'
                  },
                  {
                    labelText: 'Occupancy',
                    field: 'occupancy'
                  }
                ],
  resources: [
    { id: 'a', building: '460 Bryant', title: 'Auditorium A', occupancy: 40 },
    { id: 'b', building: '460 Bryant', title: 'Auditorium B', occupancy: 40, eventColor: 'green' },
    { id: 'c', building: '460 Bryant', title: 'Auditorium C', occupancy: 40, eventColor: 'orange' },
    { id: 'd', building: '460 Bryant', title: 'Auditorium D', occupancy: 40, children: [
      { id: 'd1', title: 'Room D1', occupancy: 10 },
      { id: 'd2', title: 'Room D2', occupancy: 10 }
    ] },
    { id: 'e', building: '460 Bryant', title: 'Auditorium E', occupancy: 40 },
    { id: 'f', building: '460 Bryant', title: 'Auditorium F', occupancy: 40, eventColor: 'red' },
    { id: 'g', building: '564 Pacific', title: 'Auditorium G', occupancy: 40 },
    { id: 'h', building: '564 Pacific', title: 'Auditorium H', occupancy: 40 },
    { id: 'i', building: '564 Pacific', title: 'Auditorium I', occupancy: 40 },
    { id: 'j', building: '564 Pacific', title: 'Auditorium J', occupancy: 40 },
    { id: 'k', building: '564 Pacific', title: 'Auditorium K', occupancy: 40 },
    { id: 'l', building: '564 Pacific', title: 'Auditorium L', occupancy: 40 },
    { id: 'm', building: '564 Pacific', title: 'Auditorium M', occupancy: 40 },
    { id: 'n', building: '564 Pacific', title: 'Auditorium N', occupancy: 40 },
    { id: 'o', building: '564 Pacific', title: 'Auditorium O', occupancy: 40 },
    { id: 'p', building: '564 Pacific', title: 'Auditorium P', occupancy: 40 },
    { id: 'q', building: '564 Pacific', title: 'Auditorium Q', occupancy: 40 },
    { id: 'r', building: '564 Pacific', title: 'Auditorium R', occupancy: 40 },
    { id: 's', building: '564 Pacific', title: 'Auditorium S', occupancy: 40 },
    { id: 't', building: '564 Pacific', title: 'Auditorium T', occupancy: 40 },
    { id: 'u', building: '564 Pacific', title: 'Auditorium U', occupancy: 40 },
    { id: 'v', building: '564 Pacific', title: 'Auditorium V', occupancy: 40 },
    { id: 'w', building: '564 Pacific', title: 'Auditorium W', occupancy: 40 },
    { id: 'x', building: '564 Pacific', title: 'Auditorium X', occupancy: 40 },
    { id: 'y', building: '564 Pacific', title: 'Auditorium Y', occupancy: 40 },
    { id: 'z', building: '564 Pacific', title: 'Auditorium Z', occupancy: 40 }
  ],

            viewRender: function(view) {
                // change day
                vm.currentDay = view.calendar.getDate();
                vm.currentView = view.name;
                // update toolbar with new day for month name
                $rootScope.$broadcast('calendar-changeday', vm.currentDay);
                // update background image for month
                triLayout.layout.contentClass = 'calendar-background-image background-overlay-static overlay-gradient-10 calendar-background-month-' + vm.currentDay.month();
            },
            dayClick: function(date, jsEvent, view) { //eslint-disable-line
                vm.currentDay = date;
            },
            eventClick: function(calEvent, jsEvent, view) { //eslint-disable-line
                $mdDialog.show({
                    controller: 'EventDialogController',
                    controllerAs: 'vm',
                    templateUrl: 'app/examples/calendar/event-dialog.tmpl.html',
                    targetEvent: jsEvent,
                    focusOnOpen: false,
                    locals: {
                        dialogData: {
                            title: 'Edit Event',
                            confirmButtonText: 'Save'
                        },
                        event: calEvent,
                        edit: true
                    }
                })
                .then(function(event) {
                    var toastMessage = 'Event Updated';
                    if(angular.isDefined(event.deleteMe) && event.deleteMe === true) {
                        // remove the event from the calendar
                        uiCalendarConfig.calendars['triangular-calendar'].fullCalendar('removeEvents', event._id);
                        // change toast message
                        toastMessage = 'Event Deleted';
                    }
                    else {
                        // update event
                        uiCalendarConfig.calendars['triangular-calendar'].fullCalendar('updateEvent', event);
                    }

                    // pop a toast
                    $mdToast.show(
                        $mdToast.simple()
                        .content($filter('triTranslate')(toastMessage))
                        .position('bottom right')
                        .hideDelay(2000)
                    );
                });
            }
        };

        vm.viewFormats = {
            'month': 'MMMM YYYY',
            'agendaWeek': 'w',
            'agendaDay': 'Do MMMM YYYY'
        };

        vm.eventSources = [{
            events: [],
        }];

        function addEvent(event, $event) {
            var inAnHour = moment(vm.currentDay).add(1, 'h');
            $mdDialog.show({
                controller: 'EventDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/examples/calendar/event-dialog.tmpl.html',
                targetEvent: $event,
                focusOnOpen: false,
                locals: {
                    dialogData: {
                        title: 'Add Event',
                        confirmButtonText: 'Add'
                    },
                    event: {
                        title: $filter('triTranslate')('New Event'),
                        allDay: false,
                        start: vm.currentDay,
                        end: inAnHour,
                        palette: 'cyan',
                        stick: true
                    },
                    edit: false
                }
            })
            .then(function(event) {
                vm.eventSources[0].events.push(event);
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('triTranslate')('Event Created'))
                    .position('bottom right')
                    .hideDelay(2000)
                );
            });
        }

        function createRandomEvents(number, startDate, endDate) {
            var eventNames = ['Pick up the kids', 'Remember the milk', 'Meeting with Morris', 'Car service',  'Go Surfing', 'Party at Christos house', 'Beer Oclock', 'Festival tickets', 'Laundry!', 'Haircut appointment', 'Walk the dog', 'Dentist :(', 'Board meeting', 'Go fishing'];
            var locationNames = ['London', 'New York', 'Paris', 'Burnley'];
            for(var x = 0; x < number; x++) {
                var randomMonthDate = randomDate(startDate, endDate);
                var inAnHour = moment(randomMonthDate).add(1, 'h');
                var randomEvent = Math.floor(Math.random() * (eventNames.length - 0));
                var randomLocation = Math.floor(Math.random() * (locationNames.length - 0));
                var randomPalette = pickRandomProperty(triTheming.palettes);

                vm.eventSources[0].events.push({
                    title: eventNames[randomEvent],
                    allDay: false,
                    start: randomMonthDate,
                    end: inAnHour,
                    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, fugiat! Libero ut in nam cum architecto error magnam, quidem beatae deleniti, facilis perspiciatis modi unde nostrum ea explicabo a adipisci!',
                    location: locationNames[randomLocation],
                    backgroundColor: triTheming.rgba(triTheming.palettes[randomPalette]['500'].value),
                    borderColor: triTheming.rgba(triTheming.palettes[randomPalette]['500'].value),
                    textColor: triTheming.rgba(triTheming.palettes[randomPalette]['500'].contrast),
                    palette: randomPalette,
                    resourceId: 'b'
                });
            }
        }

        // listeners

        $scope.$on('addEvent', addEvent);

        // create 10 random events for the month
        createRandomEvents(100, moment().startOf('year'), moment().endOf('year'));

        function randomDate(start, end) {
            var startNumber = start.toDate().getTime();
            var endNumber = end.toDate().getTime();
            var randomTime = Math.random() * (endNumber - startNumber) + startNumber;
            return moment(randomTime);
        }

        function pickRandomProperty(obj) {
            var result;
            var count = 0;
            for (var prop in obj) {
                if (Math.random() < 1/++count) {
                    result = prop;
                }
            }
            return result;
        }
    }
})();
