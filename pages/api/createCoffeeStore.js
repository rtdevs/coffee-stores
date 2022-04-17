import {table, getMinifiedRecords, findRecordByFilter} from "../../lib/airtable";


const createCoffeeStore = async (req, res) => {
    if(req.method === "POST"){
        const { id, name, address, neighbourhood, voting, imgUrl } = req.body;

        try{
            if(id){
                const records = await findRecordByFilter(id);

                if(records.length !== 0){
                    res.json(records);
                } else {
                    if(name){
                        // Create a record
                        const createRecords = await table.create([
                            {
                                fields: {
                                    id,
                                    name,
                                    address,
                                    neighbourhood,
                                    voting,
                                    imgUrl
                                }
                            }
                        ]);
                        res.json(getMinifiedRecords(createRecords));
                    } else {
                        res.status(400);
                        res.json({ message: 'Name is missing'});
                    }

                };
            } else {
                res.status(400);
                res.json({ message: 'Id is missing'});
            }
        }catch(err){
            console.log('Error creating or finding a store', err);
            res.status(500);
            res.json({ message: 'Error creating or finding a store', err })
        }
    }
};

export default createCoffeeStore;