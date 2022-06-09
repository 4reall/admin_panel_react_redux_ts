import { IHero, IHeroesStore } from '../types/store';
import { Statuses } from '../types/enums';
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { deleteById } from '../helpers/helpers';

const initialState: IHeroesStore = {
	heroes: [],
	heroesLoadingStatus: Statuses.OK,
};

const heroesSlice = createSlice({
	name: 'heroes',
	initialState,
	reducers: {
		heroesLoading: (state) => {
			state.heroesLoadingStatus = Statuses.LOADING;
		},
		heroesFetched: (state, action: PayloadAction<IHero[]>) => {
			state.heroes = action.payload;
			state.heroesLoadingStatus = Statuses.OK;
		},
		heroPosted: {
			reducer: (state, action: PayloadAction<IHero>) => {
				state.heroes.push(action.payload);
			},
			prepare: (hero: IHero) => {
				return { payload: { ...hero, id: nanoid() } };
			},
		},
		heroDeleted: (state, action: PayloadAction<string>) => {
			state.heroes = deleteById(state.heroes, action.payload);
		},
		heroesLoadingError: (state) => {
			state.heroesLoadingStatus = Statuses.ERROR;
		},
	},
});

const { actions, reducer } = heroesSlice;

export default reducer;
export const {
	heroesLoading,
	heroesFetched,
	heroDeleted,
	heroPosted,
	heroesLoadingError,
} = actions;
