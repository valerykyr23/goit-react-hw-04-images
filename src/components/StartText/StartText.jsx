import StartImage from "../Images/360_F_273439073_DUG5xhBUE6UAiWRoeiu25WlZGPRR7ZTA.jpg"
import { StartTxtWrapper, StartTxt } from './StartText.styled';

export const StartText = () => {
  return (
    <StartTxtWrapper>
      <StartTxt>
        Your Free Image Search Tool
      </StartTxt>
      <StartTxt>Let's look it up!</StartTxt>
      {<img src={StartImage} alt="yellow bird"></img>}
    </StartTxtWrapper>
  );
};