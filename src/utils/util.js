import { Buffer } from 'buffer';

const parseDatetime = (data) => {
    const startDatetime = data.startDatetime,
        endDatetime = data.endDatetime,
        totalTime = data.totalTime,
        hikingTime = data.hikingTime,
        breakTime = data.breakTime;

    const _getGroupId = (dateObj) => {
        return dateObj.getUTCFullYear() + '' + (dateObj.getUTCMonth() + 1);
    };

    const _getDatetimeString = (dateObj) => {
        const WEEKDAY = [
            '일요일',
            '월요일',
            '화요일',
            '수요일',
            '목요일',
            '금요일',
            '토요일',
        ];

        const arr = [];
        arr.push(dateObj.getUTCFullYear() + '년');
        arr.push(dateObj.getUTCMonth() + 1 + '월');
        arr.push(dateObj.getUTCDate() + '일');
        arr.push(WEEKDAY[dateObj.getUTCDay()]);

        const hour = dateObj.getUTCHours();
        arr.push(hour >= 12 ? '오후' : '오전');
        arr.push(hour > 12 ? (hour % 12) + '시' : hour + '시');
        arr.push(dateObj.getUTCMinutes() + '분');
        arr.push(dateObj.getUTCSeconds() + '초');
        return arr.join(' ');
    };

    const _getDurationString = (duration) => {
        const arr = [];
        arr.push(Math.floor(duration / 3600) + '시간');
        arr.push(Math.floor((duration % 3600) / 60) + '분');
        arr.push(Math.floor(duration % 60) + '초');
        return arr.join(' ');
    };

    return {
        groupId: _getGroupId(new Date(startDatetime)),
        startDatetime: _getDatetimeString(new Date(startDatetime)),
        endDatetime: _getDatetimeString(new Date(endDatetime)),
        totalTime: _getDurationString(totalTime),
        hikingTime: _getDurationString(hikingTime),
        breakTime: _getDurationString(breakTime),
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
