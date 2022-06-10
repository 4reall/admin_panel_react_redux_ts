import { IHero, IHeroesStore } from '../types/store';
import { Statuses } from '../types/enums';
import {
	createAsyncThunk,
	createSlice,
	nanoid,
	PayloadAction,
} from '@reduxjs/toolkit';
import { deleteById } from '../helpers/helpers';
import { useHttp } from '../hooks/useHttp';
import { HEROES_URL } from '../constants';

const initialState: IHeroesStore = {
	heroes: [],
	heroesLoadingStatus: Statuses.OK,
};

export const fetchHeroes = createAsyncThunk(
	'heroes/fetchHeroes',
	(): Promise<IHero[]> => {
		const { request } = useHttp();
		return request(HEROES_URL);
	}
);

const heroesSlice = createSlice({
	name: 'heroes',
	initialState,
	reducers: {
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
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchHeroes.pending, (state) => {
				state.heroesLoadingStatus = Statuses.LOADING;
			})
			.addCase(fetchHeroes.fulfilled, (state, action) => {
				state.heroes = action.payload;
				state.heroesLoadingStatus = Statuses.OK;
			})
			.addCase(fetchHeroes.rejected, (state) => {
				state.heroesLoadingStatus = Statuses.ERROR;
			})
			.addDefaultCase(() => {});
	},
});

const { actions, reducer } = heroesSlice;

export default reducer;
export const { heroDeleted, heroPosted } = actions;
