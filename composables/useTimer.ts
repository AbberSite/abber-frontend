class Timer {
    sec = 0;
    display = ref(`00:00:00`);
    interval: ReturnType<typeof setInterval> | undefined = undefined;

    public timout: undefined | number;
    public onTimeout: undefined | Function;
    public hours : undefined | boolean

    init = ({ timeout, onTimeout, hours }: { timeout?: number; onTimeout?: Function, hours? :boolean }) => {

        this.timout = timeout
        this.onTimeout = onTimeout
        this.hours = hours

        if(hours){

            this.display.value = `00:00:00`;
        }
        else {
            this.display.value = `00:00`;
        }

        return {display: this.display}


    };

    start = () => {
        this.interval = setInterval(async () => {

            this.sec++;


            if(this.hours){

                this.display.value = `${this.pad(Math.floor(this.sec / 3600))}:${this.pad(
                    Math.floor(this.sec / 60)
                )}:${this.pad(this.sec % 60)}`;
            }else {
                this.display.value = `${this.pad(
                    Math.floor(this.sec / 60)
                )}:${this.pad(this.sec % 60)}`;

            }

            if (this.timout && this.sec === this.timout) {
                await this.onTimeout?.();
            }

        }, 1000);
    };
    stop = () => {
        clearInterval(this.interval);
    };
    reset = () => {
        this.sec = 0;
        clearInterval(this.interval);
        if(this.hours){

            this.display.value = `00:00:00`;
        }else {
            this.display.value = `00:00`;
        }
    };
    pad = (val: number) => {
        return val > 9 ? val : `0` + val;
    };
}

export default () : Timer => new Timer();
