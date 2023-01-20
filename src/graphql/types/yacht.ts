import type { User } from './user';
import type { YachtTurn } from './yacht-turn';

export type Yacht = {
	Id?: number;
	Total?: number;
	CreatedAt?: Date;
	UpdatedAt?: Date;

	User?: User;
	Turns?: YachtTurn[];
};
