import axios from "axios";

export function getRange(page){
	let start = 0;
	let end = 9;

	if (page > 1){
		start = 10 * page - 11;
		end = start + 10;
	}

	return [start, end];
}

export function getNumPages(numCountries){
	return Math.ceil((numCountries + 1) / 10);
}

export function getListPages(currentPage, numPages){
	const list = [];

	if (currentPage < 6){
		const n = numPages < 6 ? numPages : 5;

		for (let i=1; i<=n; i++){
			list.push({
				page: i,
				active: i === currentPage
			});
		}
	} else {
		for (let i=currentPage-4; i<=currentPage; i++){
			list.push({
				page: i,
				active: i === currentPage
			});
		}
	}

	return list;
}

export function sortCountries(countries, mode){
	const sortByName = (ccur, cnext) => {
		if (ccur.name > cnext.name) return 1;
		else if (ccur.name === cnext.name) return 0;
		else return -1;
	}

	const sortByPopulation = (ccur, cnext) => {
		if (ccur.population > cnext.population) return 1;
		else if (ccur.population === cnext.population) return 0;
		else return -1;
	}

	switch(mode){
		case 'asc_name': return countries.sort(sortByName);
		case 'desc_name': return countries.sort(sortByName).reverse();
		case 'asc_population': return countries.sort(sortByPopulation);
		case 'desc_population': return countries.sort(sortByPopulation).reverse();
		default: return countries;
	}
}

export function filterByContinents(countries, continents) {
	if (continents.length){
		return countries.filter(country => continents.includes(country.continent));
	} else {
		return countries;
	}
}

export function filterByActivities(countries, activities) {
	if (activities.length){
		return countries.filter(country => {
			return country.activities.some(act => activities.some(a => act.name === a.name))
		})
	} else {
		return countries;
	}
}

export function firstToCap(str) {
	if (str?.length) return str[0].toUpperCase() + str.slice(1);
	else return ''
}

export function getCountryIds(countries, listCountries) {
	return listCountries.map(country => {
		let id;

		for(let c of countries){
			if (c.name === country) {
				id = c.id;
				break;
			}
		}

		return id;
	})
}

export function createActivity(activity, countriesId) {
	axios.post("http://localhost:3001/activity", {
		name: activity.name,
		difficulty: activity.difficulty,
		duration: activity.duration,
		season: activity.season,
		countriesId: countriesId
	})
}

export function deleteRepeat(activities){
	const acti = [];

	for (let act of activities){
		if (acti.every(a => a.name !== act.name)){
			acti.push(act);
		}
	}

	return acti;
}