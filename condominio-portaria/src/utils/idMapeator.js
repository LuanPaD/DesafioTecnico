const personalIdMap = {
    "0017": 303,
    "0018": 404,
    "0019": 505,
}

const getIdLote = (id) => {
    return personalIdMap[id];
}

const getLotesQuantity = () => {
    return Object.keys(personalIdMap).length;
}

const getAllids = () => {
    return Object.values(personalIdMap);
}

module.exports = { getIdLote, getLotesQuantity, getAllids };