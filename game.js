'use strict';

// in default suitOrder for Hand
var defaultSuits  = ['hearts', 'clubs', 'diamonds', 'spades'];

// in default sortOrder for Hand
var defaultRanks = [
    '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'
];

var Card = function (suit, rank, weight, isTrump) {
    this.suit    = suit;
    this.rank    = rank;
    this.weight  = weight;
    this.isTrump = isTrump;

    this.hasBeenPlayed = false;
};

var Deck = function () {
    this.cards = [];
};

Deck.prototype.initialize = function (suits, ranks, trumpSuit) {
    suits = suits || defaultSuits;
    ranks = ranks || defaultRanks;

    for (var i = 0; i < suits.length; i++) {
        for (var j = 0; j < ranks.length; j++) {
            this.cards.push(
                new Card(
                    suits[i],
                    ranks[j],
                    j + 1,  // weight
                    suits[i] === trumpSuit
                )
            );
        }
    }

    var length = this.cards.length;
    this.cards.forEach((card) => {
        if (card.isTrump) {
            card.weight += length;
        }
    });
};

Deck.prototype.shuffle = function () {
    // Fisher-Yates shuffle
    for (var i = this.cards.length - 1; i > 0; i--) {
        var j    = Math.floor(Math.random() * (i + 1));
        var temp = this.cards[i];

        this.cards[i] = this.cards[j];
        this.cards[j] = temp;
    }
};

var Hand = function (cards) {
    this.cards = Array.isArray(cards) ? cards : [];
};

Hand.prototype.sort = function (suitOrder, sortOrder) {
    var self = this;
    var hand = [];

    this.suitOrder = Array.isArray(suitOrder) ? suitOrder : defaultSuits;
    this.sortOrder = Array.isArray(sortOrder) ? sortOrder : defaultRanks;

    self.suitOrder.forEach((suit) => {
        self.sortOrder.forEach((rank) => {
            self.cards.filter((card) => {
                return card.suit === suit;
            }).forEach((cardInSuit) => {
                if (cardInSuit.rank === rank) {
                    hand.push(new Card(suit, rank));
                }
            });
        });
    });

    if (hand.length === this.cards.length) {
        this.cards = hand;  // replace with sorted hand
    }

    return this;
};

var Player = function (ordinal, team) {
    var team    = team || 0;
    var ordinal = parseInt(ordinal);

    if (!ordinal)                 return null;
    if (isNaN(parseInt(ordinal))) return null;

    this.hand;
    this.isDealer   = false;
    this.getTeam    = () => { return team;    }
    this.getOrdinal = () => { return ordinal; }
};

var deck = new Deck();
deck.initialize(defaultSuits, defaultRanks, defaultSuits['spades']);

var playerSouth = new Player(0, 0);
var playerWest  = new Player(1, 1);
var playerNorth = new Player(2, 0);
var playerEast  = new Player(3, 1);

var deal = (players) => {
    players = players || [];
    deck    = deck    || { cards: [] };

    if (players.length !== 4) {
        throw new Error('There must be exactly four players to deal.');
    }

    if (deck.cards.length !== 52) {
        throw 'There must be exactly 52 cards in the deck to deal.';
    }

    deck.shuffle();  // ensure at least one shuffle

    var deckCardIndex = 0;

    for (var i = 0; i < 13; i++) {     // each card in hand
        for (var j = 0; j < 4; j++) {  // each player
            if (players[j].hand === undefined) {
                players[j].hand = new Hand();
            }

            players[j].hand.cards.push(deck.cards[deckCardIndex++]);
        }
    }
};

exports.game = {
    deck    : deck,
    deal    : deal,
    players : [playerSouth, playerWest, playerNorth, playerEast],
};
