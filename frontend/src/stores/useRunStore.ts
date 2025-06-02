import { create } from "zustand"

interface RunStore {
    isThrottled: boolean
    throttleUntil: number
    throttleDuration: number
    triggerThrottle: () => void
    canProceed: () => boolean
}

export const useRunStore = create<RunStore>()((set, get) => {

    return {
        isThrottled: false,
        throttleUntil: 0,
        throttleDuration: 10000,
        triggerThrottle: () => {
            const duration = get().throttleDuration;
            const until = Date.now() + duration;
            set({ isThrottled: true, throttleUntil: until });

            setTimeout(() => {
                set({ isThrottled: false, throttleUntil: 0 });
            }, duration);
        },
        canProceed: () => {
            const { isThrottled, throttleUntil } = get();
            return !isThrottled || (Date.now() >= throttleUntil);
        }
    }
})