const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];


// Creating array and pushing values of months
const getMonthYear = (props) => {
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
    // const year = new Date().getFullYear();
    const year = props.userYear;
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

// Create 2D array with days values 
const getDays = () => {
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

// Get week values such and sun to sat in 2-D array
const getWeek = () => {
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

export { getMonthYear, getWeek, getDays, weekDays };