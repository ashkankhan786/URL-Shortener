import mongoose from "mongoose";

const UrlSchema = new mongoose.Schema({
  shortID: {
    type: String,
    required: true,
    unique: true,
  },
  redirectUrl: {
    type: String,
    required: true,
  },
  visits: [
    {
      timestamps: {
        type: Number,
      },
    },
  ],
});

const Url = mongoose.model("url", UrlSchema);

export { Url };
