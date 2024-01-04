export type Timer = {
    init: Function;
    start: Function;
    stop: Function;
    reset: Function;
    pad: Function;
    sec: number;
    interval : ReturnType<typeof setInterval>|undefined, 
    display: Ref<string>;
};

const timer: Timer = {

    sec: 0,
    display: ref(`00:00:00`),
    interval: undefined,

    init: () => ({
        display : timer.display
    }),

    start: () => {

        timer.interval = setInterval(() => {

            timer.sec++;

            timer.display.value = `${timer.pad(Math.floor(timer.sec / 3600))}:${timer.pad(Math.floor(timer.sec / 60))}:${timer.pad(timer.sec%60)}`

        }, 1000)


    },
    stop: () => {
        clearInterval(timer.interval)
    },
    reset: () => {

        timer.sec = 0;
        clearInterval(timer.interval)
        timer.display.value = `00:00:00`

    },
    pad: (val: number) => {
        return val > 9 ? val : `0` + val;
    }
};

export default () =>  timer;
