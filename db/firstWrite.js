const { connectToDB, mongoose } = require('./mongoConnection');
const { Note } = require('./notes');

const firstNote = new Note({
    content: 'I can\'t believe i\'m doing this again'
});

const secondNote = new Note({
    content: 'Well, better believe it'
});

async function firstWrite() {
    await connectToDB();
    console.log('Connected to MongoDB');
    const returnedFirstNote = await firstNote.save();
    console.log('firstNote: ', returnedFirstNote);
    const returnedSecondNote = await secondNote.save();
    console.log('secondNOte: ', returnedSecondNote);
    // await Note.deleteMany();
    mongoose.connection.close().then(() => console.log('writes all written, connection closed'));

}

firstWrite();