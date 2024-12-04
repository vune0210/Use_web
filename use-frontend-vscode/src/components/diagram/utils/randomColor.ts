const colors = ["#071952", "#088395", "#35a29f"];

export function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}
