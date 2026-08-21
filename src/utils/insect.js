/**
 * @param {import('@/types/insect').Insect} insect
 * @returns {'warning' | 'danger'}
 */
export const getInsectVariant = (insect) => insect.id === 'chigger-mite' ? 'danger' : 'warning'
