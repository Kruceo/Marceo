export function taskElement(first,last,content){
    const checked = first[0] == '[x]'
    return `<span id="markdown" class="task ${checked?'checked':''}">
        <div id="markdown" class="inner"></div>
    </span>`
}