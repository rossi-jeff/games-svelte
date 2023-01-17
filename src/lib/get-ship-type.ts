import { ShipType } from '../graphql/types/ship-type';

export const getShipType = (shipType: string) => {
	switch (shipType) {
		case 'BattleShip':
			return ShipType.BattleShip;
		case 'Carrier':
			return ShipType.Carrier;
		case 'Cruiser':
			return ShipType.Cruiser;
		case 'PatrolBoat':
			return ShipType.PatrolBoat;
		case 'SubMarine':
			return ShipType.SubMarine;
		default:
			return undefined;
	}
};
