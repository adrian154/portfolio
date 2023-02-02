const coverImage = document.getElementById("cover");

const updateCoverImage = () => {
    coverImage.style.backgroundImage = `url(images/wide${Math.floor(Math.random() * 22)}.jpg)`; 
};

updateCoverImage();
setInterval(updateCoverImage, 10000);