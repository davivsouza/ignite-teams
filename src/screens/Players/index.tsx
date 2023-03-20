import { Button } from "@components/Button";
import { ButtonIcon } from "@components/ButtonIcon";
import { Filter } from "@components/Filter";
import { Header } from "@components/Header";
import { Highlight } from "@components/Highlight";
import { Input } from "@components/Input";
import { ListEmpty } from "@components/ListEmpty";
import { PlayerCard } from "@components/PlayerCard";
import { useRoute } from "@react-navigation/native";
import { playerAddByGroup } from "@storage/player/playerAddByGroup";
import { AppError } from "@utils/appError";
import { useState } from "react";
import { Alert } from "react-native";
import { FlatList } from "react-native";
import { Container, Form, HeaderList, NumberOfPlayers } from "./styles";

type RouteParams = {
  group: string;
};

export function Players() {
  const [team, setTeam] = useState("Time A");
  const [newPlayerName, setNewPlayerName] = useState("");
  const [players, setPlayers] = useState([]);

  const route = useRoute();
  const { group } = route.params as RouteParams;

  async function handleAddPlayer() {

    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Nova Pessoa', 'informe o nome da pessoa para adicionar!')
    }

    const newPlayer = {
      name: newPlayerName,
      team,
    }
    try{
      await playerAddByGroup(newPlayer, group);
      
    }catch(error){
      if(error instanceof AppError){
        Alert.alert("Nova pessoa", error.message)
      }else{
        Alert.alert('Nova pessoa', 'Não foi possível adicionar esse jogador!')
      }
    }
  }

  return (
    <Container>
      <Header showBackButton />

      <Highlight title={group} subtitle="adicione a galera e separe os times" />
      <Form>
        <Input
          placeholder="Nome da pessoa"
          autoCorrect={false}
          onChangeText={setNewPlayerName}
        />
        <ButtonIcon icon="add" onPress={handleAddPlayer}/>
      </Form>

      <HeaderList>
        <FlatList
          data={["Time A", "Time B"]}
          keyExtractor={(item) => item}
          horizontal //deixar itens um do lado do outro
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
        />
        <NumberOfPlayers>{players.length}</NumberOfPlayers>
      </HeaderList>

      <FlatList
        data={players}
        keyExtractor={(item) => item}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: player }) => (
          <PlayerCard name={player} onRemove={() => {}} />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas nesse time " />
        )}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 },
        ]}
      />

      <Button title="Remover Turma" type="SECONDARY" />
    </Container>
  );
}
