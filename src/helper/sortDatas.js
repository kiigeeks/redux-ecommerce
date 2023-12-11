export const sortData = (datas, operator) => {
    switch (operator) {
        case 'ASCENDING':
            return datas.sort((a, b) => a.title.localeCompare(b.title))
        case 'DISCENDING':
            return datas.sort((a, b) => b.title.localeCompare(a.title))
        case 'HIGHEST':
            return datas.sort((a, b) => b.price - a.price)
        case 'LOWEST':
            return datas.sort((a, b) => a.price - b.price)
        case 'TOPRATED':
            return datas.sort((a, b) => b.rating.rate - a.rating.rate)
        case 'MOSTREVIEWS':
            return datas.sort((a, b) => b.rating.count - a.rating.count)
        default:
            return datas.sort((a, b) => a.id - b.id)
    }
}