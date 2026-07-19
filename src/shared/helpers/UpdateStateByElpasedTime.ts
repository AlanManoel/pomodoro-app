

interface IAppState {
    time: number;
    isRunning: boolean;
    isPaused: boolean;
    counterCicleTime: number;
    currentState: "focus" | "short_break" | "long_break";
    step: 3 | 2 | 1 | 4;
    currentCicleLongTime: number;
    currentCicleShortTime: number;
    currentFocusTime: number;
}

export const updateStateByElapsedTime = (appState: IAppState): IAppState => {

    if (!appState.isRunning || appState.isPaused) return appState;

    const now = Date.now();
    const elapsedSeconds = Math.floor((now - (appState.time ?? now)) / 1000);
    if (elapsedSeconds <= 0) return appState;


    let remaining = appState.counterCicleTime;
    let timeLeft = remaining - elapsedSeconds;
    let currentState = appState.currentState;
    let step = appState.step;

    const advanceCycle = () => {
        if (currentState === 'focus') {
            if (step < 4) {
                step = (step + 1) as 1 | 2 | 3 | 4;
                currentState = 'short_break';
                return appState.currentCicleShortTime;
            } else {
                step = 1;
                currentState = 'long_break';
                return appState.currentCicleLongTime;
            }
        }

        if (currentState === 'short_break' || currentState === 'long_break') {
            currentState = 'focus';
            return appState.currentFocusTime;
        }

        return remaining;
    };

    while (timeLeft <= 0) {
        const overflow = Math.abs(timeLeft);
        const nextTime = advanceCycle();

        timeLeft = nextTime - overflow;
    }


    return {
        ...appState,
        step,
        time: now,
        currentState,
        counterCicleTime: timeLeft,
    };
}
