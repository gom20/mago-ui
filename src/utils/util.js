import { Buffer } from 'buffer';

const parseDatetime = (startDatetime, endDatetime) => {
    const WEEKDAY = [
        '일요일',
        '월요일',
        '화요일',
        '수요일',
        '목요일',
        '금요일',
        '토요일',
    ];
    const startDate = new Date(startDatetime);
    const year = startDate.getFullYear();
    const month = startDate.getMonth() + 1;
    const date = startDate.getDate();
    const weekday = WEEKDAY[startDate.getDay()];

    const endDate = new Date(endDatetime);
    const secondDiff = Math.abs(endDate - startDate) / 1000;
    const totalMinute = Math.ceil((secondDiff % 3600) / 60);
    let totalHour = Math.round(secondDiff / 3600);

    let startHour = startDate.getHours();
    startHour = startHour % 12 ? startHour % 12 : 12;
    const startAmpm = startHour >= 12 ? '오후' : '오전';
    const startMinute = startDate.getMinutes();

    let endHour = endDate.getHours();
    endHour = endHour % 12 ? endHour % 12 : 12;
    const endAmpm = startHour >= 12 ? '오후' : '오전';
    const endMinute = endDate.getMinutes();

    return {
        year: year,
        month: month,
        date: date,
        weekday: weekday,
        totalHour: totalHour,
        totalMinute: totalMinute,
        startHour: startHour,
        startMinute: startMinute,
        startAmpm: startAmpm,
        endHour: endHour,
        endMinute: endMinute,
        endAmpm: endAmpm,
    };
};

const groupBy = (objectArray, property) => {
    return objectArray.reduce((acc, obj) => {
        const key = obj[property];
        if (!acc[key]) {
            acc[key] = [];
        }
        // Add object to list for given key's value
        acc[key].push(obj);
        return acc;
    }, {});
};

const parseJwt = (token) => {
    return JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
};

const util = {
    parseDatetime,
    groupBy,
    parseJwt,
};

export default util;
