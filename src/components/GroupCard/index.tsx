import { TouchableOpacityProps } from "react-native";
import { Container, Icon, Title } from "./styles";


//passar os atributos de um TouchableOpacity pro componente
interface GroupCardProps extends TouchableOpacityProps{
    title: string
}

export function GroupCard({title, ...rest}:GroupCardProps){
    return (
        <Container {...rest}>
            <Icon/>
            <Title>
                {title}
            </Title>
        </Container>


    )
}