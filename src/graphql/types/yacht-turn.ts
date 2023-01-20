import type { YachtCategory } from './yacht-category';

export type YachtTurn = {
	Id?: number;
	RollOne?: number[];
	RollTwo?: number[];
	RollThree?: number[];
	Category?: YachtCategory;
	Score?: number;
};
