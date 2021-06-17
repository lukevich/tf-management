export const getParams = () => {
    const { hash } = window.location;
    const params = hash.substring(1).split('&');

    return params.reduce((acc, cur) => {
        const [key, value] = cur.split('=');
        return { ...acc, [key]: value };
    }, {});
};
