
import seedUser from './user.seed';





export default async ()=>{
    const users = await seedUser();
}