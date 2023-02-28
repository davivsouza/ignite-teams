import {Container} from './styles'
import { Header } from '@components/Header'
import { Highlight } from '@components/Highlight'
import { GroupCard } from '@components/GroupCard'
import { useState } from 'react'
import { FlatList } from 'react-native'
export function Groups(){

    const [groups, setGroups] = useState<string[]>(["Galera do Free Fire", "Amigos"])

    return(
        <Container>
            <Header/>

            <Highlight 
                title="Turmas"
                subtitle='Jogue com sua turma'
            />
            <FlatList
                data={groups}
                keyExtractor={item => item}
                renderItem={({item: GroupCardTitle}) => (
                    <GroupCard title={GroupCardTitle}/>
                )}
                
            />
            <GroupCard title='Turma do TCC'/>
        </Container>
    )
}