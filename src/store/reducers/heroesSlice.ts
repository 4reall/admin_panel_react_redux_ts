import { Heroes, IHero, IHeroesState, RootState } from '../../types/store';
import { Elements, Statuses } from '../../types/helpers';
import {
	createAsyncThunk,
	createEntityAdapter,
	createSlice,
	EntityId,
	PayloadAction,
} from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/useHttp';
import { HEROES_URL } from '../../constants';
import { createSelector } from 'reselect';

const heroesAdapter = createEntityAdapter<IHero>();

const initialState: IHeroesState = heroesAdapter.getInitialState({
	heroesLoadingStatus: Statuses.OK,
});

export const fetchHeroes = createAsyncThunk(
	'heroes/fetchHeroes',
	(): Promise<Heroes> => {
		const { request } = useHttp();
		return request(HEROES_URL);
	}
);

const heroesSlice = createSlice({
	name: 'heroes',
	initialState,
	reducers: {
		heroPosted: (state, action: PayloadAction<IHero>) => {
			heroesAdapter.addOne(state, action.payload);
		},
		heroDeleted: (state, action: PayloadAction<EntityId>) => {
			heroesAdapter.removeOne(state, action.payload);
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchHeroes.pending, (state) => {
				state.heroesLoadingStatus = Statuses.LOADING;
			})
			.addCase(fetchHeroes.fulfilled, (state, action) => {
				heroesAdapter.setAll(state, action.payload);
				state.heroesLoadingStatus = Statuses.OK;
			})
			.addCase(fetchHeroes.rejected, (state) => {
				state.heroesLoadingStatus = Statuses.ERROR;
			})
			.addDefaultCase(() => {});
	},
});

export const { selectAll: selectAllHeroes } = heroesAdapter.getSelectors(
	(state: RootState) => state.heroes
);

export const filteredHeroesSelector = createSelector(
	(state: RootState) => state.filters.activeFilter,
	selectAllHeroes,
	(activeFilter, heroes) => {
		if (activeFilter === Elements.ALL) return heroes;
		return heroes.filter((hero) => hero.element === activeFilter);
	}
);

const { actions, reducer } = heroesSlice;

export const { heroDeleted, heroPosted } = actions;

export default reducer;
