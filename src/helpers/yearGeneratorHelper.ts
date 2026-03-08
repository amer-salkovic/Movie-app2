export function generateYears(from: number, to: number,  defaultYear: null | number): void {
    for (let i = from; i <= to; i++) {

        const yearSelect = document.getElementById("movieYears") as HTMLSelectElement;
        const singleYear = document.createElement("option")
        singleYear.value = i.toString()
        singleYear.textContent = i.toString()

        if (i === defaultYear) {
            singleYear.selected = true;
        }

        yearSelect?.append(singleYear)

    }
}