import type { Color } from './color';
import type { Key } from './key';

export type CodeBreakerGuess = {
	Id?: number;
	Guess?: CodeBreakerGuessColor[];
	Keys?: CodeBreakerGuessKey[];
};

export type CodeBreakerGuessColor = {
	Color?: Color;
};

export type CodeBreakerGuessKey = {
	Key?: Key;
};
