import React, { Component } from "react";
import { getMonthYear, getWeek, getDays, weekDays } from './helper';


export default class Calender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: getDays(),
      weeks: getWeek(),
      monthYear: getMonthYear(this.props),
      currentDate: this.props.currentDate,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.currentDate[3] !== state.currentDate[3]) {
      return {
        monthYear: getMonthYear(props),
        currentDate: props.currentDate
      };
    }
    return null;
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

  // Create table with days values
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

  // Create table with days, this is complete table
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

  // Rearrange the monthyear
  orderMonthYear(monthYear) {
    const obj = {};
    const week = [...weekDays];
    for (let i = 0; i < 7; i++) {
      obj[week[i]] = monthYear[week[i]];
    }
    return obj;
  }

  // Create month table header to point to corresponding starting week day like jan starts from sunday
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

  // Calculate the index to paint month date and corresponding week day
  getIndex(d) {
    let idx = null;
    this.state.days.forEach((item, index) => {
      if (item.indexOf(d) !== -1) {
        idx = index;
      }
    });
    return idx;
  }

  // Get the day to be painted
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

  // Create week table
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

  // Create table to display monthe year and weeks
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
        <h1>{`One Page Calendar of ${this.props.userYear}`}</h1>
        {this.renderTableDays()}
        {this.renderTableMonthYear()}
      </div>
    );
  }
}
