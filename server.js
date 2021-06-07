const express = require("express");
const mongoose = require("mongoose");

const app = express();
//const PORT = process.env.PORT || 3000;
const PORT = process.env.PORT || 3001;
//mongoose.set("debug", true);

//app.listen(PORT, () => console.log(`Successfully Connected on localhost:${PORT}`));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
//routes//
app.use(require("./routes"));
//mongodb://localhost/social-network-API//
mongoose.connect(
	process.env.MONGODB_URI || "mongodb://localhost/social-network-API",
	{
		useFindAndModify: false,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

mongoose.set("debug", true);

app.listen(PORT, () => console.log(`Successfully Connected on localhost:${PORT}`));