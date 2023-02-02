const cover = document.getElementById("cover");
let cover1 = document.getElementById("cover1"),
    cover2 = document.getElementById("cover2");

const getBackground = () => {
    const image = DATA.backgrounds.shift();
    DATA.backgrounds.push(image);
    return image;
};

const updateCoverImage = () => {

    // fade out current image
    cover1.style.opacity = 0;
    cover2.style.opacity = 1;

    setTimeout(() => {
        cover1.style.transition = "";
        cover2.style.transition = "opacity 1s";
        cover1.style.backgroundImage = `url(${getBackground()})`;
        cover.append(cover1, cover2);
        [cover1, cover2] = [cover2, cover1];
    }, 1000);

};

cover1.style.backgroundImage = `url(${getBackground()})`;
cover2.style.backgroundImage = `url(${getBackground()})`;
setInterval(updateCoverImage, 5000);

const columnContainer = document.getElementById("columns-container");
const columns = [];

for(let i = 0; i < 10; i++) {
    const column = document.createElement("div");
    column.classList.add("column");
    columnContainer.append(column);
    columns.push(column);
}

const buildMasonry = () => {

    const numColumns = Math.floor(window.innerWidth / 300);

    for(let i = 0; i < columns.length; i++) {
        columns[i].style.display = i < numColumns ? "" : "none";
        columns[i].replaceChildren();
    }

    const heights = new Array(numColumns).fill(0)
    for(const image of DATA.images) {

        // find the shortest column
        let shortest = 0, shortestHeight = Infinity;
        for(let i = 0; i < heights.length; i++) {
            if(heights[i] < shortestHeight) {
                shortest = i;
                shortestHeight = heights[i];
            }
        }

        // add image
        const img = document.createElement("img");
        img.src = image.url;
        img.loading = "lazy";
        columns[shortest].append(img);
        heights[shortest] += image.height;

    }

};

buildMasonry();
window.addEventListener("resize", buildMasonry, {passive: true});