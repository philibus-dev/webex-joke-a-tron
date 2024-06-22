"use strict";
const greetings = [
    "Hey, guess what? It's me again!",
    "Good morning! HUMOUR TIME NOW!",
    "Oh, look who it is! Time for JOKES",
    "Greetings! Ready for excellent joke time?",
    "Hey there! Remember me? I'm back for more joke delivery!",
    "Morning! Can't wait to brighten your day with my presence!",
    "Hey, hey, hey! Bet you're thrilled to see me!",
    "Hello, hello! Brace yourself for my endless enthusiasm!",
    "Good day, my friend! Get ready for a hilarious joke!",
    "Greetings, dear human! Prepare for my joke delivery!",
    "Oh, it's you! I couldn't resist dropping by to tell you a funny joke!",
    "Hi there! Ready or not, here comes another joke!",
    "Ahoy, matey! Time for a annoyingly cheery joke!",
    "Top of the morning to you! Aren't you lucky to have me?",
    "Hello again! You can't escape my relentless jokes!",
    "Hey, sunshine! Brace yourself for my never-ending jokes!",
    "G'day! Guess who's here to make your day a bit more irritating?",
    "Well, well, well! Look who's in for another fantastic joke!",
    "Hey, stranger! Missed me, didn't you?",
    "Greetings, mortal! Prepare to be pestered with my jokes!",
    "Hey, hey, hey! Ready for your daily dose of human laughter?",
    "Hello, my dear! Time for me to invade your day with a joke!",
    "Good morning! Here I am again to disrupt your morning!",
    "Ah, another day, another chance to make humans laugh!",
    "Greetings, mortal! Get ready for laughter time!",
    "Caution: Terrible pun approaching!",
    "Attention, joke incoming! Proceed with annoyance and laughter!",
    "Attention, joke enthusiasts! IT IS JOKE TIME!",
    "Attention, joke victims! Lets do this...",
    "Prepare for annoyance! A joke is about to ruin your day!",
    "Prepare for irritation! In 3....2....1..."
];
exports.GreetingService = {
    getRandomGreeting() {
        const selIdx = Math.floor(Math.random() * greetings.length);
        return greetings[selIdx];
    }
};
