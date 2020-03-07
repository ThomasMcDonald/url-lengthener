const UrlModel = require('./url_model');

/**
 * Find by lengthened url
 * @param {string} lengthenedUrl 
 */
const getUrl = async (lengthenedUrl) => {
    try{
        const data = await UrlModel.findOne({lengthenedUrl});
        return data;
    }catch(err){
        console.error(err);
        return {}
    }
    
};

/**
 * Find url by originalUrl
 * @param {string} originalUrl 
 */
const findUrlByOrigin = async (originalUrl) => {
    try{
        const data = await UrlModel.findOne({originalUrl});

        return data;
    }catch(err){
        console.error(err);
        return {};
    }
};


const createUrl = async ({title, lengthenedUrl, originalUrl}) => {
    try{
        const existingUrl = await findUrlByOrigin(originalUrl);
        if(existingUrl) return existingUrl;

        const url = new UrlModel({
            title,
            lengthenedUrl,
            originalUrl,
        });
    
        const data = await url.save();
    
        return data;
    }catch(err){
        console.error(err);
        return {};
    }
};


module.exports = {
    getUrl,
    createUrl
}