var tap  = require('tap');
var game = require('./../game.js').game;
var deck = game.deck;

tap.test('A game should have four players', (t) => {
    t.equal(game.players.length, 4);
    t.end();
});

tap.test('A deck should contain 52 cards', (t) => {
    t.equal(deck.cards.length, 52);
    t.end();
});

tap.test('A deck of cards should have 13 cards for each suit', (t) => {
    t.equal(deck.cards.filter((c) => c.suit === 'spades'  ).length, 13);
    t.equal(deck.cards.filter((c) => c.suit === 'hearts'  ).length, 13);
    t.equal(deck.cards.filter((c) => c.suit === 'clubs'   ).length, 13);
    t.equal(deck.cards.filter((c) => c.suit === 'diamonds').length, 13);
    t.end();
});

tap.test('Dealing requires four players', (t) => {
    var message = 'There must be exactly four players to deal.';

    var p1 = { hand : [] };
    var p2 = { hand : [] };
    var p3 = { hand : [] };
    var p4 = { hand : [] };
    var p5 = { hand : [] };

// TODO: figure out how this kind of assertion works
    //t.throws(game.deal(),                      message);  // cannot be empty
    //t.throws(game.deal([p1, p2, p3]),         { }, message);  // cannot have less than four
    //t.throws(game.deal([p1, p2, p3, p4, p5]), { }, message);  // cannot have more than four
    t.end();
});

tap.test('Dealing should give each player 13 cards', (t) => {
    // arrange

    // act
    game.deal(game.players);

    // assert
    t.equal(game.players[0].hand.cards.length, 13);
    t.equal(game.players[1].hand.cards.length, 13);
    t.equal(game.players[2].hand.cards.length, 13);
    t.equal(game.players[3].hand.cards.length, 13);
    t.end();
});

tap.test('A card should have a suit and rank', (t) => {
    t.ok(deck.cards[0].suit);
    t.ok(deck.cards[0].rank);
    t.end();
});
