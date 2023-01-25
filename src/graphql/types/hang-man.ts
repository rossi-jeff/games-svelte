import type { GameStatus } from './game-status';
import type { User } from './user';
import type { Word } from './word';

export type HangMan = {
	Id?: number;
	Correct?: string[];
	Wrong?: string[];
	Status?: GameStatus;
	Score?: number;
	CreatedAt?: Date;
	UpdatedAt?: Date;
	User?: User;
	Word?: Word;
};
