import {generateYears} from "./helpers/yearGeneratorHelper";
import {renderPreviousSearches} from "./ui/renderPreviousSearches";
import {bindSearchEvent} from "./events/SearchEvent";

function init(): void {

     const currentYear = new Date().getFullYear();
    generateYears(1960, currentYear, currentYear);
    renderPreviousSearches()
    bindSearchEvent()
}

init()