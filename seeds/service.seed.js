import Model from '../models/service.model';
import faker from 'faker';
import _ from 'lodash';

const fakeService = ()=>{
    return {
        price:faker.commerce.price(),
        name:faker.commerce.productName(),
        description:faker.lorem.paragraph(),
        serviceType:0,
        unitType:0,
        iconUrl:faker.image.technics()
    }
}

const createFakeDatas =(amount)=>{
    const fakeDatas = _.times(amount,()=>fakeService());
    return fakeDatas;
}
const seedService = async function(){
    const name="seedService"
    let SEED_AMOUNT = 10;
    const OUTSIDE_SEED = 5;
    const ADMINUSER_AMOUNT = 5;
    let savedList =[];    
    const numberCount = await Model.count();

    if(numberCount===0){
        const fakeDatas = createFakeDatas(SEED_AMOUNT);
        savedList = await Model.insertMany(fakeDatas);
        savedList = _.chain(savedList).map( (saved)=>_.pick(saved,["_id"]) ).value();
        console.log(`seeded new ${name} ${savedList.length}`);
        return savedList;
    }else if(numberCount <= SEED_AMOUNT+OUTSIDE_SEED){
        savedList = await Model.find({});
        savedList = _.chain(savedList).map( (saved)=>_.pick(saved,["_id"]) ).value();
        console.log(`already seeded ${name} ${numberCount}`);
        return savedList;
    }
    else{
        Model.collection.drop();
        const fakeDatas = createFakeDatas(SEED_AMOUNT);
        savedList = await Model.insertMany(fakeDatas);
        savedList = _.chain(savedList).map( (saved)=>_.pick(saved,["_id"]) ).value();
        console.log(`droped seeded ${name} ${savedList.length}`);
        return savedList;
    }
}


export default seedService;