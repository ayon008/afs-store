import { theme } from "../theme";
import Heading from "./Heading";
import Container from "./Container";

export const Headline = () => {
  return (
    <Container className={`bg-black ${theme.paddingTop}`}>
  <Heading
  text="ALPAGO PROPERTIES EXCELLENCE IN LUXURY"
  spanText="EXCELLENCE IN LUXURY"
  size="text-[36px] md:text-[42px]"
  className="leading-tight"
  breakSpan={true}
  fontWeight="font-semibold"
  spanFontWeight="font-normal"
  />
    </Container>
  );
}