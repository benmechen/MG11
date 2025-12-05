import { View } from "@react-pdf/renderer";

const CHEQUES = 32;

const ChequeredRow = ({ indented }: { indented?: boolean }) => (
  <View
    style={{
      position: "relative",
      width: "100%",
      height: "10pt",
      overflow: "hidden",
      marginLeft: indented ? "8pt" : "0pt",
    }}
  >
    {[...Array(indented ? CHEQUES - 1 : CHEQUES)].map((_, i) => (
      <View
        style={{
          position: "absolute",
          left: `${i * 16}pt`,
        }}
      >
        <View
          style={{
            width: "8pt",
            height: "10pt",
            backgroundColor: "black",
          }}
        />
        <View
          style={{
            width: "8pt",
            height: "10pt",
            backgroundColor: "white",
          }}
        />
      </View>
    ))}
  </View>
);

export const ChequeredPattern = () => (
  <View
    style={{
      width: "100%",
      position: "absolute",
      top: "0pt",
      left: "0pt",
    }}
  >
    <ChequeredRow />
    <ChequeredRow indented />
    <ChequeredRow />
  </View>
);
