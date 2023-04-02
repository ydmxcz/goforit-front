

let errorArray = [
    "Accept",        // normal
    "Compile Error",         // compile error
    "Memory Limit Exceeded", // mle
    "Time Limit Exceeded", // tle
    "Output Limit Exceeded", // ole
    "File Error", // fe
    "Nonzero Exit Status",
    "Signalled",
    "Internal Error", // system error
    "Wrong Answer"]

export default {
    formatDate(date) {
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        month = (month < 10) ? '0' + month : month;
        day = (day < 10) ? '0' + day : day;
        hour = (hour < 10) ? '0' + hour : hour;
        minutes = (minutes < 10) ? '0' + minutes : minutes;
        seconds = (seconds < 10) ? '0' + seconds : seconds;
        let currentDate = year + "-" + month + "-" + day
            + " " + hour + ":" + minutes + ":" + seconds;
        return currentDate;
    },
    selectRunStatus(i) {
        if (i > errorArray.length) {
            i = 0
        }
        return errorArray[i - 1]
    }
}