const fs = require("fs"),
      sharp = require("sharp");

(async () => {

    const filenames = fs.readdirSync("originals");
    const images = [];
    
    for(let i = 0; i < filenames.length; i++) {
        
        const path = "originals/" + filenames[i],
              smallUrl = `images/image${i}-small.jpg`,
              bigUrl = `images/image${i}-big.jpg`;
            
        const properties = await sharp(path).resize({width: 640}).toFile("public/" + smallUrl);
        
        // resize landscape images to width of 1920, portrait images to height of 1080
        if(properties.width > properties.height) {
            await sharp(path).resize({width: 1920}).toFile("public/" + bigUrl);
        } else {
            await sharp(path).resize({height: 1080}).toFile("public/" + bigUrl);
        }

        images.push({smallUrl, bigUrl, width: properties.width, height: properties.height});

    }

    fs.writeFileSync("public/images/images.js", "const IMAGES = " + JSON.stringify(images));

})();