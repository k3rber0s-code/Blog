#! /usr/bin/env node

console.log(
    'This script populates some test posts'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Book = require("./models/post");

const books = [];


const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createBooks();
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

    const book = new Book(postDetail);
    await book.save();
    books[index] = book;
    console.log(`Added book: ${title}`);
}


async function createBooks() {
    console.log("Adding Posts");
    await Promise.all([
        postCreate(0,
            "The Name of the Wind",
            "I have stolen princesses back from sleeping barrow kings. I burned down the town of Trebon. I have spent the night with Felurian and left with both my sanity and my life."
        ),
        postCreate(1,
            "The Slow Regard of Silent Things",
            "Deep below the University, there is a dark place. Few people know of it: a broken web of ancient passageways and abandoned rooms."
        ),
    ]);
}

