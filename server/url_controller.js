const UrlModel = require('./url_model');

const getUrl = async (lengthenedUrl) => {
    const data = await UrlModel.findOne({lengthenedUrl});
    return data;
};

const createUrl = async ({title, lengthenedUrl, originalUrl}) => {
    try{
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