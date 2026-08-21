/**
 * @param {string} insect
 * @returns {'warning' | 'danger'}
 */
export const getInsectVariant = (insect) => insect.includes('쯔쯔가무시') ? 'danger' : 'warning'
