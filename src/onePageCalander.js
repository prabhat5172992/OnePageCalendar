import React, { Component } from "react";
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export default class Calender extends Component {
  constructor() {
    super();
    this.state = {
      days: this.getDays(),
      weeks: this.getWeek(),
      monthYear: this.getMonthYear(),
      currentDate: new Date().toDateString().split(" "),
    };
  }
  componentDidMount() {
    this.check = setInterval(() => {
        if(this.state.currentDate[2] !== new Date().toDateString().split(" ")[2]) {
          window.location.reload();
        }
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.check);
  }
  getDays() {
    const days = Array(7).fill(0).map(() => Array(5).fill(0));
    days.forEach((item, i) => {
      let count = i+1;
      item.forEach((_, y) => {
        days[i][y] = (count <= 31 ? count : 0);
        count += 7;
      })
    });
    
    return days;
  }
  renderDays() {
    const { days, currentDate } = this.state;
    const rows = [];
    let key = 1;
    const Day = Number(currentDate[2]);
    days.forEach((item) => {
      rows.push(
        <tr key={`days_row${key}`}>
          {item.map((i) => (
            <td
              key={`days_cell${i}`}
              className={i === Day ? "days_cell addBackg" : "days_cell"}
            >
              {i ? i : null}
            </td>
          ))}
        </tr>
      );
      key += 1;
    });
    return rows;
  }
  renderTableDays() {
    return (
      <table id="calDays" className="table_days leftMargin">
        <thead>
          <tr>
            <th colSpan="5" className="days_header lgFontSize">
              Days
            </th>
          </tr>
        </thead>
        <tbody>{this.renderDays()}</tbody>
      </table>
    );
  }
  getMonthYear() {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const monthGroup = {};
    const day = "01";
    const year = new Date().getFullYear();
    monthCount.forEach((item, i) => {
      const d = new Date(`${item}/${day}/${year}`); // MM/DD/YYYY
      const w = d.toString().split(" ")[0];
      const ar = months[i];
      if (monthGroup[w]) {
        monthGroup[w] = [...monthGroup[w], ar];
      } else {
        monthGroup[w] = [ar];
      }
    });
    return monthGroup;
  }
  orderMonthYear(monthYear) {
    const obj = {};
    const week = [...weekDays];
    for (let i = 0; i < 7; i++) {
      obj[week[i]] = monthYear[week[i]];
    }
    return obj;
  }
  renderMonthYear() {
    const { currentDate, monthYear } = this.state;
    const month_Year = this.orderMonthYear(monthYear);
    const month = currentDate[1];
    const my = [];
    let key = 1;
    const monthVal = Object.values(month_Year);
    monthVal.forEach((item) => {
      my.push(
        <th key={`my_${key}`} className="days_cell days_header">
          {item.map((i) => (
            <span
              key={`mySpan_${i}`}
              className={
                month === i ? "my_headerSpan addBackg" : "my_headerSpan"
              }
            >
              {i}
            </span>
          ))}
        </th>
      );
      key += 1;
    });
    return my;
  }
  getWeek() {
    const w = [];
    const week = [...weekDays];
    for (let i = 0; i < 7; i++) {
      w.push(Array(7).fill(0));
    }
    for (let i = 0; i < 7; i++) {
      for (let j = 0; j < 7; j++) {
        w[i][j] = week[j];
      }
      week.push(week.shift());
    }
    return w;
  }
  getIndex(d) {
    let idx = null;
    this.state.days.forEach((item, index) => {
      if (item.indexOf(d) !== -1) {
        idx = index;
      }
    });
    return idx;
  }
  pointDays(index, week, i, day) {
    if((index === this.getIndex(day)) && (week === i)){
      if(week === 'Sun') {
        return "days_cell addBackg colorRed";
      }
      else {
        return "days_cell addBackg";
      }
    }
    return "days_cell";
  }
  renderWeek() {
    const { weeks, currentDate } = this.state;
    const calWeek = [];
    const week = currentDate[0];
    const day = Number(currentDate[2]);
    let key = 1;
    weeks.forEach((item, index) => {
      calWeek.push(
        <tr key={`calWeek_row${key}`}>
          {item.map((i) => (
            <td
              key={`calWeek_cell${i}`}
              className={this.pointDays(index, week, i, day)}
            >
              {i}
            </td>
          ))}
        </tr>
      );
      key += 1;
    });
    return calWeek;
  }
  renderTableMonthYear() {
    return (
      <table id="monthYear" className="table_days rightMargin">
        <thead>
          <tr>{this.renderMonthYear()}</tr>
        </thead>
        <tbody>{this.renderWeek()}</tbody>
      </table>
    );
  }
  render() {
    return (
      <div>
        <h1>{`One Page Calendar of ${new Date().getFullYear()}`}</h1>
        {this.renderTableDays()}
        {this.renderTableMonthYear()}
      </div>
    );
  }
}
