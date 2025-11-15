const { default: mongoose } = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {type: String},
    img : {type: String, required: true},
    category: {type: String},
    description: {type: String},
    short_description: {type: String},
    
},
{
    timestamps: true,
    versionKey: false,
}
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;