const weekDays = ['понедельник', 'вторник', 'среду', 'четверг', 'пятницу', 'субботу', 'воскресенье'];

const days = ['дней', 'день', 'дня', 'дня', 'дня', 'дней', 'дней', 'дней', 'дней', 'дней'];

const formatData = (date: string): string => {
  const currentDate = new Date();
  const orderDate = new Date(date);

  const daysFromOrder: number = Math.floor((currentDate.getTime() - orderDate.getTime()) / 1000 / 3600 / 24);
  const time = `${orderDate.getHours()}:${orderDate.getMinutes()}`;
  const remains: number = daysFromOrder % 10;

  if (daysFromOrder < 1) {
    return `сегодня в ${time}`;
  }
  if (daysFromOrder < 2) {
    return `вчера в ${time}`;
  }
  if (daysFromOrder < 7) {
    return `в ${weekDays[orderDate.getDay() - 1]} в ${time}`;
  }
  if (daysFromOrder <= 20) {
    return `${daysFromOrder} дней назад в ${time}`;
  }
  return `${daysFromOrder} ${days[remains]} назад в ${time}`;
};

export default formatData;
