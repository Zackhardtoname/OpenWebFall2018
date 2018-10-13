function emailColor() {
    document.getElementById("email").style.color = "magenta";
}

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();

    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copied: " + $(element).text();
}

function outFunc() {
    var tooltip = document.getElementById("myTooltip");
    tooltip.innerHTML = "Copy to clipboard";
}