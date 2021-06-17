export function getSearchedTypes(resources, search) {
    const searchedTypes = [];

    const lowerSearch = search.trim().toLowerCase();

    if (lowerSearch) {
        resources.forEach((resource) => {
            resource.data.some((d) => {
                const isMatch = `${d.name}`.toLowerCase().includes(lowerSearch.toLowerCase());

                if (isMatch) {
                    searchedTypes.push(resource.type);
                }
                return isMatch;
            });
        });
    }

    return searchedTypes;
}

export function groupByType(resources = []) {
    const uniqueTypes = [...new Set(resources.map((resource) => resource.type))];

    return uniqueTypes.map((type) => ({
        type,
        data: resources
            .filter((resource) => resource.type === type)
            .map(({ type: resType, ...res }) => ({ ...res })),
    }));
}
