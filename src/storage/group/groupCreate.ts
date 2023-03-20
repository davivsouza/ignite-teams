import AsyncStorage from "@react-native-async-storage/async-storage";
import { GROUP_COLLECTION } from "@storage/storageConfig";
import { AppError } from "@utils/appError";
import { groupGetAll } from "./groupGetAll";

export async function groupCreate(newGroupName: string) {
  try {
    const storedGroups = await groupGetAll();

    const groupAlreadyExist = storedGroups.includes(newGroupName)

    if(groupAlreadyExist){
      throw new AppError('Já existe um grupo cadastrado com esse nome!')
    }


    const storage = JSON.stringify([...storedGroups, newGroupName]);
    
    await AsyncStorage.setItem(GROUP_COLLECTION, storage);

  } catch (error) {
    throw error; //lançar pra quem chamou o erro!
  }
}
