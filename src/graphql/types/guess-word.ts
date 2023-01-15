import type { GameStatus } from './game-status';
import type { GuessWordGuess } from './guess-word-guess';
import type { User } from './user';
import type { Word } from './word';

export type GuessWord = {
	Id?: number;
	Status?: GameStatus;
	CreatedAt?: Date;
	UpdatedAt?: Date;
	Guesses?: GuessWordGuess[];
	User?: User;
	Word?: Word;
};
