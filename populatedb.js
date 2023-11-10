#! /usr/bin/env node

console.log(
    'This script populates some test posts'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Post = require("./models/post_model");


const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createPosts();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Fantasy genre, regardless of the order
// in which the elements of promise.all's argument complete.

async function postCreate(index, title, body) {
    const postDetail = {
        title: title,
        body: body
    };

    const post = new Post(postDetail);
    await post.save();
    console.log(`Added post: ${title}`);
}


async function createPosts() {
    console.log("Adding Posts");
    await Promise.all([
        postCreate(0,
            "Hummus",
            "# Ingredients\n" +
            "- 260 g chickpeas (1 can)\n" +
            "- 30 g lemon juice (can vary as the lemons can be more or less acidic)\n" +
            "- 60 g tahini\n" +
            "- 60 g olive oil\n" +
            "- 1 garlic clove (can be substituted for garlic powder/granules)\n" +
            "- 2 ice cubes\n" +
            "- 30-50 g water\n" +
            "- 1/2 tsp cumin\n" +
            "- salt (about 1/3 tsp) and pepper to taste\n" +
            "# Instructions\n" +
            "1. Drain the chickpeas, mince the garlic and add it to blender/food processor with all the other ingredients. You can start with lower amounts of water and/or oil and add until you are satisfied with the consistency. To avoid a strong taste of garlic, put it to the food processor at first with the lemon juice and let sit for a couple of minutes. \n" +
            "2. Blend everything together until smooth. Serve with more olive oil and tahini on top."
        )
    ]);
}

