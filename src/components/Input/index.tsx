import { TextInput, TextInputProps } from "react-native";
import { Container } from "./styles";
import { useTheme } from "styled-components/native";
interface InputProps extends TextInputProps {}



interface InputProps extends TextInputProps{
  inputRef?: React.RefObject<TextInput>
}

export function Input({ inputRef, ...rest }: InputProps) {
  const { COLORS } = useTheme();
  //o ref não é passado diretamente quando o Input é um component
  //nesse caso eu recebo ele como uma prop e retorno aqui

  return <Container ref={inputRef} {...rest} placeholderTextColor={COLORS.GRAY_300} />;
}
