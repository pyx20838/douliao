if (!Array.indexOf) {
  Array.prototype.indexOf = function (obj, start) {
    for (var i = (start || 0); i < this.length; i++) {
      if (this[i] == obj) {
        return i;
      }
    }
    return -1;
  };
}
function DatePicker(opts) {
    if (!opts) { opts = {}; }

    if (!opts.bindTo || opts.bindTo.get(0).hasPicker) {
        return;
    }

    this.bindTo = opts.bindTo;
    this.startMonth = new Date().getMonth();
    this.startYear = new Date().getFullYear();
    this.startDay = new Date().getDate();
    this.currentMonth = this.startMonth;
    this.currentYear = this.startYear;
    this.currentDay = this.startDay;
    this.dayNames = ["Su", "M", "T", "W", "Th", "F", "Sa"];
    this.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.container = $('<div class="date-picker"></div>');
    this.container.css({'z-index': '99', 'position': 'absolute', 'display': 'none'});
    this.bindTo.after(this.container);

    var self = this;

    this.container.bind('click', function(e) {
        var target = $(e.target), nodeName = target.get(0).nodeName;
        if (nodeName == 'TD' && target.html() != '-') {
            self.currentDay = target.html();
            self.selectedDay = self.currentDay;
            self.selectedMonth = self.currentMonth;
            self.selectedYear = self.currentYear;
            self.container.find('td').removeClass('selected');
            self.bindTo.val($.map([self.currentYear,
		                           self.currentMonth+1,
		                           target.html()], self.padNum).join('-'));
            target.addClass('selected');
            self.hide();
        }
        if (nodeName == 'A') {
            self.page(target.attr('rel') == 'prev' ? -1 : 1);
        }
        self.bindTo.focus();
        e.preventDefault();
        return false;
    });

    this.bindTo.bind('focus', function() { self.show(); });
    this.bindTo.bind('click', function() { self.show(); });

    if ($('#clickfacade').length == 0) {
        this.clickFacade = $('<div id="clickfacade" style="position: absolute; top: 0; left: 0; z-index: 98;"></div>');
        $(document.body).append(this.clickFacade);
        this.clickFacade.hide();
        this.clickFacade.bind('click', function() { $(this).hide(); $('.date-picker').fadeOut('fast'); });
        $(window).resize(function() {
            self.clickFacade.css({height: $(window).height() + 'px', width: $(window).width() + 'px'});
        });
    } else {
        this.clickFacade = $('#clickfacade');
    }

    this.inject();
    this.bindTo.val(this.monthNames[this.currentMonth] + ' ' + this.currentDay + ', ' + this.currentYear);
    this.bindTo.val($.map([this.currentYear,
                           this.currentMonth+1,
                           this.currentDay], this.padNum).join('-'));
    this.bindTo.get(0).hasPicker = true;
};

DatePicker.prototype.show = function() {
    if (!this.container.is(':visible')) {
        this.clickFacade.css({height: $(document).height() + 'px', width: $(document).width() + 'px'});
        this.clickFacade.show();
        this.container.fadeIn('fast');
    }
};

DatePicker.prototype.hide = function() {
    if (this.container.is(':visible')) {
        this.clickFacade.hide();
        this.container.fadeOut('fast');
    }
};

DatePicker.prototype.setTo = function(date) {
    this.currentMonth = date.getMonth();
    this.currentYear = date.getFullYear();
    this.currentDay = date.getDate();
    this.selectedMonth = this.currentMonth;
    this.selectedDay = this.currentDay;
    this.selectedYear = this.currentYear;
    this.inject();
    this.bindTo.val($.map([date.getFullYear(),
                           date.getMonth()+1,
                           date.getDate()], this.padNum).join('-'));
};

DatePicker.prototype.daysInMonth = function(y, m) {
    return 32 - new Date(y, m, 32).getDate();
};

DatePicker.prototype.dayOfWeek = function(y, m, d) {
    return new Date(y, m, d).getDay();
};

DatePicker.prototype.genMonth = function() {
    var days = this.daysInMonth(this.currentYear, this.currentMonth);
    var out = [];
    var start = this.dayOfWeek(this.currentYear,this.currentMonth,1);
    // figure out when the first starts and pad as many blanks needed before looping and adding days
    for (var i = 0; i < start; i++) {
        out.push('-');
    }
    // loop through all days calculated for this month and append
    for (var i = 0; i < days; i++) {
        out.push(i+1);
    }
    var padUntil = 28; // assume (4) 7 day weeks to display
    // pad the end of the array
    if (out.length/7 > 4) { // if more needed, pad more weeks
        padUntil += (Math.ceil(out.length/7)-4)*7;
        for (var i = out.length; i < padUntil; i++) {
            out.push('-');
        }
    }
    var arr = [];
    for (var i = 0; i < padUntil; i+=7) { // splice out groups of from list of days
        arr.push(out.slice(i,i+7));
    }
    return arr;
};

DatePicker.prototype.isSelected = function(day) {
    if (!this.selectedDay) {
        return this.currentMonth == this.startMonth &&
            this.currentYear == this.startYear &&
            day == this.startDay;
    } else {
        return this.currentMonth == this.selectedMonth &&
            this.currentYear == this.selectedYear &&
            day == this.selectedDay;
    }
};

DatePicker.prototype.html = function() {
    var out = [];
    out.push('<h3><a href="#" rel="prev" class="pager prev">&laquo;</a>');
    out.push(this.monthNames[this.currentMonth] + ' ' + this.currentYear);
    out.push('<a href="#" rel="next" class="pager next">&raquo;</a></h3>');
    out.push('<table cellspacing="0"><thead><tr>');
    for (var i = 0; i < this.dayNames.length; i++) {
        out.push('<th>' + this.dayNames[i] + '</th>');
    }
    out.push('</thead><tbody>');
    var monthData = this.genMonth();
    for (var i = 0; i < monthData.length; i++) {
        out.push('<tr>');
        for (var j = 0; j < monthData[i].length; j++) {
            out.push('<td class="' + (this.isSelected(monthData[i][j]) ? 'selected' : '') + '">' + monthData[i][j] + '</td>');
        }
        out.push('</tr>');
    }
    out.push('</tbody></table>');
    return out.join('\n');
};

DatePicker.prototype.page = function(direction) {
    this.currentMonth += direction;
    if (this.currentMonth > 11) {
        this.currentMonth = 0;
        this.currentYear += 1;
    } else if (this.currentMonth < 0) {
        this.currentMonth = 11;
        this.currentYear -= 1;
    }
    this.inject();
};

DatePicker.prototype.inject = function() {
    this.container.html(this.html());
};

DatePicker.prototype.padNum = function(num) {
    if (num < 10) {
        num = '0' + num;
    }
    return num.toString();
};