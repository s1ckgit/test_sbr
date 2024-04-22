<script lang="ts">
    import { onMount } from 'svelte';

    import { firstCurrencyStore, secondCurrencyStore } from "../store";
    import getCurrencyRates from '../utils/get-currency-rates';

    let disabled = false;
    
    let firstSelectElement: HTMLSelectElement;
    let secondSelectElement: HTMLSelectElement;

    const currencies = ['USD', 'EUR', 'RUB', 'CNY', 'JPY'];

    onMount(async () => {
        disabled = true;

        try {
            const firstCurrency = firstSelectElement.value;
            const secondCurrency = secondSelectElement.value;

            const [firstCurrencyRates, secondCurrencyRates] = await Promise.all([
                getCurrencyRates(firstCurrency),
                getCurrencyRates(secondCurrency)
            ]);

            disabled = false;
            
            firstCurrencyStore.setRates(firstCurrencyRates);
            firstCurrencyStore.setCurrency(firstCurrency);

            secondCurrencyStore.setRates(secondCurrencyRates);
            secondCurrencyStore.setCurrency(secondCurrency);
        } catch(e) {
            console.log(e);
        }
    });

    const onSelectChange = async (e: Event) => {
        disabled = true;

        const target = e.target as HTMLSelectElement;
        const value = target.value;

        const res = await getCurrencyRates(value);

        disabled = false;

        if (target.id.startsWith('first')) {
            firstCurrencyStore.setRates(res);
            firstCurrencyStore.setCurrency(value);
        } else {
            secondCurrencyStore.setRates(res);
            secondCurrencyStore.setCurrency(value);
        }
    }

    const onInput = (e: Event) => {
        const target = e.target as HTMLInputElement;
        target.value = target.value.replace(/\D/g, '');
        const value = target.value;

        if (target.id.startsWith('first')) {
            firstCurrencyStore.setValue(value);
        } else {
            secondCurrencyStore.setValue(value);
        }
    }

    const convertCurrencies = (e: Event) => {
        const target = e.target as HTMLElement;

        const firstCurrency = $firstCurrencyStore.currency;
        const secondCurrency = $secondCurrencyStore.currency;
        
        if (target.id.startsWith('first')) {
            const rate = $firstCurrencyStore.rates[secondCurrency];
            const secondValue = String(+$firstCurrencyStore.value * rate);
            secondCurrencyStore.setValue(secondValue);
        } else {
            const rate = $secondCurrencyStore.rates[firstCurrency]
            const firstValue = String(+$secondCurrencyStore.value * rate);
            firstCurrencyStore.setValue(firstValue);
        }
    }

</script>


<form class="form">
    <fieldset class="fieldset">
        <select 
            on:change={async (e) => {
                await onSelectChange(e);
                convertCurrencies(e);
            }} 
            bind:this={firstSelectElement} 
            class="select" 
            value='USD'
            id="first-select"
        >
            {#each currencies as currency}
                <option value={currency}>{currency}</option>
            {/each}
        </select>
        <input 
            on:input={(e) => {
                onInput(e);
                convertCurrencies(e)
            }} 
            class="input" 
            id="first-input"
            value={$firstCurrencyStore.value}
            placeholder='Укажите сумму'
            {disabled}
        />
    </fieldset>

    <fieldset class="fieldset">
        <select 
            on:change={(e) => {
                onSelectChange(e);
                convertCurrencies(e);
            }} 
            bind:this={secondSelectElement} 
            class="select" 
            value='RUB'
            id="second-select"
        >
            {#each currencies as currency}
                <option value={currency}>{currency}</option>
            {/each}
        </select>
        <input 
            on:input={(e) => {
            onInput(e);
            convertCurrencies(e);
            }} 
            class="input" 
            id="second-input"
            value={$secondCurrencyStore.value}
            placeholder='Укажите сумму'
            {disabled}
        />
    </fieldset>
</form>

<style>
    .form {
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
    }

    .fieldset {
        display: flex;
        column-gap: .5rem;

        border: none;
    }

    .input {
        width: 100%;
        padding: .5em;

        border-radius: 2px;
        border: 1px solid rgb(221, 221, 221);


        font-size: 16px;
        font-family: inherit;
    }

    .select {
        border-radius: 2px;
        border: 1px solid rgb(221, 221, 221);

        font-family: inherit;
    }
</style>