export function generateYears(from: number, to:number, selectElement:HTMLSelectElement, defaultYear: null | number): void {
    for(let i = from; i <= to; i++){
        const singleYear = document.createElement("option")
        singleYear.value = i.toString()
        singleYear.textContent = i.toString()

        if(i === defaultYear ){
            singleYear.selected = true;
        }

        selectElement?.append(singleYear)

    }
}