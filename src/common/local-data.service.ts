const ITEM_HEADER = 'item_header'

export const getItemHeader = () => {
    // @ts-ignore
    return JSON.parse(localStorage.getItem(ITEM_HEADER))
}

export const saveItemHeader = value => {
    localStorage.setItem(ITEM_HEADER, JSON.stringify(value))
}

export const destroyItemHeader = () => {
    localStorage.removeItem(ITEM_HEADER)
}
export default {
    getItemHeader,
    saveItemHeader,
    destroyItemHeader
}