const { mongoose } = require("mongoose");

const fileSchema = mongoose.Schema(
  {
    filename: {
      type: String,
    },
    public_id: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const File = mongoose.model("File", fileSchema);

module.exports = File;
