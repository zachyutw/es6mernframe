import Model from '../../models/user.model';
import faker from 'faker';
import _ from 'lodash';

const createFakeUser = ()=>{

    const fakerEmail = faker.internet.email();
    const fakerName = faker.name.findName();
    const data = {
        avatar: faker.image.avatar(),
        provider: "faker",
        displayName: fakerName,
        name:fakerName,
        username: fakerEmail, 
        password: "1234",
        role:1,
        phone: faker.phone.phoneNumber(),
        email:faker.internet.email(),
        yearOfBirth: faker.date.past(),
        verify: faker.random.boolean(),
        isVerifiedLandlord: faker.random.boolean(),
        isVerifiedTenant: faker.random.boolean(),
        clientSecret: "lasfuWebsite"
    }
    return data;
}

const AdminUser = (n)=>{
    const data= {
        avatar: faker.image.avatar(),
        provider: "admin",
        displayName: `roro${n}`,
        name:`roro${n}`,
        username: `roro${n}@roro.com`, 
        password: "1234",
        phone: faker.phone.phoneNumber(),
        email:`roro${n}@roro.com`,
        yearOfBirth: faker.date.past(),
        verify: true,
        role:3,
        isVerifiedLandlord: true,
        isVerifiedTenant: true,
        clientSecret: "lasfuWebsite"
    }
    return data;
}
const add = async (user) => { 
    
    try {
        let data = Model(user);
        let saved = await Model.add(data);
        // console.log(saved);
        return saved
    }
    catch(err) {
        console.log(err,"error")
    }
}

const seedUser = async function(){
    const name="seedUser"
   
    let SEED_AMOUNT = 25;
    const OUTSIDE_SEED = 5;
    const ADMINUSER_AMOUNT = 5;
    let savedList =[];    
    const numberCount = await Model.count();

    if(numberCount===0){
        const adminUsers = _.times(ADMINUSER_AMOUNT, (n)=>AdminUser(n+1));
        const fakeUsers = _.times(SEED_AMOUNT-ADMINUSER_AMOUNT,()=>createFakeUser());
        const fakeDatas = [...adminUsers,...fakeUsers];
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
        const adminUsers = _.times(ADMINUSER_AMOUNT, (n)=>AdminUser(n+1));
        const fakeUsers = _.times(SEED_AMOUNT-ADMINUSER_AMOUNT,()=>createFakeUser());
        const fakeDatas = [...adminUsers,...fakeUsers];
        savedList = await Model.insertMany(fakeDatas);
        savedList = _.chain(savedList).map( (saved)=>_.pick(saved,["_id"]) ).value();
        console.log(`droped seeded ${name} ${savedList.length}`);
        return savedList;
    }
}


export default seedUser;