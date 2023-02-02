const fs = require("fs"),
      sharp = require("sharp");

(async () => {

    let index = 0,
        backgroundIndex = 0;

    const data = {
        images: [],
        backgrounds: []
    };

    for(const image of fs.readdirSync("originals")) {
        
        const url = `images/image${index++}.jpg`;
        const properties = await sharp("originals/" + image).resize({width: 640}).toFile("public/" + url);
        data.images.push({url, width: properties.width, height: properties.height});

        if(properties.width > properties.height) {
            const backgroundUrl = `images/background${backgroundIndex++}.jpg`;
            data.backgrounds.push(backgroundUrl);
            await sharp("originals/" + image).resize({width: 1920}).toFile("public/" + backgroundUrl);
        }

    }

    fs.writeFileSync("public/images/data.js", "const DATA = " + JSON.stringify(data));

})();