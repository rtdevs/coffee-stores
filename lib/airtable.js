const Airtable = require('airtable');
const base = new Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base(process.env.AIRTABLE_BASE_KEY);

export const table = base("coffee-stores");

export const getMinifiedRecords = (records) => {
     return records.map(record => {
        return {
            recordId: record.id,
            ...record.fields
        }
    });
};

export const findRecordByFilter = async (id) => {
    // Find a record
    const findCoffeeStoreRecords = await table.select({
        filterByFormula: `id="${id}"`
    }).firstPage();

    return getMinifiedRecords(findCoffeeStoreRecords);
};