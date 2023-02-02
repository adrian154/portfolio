const fs = require("fs"),
      sharp = require("sharp");

(async () => {
    let index = 0,
        wideindex = 0;
    for(const image of fs.readdirSync("originals")) {
        const properties = await sharp("originals/" + image).resize({width: 640}).toFile(`public/images/image${index++}.jpg`);
        if(properties.width > properties.height) {
            await sharp("originals/" + image).resize({width: 1920}).toFile(`public/images/wide${wideindex++}.jpg`)
        }
    }
})();