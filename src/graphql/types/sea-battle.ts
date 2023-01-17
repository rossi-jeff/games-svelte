import type { SeaBattleShip } from './sea-battle-ship';
import type { SeaBattleTurn } from './sea-battle-turn';
import type { User } from './user';

export type SeaBattle = {
	Id?: number;
	Axis?: number;
	CreatedAt?: Date;
	UpdatedAt?: Date;

	User?: User;
	Ships?: SeaBattleShip[];
	Turns?: SeaBattleTurn[];
};
