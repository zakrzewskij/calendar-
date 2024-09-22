document.addEventListener('DOMContentLoaded', function () {
    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
        themeSystem: 'bootstrap5',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth'
        },
        initialView: 'dayGridMonth',
        locale: 'pl',
        events: function (fetchInfo, successCallback, failureCallback) {
            fetch('events.json')
                .then(response => response.json())
                .then(data => successCallback(data))
                .catch(error => failureCallback(error));
        },
        eventContent: function (arg) {
            let timeEl = document.createElement('span');
            timeEl.classList.add('fc-event-time');
            timeEl.innerHTML = arg.event.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) + ' ';

            let titleEl = document.createElement('span');
            titleEl.classList.add('fc-event-title');
            titleEl.innerHTML = arg.event.title;

            let arrayOfDomNodes = [timeEl, titleEl];
            return { domNodes: arrayOfDomNodes };
        },
        bootstrapFontAwesome: {
            close: 'fa-times',
            prev: 'fa-chevron-left',
            next: 'fa-chevron-right',
            prevYear: 'fa-angle-double-left',
            nextYear: 'fa-angle-double-right'
        },
        eventDidMount: function (info) {
            if (info.event.extendedProps.display === 'background') {
                info.el.style.top = '20px'; // Przesunięcie tekstu w dół
                info.el.style.height = 'auto'; // Ustawienie wysokości na automatyczną
                info.el.style.backgroundColor = 'rgba(0, 0, 0, 0.1)'; // Opcjonalne: zmiana koloru tła
            }
        }
    });

    calendar.render();
});
