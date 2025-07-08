export class Time {
    public days: number;
    public hours: number;
    public minutes: number;
    public seconds: number;

    constructor(public d: number = 0, public h: number = 0, public m: number = 0, public s: number = 0) {
        this.days = d;
        this.hours = h;
        this.minutes = m;
        this.seconds = s;
    }

    public static fromMilliseconds(milliseconds: number): Time {
        let time = new Time();
        let seconds = Math.floor(milliseconds / 1000);
        return time.fromSecondsToTime(seconds);
    }

    toSeconds(): number {
        return this.days * 86400 + this.hours * 3600 + this.minutes * 60 + this.seconds;
    }

    fromSecondsToTime(totalSeconds: number) {
        let days = Math.floor(totalSeconds / 86400);
        let hours = Math.floor((totalSeconds % 86400) / 3600);
        let minutes = Math.floor((totalSeconds % 3600) / 60);
        let seconds = totalSeconds % 60;

        return new Time(days, hours, minutes, seconds);
    }
}



class Worker {
    Id: number;
    Progress: number;
    constructor(id: number, progress: number) {
        this.Id = id;
        this.Progress = progress;
    }
}

export const hubs = $state(new Map());

export function createHub() {
    const activeWorkers = $state([] as Worker[]);
    let requiredWork = $state(3600);
    const completedWork = $derived(
        activeWorkers.reduce((sum, worker) => sum + worker.Progress, 0)
    );

    return {
        totalRequiredWork: $derived(requiredWork),
        totalCompletedWork: $derived(completedWork),

        setTotalWork: (value: number) => {
            requiredWork = value;
        },

        registerWorker: (worker: Worker) => {
            activeWorkers.push(worker);
        },

        unregisterWorker: (worker: Worker) => {
            activeWorkers.filter((worker_) => worker_.Id !== worker.Id);
        }
    }
}