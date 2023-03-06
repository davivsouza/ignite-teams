import { TextInputProps } from "react-native";
import { Container } from "./styles";
import { useTheme } from "styled-components";
interface InputProps extends TextInputProps {}

export function Input({ ...rest }: InputProps) {
  const { COLORS } = useTheme();

  return <Container {...rest} placeholderTextColor={COLORS.GRAY_300} />;
}
