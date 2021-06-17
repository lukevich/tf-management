export const convertToArray = (obj = {}) => (
    Object.entries(obj).map(([key, value]) => ({ [key]: value }))
);

export const splitObjToArrayBy = (number = 2, obj) => {
    let i = 0;
    const result = [];
    const middleResult = [];
    const dataArray = convertToArray(obj);

    while (dataArray.length) {
        const firstItem = dataArray.splice(0, 1);
        middleResult.push(...firstItem);

        if (i >= number - 1 || dataArray.length === 0) {
            result.push([...middleResult]);
            middleResult.length = 0;
            i = 0;
        } else {
            i++;
        }
    }

    return result;
};
