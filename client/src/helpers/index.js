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

export function getContinents(countries){
	const continents = [];

	countries.forEach(country => {
		if (!continents.includes(country.continent)){
			continents.push(country.continent);
		}
	});

	return continents;
}

export function getActivities(countries){
	const activities = [];

	countries.forEach(country => {
		country.activities.forEach(act => {
			if (!activities.includes(act)){
			activities.push(act);
		}
		});
	});

	return activities;
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