const ApiError = require("../util/apiError");
const slugify = require("slugify");

exports.deleteOne = async (Model,id) =>{
    try {
        const document = await Model.findByIdAndDelete(id);
        if (!document)
            throw new ApiError(`No document for this id ${id}`, 404);
        return document;
    }
    catch(err) {
        throw new ApiError(err.message,err.statusCode||500);
    }   
}

exports.updateOne = async (Model,id,object) =>{
    try {
        const document = await Model.findByIdAndUpdate(id, object,{new: true});
        if (!document)
            throw new ApiError(`No document for this id ${id}`, 404);
        return document;
    }
    catch(err) {
        throw new ApiError(err.message,err.statusCode||500);
    }
};

exports.createOne = async (Model,object) =>{
    try {
        const newDoc = await Model.create(object);
        return newDoc;
    }
    catch(err) {
        throw new ApiError(err.message,err.statusCode||500);
    }
};

exports.getOneById = async (Model,id, populate) => {
    try {
        let document = await Model.findById(id).populate(populate);

        if (!document)
            throw new ApiError(`No document for this id ${id}`, 404);

        return document;
    }
    catch(err) {
        throw new ApiError(err.message,err.statusCode||500);
    }
};

exports.getOneByQuery = async (Model,queries, populate) => {
    try {
        if (!queries) queries = [{}];
        let document = await Model.findOne({$and:[...queries]}).populate(populate);

        if (!document)
            throw new ApiError(`No document for this queries`, 404);

        return document;
    }
    catch(err) {
        throw new ApiError(err.message,err.statusCode||500);
    }
};

exports.getAll = async (Model,page,limit,selected,prefixName,sortBy,DESC,queries) =>{
    try {
        if (!queries) queries = [{noQueries:1}];
        if (!prefixName) prefixName = '';
        let skip = (page-1)*limit;
        let slugy = slugify(prefixName,{lower: true});
        let documents = await Model.find({$or:[{'slug':{$regex:'^'+slugy}},{$and:[...queries]}]})
        .sort({[sortBy]:(-1*DESC+1*!DESC)})
        .select(selected)
        .skip(skip)
        .limit(limit);

        return documents;
    }
    catch(err) {
        throw new ApiError(err.message,err.statusCode||500);
    }
};