import type { CodeBreakerGuess } from './code-breaker-guess';
import type { GameStatus } from './game-status';
import type { User } from './user';

export type CodeBreaker = {
	Id?: number;
	Status?: GameStatus;
	Columns?: number;
	Colors?: number;
	Score?: number;
	CreatedAt?: Date;
	UpdatedAt?: Date;
	User?: User;
	Guesses?: CodeBreakerGuess[];
};
