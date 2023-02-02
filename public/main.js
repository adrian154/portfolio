const cover = document.getElementById("cover");
let cover1 = document.getElementById("cover1"),
    cover2 = document.getElementById("cover2");

const backgroundImages = new Array(22).fill().map((_, i) => `images/wide${i}.jpg`);
const getBackground = () => {
    const image = backgroundImages.shift();
    backgroundImages.push(image);
    return image;
};

const fadeOut = element => {
    let frame = 0;
    const animate = () => {
        element.style.opacity = `${(60 - frame) / 60 * 100}%`;
        frame++;
        if(frame < 60) {
            requestAnimationFrame(animate);
        }
    };
    animate();
};

const updateCoverImage = () => {

    // fade out current image
    fadeOut(cover1);
    cover2.style.opacity = 1;

    setTimeout(() => {
        cover1.style.backgroundImage = `url(${getBackground()})`;
        [cover1, cover2] = [cover2, cover1];
        cover.append(cover2, cover1);
    }, 1000);

};

cover1.style.backgroundImage = `url(${getBackground()})`;
cover2.style.backgroundImage = `url(${getBackground()})`;
setInterval(updateCoverImage, 5000);