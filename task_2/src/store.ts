import { writable } from 'svelte/store';

interface ratesType {
    [key: string]: number
}

export function createCurrencyStore() {
    const { subscribe, update } = writable({
        value: '',
        currency: '',
        rates: {} as ratesType
    })

    function setValue(value: string) {
        update(storeData => {
            return {
                ...storeData,
                value
            }
        })
    }

    function setCurrency(currency: string) {
        update(storeData => {
            return {
                ...storeData,
                currency
            }
        })
    }

    function setRates(rates: ratesType) {
        update(storeData => {
            return {
                ...storeData,
                rates
            }
        })
    }

    return {
        subscribe,
        setValue,
        setCurrency,
        setRates
    }
}

export const firstCurrencyStore = createCurrencyStore();
export const secondCurrencyStore = createCurrencyStore();