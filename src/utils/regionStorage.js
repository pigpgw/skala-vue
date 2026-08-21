import { SAVED_REGION_LIMIT, SAVED_REGION_STORAGE_KEY } from '@/constants/storage'

/** @typedef {import('@/types/region').Region} Region */

/** @param {unknown} value */
const isRegion = (value) => {
  if (!value || typeof value !== 'object') return false

  const region = /** @type {Record<string, unknown>} */ (value)
  return typeof region.id === 'string' && typeof region.name === 'string' && typeof region.weatherName === 'string' && typeof region.latitude === 'number' && typeof region.longitude === 'number'
}

/** @returns {Region[]} */
export const getSavedRegions = () => {
  if (typeof window === 'undefined') return []

  try {
    const savedRegions = JSON.parse(window.sessionStorage.getItem(SAVED_REGION_STORAGE_KEY) ?? '[]')
    return Array.isArray(savedRegions) ? savedRegions.filter(isRegion) : []
  } catch {
    return []
  }
}

/** @param {Region} region */
export const saveRegion = (region) => {
  if (typeof window === 'undefined') return

  const savedRegions = getSavedRegions().filter((savedRegion) => savedRegion.id !== region.id)
  window.sessionStorage.setItem(SAVED_REGION_STORAGE_KEY, JSON.stringify([region, ...savedRegions].slice(0, SAVED_REGION_LIMIT)))
}

/** @param {string} regionId */
export const findSavedRegionById = (regionId) => getSavedRegions().find((region) => region.id === regionId) ?? null
