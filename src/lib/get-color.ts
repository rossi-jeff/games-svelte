import { Color } from '../graphql/types/color';

export const getColor = (name: string) => {
	switch (name) {
		case 'Black':
			return Color.Black;
		case 'Blue':
			return Color.Blue;
		case 'Brown':
			return Color.Brown;
		case 'Green':
			return Color.Green;
		case 'Orange':
			return Color.Orange;
		case 'Purple':
			return Color.Purple;
		case 'Red':
			return Color.Red;
		case 'White':
			return Color.White;
		case 'Yellow':
			return Color.Yellow;
	}
};
