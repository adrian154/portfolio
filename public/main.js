const cover = document.getElementById("cover");
let cover1 = document.getElementById("cover1"),
    cover2 = document.getElementById("cover2");

const backgroundImages = new Array(22).fill().map((_, i) => `images/wide${i}.jpg`);
const getBackground = () => {
    const image = backgroundImages.shift();
    backgroundImages.push(image);
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