import mongoose, { Schema } from "mongoose";

mongoose.connect("mongodb+srv://elriclai88:a123b456C7@cluster0.sbbqi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

export const Authentication = mongoose.model("Authentication", new Schema({
    _id: { type: mongoose.Types.ObjectId, default: mongoose.Types.ObjectId() },
    api_token: { type: String },
    summary: {
        created: { type: Date, default: new Date() },
        lastModified: { type: Date, default: new Date() }
    }
}));

interface Authentication {
    _id?: mongoose.Types.ObjectId,
    api_token?: String,
    summary?: {
        created?: Date,
        lastModified?: Date
    }
}

export const parseAuthentication = (obj: Authentication) => {
    return {
        _id: obj._id,
        api_token: obj.api_token,
        summary: obj.summary
    };
}

export const Movies = mongoose.model("Movies", new Schema({
    _id: { type: mongoose.Types.ObjectId, default: mongoose.Types.ObjectId() },
    name: { type: String },
    price: { type: Number },
    episode: { type: Number },
    length: { type: Number },
    summary: {
        created: { type: Date, default: new Date() },
        lastModified: { type: Date, default: new Date() }
    }
}));

interface Movie {
    _id?: mongoose.Types.ObjectId,
    name?: String,
    price?: Number,
    episode?: Number,
    length?: Number,
    summary?: {
        created?: Date,
        lastModified?: Date
    }
}

export const parseMovie = (obj: Movie) => {
    return {
        _id: obj._id,
        name: obj.name,
        price: obj.price,
        episode: obj.episode,
        length: obj.length,
        summary: obj.summary
    };
}

export const parseMovies = (arrays: any) => {
    return arrays.map((array: Movie) => ({
        _id: array._id,
        name: array.name,
        price: array.price,
        episode: array.episode,
        length: array.length,
        summary: array.summary
    }));
}