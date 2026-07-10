import { Composition } from "remotion";
import { ColorMixer } from "./ColorMixer";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="ColorMixerVideo"
        component={ColorMixer}
        durationInFrames={1800} // ১ মিনিট
        fps={30}
        width={1080} // Width
        height={1920} // Height (9:16 Shorts/Reels Ratio)
        defaultProps={{
          colors: ["#ff0055", "#00d2ff"],
        }}
      />
    </>
  );
};
