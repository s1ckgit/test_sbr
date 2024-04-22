const getCurrencyRates = async (currency: string) => {
    try {
        const res = await fetch(`https://open.er-api.com/v6/latest/${currency}`)

        const result = await res.json()

        return result.rates;
    } catch(e) {
        console.log(e);
    }
}

export default getCurrencyRates;