import { fetchCoffeeStores } from "../../lib/coffee-stores";

const getCoffeeStoresByLocation = async (req, res) => {
    try{
        const { latLong, limit } = req.query;
        const response = await fetchCoffeeStores(latLong, limit);
        res.status(200);
        res.json(response);
    }catch(err){
        console.log('Error from getCoffeeStoresByLocation api', err);
        res.status(500);
        res.json({ message: 'Error happened in getCoffeeStoresByLocation api' });
    }
};

export default getCoffeeStoresByLocation;