import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION, PLAYER_COLLECTION} from "@storage/storageConfig";
import { groupGetAll } from "./groupGetAll";


export async function groupRemoveByName(groupDeleted: string){

    try{
        const storagedGroups = await groupGetAll()
        const groups = storagedGroups.filter(group => group !== groupDeleted)
        
        await AsyncStorage.setItem(GROUP_COLLECTION, JSON.stringify(groups))//sobrescrevendo o grupo com o grupo deletado
        //usamos setItem pro GRoup, pois ainda podem existir outros grupos
        await AsyncStorage.removeItem(`${PLAYER_COLLECTION}-${groupDeleted}`)
        // já no PLAYER_COLLECTION aqui, usamos o removeItem pois se o grupo não existe
        // não podemos deixar players que eram desse grupo deletado, continuar armazenados 
        // no Storage.
    }catch(error){
        throw error;
    }

}