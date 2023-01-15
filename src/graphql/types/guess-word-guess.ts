import type { GuessWordGuessRating } from './quess-word-guess-rating';

export type GuessWordGuess = {
	Id?: number;
	Guess?: string;
	Ratings?: GuessWordGuessRating[];
};
